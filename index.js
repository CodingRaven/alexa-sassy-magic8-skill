/**
 * This skill has no external dependencies or session management.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Whiskey Geek"
 *  Alexa: "Here's your whiskey fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing whiskey facts.
 */
var FACTS = [
    "Bourbon whiskey is made from mash that consists at least 51 percent maize or corn.",
    "Corn whiskey is made from mash that consists of at least 80 percent maize or corn.",
    "Malt whiskey is made from mash that consists of at least 51 percent malted barley.",
    "Grain whiskey is made form any type of grains.",
    "Rye whiskey is made from a mash that consists of at least 51 percent rye.",
    "Rye malt whiskey is made from a mash that consists of at least 51 percent malted rye.",
    "Wheat whiskey is made form mash that consists of at least 51 percent wheat.",
    "Blended whiskey is made from a mixture of different types of whiskey.",
    "Light whiskey is produced in the US at more than 80 percent alcohol by volume.",
    "Light whiskey produced in the US is stored in used or uncharred new oak containers.",
    "Spirit whiskey is a mixture of neutral spirits.",
    "Single malt whiskey is fro a single distillery made from a mash that uses only one particular malted grain.",
    "Single cask whiskey is bottled from an individual cask and labeled based on specific barrel and bottle numbers.",
    "American whiskey is distilled form mash of cereal grain that is fermented.",
    "Jameson is an Irish Whiskey, currently produced by Midleton Distillery.",
    "Jack Daniels is a North American whiskey produced in the Jack Daniels Distillery in Lynchburg, Tennessee.",
    "Crown Royal is a Canadian whiskey owned by Diageo.",
    "Jim Beam is a North American bourbon whiskey produced in Clermont, Kentucky.",
    "Black Velvet is a Canadian whiskey originally owned by Heublein and now owned by Constellation Brands.",
    "Johnnie Walker is a brand of Scotch whiskey that originated in Kilmarnock, Ayrshire, Scotland.",
    "Maker's Mark is a North American Whiskey distilled in Loretto, Kentucky.",
    "Seagram's Seven, also called Seagram's Seven Crown, is a blended American whiskey produced by Diageo under the Seagram name."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * WhiskeyGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a whiskey fact, or, you can say exit... What can I help you with?", "What can I help you with?");
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

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random whiskey fact from the whiskey facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your fact: " + randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the WhiskeyGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};
