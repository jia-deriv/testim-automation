const axios = require("axios");
const { WebClient } = require("@slack/web-api");
require("dotenv").config();

exports.config = {
  beforeSuite: async function (suite) {
    const id = suite.executionId;
    const project = encodeURIComponent(process.env.TESTIM_PROJECT);
    const branch = encodeURIComponent(process.env.BRANCH);
    const channelId = process.env.SLACK_CHANNEL_ID;
    const token = process.env.SLACK_TOKEN;
    const client = new WebClient(token);

    const testim_link = `https://app.testim.io/#/project/${project}/branch/${branch}/runs/suites/${id}`;
    try {
      await client.chat.postMessage({
        channel: channelId,
        blocks: [
          {
            type: "section",
            text: {
              type: "plain_text",
              text: "App: " + process.env.APP_NAME,
              emoji: true,
            },
          },
          {
            type: "section",
            text: {
              type: "plain_text",
              text: "Published to: " + process.env.ENVIRONMENT,
              emoji: true,
            },
          },
          {
            type: "section",
            text: {
              type: "plain_text",
              text: "Test plan: " + process.env.SUITE_NAME,
              emoji: true,
            },
          },
          {
            type: "section",
            text: {
              type: "plain_text",
              text: "Time: " + new Date().toISOString(),
              emoji: true,
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "TestIM Link",
                  emoji: true,
                },
                value: "click_me",
                url: testim_link,
                action_id: "actionId-0",
              },
            ],
          },
        ],
      });
      console.log("Message posted successfully");
    } catch (error) {
      console.error("Error posting message:", error);
    }

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
