const os = require('os');

function monitorCPU() {
    const cpus = os.cpus();
    let idle = 0;
    let total = 0;

    cpus.forEach((cpu) => {
        for (type in cpu.times) {
            total += cpu.times[type];
        }
        idle += cpu.times.idle;
    });

    const usage = 100 - Math.floor((idle / total) * 100);
    return usage;
}

module.exports = monitorCPU;
