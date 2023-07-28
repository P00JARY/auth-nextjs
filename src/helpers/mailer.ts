import nodemailer from "nodemailer";

import User from "@/models/userModel";
import bycriptjs from "bcryptjs";

const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //create hashed token
    const hashedToken = await bycriptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        }
        //   { new: true, runValidators: true }
      );
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        }
        //   { new: true, runValidators: true }
      );
    }

    var transport = nodemailer.createTransport({
      host: "ashil@gmail.com",
      port: 2525,
      auth: {
        user: "cc1146f3008815",
        pass: "98cf9edba4de3d",
      },
    });

    const mailOptions = {
      from: "ashil@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }"/verifyemail?token=${hashedToken}">here</a> to     
      ${
        emailType === "VERIFY" ? "Verify your email" : "Reset your password"
      }</p>`,
    };

    const mailreponse = await transport.sendMail(mailOptions);
    return mailreponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default sendEmail;
