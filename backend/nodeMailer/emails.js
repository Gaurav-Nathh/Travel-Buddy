import { send_Mail } from "./mailer.js"
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE, PASSWORD_RESET_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "../template/emailTemplate.js";

export const sendVerficationEmail = async ( email, verificationToken ) => {
  try {
    send_Mail(email, "Your TravelBuddy verification code", "", VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken));
  } catch (error) {
    throw new Error(`Error sending verfication email: ${error}`);
  }
}

export const sendWelcomeEmail = async (email, name) => {
  try{
    send_Mail(email, "Welcome to TravelBuddy", "", WELCOME_EMAIL_TEMPLATE.replace("{name}", name));
  } catch (error) {
    throw new Error(`Error sending Welcome email: ${error}`);
  }
}

export const sendPasswordResetEmail = async ( email, resetURL ) => {
  try{
    send_Mail(email, "Reset Password", "", PASSWORD_RESET_TEMPLATE.replace("{resetURL}",resetURL));
  } catch (error) {
    throw new Error(`Error sending Reset Password email: ${error}`);
  }
}

export const sendResetSuccessEmail = async ( email ) => {
  try{
    send_Mail(email, "Password Reset Successfull", "", PASSWORD_RESET_SUCCESS_TEMPLATE)
  } catch (error) {
    throw new Error(`Error sending Password Reset Successfull email: ${error}`);
  }
}