### Running Locally

#### Install the Google SDK

Install the [Google SDK](https://developers.google.com/actions/develop/sdk/getting-started).

#### Use a Recent Version of Node

These instructions have been tested with v7.5.0.

```
$> nvm use v7.5.0
```

#### Install Dependencies

```
npm install
```

#### Run ngrok

```
$> npm run ngrok
```

Ngrok proxies requests to localhost:8080.

```
Session Status                online
Version                       2.1.18
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://dc42588b.ngrok.io -> localhost:8080
Forwarding                    https://dc42588b.ngrok.io -> localhost:8080
```

#### Run the server

Use `npm start` to transpile the source with babel and to start the server locally.

```
$> npm start

> Biesenbach@0.1.0 start /Users/dblock/source/artsy/biesenbach/dblock
> npm run build && npm run server

> Biesenbach@0.1.0 build /Users/dblock/source/artsy/biesenbach/dblock
> babel lib -d dist && babel test -d dist/test

lib/action.js -> dist/action.js
test/test_action.js -> dist/test/test_action.js

> Biesenbach@0.1.0 server /Users/dblock/source/artsy/biesenbach/dblock
> nodemon dist/action.js

[nodemon] 1.11.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node dist/action.js`
App listening on port 8080
Press Ctrl+C to quit.
```

#### Push Test App

```
$> npm run action:autopreview

Pushing action 'artsy' for testing...
'artsy' is now available for you until 2017-02-16 11:54AM EST (20 hours from now)
```

#### Simulator

You can run the simulator.

```
$> npm action:simulate

User TTS (CTRL-C to stop):
talk to artsy
Action: Sure, here's artsy
Welcome to Artsy!
```
