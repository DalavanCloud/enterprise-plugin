# Serverless Framework Enterprise Plugin
[![Build Status](https://travis-ci.com/serverless/enterprise-plugin.svg)](https://travis-ci.com/serverless/enterprise-plugin)
[![license](https://img.shields.io/npm/l/@serverless/enterprise-plugin.svg)](https://www.npmjs.com/package/@serverless/enterprise-plugin)
[![coverage](https://img.shields.io/codecov/c/github/serverless/enterprise-plugin.svg)](https://codecov.io/gh/serverless/enterprise-plugin)
[![Known Vulnerabilities](https://snyk.io/test/github/serverless/enterprise-plugin/badge.svg)](https://snyk.io/test/github/enterprise-plugin)

To enable the various features of the [Serverless Framework Enterprise](https://github.com/serverless/enterprise) for a particular Service you must deploy or redeploy that Service, using Serverless Framework open-source CLI version 1.36.3 or later, with this Enterprise Plugin installed.

- If you are an existing Serverless Framework Enterprise dashboard user and have a previously deployed Service that you now want to configure to use Serverless Insights, Safeguards, Secrets or other Enteprise features, follow these steps to [update an existing Service](./update.md)
- If you are new to the Serverless Framework open source CLI or Serverless Framework Enterprise simply follow the steps in this [new user getting started guide](./getting-started.md#install-the-enterprise-plugin) to get up and running

Upon deployment, the Serverless Framwork Enteprise Plugin will automatically wrap and instrument your functions to work with the Serverless Framework Enterprise dashboard.
