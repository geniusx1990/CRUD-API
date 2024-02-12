const cluster = require('cluster');
const os = require('os');
const pid = process.pid;
if (cluster.isMaster) {
    const numCPUs = os.cpus().length - 1;
    cluster.fork();
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    require('../dist/index.js');
}