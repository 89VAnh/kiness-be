import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { system_email } from "../config/system_email";
import { verifyAccount } from "../template/verifyAccount";
import { verifyRegister } from "../template/verifyRegister";
import { verifyConfirmPassword } from "../template/verifyConfirmPassword";

export class EmailController {
  // async..await is not allowed in global scope, must use a wrapper
  async sendMailVerify(req: Request, res: Response) {
    let mailHost = "smtp.gmail.com";
    let mailPort = 587;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: mailHost,
      port: mailPort,
      secure: false, // nếu các bạn dùng port 465 (smtps) thì để true, còn lại hãy để false cho tất cả các port khác
      // service: 'gmail',
      auth: {
        user: system_email.email, // generated ethereal user
        pass: system_email.password, // generated ethereal password
      },
    });

    // send mail with defined transport object
    await transporter
      .sendMail({
        from: "Kiness Việt Nam <" + system_email.email + ">", // sender address
        to: req.body.email, // sender address
        subject: `[KINESS] - Xác minh tài khoản`, // Subject line
        // text: 'Hello world?', // plain text body
        html: verifyAccount(req.body), // html body
      })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  }

  async sendRegisterVerify(req: Request, res: Response) {
    let mailHost = "smtp.gmail.com";
    let mailPort = 587;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: mailHost,
      port: mailPort,
      secure: false, // nếu các bạn dùng port 465 (smtps) thì để true, còn lại hãy để false cho tất cả các port khác
      // service: 'gmail',
      auth: {
        user: system_email.email, // generated ethereal user
        pass: system_email.password, // generated ethereal password
      },
    });

    // send mail with defined transport object
    await transporter
      .sendMail({
        from: "Kiness Việt Nam <" + system_email.email + ">", // sender address
        to: req.body.email, // sender address
        subject: `[KINESS] - Thông báo đăng ký`, // Subject line
        // text: 'Hello world?', // plain text body
        html: verifyRegister(req.body), // html body
      })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  }

  async sendConfirmPassword(req: Request, res: Response) {
    let mailHost = "smtp.gmail.com";
    let mailPort = 587;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: mailHost,
      port: mailPort,
      secure: false, // nếu các bạn dùng port 465 (smtps) thì để true, còn lại hãy để false cho tất cả các port khác
      // service: 'gmail',
      auth: {
        user: system_email.email, // generated ethereal user
        pass: system_email.password, // generated ethereal password
      },
    });

    // send mail with defined transport object
    await transporter
      .sendMail({
        from: "Kiness Việt Nam <" + system_email.email + ">", // sender address
        to: req.body.email, // sender address
        subject: `[KINESS] - Yêu cầu cấp lại mật khẩu `, // Subject line
        // text: 'Hello world?', // plain text body
        html: verifyConfirmPassword(req.body), // html body
      })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  }
}
