const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage')();
const bucket = gcs.bucket('happy-function.appspot.com');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function grabPhoto(agent) {
		const randomNum = Math.floor(Math.random()*119);
		const imageUrl = `https://storage.googleapis.com/happy-function.appspot.com/${randomNum}.jpg`
		agent.add(`นี่ไงฮับ รูปแฮปปี้เอง!`);
    agent.add(new Card({
      title: `แฮ่~`,
      imageUrl,
      buttonText: 'ig แฮปปี้',
      buttonUrl: 'https://www.instagram.com/happythescottie/',
    })
    );
	}

  function grabPhotoAog(agent) {
    let conv = agent.conv();
    conv.ask('Test AoG library');
    agent.add(conv);
  }
  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('happy.ig.grapphoto', grabPhoto);
  agent.handleRequest(intentMap);
});
