import * as Alexa from 'alexa-sdk';

import PromptsService from './services/PromptsService';
import AmazonMiscController from './controllers/AmazonMiscController';
const promptsService = new PromptsService();
const amazonMiscController = new AmazonMiscController(promptsService.prompts);

//tslint:disable
export const handler = (event: Alexa.RequestBody<Alexa.Request>, context: Alexa.Context, callback: (err: any, response: any) => void): void => {
    let deviceId = event.context.System.device.deviceId;
    if (typeof deviceId === 'undefined') {
        deviceId = 'amzn1.ask.device.AHKZLEKP5J4EU7VBRAF5RFZ5EVK4IX73YELBCYNDAQYCZDYLUHCO34GU44BV7IYFWXU7645CWHX4K6HZJVHKTF2UGILMQJ7ZYLVZUDFCIQ6IYO3BXIRX6WTIUIKNWAFH67Y3Y35V6CCGK7PNDLTQPPA2SL3A';
    }
    const alexa = Alexa.handler(event, context, callback);
    alexa.deviceId = deviceId;
    console.log(`[index][handler]: request = ${JSON.stringify(event.request)}`);
    alexa.registerHandlers({
        // Halloo handlers
        'LaunchRequest'() {
            console.log('here, will emit work?');
            this.emit(':tell', 'testing');
        },

        // miscellaneous Amazon intents
        'SessionEndedRequest'() { amazonMiscController.sessionEnded(this); },
        'Unhandled'() { amazonMiscController.unhandled(this); },
        'System.ExceptionEncountered'() { amazonMiscController.systemExceptionEncountered(this); },
        'AMAZON.HelpIntent'() { amazonMiscController.help(this); }
    });
    alexa.execute();
};

// for better console logging
['log', 'warn', 'error'].forEach((methodName) => {
    const originalMethod = console[methodName];
    console[methodName] = (...args) => {
        try {
            throw new Error();
        } catch (error) {
            const errorLine = error.stack // Grabs the stack trace
                .split('\n')[2] // Grabs third line
                .trim() // Removes spaces
                .substring(3) // Removes three first characters ("at ")
                .replace(__dirname, '') // Removes script folder path
                .replace(/\s\(./, ' at ') // Removes first parentheses and replaces it with " at "
                .replace(/\)/, ''); // Removes last parentheses
            originalMethod.apply(console, [errorLine, '\n', ...args]);
        }
    };
});
