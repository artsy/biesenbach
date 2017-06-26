const exec = require('child_process').execSync;
const config = require('./update_action_config');

exec(`gactions test --action_package action.json --project biesenbach-one --preview_mins 1234`, { stdio: [0, 1, 2] });
