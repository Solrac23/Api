import nodemailer, { Transporter } from 'nodemailer'
import handlebars from 'handlebars'
import fs from 'fs'

class SendMailService{

  private client: Transporter

  constructor(){
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });
      this.client = transporter
    }).catch((err) => {
      console.error('Failed to create a testing account.' + err)
    })
  }

  async execute(to: string, subject: string, variables: object, path: string){
    try{
      const templateFileContent = fs.readFileSync(path).toString('utf8')
      
      const mailTemplateParse = handlebars.compile(templateFileContent)

      const html = mailTemplateParse(variables)

      const message = await this.client.sendMail({
        to,
        subject,
        html,
        from: 'NPS <noreplay@nps.com.br'
      })
  
      console.log('Message sent: %s', message.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }catch(err) {
      if(err) {
        console.log('Error occurred. ' + err)
        return process.exit(1)
      }
    }
    
  }
}

export default new SendMailService()