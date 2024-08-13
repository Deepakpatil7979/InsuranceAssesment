const path = require('path');
const { Worker } = require('worker_threads');

exports.uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const worker = new Worker(path.resolve(__dirname, '../workers/dataUploadWorker.js'), {
        workerData: req.file.path
    });

    worker.on('message', (msg) => {
        res.status(200).send(msg);
    });

    worker.on('error', (err) => {
        res.status(500).send(err.message);
    });

    worker.on('exit', (code) => {
        if (code !== 0)
            console.error(`Worker stopped with exit code ${code}`);
    });
};
