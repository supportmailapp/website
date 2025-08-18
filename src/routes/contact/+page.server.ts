import { fail } from "@sveltejs/kit";
import nodemailer from "nodemailer";
import { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, RECIPIENT_EMAIL } from "$env/static/private";

export const actions = {
  sendEmail: async ({ request }) => {
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: parseInt(EMAIL_PORT),
      secure: EMAIL_PORT === "465", // true for 465, false for other ports
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates
        ciphers: "SSLv3", // Use SSLv3 for compatibility
      },
    });

    await transporter.verify().catch((error) => {
      console.error("Email transport verification failed:", error);
      return fail(500, {
        message: "Email service is not configured correctly. Please try again later.",
      });
    });

    try {
      const data = await request.formData();
      const name = data.get("name")?.toString();
      const email = data.get("email")?.toString();
      const message = data.get("message")?.toString();

      // Basic validation
      if (!name || !email || !message) {
        return fail(400, {
          message: "All fields are required",
        });
      }

      // Email validation
      const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(email)) {
        return fail(400, {
          message: "Please enter a valid email address",
        });
      }

      // Send email
      const info = await transporter.sendMail({
        from: `"Luca" <${EMAIL_USER}>`, // Your email address
        to: RECIPIENT_EMAIL, // Where you want to receive the messages
        subject: `Contact Form: Message from ${name}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
        text: `
          New Contact Form Submission
          
          Name: ${name}
          Email: ${email}
          Message: ${message}
        `,
      });

      console.log("Email sent successfully:", info.messageId);

      return { success: true };
    } catch (error) {
      console.error("Email error:", error);
      return fail(500, {
        message: "Failed to send email. Please try again.",
      });
    }
  },
};
