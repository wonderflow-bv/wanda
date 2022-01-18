import { WebClient } from '@slack/web-api'

// Read a token from the environment variables
const token = process.env.SLACK_TOKEN

export const slackClient = new WebClient(token)
