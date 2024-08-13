const scheduleMessage = require('../schedulers/messageScheduler');

exports.scheduleMessage = (req, res) => {
    const { message, day, time } = req.body;

    try {
        scheduleMessage(message, day, time);
        res.status(200).send('Message scheduled successfully.');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
