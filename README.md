![GitHub package.json version](https://img.shields.io/github/package-json/v/danobot/notorious?style=flat-square)
[![GitHub download](https://img.shields.io/github/downloads/danobot/notorious/total.svg?style=flat-square&color=green)](https://github.com/danobot/notorious/releases/latest)
[![License](https://img.shields.io/github/license/danobot/notorious.svg?style=flat-square)](https://github.com/danobot/notorious/blob/develop/COPYING)
[![donate paypal](https://img.shields.io/badge/donate-PayPal-blue.svg?style=flat-square)](https://paypal.me/danielb160)
[![donate gofundme](https://img.shields.io/badge/donate-GoFundMe-orange?style=flat-square)](https://gf.me/u/w62k93)
# Introduction

This project is in beta development phase.

|Stream|Status|
|---|---|
|Latest|![latest](https://github.com/danobot/notorious/workflows/Build/badge.svg?style=flat-square&branch=develop)|
|Master|![master](https://github.com/danobot/notorious/workflows/Build/badge.svg?style=flat-square&branch=master)|

**Markdown boilerplate note showing MD features**
![Markdown Boilerplate](images/md_boilerplate.png)

**Note Context Menu**
![Note Context Menu](images/context_menu.png)

**Global Search is mapped to Ctrl + G and allows search by title and note content**
![Global Search](images/global_search.png)

**Notebook context menu options**
![Notebook Context Menu](images/notebook_context_menu.png)

**Tag selection for notes**
![Tag Editor](images/tag_editor.png)

# Install

### Step 1: Download the Desktop App

Go to the Github releases section and download the installer for your platform. For a web based alternative, use the `notorious_web` docker deployment (read on for more on that).

### Initial Setup

You have two options:

* **Set up your own backend** for usage across multiple devices, including synchronisation and replication (for backups).
* **Local data directory only**: Use Notorious without a backend and store all data locally (not recommended, see [Backing Up Data Directory](#backing-Up-Data-Directory)).


## Step 2: Get the Docker Compose Files


Notorious backend is a CouchDB database. I have included `docker-compose.sample.yaml` and `.env.sample` file to get you started quickly. Download and rename these files into a local folder. (You can clone this repository and run the commands below).

```
mv .env.sample .env
mv docker-compose.sample.yaml docker-compose.yaml
```
## Step 3: Edit the defaults
Edit the contents of `.env`, providing long and secure passwords and changing the domain names and customise the docker labels to suit your Traefik setup. The backend server needs to be externally accessible (if you want to access Notorious from outside your home network.)

|Envrionment Variable|Description|
|---|---|
|`COUCHDB_USER`|Used by CouchDB server during setup.|
|`COUCHDB_PASSWORD`| Used by CouchDB server during setup.|
|`DB_URL`| Used by the web deployment (to access Notorious via a browser).|
|`DB_SCHEME`| Used by the web deployment (to access Notorious via a browser).|

## Step 4: Start the docker compose stack
 You can start the stack using `docker-compose up -d`. There are 3 containers:
 
|Container|Description|Required|
|---|---|---|
|`couchdb`|CouchDB server|Required|
|`fauxton`|A CouchDB admin interface|Required for Database initialisation (see below)|
|`notorious_web`|Optional web server for accessing Notorious via a web browser. You can comment out this section to disable it.|Optional, but kinda cool|

## Step 5: Initialise the database

**Before you can start using Notorious you must initialise the CouchDB server by opening this link in your browser:**

```
http://admin:admin@hostname:5984/_utils#setup
```

You are now ready to start using Notorious.

Please consider supporting development (See [Contributions](#contributions)).

[Support my projects on GoFundMe](https://gf.me/u/w62k93)

[Support my projects via PayPal](https://paypal.me/danielb160)

## Web deployment
The `notorious_web` container spins up a web server you can use to access your notes through a web browser on the go. Take special note of the `volumes` section, which passes in the `.env` file to the container because the `DB_URL` string is required in order to connect back to your server.

I recommend you put this behind some kind of basic authentication such as Traefik's `basic auth` middleware.

### Deploying static assets
YOu can generate static assets for web deployment using the `yarn build-web` command. The compiled files are available in the `web/dist` directory.

# Backing Up Data Directory 
This is applicable only if you don't have a backend server. Backing up or restoring the data directory when data is being synced to a remote server is untested and may have nasty consequences.

Data is stored in `C:\Users\<username>\AppData\Roaming\Notorious\data`, backing up this directory will help avoid data loss. Make sure to close Notorious before any backup and restore operation to avoid data corruption.

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
