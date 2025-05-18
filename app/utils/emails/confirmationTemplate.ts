const confirmationTemplate = (name: string) => `
<!DOCTYPE html>
<html lang="en" style="margin: 0; padding: 0;">
  <head>
    <meta charset="UTF-8" />
    <title>Thanks for Your Feedback</title>
  </head>
  <body style="font-family: 'Poppins', sans-serif; background-color: #f3f4f6; margin: 0; padding: 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 0; padding: 0; margin-left: 20px; margin-right: 20px;">
      <tr>
        <td align="center">
          <table width="600" style="background-color: white; border-radius: 12px; margin-bottom: 40px; margin-top: 40px; padding: 40px;">
            <tr>
              <td align="center">
                <img src="https://www.bobhotline.com/logo.jpg" alt="Bob Hotline Logo" width="100" />
                <h1 style="color: #111827;">Thank You for Your Feedback!</h1>
                <p style="color: #4b5563; font-size: 16px;">
                  Hi ${name}, thanks for reaching out to Bob's developers. Your feedback has been received and is truly appreciated.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding-top: 20px; text-align: center;">
                <h2 style="color: #111827;">📣 What Is The Bob Project?</h2>
                <p style="color: #374151; font-size: 15px; text-align: center;">
                  This project was created in memory of Bob — a true Kiwi legend whose wit, charm, and voice brought joy to everyone who knew him.
                </p>
                <p style="color: #374151; font-size: 15px; text-align: center;">
                  Through this app, we're preserving his spirit through iconic catchphrases, shared memories, and a growing tribute space.
                  But we’re not stopping there.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding-top: 20px; text-align: center;">
                <h2 style="color: #111827;">🚀 Where We're Heading</h2>
                <p style="color: #374151; font-size: 15px; text-align: center;">
                  Bob Hotline is evolving into a full voice assistant, capable of holding conversations just like Bob used to — even making phone calls.
                  Your suggestions help shape that future. Whether you're here to laugh, reflect, or just say "Horoo," you’re part of this journey now.
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 30px 0; text-align: center;">
                <a href="https://www.bobhotline.com/tribute"
                  style="background-color: #06b6d4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                  Read Bob’s Tribute →
                </a>
              </td>
            </tr>

            <tr>
            <td align="center" style="padding: 0;">
                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0; width: 75%;" />

                <p style="font-size: 12px; color: #9ca3af; font-style: italic; text-align: center; margin: 0;">
                ⚠️ Replies to this inbox are not monitored.
                </p>

                <a
                href="mailto:logan.evans@lestudio.com"
                style="font-size: 12px; font-style: italic; text-align: center; display: inline-block; margin: 0; color: #06b6d4; text-decoration: none;"
                >
                Contact Developers Here.
                </a>

                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0; width: 75%;" />
            </td>
            </tr>

            <tr>
              <td align="center" style="padding: 0;">
                <p style="color: #10b981; font-size: 12px; font-weight: 500;">
                  Thanks for helping keep Bob’s spirit alive!
                </p>
              </td>
            </tr>

            <tr>
            <td align="center" style="padding: 0;">
                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0; width: 75%;" />
              </td>
            </tr>

            <tr>
              <td style="font-size: 12px; color: #6b7280; text-align: center;">
                <p>© 2025 lestudio | Christchurch, NZ</p>
                <p>Visit us: <a href="https://www.bobhotline.com" style="color: #06b6d4; text-decoration: none;">www.bobhotline.com</a></p>
                <p className="text-xs text-gray-400 mt-2">
                📩 Got more to share?
                <a href="mailto:logan.evans@lestudio.com" style="color: #06b6d4; text-decoration: none;"">
                    Email the Developers
                </a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

export default confirmationTemplate;
