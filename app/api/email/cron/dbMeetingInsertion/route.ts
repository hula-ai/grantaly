

import getCurrentUser from '@/actions/getCurrentUser';
import Meeting from '@/models/meeting';
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";


// Function to get a new access token using the refresh token
async function getAccessToken() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  );

  
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  
  // Failed after this point
  const { token } = await oauth2Client.getAccessToken(); 
  return token;
}

// Function to fetch calendar events
const getCalendarEvents = async (accessToken) => {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client }); // Make sure `auth` is initialized

  const timeMin = new Date().toISOString(); // Current time
  const timeMax = new Date();
  timeMax.setMonth(timeMax.getMonth() + 1); // Add 1 months from today

  const events = await calendar.events.list({
      calendarId: 'primary', // Primary calendar
      timeMin: timeMin, // Events starting from now
      timeMax: timeMax.toISOString(), // Events ending within the next 3 months
      singleEvents: true, // Break recurring events into instances
      orderBy: 'startTime', // Sort events by start time
  });
  return events.data.items; // List of event objects
};


const extractDetails = (description) => {
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


const InsertRecord = async (events) => {
    // Iterate through the events and check if each one exists in the database
    for (let event of events) {
      const existingEvent = await Meeting.findOne({ link: event.link });

      // If the event is already in the database, skip the insertion
      if (!existingEvent) {
        // Insert the event if it doesn't already exist
        await Meeting.create({
          name: event.name,
          startDate: event.startDate,
          endDate: event.endDate,
          link: event.link,
          description: event.description,
        });
      }
    }
};



export async function POST(req:Request) {
  try {
    
    const accessToken = await getAccessToken();
    const events = await getCalendarEvents(accessToken);
    const eventDetails = events.map(event => ({
      name: event.summary,
      startDate: new Date(event.start.dateTime),
      endDate: new Date(event.end.dateTime),
      link: event.htmlLink,
      description: extractDetails(event.description)
    }));

    await InsertRecord(eventDetails);
    console.log(eventDetails,'my events')

    // Return the events as JSON
    return NextResponse.json( eventDetails , { status: 200 });
  } catch (error) {
    console.error("Failed to fetch calendar events:", error);
    return NextResponse.json({ error: 'Failed to fetch calendar events' }, { status: 500 });
  }
}