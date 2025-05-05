import * as nodemailer from "nodemailer"

export async function sendEmail(email: string, subject: string, message: string) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMPT_HOST,
            port: Number(process.env.SMPT_PORT),
            service: process.env.SMPT_SERVICE,
            secure: true,
            auth: {
                user: process.env.SMPT_USER,
                pass: process.env.SMPT_PASSWORD,
            }
        })
        await transporter.sendMail({
            from: process.env.SMPT_USER,
            to: email,
            subject: subject,
            text: message
        })
    } catch (error) {
        throw new Error(error);
    }
}