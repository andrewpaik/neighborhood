import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWaitlistConfirmation = async (email: string) => {
  try {
    await resend.emails.send({
      from: "Neighborhood <onboarding@resend.dev>",
      to: email,
      subject: "You're on the list! \u{1F3E1}",
      html: `
        <div style="font-family: 'DM Sans', sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="color: #778662; font-size: 28px; margin-bottom: 16px;">Welcome to the neighborhood!</h1>
          <p style="color: #605950; font-size: 16px; line-height: 1.6;">
            You're officially on the waitlist. We're building neighborhoods of ~50 people in LA,
            and we'll let you know as soon as yours is ready.
          </p>
          <p style="color: #605950; font-size: 16px; line-height: 1.6;">
            In the meantime, if you haven't taken the personality quiz yet,
            it helps us find the right people for your neighborhood.
          </p>
          <div style="margin-top: 24px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/onboarding?email=${encodeURIComponent(email)}"
               style="background-color: #df7337; color: white; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-weight: 600; display: inline-block;">
              Take the Quiz
            </a>
          </div>
          <p style="color: #9e9485; font-size: 14px; margin-top: 32px;">
            - The Neighborhood Team
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send waitlist confirmation email:", error);
  }
};
