const exec = require('child_process').execSync;
const config = require('./update_action_config');

exec(`gactions preview --action_package action.json --invocation_name 'artsy' --preview_mins 1234`, { stdio: [0, 1, 2] });
