const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const cookieSession = require('cookie-session');

const FeedbackService = require('./services/FeedbackService');
const SpeakersService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakersService = new SpeakersService('./data/speakers.json');

const routers = require('./routes');
const req = require('express/lib/request');

//TODO: if we use any proxy default config for cookieSession will fail thats why we need to set 'trust proxy'
app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'session',
    keys: ['fhdsh9fw9w@_', 'nsfi9w(we8$4^'],
  })
);

//TODO: initilizing viewing engine and specifing the directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

//TODO: this middleware function will help us serve static files.
app.use(express.static(path.join(__dirname, './static')));

//TODO: this middleware function will call routes module in owr route's index file
app.use(
  '/',
  routers({
    feedbackService,
    speakersService,
  })
);

//TODO: this req just gonna serve index.js file (so, all images,css will not gonna apply there [we have to use static])
// app.get('/', (request, response) => {
//   // response.sendFile(path.join(__dirname, './static/index.html'));
//   response.render('pages/index', { pageTitle: 'Welcome' });
// });

// app.get('/speakers', (request, response) => {
//   response.sendFile(path.join(__dirname, './static/speakers.html'));
// });

app.listen(port, () => {
  console.log(`node running at ${port}`);
});
