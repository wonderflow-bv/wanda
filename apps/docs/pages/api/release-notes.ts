import { NextApiRequest, NextApiResponse } from 'next';
import slackifyMarkdown from 'slackify-markdown';
import { ReleaseNote } from 'types/data';

import { slackClient } from '@/utils/slack-client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const releaseData: ReleaseNote = body.data;
  const hasChanges = releaseData.notes[0].breaking ?? releaseData.notes[0].new ?? releaseData.notes[0].fixes;

  const changesTemplate = `This release includes:\n\n
  ${releaseData.notes[0].breaking ? '✓ BREAKING CHANGES' : ''}
  ${releaseData.notes[0].new ? '✓ NEW FEATURES' : ''}
  ${releaseData.notes[0].fixes ? '✓ FIXES' : ''}
`;

  const slackMessage = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: `✨ New release ${releaseData.tag ?? ''} ✨`,
        emoji: true,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `@here\n${slackifyMarkdown(releaseData.content ?? '') ?? ' '}`,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: hasChanges ? slackifyMarkdown(changesTemplate) : ' ',
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'context',
      elements: [
        {
          type: 'plain_text',
          text: `Released on ${new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(new Date(releaseData.releaseDate))}`,
          emoji: true,
        },
        {
          type: 'mrkdwn',
          text: '<https://design.wonderflow.ai/get-started/release-notes|Full release notes>',
        },
      ],
    },
  ];

  try {
    const result = await slackClient.chat.postMessage({
      channel: process.env.SLACK_RELEASE_CHANNEL,
      text: 'New release',
      blocks: slackMessage,
    });
    res.status(200).send({ result });
  } catch {
    res.status(500).send({ error: 'failed to fetch data' });
  }
}
