import nodemailer from 'nodemailer';
import SMTPConnection from 'nodemailer/lib/smtp-connection';

export const sendEmail = async (data: { email: string, subject: string, message: string; }) => {
    try {
        // Configure the transporter
        const transportOpt :SMTPConnection.Options = {
            
            host: process.env.NEXT_PUBLIC_MAIL_HOST,
            port: Number(process.env.NEXT_PUBLIC_MAIL_PORT),
            secure: true,
            auth: {
                user: process.env.NEXT_PUBLIC_MAIL_USERNAME,
                pass: process.env.NEXT_PUBLIC_MAIL_PASSWORD,
            },
        }
        const transporter = nodemailer.createTransport(transportOpt);

        // Define the email options
        const mailOptions = {
            from: process.env.NEXT_PUBLIC_MAIL_FROM_ADDRESS,
            to: data.email,
            subject: data.subject || 'Default Subject',
            text: data.message || 'Default message',
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.log('Error send email...');
        console.log(error);
        return false
    }
}