import nodemailer from "nodemailer";
import Mailer from "nodemailer/lib/mailer"
import Bluebird from "bluebird";

class SmtpClient {

  private apiTransport: Mailer;

  public constructor(user: string, pass: string) {
    this.apiTransport = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
  }

  public async sendPasswordReset(to: string) {
    await this.sendAsync(process.env.MajavashakkiSmtpUser, to, "Password reset", "Your new password is: derp!");
  }

  private async sendAsync(from: string, to: string, subject: string, html: string) {
    const mailOptions: Mailer.Options = {from, to, subject, html };
    const asyncMail = Bluebird.promisifyAll(this.apiTransport.sendMail);
    await asyncMail(mailOptions);
  }
}

const Smtp: SmtpClient = new SmtpClient(process.env.MajavashakkiSmtpUser, process.env.MajavashakkiSmtpPassword);
export default Smtp;