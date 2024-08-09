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
      html: `
      <h1>Hey ${username}!</h1>
      <br><br>
      <b>your temporary password for verification is <span style='font-size:5rem; align-text:'center''>${tempPassword}</span>
      <p>Donot reply to this message</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email has been sent");
  } catch (error) {
    console.error(error);
  }
};

export { sendMail };
