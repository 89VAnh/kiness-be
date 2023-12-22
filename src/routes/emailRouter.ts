import { Router } from "express";
import { container } from "tsyringe";
import { EmailController } from "../controllers/emailController";

const emailRouter = Router();
const emailController = container.resolve(EmailController);

emailRouter.post(
  "/new-password",
  emailController.sendMailNewPw.bind(emailController),
);
emailRouter.post(
  "/send-register-verify",
  emailController.sendRegisterVerify.bind(emailController),
);
emailRouter.post(
  "/confirm-password",
  emailController.sendConfirmPassword.bind(emailController),
);

export default emailRouter;
