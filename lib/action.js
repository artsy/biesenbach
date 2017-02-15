import { ActionServer } from '@manekinekko/google-actions-server';

class MyAction {
  constructor() {

    this.agent = new ActionServer();

    this.agent.setGreetings([
      `Welcome to Artsy!`
    ]);

    this.agent.setConversationMessages([
      `Try again?`
    ]);

    this.assistant = null;
  }

  welcomeIntent(assistant) {
    this.assistant = assistant;
    this.agent.randomGreeting();
  }

  listen() {
    this.agent.welcome(this.welcomeIntent.bind(this));
    return this.agent.listen();
  }
}

module.exports = (new MyAction()).listen();
