/**
 * Description
 *
 * - Session State: Handles a multi-turn dialog model for Magic Eight Ball interaction.
 * - SSML: Using SSML tags to control how Alexa renders the text-to-speech.
 *
 * Examples:
 * Dialog model:
 *  User: "Alexa, launch magic eight ball."
 *  Alexa: "What would you like to ask magic eight ball?"
 *  User: "Ask if I will win the Lotto."
 *  Alexa: "Magic Eight Ball Says: Most likely man"
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined;

/**
 * Array containing magic eight responses.
 */
var MAGIC_EIGHT_RESPONSE_LIST = [
    {response: "It seems certain", cardResponse: "It seems certain"},
    {response: "It is decidedly so", cardResponse: "It is decidedly so"},
    {response: "Without a doubt dude", cardResponse: "Without a doubt dude"},
    {response: "Yes, <break time=\"0.05s\" /> definitely", cardResponse: "Yes, definitely"},
    {response: "You may rely on it", cardResponse: "You may rely on it"},
    {response: "As I see it, <break time=\"0.05s\" /> yes", cardResponse: "As I see it, yes"},
    {response: "Most likely, <break time=\"0.05s\" /> man", cardResponse: "Most likely, man"},
    {response: "Outlook is good", cardResponse: "Outlook is good"},
    {response: "Yes, <break time=\"0.1s\" /> silly", cardResponse: "Yes, silly"},
    {response: "Signs point to yes, <break time=\"0.05s\" /> I guess", cardResponse: "Signs point to yes, I guess"},
    {response: "Reply hazy try again when I actually care", cardResponse: "Reply hazy try again when I actually care"},
    {response: "Ask again later, <break time=\"0.05s\" /> dude", cardResponse: "Ask again later, dude"},
    {response: "Ouch, <break time=\"0.05s\" /> better not tell you now", cardResponse: "Ouch, better not tell you now"},
    {response: "Cannot predict now, <break time=\"0.1s\" /> I'm sleepy", cardResponse: "Cannot predict now, I'm sleepy"},
    {response: "Actually think about what you are asking me and try asking again", cardResponse: "Actually think about what you are asking me and try again"},
    {response: "Don't count on it, <break time=\"0.05s\" /> weirdo", cardResponse: "Don't count on it, weirdo"},
    {response: "No <break time=\"0.2s\" /> just no", cardResponse: "No...just no"},
    {response: "My sources say no", cardResponse: "My sources say no"},
    {response: "Ouch, <break time=\"0.1s\" /> outlook is not so good bro", cardResponse: "Ouch, outlook is not so good bro"},
    {response: "Very doubtful man", cardResponse: "Very doubtful man"}
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SassyMagicEight is a child of AlexaSkill.
*/
var SassyMagicEight = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
SassyMagicEight.prototype = Object.create(AlexaSkill.prototype);
SassyMagicEight.prototype.constructor = SassyMagicEight;

SassyMagicEight.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("SassyMagicEight onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

SassyMagicEight.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("SassyMagicEight onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome to the Sassy Magic Eight skill, you can ask magic eight ball any question";
    var repromptText = "What would you like to ask magic eight ball?";
    response.ask(speechOutput, repromptText);
};

SassyMagicEight.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("SassyMagicEight onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

SassyMagicEight.prototype.intentHandlers = {
    // register custom intent handlers
    "SassyMagicEightIntent": function (intent, session, response) {
        handleLaunchSkillIntent(session, response);
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        var speechText = "";

        switch (session.attributes.stage) {
            case 0:
                speechText = "The magic eight ball is a fortune telling or advice giving toy developed in the 1950s. People traditionally ask it a question, and it returns a response." +
                    "To ask magic eight ball a question, just ask by saying start magic eight ball, or you can say exit.";
                break;
            case 1:
                speechText = "You can ask, magic eight ball, will I win the Lotto.";
                break;
            case 2:
                speechText = "You can say, start magic eight ball, or you can say exit.";
                break;
            default:
                speechText = "The magic eight ball is a fortune telling or advice giving toy developed in the 1950s. People traditionally ask it a question, and it returns a response." +
                    "To ask magic eight ball a question, just ask by saying start magic eight ball, or you can say exit.";
        }

        var speechOutput = {
            speech: speechText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };

        response.tell(speechOutput);
    },
    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },
    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

function handleLaunchSkillIntent(session, response) {
    var responseID = Math.floor(Math.random() * MAGIC_EIGHT_RESPONSE_LIST.length);
    var speechText = session.attributes.speechPunchline = MAGIC_EIGHT_RESPONSE_LIST[responseID].response;
    var cardOutput = session.attributes.cardPunchline = MAGIC_EIGHT_RESPONSE_LIST[responseID].cardResponse;
    var cardTitle = "Sassy Magic Eight Ball";

    var speechOutput = {
        speech: '<speak>' + speechText + '</speak>',
        type: AlexaSkill.speechOutputType.SSML
    };

    response.tellWithCard(speechOutput, cardTitle, cardOutput);
}

// Handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SassyMagicEight skill.
    var sassyMagicEight = new SassyMagicEight();
    sassyMagicEight.execute(event, context);
};
