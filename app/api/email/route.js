import nodemailer from "nodemailer";
import http from "http";



const createOTPEmailTemplate = (otp) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OTP Verification</title>
            <style>
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    font-family: Arial, sans-serif;
                }
                .header {
                    background-color: #f8f9fa;
                    padding: 20px;
                    text-align: center;
                    border-radius: 5px;
                }
                .otp-box {
                    background-color: #ffffff;
                    border: 2px solid #e9ecef;
                    border-radius: 5px;
                    padding: 20px;
                    margin: 20px 0;
                    text-align: center;
                }
                .otp-code {
                    font-size: 32px;
                    font-weight: bold;
                    color: #0066cc;
                    letter-spacing: 5px;
                }
                .footer {
                    text-align: center;
                    color: #6c757d;
                    font-size: 12px;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>Email Verification</h2>
                </div>
                <div class="otp-box">
                    <p>Your verification code is:</p>
                    <div class="otp-code">${otp}</div>
                    <p>This code will expire in 10 minutes.</p>
                </div>
                <div class="footer">
                    <p>If you didn't request this code, please ignore this email.</p>
                    <p>© 2024 Your Company Name. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;
};


const transport = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})



export const sendEmail = async (data) => {



    const { sender, recipients, subject, message, otp } = data

    return await transport.sendMail({
        from: sender,
        to: recipients,
        subject,
        html: createOTPEmailTemplate(otp),
    })
}


export async function POST(req) {
    try {
        const body = await req.json()
        const response = await sendEmail(body)
        return new Response(JSON.stringify(response), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response(error, { status: 500 })
    }
}