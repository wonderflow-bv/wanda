import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Accordion } from './accordion';
import { AccordionItem } from './accordion-item';

const story: ComponentMeta<typeof Accordion> = {
  title: 'Components/Actions/Accordion',
  component: Accordion,
};

export default story;

const Template: ComponentStory<typeof Accordion> = args => (
  <Accordion defaultOpen="3" {...args}>
    <AccordionItem value="1" summary="Item 1">
      Yes, they are. Wonderflow extracts insights from your competitors public data too.
      If a competitor public feedback is not currently in our Feedback data lake you can
      request it and it will be added.
    </AccordionItem>
    <AccordionItem value="2" summary="Item 2">
      Well, it is our specialty. We have the most granular and performing ontologies for your industry,
      ready to be used, without any manual configuration needed on your side.On average, our VoC analysis
      covers 100 to 150 topics for each product category (3X more granular than any other platform)
      organized in a multilevel hierarchy, so that you can explore them from most generic ones to more specifics.
      For each topic, our artificial intelligence can determine its sentiment on a 3-level scale: positive, negative,
      neutral (used when a topic appears in a question, say coming from a customer support ticket).
    </AccordionItem>
    <AccordionItem value="3" summary="Item 3">
      By design, Wonderflow can integrate all pre-existing feedback solutions
      (like Medallia, Sprinklr, Salesforce, Bazaarvoice, etc.) that your company uses to manage customer feedback.
      Wonderflow can eventually setup custom integration (both in and out) using API.
    </AccordionItem>
  </Accordion>
);

export const Default = Template.bind({});
Default.args = {
  showSeparators: true,
};

const NestedTemplate: ComponentStory<typeof Accordion> = args => (
  <Accordion defaultOpen="1" {...args}>
    <AccordionItem value="1" summary="Item 1">
      Item 1
      <Accordion defaultOpen="3" {...args}>
        <AccordionItem value="1" summary="Item 1">
          Item 1
        </AccordionItem>
        <AccordionItem value="2" summary="Item 2">
          Item 2
        </AccordionItem>
        <AccordionItem value="3" summary="Item 3">
          Item 3
        </AccordionItem>
      </Accordion>
    </AccordionItem>
    <AccordionItem value="2" summary="Item 2">
      Item 2
    </AccordionItem>
    <AccordionItem value="3" summary="Item 3">
      Item 3
    </AccordionItem>
  </Accordion>
);

export const Nested = NestedTemplate.bind({});
Nested.args = {
  showSeparators: true,
};
