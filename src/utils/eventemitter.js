const EventEmitter = require('events');
const sendEmail = require('./mailsender');
const { emailTemp } = require('./mail-temp'); 

const emitter = new EventEmitter();

emitter.on('send-email', async ({email, message}) => {
    try { 
        const html = emailTemp(message)
        await sendEmail({
            email: email,
            subject: 'Verify your account',
            message: html,
        })
    } catch (error) {
        console.error(error.message);
    }
}); 

module.exports = emitter;