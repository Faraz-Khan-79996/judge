const Queue = require("bull");

const Result = require("./model/result");

const jobQueue = new Queue("job-runner-queue");
const NUM_WORKERS = 5;

jobQueue.process(NUM_WORKERS, async ({ data }) => {
  const id = data.id;
});

jobQueue.on("failed", (error) => {
  console.error(error.data.id, error.failedReason);
});

const addToRunQueue = async (jobId) => {
  jobQueue.add({
    id: jobId,
  });
};

module.exports = {
  addToRunQueue,
};