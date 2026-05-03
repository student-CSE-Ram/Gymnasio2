// utils/emailTemplates.js

const baseTemplate = (content) => {
  return `
  <div style="margin:0;padding:0;background:#0f172a;font-family:Arial,sans-serif;">
    <div style="max-width:520px;margin:auto;background:#111827;padding:30px;border-radius:12px;color:#e5e7eb;">

      <!-- Logo -->
      <div style="text-align:center;margin-bottom:20px;">
        <img src="https://i.imgur.com/6X4FzQk.png" width="80" style="border-radius:50%;" />
        <h2 style="color:#f59e0b;margin:10px 0;">Gymnasio</h2>
      </div>

      ${content}

      <hr style="margin:25px 0;border-color:#374151;" />

      <p style="text-align:center;font-size:12px;color:#9ca3af;">
        © ${new Date().getFullYear()} Gymnasio. All rights reserved.
      </p>

    </div>
  </div>
  `;
};

exports.resetPasswordTemplate = (resetUrl) => {
  return baseTemplate(`
    <h3 style="text-align:center;color:#fff;">Reset Your Password</h3>

    <p style="font-size:14px;color:#9ca3af;">
      We received a request to reset your password.
    </p>

    <div style="text-align:center;margin:25px 0;">
      <a href="${resetUrl}" style="
        background:#2563eb;
        padding:12px 20px;
        color:white;
        text-decoration:none;
        border-radius:6px;
        font-weight:bold;">
        Reset Password
      </a>
    </div>

    <p style="font-size:12px;color:#9ca3af;">
      This link expires in 10 minutes.
    </p>
  `);
};

exports.securityAlertTemplate = () => {
  return baseTemplate(`
    <h3 style="text-align:center;color:#fff;">Password Changed</h3>

    <p style="font-size:14px;color:#9ca3af;">
      Your password has been successfully updated.
    </p>

    <p style="font-size:14px;color:#f87171;">
      If this was NOT you, please reset your password immediately.
    </p>
  `);
};