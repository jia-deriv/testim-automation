const axios = require("axios");
require("dotenv").config();

exports.config = {
  beforeSuite: function (suite) {
    const project = encodeURIComponent(process.env.TESTIM_PROJECT);
    const branch = encodeURIComponent(process.env.BRANCH);
    const suite = encodeURIComponent(process.env.SUITE_NAME);

    const testim_link = `https://app.testim.io/#/project/${project}/branch/${branch}/runs/suites/${suite}`;

    console.log("testim_link", testim_link);
    console.log("slackApiUrl", slackApiUrl);

    axios
      .post(process.env.SLACK_WEBHOOK_URL, {
        app_name: process.env.APP_NAME,
        suite: process.env.SUITE_NAME,
        environment: process.env.ENVIRONMENT,
        testim_link: testim_link,
      })
      .then((response) => {
        console.log(`Slack API posted successfully: ${response.status}`);
      })
      .catch((error) => {
        console.error(`Error posting to Slack API: ${error}`);
      });

    return {
      g_execution_id: suite.executionId,
      g_login: process.env.G_LOGIN,
      g_password: process.env.G_PASSWORD,

      g_login_bo: process.env.G_LOGIN_BO,
      g_password_bo: process.env.G_PASSWORD_BO,

      g_login_non_partner: process.env.G_LOGIN_NON_PARTNER,
      g_password_non_partner: process.env.G_PASSWORD_NON_PARTNER,
    };
  },
};
