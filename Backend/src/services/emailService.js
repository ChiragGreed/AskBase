import sgMail from '@sendgrid/mail';


const sendEmail = async (to, subject, html) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    try {
        const info = await tranporter.sendMail({
            from: `AskBase: ${process.env.GOOGLE_USER}`,
            to,
            subject,
            html
        })
    }
    catch (error) {
        console.error('Error sending email:', error);
        if (error.response) {
            console.error(error.response.body);
        }
    }

}

export default sendEmail
