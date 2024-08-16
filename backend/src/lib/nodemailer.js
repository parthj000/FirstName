import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for all other ports
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD, //App password for gmail account
  },
});

const sendMail = async (params) => {
  try {
    const { email, username, tempPassword } = params;
    console.log(params);
    const mailOptions = {
      from: {
        name: "BrainFlow",
        address: process.env.USER,
      },
      to: email,
      subject: "Temporary password for verification",
      text: "hii",
      html: `<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; max-width: 600px; margin: auto; background-color: #f4f4f4;">
    <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #4CAF50;">Dear ${username},</h2>
        <p>Welcome to <strong>BrainFlow</strong>! We're excited to join you on your journey to academic excellence and better mental health.</p>
        <p>Your BrainFlow account is now active, giving you access to tools designed specifically for high school students like you.</p>
        <p><strong>Log-In into the app through below given details:</strong></p>
        <p><strong>E-Mail ID:</strong> <span style="background-color: #eaf8fc; padding: 4px 8px; border-radius: 4px;">${email}</span></p>
        <p><strong>Password:</strong> <span style="background-color: #eaf8fc; padding: 4px 8px; border-radius: 4px;">${tempPassword}</span></p>
        <p><strong>Note:</strong> This is a temporary password, please change it when you login.</p>
        <p><strong>Need Help?</strong></p>
        <p>Contact our Support Team: <a href="mailto:contactbrainflow@gmail.com" style="color: #4CAF50;">[add support_email]</a></p>
        <p>Remember, success in school isn't just about studying harder—it's about studying smarter and taking care of your mental health. We're here to help you do both.</p>
        <p>Best of luck with your studies!</p>
        <p><strong>The BrainFlow Team</strong></p>
    </div>
</body>
`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email has been sent");
  } catch (error) {
    console.error(error);
  }
};

export { sendMail };
