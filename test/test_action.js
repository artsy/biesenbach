'use strict';

let chai = require('chai')
chai = require('chai');
chai.use(require('chai-string'));
let expect = chai.expect
let request = require('supertest')

describe('Artsy', () => {
  let action;

  beforeEach(() => {
    action = require('../action');
  });

  afterEach(() => {
    action.close();
  });

  it('responds to an invalid payload', () => {
    return request(action)
      .post('/')
      .expect(400).then((response) => {
        expect(response.text).to.eql('Action Error: Missing inputs from request body');
      });
  });

  it('responds to action.MAIN', () => {
    return request(action)
      .post('/')
      .send({
        inputs: [{
          intent: 'assistant.intent.action.MAIN'
        }]
      })
      .expect(200).then((response) => {
        expect(response.body.expected_inputs[0].input_prompt.initial_prompts[0].ssml).to.eql(`Welcome to Artsy!`);
      });
  });

  it('talks about an artist', () => {
    return request(action)
      .post('/')
      .send({
        inputs: [{
          intent: 'assistant.intent.action.TEXT',
          raw_inputs: [{
            input_type: 2,
            query: "about andy warhol"
          }],
          arguments: []
        }]
      })
      .expect(200).then((response) => {
        var ssml = response.body.expected_inputs[0].input_prompt.initial_prompts[0].ssml;
        expect(ssml).to.startWith('American artist Andy Warhol was born in Pittsburgh in 1928 and died in 1987. Obsessed with celebrity, ');
        expect(ssml).to.endWith('silk-screen printmaking to achieve his characteristic hard edges and flat areas of color.');
      });
  });
});
