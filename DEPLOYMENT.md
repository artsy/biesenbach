### Production Deployment

See [Deploy your Actions](https://developers.google.com/actions/distribute/deploy) for detailed information.

#### Tools

Install `gcloud` and `gactions` as described in [DEV](DEV.md).

#### Login

```
gcloud auth login
```

#### Google Cloud Project

Create a new project in [Google Cloud Platform Projects](https://console.cloud.google.com/iam-admin/projects).

#### Enable Billing

Enable project billing. See [Modify a project's billing settings](https://support.google.com/cloud/answer/6293499?hl=en) for help.

#### Set Current Project

```
$> gcloud config set project biesenbach-one

Updated property [core/project].
```

#### Create a Deployment

```
$> gcloud deployment-manager deployments create production --config vm.yaml

The fingerprint of the deployment is ...
Waiting for create [operation-...]...done.

Create operation operation-... completed successfully.
NAME                TYPE                 STATE      ERRORS  INTENT
vm-biensenbach-one  compute.v1.instance  COMPLETED  []
```

Check your deployment.

```
$> gcloud deployment-manager deployments describe production

---
fingerprint: ...
id: ...
insertTime: '2017-02-22T09:56:02.941-08:00'
manifest: manifest-1487786162980
name: production
operation:
  endTime: '2017-02-22T09:56:15.588-08:00'
  name: operation-1487786162763-5492235bbb4f9-87bd4a0b-2ba5c092
  operationType: insert
  progress: 100
  startTime: '2017-02-22T09:56:03.565-08:00'
  status: DONE
  user: ...
NAME                TYPE                 STATE      INTENT
vm-biensenbach-one  compute.v1.instance  COMPLETED
```

#### Use Production Environment

Get `.env.production.json` from 1Password Artsy Engineering vault under `Google Home (Biesenbach) Production Envs` and place it with the source. The code automatically loads it when `ENV` is set to `production` in `app.yml`.

#### Deploy Code

```
$> npm run app:deploy

Building and pushing image for service [default]
...

Deployed service [default] to [https://biesenbach-one.appspot.com]

You can stream logs from the command line by running:
  $ gcloud app logs tail -s default

To view your application in the web browser run:
  $ gcloud app browse
```

#### Check and Update action.json

Make sure to check and, if necessary, change the `httpExecution` URL in [action.json](action.json) to `https://biesenbach-one.appspot.com`. This may have been automatically updated for local preview during development to use an ngrok URL.

#### Preview Production Action

Setup the preview with the production `httpExecution` fulfillment value.

```
$> npm run action:justpreview
```

Preview the deployed action using [web simulator](https://developers.google.com/actions/tools/web-simulator).

#### Deploy Production Action

This launches the official review process to make the action available to all Google Home devices. This is only necessary if you're changing the description of the action to advertise a new feature or such.

```
$> npm run action:deploy

> Biesenbach@0.1.0 action:deploy /Users/dblock/source/artsy/biesenbach/dblock
> gactions deploy --action_package action.json --project biesenbach-one

Deploying action package action.json in the biesenbach-one project...
Success: versionid 2
Review progress information by vising the Google Cloud console: https://console.developers.google.com/apis/api/actions.googleapis.com/overview?project=biesenbach-one
```

The new version will appear in API Manager under [Deployment History](https://console.actions.google.com/project/biesenbach-one/overview).
