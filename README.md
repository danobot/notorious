

# Introduction

This project is in early development. 

![master](https://github.com/danobot/notorious/workflows/Build/badge.svg?branch=master)
![latest](https://github.com/danobot/notorious/workflows/Build/badge.svg?branch=develop)

# Install

Go to the Github releases section and download the installer for your platform. Alternatively, you can download the `docker-compose.sample.yaml` file and run Notorious using the docker stack.

Customise the DB connection string in .env
```
mv .env.sample .env
mv docker-compose.sample.yaml docker-compose.yaml
docker-compose up -d
```
# Starting Development

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
yarn dev
```

# Packaging for Production

To package apps for the local platform:

```bash
$ yarn package
```
# Contributions
Contributions in any form are encouraged and happily merged back into the codebase. You can contribute by:

* raising issues, 
* working on issues,
* improving documentation
* Submitting pull requests
* recommending the software to others (Spreading the word)
* donating spare change
* or just being content user (we love you)

## Donations

**Donations will ensure the following:**

- 🔨 Long term maintenance of the project
- 🛣 Progress on feature requests
- 🐛 Quick responses to bug reports and help requests

[Support my projects on GoFundMe](https://gf.me/u/w62k93)

[Support my projects via PayPal](https://paypal.me/danielb160)


# License GNU GPLv3

This license was chosen to ensure this project stays open source and contributor enhancements are made available to the public.

**GNU GPLv3**
Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.

See `COPYING` for complete license text.
