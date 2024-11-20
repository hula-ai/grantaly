// pages/api/getdates/index.js

import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

import { NextResponse,NextRequest } from 'next/server';
import getCurrentUser from '@/actions/getCurrentUser';

// Replace with your Google OAuth2 credentials
const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_GOOGLE_CLIENT_SECRET';
const REDIRECT_URI = 'YOUR_REDIRECT_URI';

// Initialize OAuth2Client
const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Get Google Calendar events
const getCalendarEvents = async (accessToken) => {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  const events = await calendar.events.list({
    calendarId: 'primary', // Fetch events from the primary calendar
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });

  return events.data.items; // List of event objects
};

export POST = async () => {
    try {

        const currentUser = await getCurrentUser()
        if (!accessToken) {
          return res.status(400).json({ error: 'Access token is required' });
        }
  
        const events = await getCalendarEvents(accessToken);
        
        return res.status(200).json({ events });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch calendar events' });
      }
}
