"use server";

import nodemailer from "nodemailer";

interface BookingData {
  customer_name: string;
  customer_phone: string;
  car_reg: string;
  car_make_model: string;
  problem_description: string;
  preferred_day: string;
  preferred_time_frame: string;
}

export async function sendBookingNotification(data: BookingData) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Format the date from YYYY-MM-DD to DD/MM/YYYY
    const [year, month, day] = data.preferred_day.split("-");
    const formattedDate = day && month && year ? `${day}/${month}/${year}` : data.preferred_day;

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 2px solid #000; background-color: #f9f9f9;">
        <h2 style="text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 10px; margin-top: 0;">New Booking Request</h2>
        <p><strong>Customer Name:</strong> ${data.customer_name}</p>
        <p><strong>Phone:</strong> ${data.customer_phone}</p>
        <p><strong>Car Reg:</strong> ${data.car_reg}</p>
        <p><strong>Make & Model:</strong> ${data.car_make_model}</p>
        <p><strong>Preferred Day:</strong> ${formattedDate} (${data.preferred_time_frame})</p>
        
        <h3 style="text-transform: uppercase; margin-top: 20px;">Problem Description</h3>
        <p style="background: #fff; padding: 15px; border: 1px solid #ccc;">${data.problem_description}</p>
        
        <div style="margin-top: 20px; text-align: center;">
          <a href="https://dave-flew-automotive.vercel.app/admin" style="background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; font-weight: bold; text-transform: uppercase;">View in Admin Panel</a>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "flewy86@gmail.com",
      subject: `New Booking Request: ${data.car_reg}`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email notification:", error);
    return { success: false, error: "Failed to send email" };
  }
}
