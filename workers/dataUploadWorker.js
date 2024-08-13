const { workerData, parentPort } = require('worker_threads');
const parseFile = require('../utils/parseFile');

parseFile(workerData)
    .then(() => parentPort.postMessage('Data uploaded successfully'))
    .catch(err => parentPort.postMessage(err.message));
