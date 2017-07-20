import { ActionServer } from '@manekinekko/google-actions-server';

class Action {
  constructor() {

    let config;
    if (process.env.ENV === 'test' || process.env.ENV == 'development') {
      console.log("Loading development environment.")
      config = require('../.env.json');
    } else {
      console.log("Loading production environment.");
      config = require('../.env.production.json');
    }

    for (var key in config) {
      process.env[key] = config[key]
    }

    this.agent = new ActionServer();

    this.agent.setGreetings([
      `What is the name of the artist you would like to hear about?`
    ]);

    this.agent.setConversationMessages([
      `Try again?`
    ]);

    this.assistant = null;
  }

  getUserId() {
    if (this.assistant && this.assistant.body_ && this.assistant.body_.user) {
      return this.assistant.body_.user.user_id;
    } else {
      return undefined;
    }
  }

  welcomeIntent(assistant) {
    this.assistant = assistant;

    var query = assistant.getRawInput();
    console.log(`welcomeIntent: user_id=${this.getUserId()}, query=${query}`);

    var aboutArtistMatch;
    if (query) {
      aboutArtistMatch = query.match(/^(.*)(about|artist|who is)(.*)$/);
    }

    if (aboutArtistMatch) {
      var artistName = aboutArtistMatch[3];
      return this.aboutArtistIntent(artistName);
    } else {
      return this.agent.randomGreeting();
    }
  }

  aboutArtistIntent(value) {
    let api = require('./api');
    let _ = require('underscore');
    let removeMd = require('remove-markdown');
    let agent = this.agent;
    let assistant = this.assistant;
    return api.instance().then(function(api) {
      return api.matchArtist(value).then(function(artist) {
        if (value == artist.name) {
          console.log(`aboutArtistIntent: matched ${artist.name}.`);
        } else {
          console.log(`aboutArtistIntent: matched '${value}' with '${artist.name}' (${artist.id}).`);
        }

        var spokenMessage = [];

        if (artist.hometown || artist.birthday) {
          var artistIntro = _.compact([
            artist.nationality ? artist.nationality : 'The',
            "artist",
            artist.name,
            "was born",
            artist.hometown ? `in ${_.first(artist.hometown.split(','))}` : null,
            artist.birthday ? `in ${_.last(artist.birthday.split(','))}` : null,
            artist.deathday ? `and died in ${_.last(artist.deathday.split(','))}` : null
          ]).join(' ') + '.';
          spokenMessage.push(artistIntro);
        }

        var artistBio = artist.blurb || artist.biography;
        if (artistBio) {
          artistBio = removeMd(artistBio);

          // use the first 3 sentences
          var shortArtistBio = artistBio.split('.').splice(0, 2).join('.') + '.';
          spokenMessage.push(shortArtistBio);
        }

        if (spokenMessage.length > 0) {
          var messageText = spokenMessage.join(' ');
          console.log(`aboutArtistIntent: ${messageText}`);
          assistant.tell(messageText);
        } else {
          console.log(`aboutArtistIntent: don't know much about ${value}.`);
          agent.ask(`Sorry, I don't know much about ${value}. Try again?`);
        }
      }).fail(function(error) {
        console.error(`aboutArtistIntent: couldn't find an artist ${value}, ${error}.`);
        agent.ask(`Sorry, I couldn't find an artist ${value}. Try again?`);
      });
    }).catch(function(error) {
      console.log(`aboutArtistIntent: ${error}.`);
      agent.ask("Sorry, I couldn't connect to Artsy. Try again?");
    });
  }

  textIntent(assistant) {
    this.assistant = assistant;
    var query = assistant.getRawInput();
    console.log(`textIntent: user_id=${this.getUserId()}, query=${query}`);

    var aboutArtistMatch = query.match(/^.*(about|artist|who is)\s(.*)$/)

    var artistName;
    if (aboutArtistMatch) {
      artistName = aboutArtistMatch[2];
    } else {
      artistName = query;
    }

    return this.aboutArtistIntent(artistName);
  }

  listen() {
    this.agent.welcome(this.welcomeIntent.bind(this));
    this.agent.intent(ActionServer.intent.action.TEXT, this.textIntent.bind(this));
    return this.agent.listen();
  }
}

module.exports = (new Action()).listen();
