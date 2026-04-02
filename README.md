# CIFlow

CIFlow is a simplified CI/CD system simulation inspired by Jenkins.

## Features
- Webhook endpoint to receive job requests
- Job queue management
- Worker scheduling system
- Language-based worker assignment
- Simulated job execution

## Tech Stack
- Node.js
- Express.js

## API Endpoints

POST /webhook
Adds a new job to the queue.

GET /queue
Returns all jobs in the queue.

## How it works

1. A webhook sends job details.
2. The server adds the job to a queue.
3. The scheduler assigns jobs to available workers.
4. Workers simulate job execution.

## Author
Amrutha
