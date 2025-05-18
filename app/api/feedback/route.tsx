import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import confirmationTemplate from "@/app/utils/emails/confirmationTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, suggestion } = await req.json();

  if (!name || !email || !suggestion) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const ownerHtml = `
    <div style="font-family:'Poppins',sans-serif;padding:20px;">
      <h2 style="color:#06b6d4;">📥 New Suggestion from ${name}</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left:3px solid #ccc;padding-left:10px;color:#555;">
        ${suggestion}
      </blockquote>
    </div>
  `;

  const userHtml = `
    <div style="font-family:'Poppins',sans-serif;padding:20px;">
      <h2 style="color:#06b6d4;">Thanks, ${name}! 🙏</h2>
      <p>Bob here 👋 Just wanted to say thank you for your feedback. Your suggestion:</p>
      <blockquote style="border-left:3px solid #ccc;padding-left:10px;color:#555;">
        ${suggestion}
      </blockquote>
      <p>We’ll take a gander at it. In the meantime, stay tuned... Bob might have more to say soon.</p>
      <p style="margin-top:20px;">Cheers,<br/>🧔 Bob (and the Hotline Team)</p>
    </div>
  `;

  try {
    // Email to admin
    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: process.env.RESEND_TO!,
      subject: `New Suggestion from ${name}`,
      html: ownerHtml,
    });

    // Confirmation email to user
    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: email,
      subject: "Thanks for your feedback ❤️",
      html: confirmationTemplate(name),
    });

    return NextResponse.json({ message: "Suggestion and confirmation sent!" });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
