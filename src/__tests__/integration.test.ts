import * as bst from 'bespoken-tools';
import * as va from 'virtual-alexa';
import { constants, testConstants } from '../lib';

//tslint:disable:no-unused-expression (expect statements are unused)
describe('Halloo', () => {
    let server: bst.LambdaServer;
    let alexa: va.VirtualAlexa;

    beforeEach(async (done: jest.DoneCallback) => {
        // the below file paths are relative to where package.json is for some reason
        // maybe because it's where the test command is called...
        server = new bst.LambdaServer('./init', 10000, true);
        alexa = new va.VirtualAlexaBuilder()
            .handler('./init.handler')
            .interactionModelFile('./speechAssets/InteractionModel.json')
            .sampleUtterancesFile('./speechAssets/SampleUtterances.txt')
            .applicationID(constants.appId)
            .create();
        await server.start();
        done();
    });

    afterEach(async (done: jest.DoneCallback) => {
        await server.stop();
        done();
    });

    test('LogoutIntent should log out', async () => {
        const launchResponse = await alexa.launch();
        expect(launchResponse.response.outputSpeech.ssml).toBeDefined;
        expect(launchResponse.response.outputSpeech.ssml).toMatchSnapshot;

        const logoutResponse = await alexa.utter('logout');
        expect(logoutResponse.response.outputSpeech.ssml).toBeDefined;
        expect(logoutResponse.response.outputSpeech.ssml).toMatchSnapshot;
    }, 5000);

    test('LaunchIntent should launch with un-authenticated user', async () => {
        const logoutResponse = await alexa.utter('logout');
        expect(logoutResponse.response.outputSpeech.ssml).toBeDefined;
        expect(logoutResponse.response.outputSpeech.ssml).toMatchSnapshot;

        const unauthenticatedLaunchResponse = await alexa.launch();
        expect(unauthenticatedLaunchResponse.response.outputSpeech.ssml).toBeDefined;
        expect(unauthenticatedLaunchResponse.response.outputSpeech.ssml).toMatchSnapshot;
    }, 5000);

    test('LaunchIntent should launch with an authenticated user', async () => {
        const logoutResponse = await alexa.utter('logout');
        expect(logoutResponse.response.outputSpeech.ssml).toBeDefined;
        expect(logoutResponse.response.outputSpeech.ssml).toMatchSnapshot;

        const unauthenticatedLaunchResponse = await alexa.launch();
        expect(unauthenticatedLaunchResponse.response.outputSpeech.ssml).toBeDefined;
        expect(unauthenticatedLaunchResponse.response.outputSpeech.ssml).toMatchSnapshot;

        const loginResponse = await alexa.utter(`My name is ${testConstants.userName}`);
        expect(loginResponse.response.outputSpeech.ssml).toBeDefined;
        expect(loginResponse.response.outputSpeech.ssml).toMatchSnapshot;

        const confirmationResponse = await alexa.utter('yes');
        expect(confirmationResponse.response.outputSpeech.ssml).toBeDefined;
        expect(confirmationResponse.response.outputSpeech.ssml).toMatchSnapshot;

        const authenticatedLaunchResponse = await alexa.launch();
        expect(authenticatedLaunchResponse.response.outputSpeech.ssml).toBeDefined;
        expect(authenticatedLaunchResponse.response.outputSpeech.ssml).toMatchSnapshot;
    }, 5000);

    test('ListIntent should list channels', async () => {
        const logoutResponse = await alexa.utter('logout');
        expect(logoutResponse.response.outputSpeech.ssml).toBeDefined;
        expect(logoutResponse.response.outputSpeech.ssml).toMatchSnapshot;

        const unauthenticatedLaunchResponse = await alexa.launch();
        expect(unauthenticatedLaunchResponse.response.outputSpeech.ssml).toBeDefined;
        expect(unauthenticatedLaunchResponse.response.outputSpeech.ssml).toMatchSnapshot;

        const loginResponse = await alexa.utter(`My name is ${testConstants.userName}`);
        expect(loginResponse.response.outputSpeech.ssml).toBeDefined;
        expect(loginResponse.response.outputSpeech.ssml).toMatchSnapshot;

        const confirmationResponse = await alexa.utter('yes');
        expect(confirmationResponse.response.outputSpeech.ssml).toBeDefined;
        expect(confirmationResponse.response.outputSpeech.ssml).toMatchSnapshot;

        const listChannelsResponse = await alexa.utter('list channels');
        expect(listChannelsResponse.response.outputSpeech.ssml).toBeDefined;
        expect(listChannelsResponse.response.outputSpeech.ssml).toContain('You can say list channels');
        // cannot match snapshot here until the tests depend on their own database, not the prod
    }, 5000);

    test('JoinIntent should create a channel', async () => {

    });

});
