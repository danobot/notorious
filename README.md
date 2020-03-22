

# Introduction

This project is in early development.

|Stream|Status|
|---|---|
|Latest|![latest](https://github.com/danobot/notorious/workflows/Build/badge.svg?branch=develop)|
|Master|![master](https://github.com/danobot/notorious/workflows/Build/badge.svg?branch=master)|

# Install

### Step 1: Download the Desktop App

Go to the Github releases section and download the installer for your platform. For a web based alternative, use the `notorious_web` docker deployment (read on for more on that).

### Initial Setup

You have two options:

* Set up your own backend for usage across multiple devices, including synchronisation and replication (for backups).
* Use Notorious without a backend and store all data locally (possible but not recommended).


## Step 2: Setup the backend


Notorious backend is a CouchDB database. I have included `docker-compose.sample.yaml` and `.env.sample` file to get you started quickly. Download and rename these files into a local folder. (You can clone this repository and run the commands below).

```
mv .env.sample .env
mv docker-compose.sample.yaml docker-compose.yaml
```

Edit the contents of `.env`, providing long and secure passwords and changing the domain names.
|Envrionment Variable|Description|
|---|---|
|`COUCHDB_USER`|Used by CouchDB server during setup.|
|`COUCHDB_PASSWORD`| Used by CouchDB server during setup.|
|`DB_CONNECTION`| Used by the web deployment (to access Notorious via a browser).|

The docker-compos stack contains 3 containers:
names.
|Container|Description|
|---|---|
|`fauxton`|A CouchDB admin interface|
|`couchdb`|CouchDB server|
|`notorious_web`|Optional web server for accessing Notorious via a web browser. (Optional). You can comment out this section to disable it.|

Once you have changed the values in `.env` and customised the docker labels to suit your Traefik setup, you can start the Docker stack using `docker-compose up -d`.

Before you can start using Notorious you **must** initialise the CouchDB server by opening this link in your browser:

```
http://admin:admin@hostname:5984/_utils#setup
```

You are now ready to start using Notorious.

Please consider supporting development (See Contributions heading).

[Support my projects on GoFundMe](https://gf.me/u/w62k93)

[Support my projects via PayPal](https://paypal.me/danielb160)


# Getting started with Development
After cloning the repository and running `yarn` to fetch dependencies, you can start the app for development using `yarn dev`. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
yarn dev
```

Running production version for debugging:

```
yarn start
```
# Packaging for Production

To package apps for the local platform:

```bash
$ yarn package-win
```

# Contributions
Contributions in any form are encouraged and happily merged back into the codebase. You can contribute by:

* raising issues, 
* working on issues,
* improving documentation
* Submitting pull requests
* recommending the software to others (Spreading the word)
* donating spare change
* or just being a happy user (we love you)

## Donations

**Donations will ensure the following:**

- 🔨 Long term maintenance of the project
- 🛣 Progress on feature requests
- 🐛 Quick responses to bug reports and help requests


# License GNU GPLv3

This license was chosen to ensure this project stays open source and contributor enhancements are made available to the public.

**GNU GPLv3**
Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.

See `COPYING` for complete license text.
