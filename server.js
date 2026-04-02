const express = require("express");

const app = express();
app.use(express.json());

const PORT = 3000;

// Job Queue
let jobQueue = [];

// Worker Pool
let workers = [
    { id: 1, language: "python", busy: false },
    { id: 2, language: "node", busy: false },
    { id: 3, language: "python", busy: false },
    { id: 4, language: "node", busy: false }
];

// Webhook endpoint (simulating GitHub push)
app.post("/webhook", (req, res) => {

    const job = {
        id: Date.now(),
        repository: req.body.repository,
        language: req.body.language,
        commit: req.body.commit,
        status: "waiting"
    };

    jobQueue.push(job);

    console.log("New Job Added To Queue:");
    console.log(job);

    res.send("Job added to queue");
});

// View queue in browser
app.get("/queue", (req, res) => {
    res.json(jobQueue);
});

// Scheduler
function scheduler(){

    if(jobQueue.length === 0){
        return;
    }

    const job = jobQueue[0];

    // find available worker for language
    const worker = workers.find(
        w => w.language === job.language && !w.busy
    );

    if(!worker){
        console.log("No worker available for job:", job.id);
        return;
    }

    // assign job
    jobQueue.shift();
    worker.busy = true;

    console.log(`Worker ${worker.id} started job ${job.id}`);

    executeJob(worker, job);
}

// Worker execution simulation
function executeJob(worker, job){

    const executionTime = Math.floor(Math.random() * 5000) + 2000;

    setTimeout(() => {

        console.log(`Worker ${worker.id} finished job ${job.id}`);

        worker.busy = false;

    }, executionTime);

}

// Run scheduler every 3 seconds
setInterval(scheduler, 3000);

// Start server
app.listen(PORT, () => {
    console.log(`CIFlow Master running on port ${PORT}`);
});