import sendEmail from './mailer';

// Notification for meeting booking
const sendMeetingNotification = (userEmail, meetingDetails) => {
  const subject = 'Meeting Booked Successfully';
  const text = `Dear User, your meeting has been successfully booked for ${meetingDetails.date}.`;
  const html = `<p>Dear User,</p><p>Your meeting has been successfully booked for <strong>${meetingDetails.date}</strong>.</p>`;
  
  return sendEmail(userEmail, subject, text, html);
};

// Notification for approaching deadline (admin and user)
const sendDeadlineReminder = (userEmail:string, adminEmail:string, deadlineDetails:any) => {
  const subject = 'Approaching Deadline Reminder';
  const text = `Dear User, your deadline for ${deadlineDetails.project} is approaching on ${deadlineDetails.date}.`;
  const html = `<p>Dear User,</p><p>Your deadline for <strong>${deadlineDetails.project}</strong> is approaching on <strong>${deadlineDetails.date}</strong></p>`;

  // Send notification to the user
  sendEmail(userEmail, subject, text, html);

  // Send reminder to the admin as well
  const adminSubject = `Reminder: User's Deadline Approaching for ${deadlineDetails.project}`;
  const adminText = `The deadline for ${deadlineDetails.project} is approaching on ${deadlineDetails.date}.`;
  const adminHtml = `<p>Reminder: The deadline for <strong>${deadlineDetails.project}</strong> is approaching on <strong>${deadlineDetails.date}</strong>.</p>`;

  return sendEmail(adminEmail, adminSubject, adminText, adminHtml);
};


const ContactUsMessage = async (content) => {
  const subject = 'Contact Us - Grantaly Query';
  const text = `
    First Name: ${content.firstName}
    Last Name: ${content.lastName}
    Email: ${content.email}
    Contact: ${content.contact}
    Message: ${content.message}
  `;
  const html = `
    <p><strong>First Name:</strong> ${content.firstName}</p>
    <p><strong>Last Name:</strong> ${content.lastName}</p>
    <p><strong>Email:</strong> ${content.email}</p>
    <p><strong>Contact:</strong> ${content.contact}</p>
    <p><strong>Message:</strong></p>
    <p>${content.message}</p>
  `;

  // Send notification to the user
  await sendEmail(content.email, subject, text, html);
};


export { sendMeetingNotification, sendDeadlineReminder,ContactUsMessage };
