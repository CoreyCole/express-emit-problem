import * as Alexa from 'alexa-sdk';

class AmazonMiscController {
    private prompts: any;

    constructor(prompts: any) {
        this.prompts = prompts;
    }

    sessionEnded(intentHandler: Alexa.Handler<Alexa.Request>) {
        console.log(`[SessionEndedRequest]: request = ${JSON.stringify(intentHandler.event.request)}`);
    }

    unhandled(intentHandler: Alexa.Handler<Alexa.Request>): void {
        console.log(`[Unhandled]: Intent Request received due to ${intentHandler.event.request.type} ${JSON.stringify(intentHandler.event.request)}`);
        intentHandler.emit(':tell', this.prompts.unhandled_message);
    }

    systemExceptionEncountered(intentHandler: Alexa.Handler<Alexa.Request>): void {
        // Skill can not return a response to System.ExceptionEncountered.
        console.log(`[System.ExceptionEncountered]: request = ${JSON.stringify(intentHandler.event.request)}`);
    }

    help(intentHandler: Alexa.Handler<Alexa.Request>): void {
        console.log(`[help]: request = ${JSON.stringify(intentHandler.event.request)}`);
        const instruction = 'I\'m not very helpful yet, sorry about that';
        intentHandler.emit(':ask', instruction);
    }
}

export default AmazonMiscController;
