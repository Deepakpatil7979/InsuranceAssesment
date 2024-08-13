const cron = require('node-cron');
const Message = require('../models/Message'); 


function scheduleMessage(message, day, time) {
    const [hour, minute] = time.split(':');
    const cronTime = `${minute} ${hour} * * ${day}`;

    cron.schedule(cronTime, async () => {
        const newMessage = new Message({ text: message });
        await newMessage.save();
    });
}

module.exports = scheduleMessage;
