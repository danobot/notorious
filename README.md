<h1 align="center">
  <br>
  <a href="https://danobot.github.io/notorious-landing"><img src="https://github.com/danobot/notorious/raw/master/resources/icons/256x256.png" alt="Notorious" width="200"></a>
  <br>
  Notorious
  <br>
</h1>

<h4 align="center">Offline-first note taking application for desktop and the web. Private, fast, notorious 😈</h4>

<p align="center">
  <a href="#">
    <img src="https://img.shields.io/github/package-json/v/danobot/notorious?style=flat-square">
  </a>
  <a href="https://github.com/danobot/notorious/releases/latest">
    <img src="https://img.shields.io/github/downloads/danobot/notorious/total.svg?style=flat-square&color=green"></a>
  <a href="https://github.com/danobot/notorious/blob/develop/COPYING">
      <img src="https://img.shields.io/github/license/danobot/notorious.svg?style=flat-square">
  </a>
  <a href="https://paypal.me/danielb160">
    <img src="https://img.shields.io/badge/donate-PayPal-blue.svg?style=flat-square">
  </a>
  <a href="https://gofund.me/7a2487d5">
    <img src="https://img.shields.io/badge/donate-GoFundMe-orange?style=flat-square">
  </a>
</p>

<p align="center">
  <a href="#getting-started">Getting Started</a> •
  <a href="#development-setup">Development Setup</a> •
  <a href="https://danobot.github.io/notorious">React API Docs</a> •
  <a href="https://danobot.github.io/notorious-landing">Landing Page</a> •
  <a href="https://github.com/danobot/notorious/releases/latest">Download</a>
</p>

![Markdown Boilerplate](images/md_boilerplate.png)

# Introduction


|Stream|Status|
|---|---|
|Latest|![latest](https://github.com/danobot/notorious/workflows/Build/badge.svg?style=flat-square&branch=develop)|
|Master|![master](https://github.com/danobot/notorious/workflows/Build/badge.svg?style=flat-square&branch=master)|

**Note Context Menu**
![Note Context Menu](images/context_menu.png)

**Global Search is mapped to Ctrl + G and allows search by title and note content**
![Global Search](images/global_search.png)

**Notebook context menu options**
![Notebook Context Menu](images/notebook_context_menu.png)

**Tag selection for notes**
![Tag Editor](images/tag_editor.png)
# Donations

**Donations ensure the following:**

- 🔨 Long term maintenance of the project
- 🛣 Progress on feature requests
- 🐛 Quick responses to bug reports and help requests


[Support my projects on GoFundMe](https://gofund.me/7a2487d5)

[Support my projects via PayPal](https://paypal.me/danielb160)

Please consider supporting development (See [Contributions](#contributions)). We are actively looking for contributors.

# Getting Started

## Step 1: Download the Desktop App

Go to the [Github releases page](https://github.com/danobot/notorious/releases/latest) and download the installer for your platform. For a web based alternative, use the `notorious_web` docker deployment (read on for more on that).

From here you have two options:

* **Set up your own backend** for usage across multiple devices, including synchronisation and replication.
* **Local data directory only**: Use Notorious without a backend and store all data locally (not recommended, see [Backing Up Data Directory](#backing-Up-Data-Directory)).

You may use the dev environment backend to try Notorious before you set up your own backend. Do not store personal information on this instance because it does not persist data.
```
host: https://notorious-dev.danielbkr.net
user: admin
password: admin
```

## Step 2: Docker Compose Setup

### Step 2.1: Get the Docker Compose Files

Notorious backend is a CouchDB database and an optional web interface for accessing Notorious through a web browser. There are 3 containers:
 
|Container|Description|Required|
|---|---|---|
|`couchdb`|CouchDB server|Required|
|`notorious_web`|Optional web server for accessing Notorious via a web browser. You can comment out this section to disable it.|Optional, but kinda cool|

I have included `docker-compose.sample.yaml` and `.env.sample` file to get you started quickly. Download and rename these files into a local folder. (You can clone this repository and run the commands below).

```
mv .env.sample .env
mv docker-compose.sample.yaml docker-compose.yaml
```
### Step 2.2: Edit the defaults

Edit the contents of `.env`, providing long and secure passwords and changing the domain names and customise the docker labels to suit your Traefik setup. If you want to access Notorious from outside your home network the backend server needs to be externally accessible.

|Envrionment Variable|Description|
|---|---|
|`COUCHDB_USER`|Used by CouchDB server during setup.|
|`COUCHDB_PASSWORD`| Used by CouchDB server during setup.|
|`DB_URL`| Used by the web deployment (to access Notorious via a browser).|
|`DB_SCHEME`| Used by the web deployment (to access Notorious via a browser).|

### Step 2.3: Start the docker compose stack
 You can start the stack using `docker-compose up -d`. 

### Step 2.4: Initialise the database

Before you can start using Notorious you must initialise the CouchDB server by opening this link in your browser. Change the `admin:admin` part to match `COUCHDB_USER:COUCHDB_PASSWORD` according to the environment variables defined in step 2.

```
http://admin:admin@hostname:5984/_utils#setup
```

## Step 3: Link Notorious on your Desktop to the backend




## Web deployment
The `notorious_web` container spins up a web server you can use to access your notes through a web browser on the go. Take special note of the `volumes` section, which passes in the `.env` file to the container because the `DB_URL` string is required in order to connect back to your server.

I recommend you put this behind some kind of basic authentication such as Traefik's `basic auth` middleware.

### Deploying static assets
YOu can generate static assets for web deployment using the `yarn build-web` command. The compiled files are available in the `web/dist` directory.

# Backing Up Data Directory 
This is applicable only if you don't have a backend server. Backing up or restoring the data directory when data is being synced to a remote server is untested and may have nasty consequences.

Data is stored in `C:\Users\<username>\AppData\Roaming\Notorious\data`, backing up this directory will help avoid data loss. Make sure to close Notorious before any backup and restore operation to avoid data corruption.

# Development Setup
Ensure your NodeJS installation includes all build tools installed by the installer (python;visualstudio2017-workload-vctools). If not, it's easiest to uninstall and install the latest version of node. This is because the template on which this repository is based depends on `node-gyp` which requires Visual studio build tools installed.|

If you are having problems please check:
https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/400

Once that is out of the way and the `yarn` command completes successfully, you can start the app for development using `yarn dev`. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process.

```bash
yarn dev
```

Running production version for debugging:

```
DEBUG_PROD=true yarn build && DEBUG_PROD=true yarn start

```

# Packaging for Production

To package apps for the local platform:

```bash
$ yarn package-win
```

# Contributing
Contributions in any form are encouraged and happily merged back into the codebase. You can help by:

* star this repository,
* raising issues, 
* helping new users with issues they may encounter,
* improving documentation,
* submitting pull request with your kickass new features and bug fixes (raise a discussion issue first),
* recommending the software to others (Spreading the word),
* donating spare change

There is an immense backlog of work to be done on this and I will not be able to do it by myself. If you are into React dev and would like to help me on this project please get in touch.


# License GNU GPLv3

This license was chosen to ensure this project stays open source and contributor enhancements are made available to the public.

**GNU GPLv3**
Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.

See `COPYING` for complete license text.
