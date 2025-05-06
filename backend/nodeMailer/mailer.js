import nodemailer from "nodemailer"
import { configDotenv } from "dotenv";
import express from "express";

configDotenv();
const admin_user = process.env.EMAIL_USER;
const admin_pass = process.env.EMAIL_PASS;
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: admin_user, 
    pass: admin_pass
  },
});

export const  send_Mail = ( to, subject, text, html) =>  {
  let mailOptions = {
    from: admin_user,
    to,
    subject,
    text,
    html 
  };

  transporter.sendMail(mailOptions);
};
// export const  sendMail = ( to, subject, text, html) =>  {
// let mailOptions = {
//   from: admin_user,
//   to,
//   subject,
//   text,
//   html 
// };

// transporter.sendMail(mailOptions, (error, res) => {
//   if (error) {
//     res.status(400).json({message: "Server Error!"});
//   }else {
//     res.status(200).json({message: "Email send Successfully!"});
//   }
// })
// }
