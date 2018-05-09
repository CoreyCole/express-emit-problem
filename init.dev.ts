import * as express from 'express';
import * as bodyParser from 'body-parser';
// import * as bst from 'bespoken-tools';

import { handler } from './src/index';


// const server = new bst.LambdaServer('./init', 10000, true);
// server.start(() => console.log('server started and listening on port 10000!'));

const server: express.Application = express();
server.use(bodyParser.json());

// Create POST route
server.post('/', (req, res) => {
    // Create dummy context with fail and succeed functions
    const context = {
        fail: () => res.sendStatus(500),
        succeed: data => res.send(data),
        // callbackWaitsForEmptyEventLoop: false,
        // logGroupName: 'log-group',
        // logStreamName: 'log-stream',
        // functionName: 'handler',
        // functionVersion: '1.0.0',
        // memoryLimitInMB: '128',
        // invokeid: 'test-invoke',
        // awsRequestId: 'test-aws-request'
    };

    // Initialize alexa sdk
    handler(req.body, context, err => console.error(`[Express] err = ${err}`));
});

// Start express server
server.listen(10000, () => {
    console.log('Local alexa skill listening on port 10000!');
});
