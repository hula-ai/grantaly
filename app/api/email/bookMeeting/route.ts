// pages/api/bookMeeting.js
import connectToDatabase from "@/lib/mongoose";
import { sendMeetingNotification } from "@/lib/notification";
import { NextResponse } from "next/server";

export async function POST(req:Request, res:Response) {
  try {
    await connectToDatabase();
    const { userEmail, meetingDetails } = await req.json();

    // Send the email notification
    await sendMeetingNotification(userEmail, meetingDetails);

    // Return success response
    return NextResponse.json(
      { message: 'Notification sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);

    // Return error response
    return NextResponse.json(
      { message: 'Error sending email' },
      { status: 500 }
    );
  }
}
