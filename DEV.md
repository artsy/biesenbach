### Running Locally

#### Introduction

You might want to read up on [Conversation Actions](https://developers.google.com/actions/develop/conversation), first. The Artsy Google Home app is built on top of [google-actions-server](https://github.com/manekinekko/google-actions-server).

#### Install the Google SDK

Install the [Google Cloud SDK](https://cloud.google.com/sdk) and the [Google Actions SDK](https://developers.google.com/actions/develop/sdk/getting-started).

##### OSX

Run `brew cask install google-cloud-sdk`.

Download [gactions CLI](https://developers.google.com/actions/tools/gactions-cli).

```
wget https://dl.google.com/gactions/updates/bin/darwin/amd64/gactions/gactions
chmod 755 gactions
mkdir /usr/local/Cellar/google-actions-sdk
mkdir /usr/local/Cellar/google-actions-sdk/bin
mv gactions /usr/local/Cellar/google-actions-sdk/bin
ln -s /usr/local/Cellar/google-actions-sdk/bin/gactions /usr/local/bin
```

#### Use a Recent Version of Node

These instructions have been tested with v7.5.0.

```
$> nvm use 7
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

Use `npm run server` to transpile the source with babel and to start the server locally.

```
$> npm run server

> Biesenbach@0.1.0 start /Users/dblock/source/artsy/biesenbach/dblock
> npm run build && ENV=development nodemon dist/action.js

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

The `action.json` file will be updated with a local ngrok endpoint and you will be prompted to visit a URL in your browser and to copy-paste a code into the shell.

```
$> npm run action:autopreview

> Biesenbach@0.1.0 action:autopreview /Users/dblock/source/google/biesenbach/dblock
> npm run action:config && npm run action:preview

> Biesenbach@0.1.0 action:config /Users/dblock/source/google/biesenbach/dblock
> node ./scripts/update_action_config.js -f

GAS: set the new public_url to" https://5f28036b.ngrok.io "in your " /Users/dblock/source/google/biesenbach/dblock/action.json " file.

> Biesenbach@0.1.0 action:preview /Users/dblock/source/google/biesenbach/dblock
> node ./scripts/preview_action.js

Pushing action 'artsy' for testing...
Gactions needs access to your Google account. Please copy & paste the URL below into a web browser and follow the instructions there. Then copy and paste the authorization code from the browser back here.

Visit this URL:
 https://accounts.google.com/o/oauth2/auth?...

Enter authorization code:
 [paste your code here]

'artsy' is now available for you until 2017-02-18 12:26PM EST (20 hours from now)
Try 'gactions simulate', then 'talk to artsy', or use the Web Simulator at https://g.co/actionswebsim.
```

#### Simulator

Run a console simulator.

```
$> npm run action:simulate

> Biesenbach@0.1.0 action:simulate /Users/dblock/source/google/biesenbach/dblock
> gactions simulate

User TTS (CTRL-C to stop):

talk to artsy
Action: Sure, here's artsy
Welcome to Artsy!

User TTS (CTRL-C to stop):
who is andy warhol?
Action: American artist Andy Warhol ...
```
