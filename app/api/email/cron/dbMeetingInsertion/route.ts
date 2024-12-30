// pages/api/getdates/index.js

import { IMeeting } from '@/interface/interface';
import Meeting from '@/models/meeting';
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

// Function to get a new access token using the refresh token
async function getAccessToken() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI // Ensure the redirect URI is set correctly in your environment variables
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  // Fetch a new access token
  const { token } = await oauth2Client.getAccessToken(); 
  if (!token) {
    throw new Error("Failed to retrieve access token. Please check your refresh token.");
  }
  return token;
}

// Function to fetch calendar events
const getCalendarEvents = async (accessToken) => {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  const timeMin = new Date().toISOString(); // Current time
  const timeMax = new Date();
  timeMax.setMonth(timeMax.getMonth() + 11); // Add 1 month from today

  const events = await calendar.events.list({
    calendarId: 'primary', // Primary calendar
    timeMin, // Events starting from now
    timeMax: timeMax.toISOString(), // Events ending within the next month
    singleEvents: true, // Break recurring events into instances
    orderBy: 'startTime', // Sort events by start time
  });

  return events.data.items || []; // Return list of event objects or empty array
};

// Extract specific details from the event description
const extractDetails = (description) => {
  if (!description) return {};

  const bookedByMatch = description.match(/<b>Booked by<\/b>\s*(.+?)\s/);
  const emailMatch = description.match(/[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}/);
  const projectTitleMatch = description.match(/<b>Project Title<\/b>\s*(.+?)\s*<br>/);
  const aiNeedsMatch = description.match(/<b>Description of AI needs<\/b>\s*(.+)/);

  return {
    bookedBy: bookedByMatch ? bookedByMatch[1].trim() : null,
    email: emailMatch ? emailMatch[0].trim() : null,
    projectTitle: projectTitleMatch ? projectTitleMatch[1].trim() : null,
    aiNeeds: aiNeedsMatch ? aiNeedsMatch[1].trim() : null,
  };
};

const InsertRecord = async (events: IMeeting[]) => {
  try {
    // Fetch all existing events once
    const existingEvents = await Meeting.find();

    // Create a set of existing event links for easy lookup
    const existingLinks = new Set(existingEvents.map((event) => event.link));

    // Map over events to filter out those with existing links
    const newEvents = events.filter((event) => !existingLinks.has(event.link));

    // If there are new events, insert them into the database
    if (newEvents.length > 0) {
      await Meeting.insertMany(newEvents.map((event) => ({
        name: event.name,
        startDate: event.startDate,
        endDate: event.endDate,
        link: event.link,
        description: event.description,
      })), { ordered: false });      

      console.log("New events inserted successfully");
    } else {
      console.log('No new events to insert');
    }
  } catch (error) {
    console.error('Error inserting events:', error);
  }
};



// API Handler
export async function GET() {
  try {
    const accessToken = await getAccessToken(); // Get fresh access token
    const events = await getCalendarEvents(accessToken); // Fetch calendar events

    const eventDetails = events.map(event => ({
      name: event.summary,
      startDate: event.start?.dateTime ? new Date(event.start.dateTime) : null,
      endDate: event.end?.dateTime ? new Date(event.end.dateTime) : null,
      link: event.htmlLink,
      description: extractDetails(event.description),
    }));

    await InsertRecord(eventDetails); // Save to database

    return NextResponse.json(eventDetails, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch calendar events:", error);
    return NextResponse.json({ error: 'Failed to fetch calendar events' }, { status: 500 });
  }
}
