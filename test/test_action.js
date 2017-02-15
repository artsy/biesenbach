'use strict';

let chai = require('chai')
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
});
