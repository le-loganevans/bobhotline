const confirmationTemplate = (name: string) => `
<!DOCTYPE html>
<html lang="en" style="margin:0;padding:0;">
  <head>
    <meta charset="UTF-8" />
    <meta name="color-scheme" content="dark light">
    <meta name="supported-color-schemes" content="dark light">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Thanks for Your Feedback</title>

    <!-- Web font (falls back safely in clients that block it) -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;800&display=swap" rel="stylesheet" />

    <style>
      /* Some clients honor simple media queries */
      @media (max-width: 640px) {
        .container { width: 100% !important; }
        .card      { padding: 24px !important; border-radius: 16px !important; }
        .h1        { font-size: 24px !important; line-height: 1.2 !important; }
        .p         { font-size: 14px !important; }
        .cta       { padding: 12px 18px !important; font-size: 14px !important; }
        .pill      { font-size: 10px !important; padding: 6px 10px !important; }
      }
      /* Dark-mode helpers for clients that support it */
      :root {
        color-scheme: dark;
        supported-color-schemes: dark light;
      }
    </style>
  </head>

  <body style="margin:0;padding:0;background:#0b0f14;">
    <!-- Preheader (hidden preview text) -->
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      Thanks, ${name}. Your message reached the Bob Hotline team.
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0;padding:24px;background:#0b0f14;">
      <tr>
        <td align="center">
          <!-- Outer container -->
          <!--[if mso]>
          <table role="presentation" width="600" cellpadding="0" cellspacing="0"><tr><td>
          <![endif]-->
          <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;">
            <tr>
              <td style="
                padding: 0 8px 24px 8px;
              ">
                <!-- Card -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="card" style="
                  background: #0f1420;
                  border-radius: 20px;
                  padding: 36px;
                  border: 1px solid rgba(255,255,255,0.08);
                  box-shadow: 0 24px 80px rgba(0,0,0,0.45);
                  background-image:
                    radial-gradient(600px 400px at 50% -10%, rgba(60,60,80,0.18), transparent 60%),
                    radial-gradient(900px 600px at 90% 120%, rgba(24,24,30,0.20), transparent 70%),
                    linear-gradient(180deg, rgba(12,16,24,0.95) 0%, rgba(10,14,22,0.98) 60%, #0f1420 100%);
                  background-blend-mode: screen, screen, normal;
                  ">
                  <!-- Logo -->
                  <tr>
                    <td align="center" style="padding-bottom: 12px;">
                      <img src="https://www.bobhotline.com/logo.jpg" alt="Bob Hotline" width="72" height="72" style="display:block;border:0;border-radius:14px;">
                    </td>
                  </tr>

                  <!-- Pill -->
                  <tr>
                    <td align="center" style="padding-bottom: 8px;">
                      <span class="pill" style="
                        display:inline-block;
                        font-family: 'Poppins', Segoe UI, Roboto, Helvetica, Arial, sans-serif;
                        font-weight:600;
                        letter-spacing:.06em;
                        text-transform:uppercase;
                        font-size:11px;
                        color:#d1d5db;
                        padding:8px 12px;
                        border:1px solid rgba(255,255,255,0.1);
                        border-radius:9999px;
                        background: rgba(255,255,255,0.06);
                      ">
                        Feedback received
                      </span>
                    </td>
                  </tr>

                  <!-- Heading -->
                  <tr>
                    <td align="center" style="padding-bottom: 8px;">
                      <h1 class="h1" style="
                        margin:0;
                        font-family: 'Poppins', Segoe UI, Roboto, Helvetica, Arial, sans-serif;
                        font-weight:800;
                        font-size:28px;
                        line-height:1.25;
                        color:#ffffff;
                        letter-spacing:-0.02em;
                      ">
                        Thank you, ${name}!
                      </h1>
                    </td>
                  </tr>

                  <!-- Subcopy -->
                  <tr>
                    <td align="center" style="padding-bottom: 18px;">
                      <p class="p" style="
                        margin:0;
                        font-family: 'Poppins', Segoe UI, Roboto, Helvetica, Arial, sans-serif;
                        font-weight:500;
                        font-size:15px;
                        line-height:1.6;
                        color:#cbd5e1;
                      ">
                        Your message made it to the Bob Hotline team. We truly appreciate you taking the time to help shape where this project goes next.
                      </p>
                    </td>
                  </tr>

                  <!-- Divider -->
                  <tr>
                    <td style="padding: 16px 0;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="height:1px;background:linear-gradient(90deg, rgba(6,182,212,0) 0%, rgba(6,182,212,0.6) 50%, rgba(6,182,212,0) 100%);"></td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- What is Bob -->
                  <tr>
                    <td style="padding-top: 4px;">
                      <h2 style="
                        margin:0 0 6px 0;
                        font-family: 'Poppins', Segoe UI, Roboto, Helvetica, Arial, sans-serif;
                        font-weight:700;
                        font-size:18px;
                        color:#ffffff;
                        letter-spacing:-0.01em;
                      ">
                        What is the Bob Project?
                      </h2>
                      <p class="p" style="
                        margin:0 0 10px 0;
                        font-family: 'Poppins', Segoe UI, Roboto, Helvetica, Arial, sans-serif;
                        font-weight:500;
                        font-size:14px;
                        line-height:1.7;
                        color:#cbd5e1;
                      ">
                        Built in memory of Bob — a true Kiwi legend — this site keeps his spirit alive with iconic catchphrases, shared memories, and a growing tribute space.
                      </p>
                    </td>
                  </tr>

                  <!-- Where we're heading -->
                  <tr>
                    <td style="padding-top: 6px;">
                      <h2 style="
                        margin:0 0 6px 0;
                        font-family: 'Poppins', Segoe UI, Roboto, Helvetica, Arial, sans-serif;
                        font-weight:700;
                        font-size:18px;
                        color:#ffffff;
                        letter-spacing:-0.01em;
                      ">
                        Where we're heading
                      </h2>
                      <p class="p" style="
                        margin:0;
                        font-family: 'Poppins', Segoe UI, Roboto, Helvetica, Arial, sans-serif;
                        font-weight:500;
                        font-size:14px;
                        line-height:1.7;
                        color:#cbd5e1;
                      ">
                        Bob Hotline is evolving into a conversational voice assistant — true to Bob’s tone — with call-making capabilities. Your feedback helps us get there.
                      </p>
                    </td>
                  </tr>

                  <!-- CTA -->
                  <tr>
                    <td align="center" style="padding-top: 22px;">
                      <a href="https://www.bobhotline.com/tribute" class="cta" style="
                        display:inline-block;
                        font-family: 'Poppins', Segoe UI, Roboto, Helvetica, Arial, sans-serif;
                        font-weight:700;
                        font-size:15px;
                        color:#ffffff;
                        text-decoration:none;
                        background:#06b6d4;
                        padding:13px 22px;
                        border-radius:12px;
                        border:1px solid rgba(6,182,212,0.9);
                        box-shadow: 0 6px 24px rgba(6,182,212,0.35);
                      ">
                        Read Bob’s Tribute →
                      </a>
                    </td>
                  </tr>

                  <!-- Spacer + thin divider -->
                  <tr>
                    <td style="padding: 22px 0 10px 0;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="height:1px;background:rgba(255,255,255,0.08);"></td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- System note -->
                  <tr>
                    <td align="center" style="padding: 0 8px 10px 8px;">
                      <p style="
                        margin:0 0 6px 0;
                        font-family: Segoe UI, Roboto, Helvetica, Arial, sans-serif;
                        font-size:12px;
                        line-height:1.6;
                        color:#94a3b8;
                        font-style:italic;
                      ">
                        Replies to this inbox aren’t monitored.
                      </p>
                      <a href="mailto:logan.evans@lestudio.com" style="
                        font-family: Segoe UI, Roboto, Helvetica, Arial, sans-serif;
                        font-size:12px;
                        color:#06b6d4;
                        text-decoration:none;
                      ">
                        Contact the developers
                      </a>
                    </td>
                  </tr>

                  <!-- Final divider -->
                  <tr>
                    <td style="padding: 14px 0;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="height:1px;background:rgba(255,255,255,0.08);"></td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td align="center" style="padding: 0;">
                      <p style="
                        margin:0 0 6px 0;
                        font-family: Segoe UI, Roboto, Helvetica, Arial, sans-serif;
                        font-size:12px;
                        color:#34d399;
                        font-weight:600;
                      ">
                        Thanks for helping keep Bob’s spirit alive.
                      </p>
                      <p style="
                        margin:6px 0 0 0;
                        font-family: Segoe UI, Roboto, Helvetica, Arial, sans-serif;
                        font-size:12px;
                        color:#94a3b8;
                      ">
                        © 2025 LE Studio · Christchurch, NZ ·
                        <a href="https://www.bobhotline.com" style="color:#06b6d4;text-decoration:none;">bobhotline.com</a>
                      </p>
                    </td>
                  </tr>
                </table>
                <!-- /Card -->
              </td>
            </tr>
          </table>
          <!--[if mso]></td></tr></table><![endif]-->
        </td>
      </tr>
    </table>
  </body>
</html>
`;
export default confirmationTemplate;
