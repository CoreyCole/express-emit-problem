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
        let instruction = '';
        instruction += 'If you want to list all existing channels, please say, List channels.';
        instruction += 'If you want to join a channel, please say, Join channel, followed by your channel name.';
        instruction += 'If you want to create a channel, please say, Create channel, followed by your channel name.';
        instruction += 'If you want to logout from Halloo, please say log me out from halloo.';
        instruction += 'If you want to leave your channel, please say, Leave channel, followed by your channel name. ';

        const repromptText = 'If you want to repeat these instructions, please say, Repeat the instructions';
        intentHandler.emit(':ask', instruction, repromptText);

    }
}

export default AmazonMiscController;
