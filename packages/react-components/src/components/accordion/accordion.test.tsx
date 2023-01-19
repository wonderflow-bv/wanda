import { fireEvent, render } from '@testing-library/react';

import { Accordion } from './accordion';
import { AccordionItem } from './accordion-item';

describe('<Accordion>', () => {
  it('should render properly with separators', () => {
    const { container } = render(
      <Accordion defaultOpen="1" showSeparators>
        <AccordionItem value="1" summary="Item 1">
          Item 1
        </AccordionItem>
      </Accordion>,
    );
    expect(container).not.toBeNull();
  });

  it('should render properly w/o separators', () => {
    const { container } = render(
      <Accordion defaultOpen="1">
        <AccordionItem value="1" summary="Item 1">
          Item 1
        </AccordionItem>
      </Accordion>,
    );
    expect(container).not.toBeNull();
  });

  it('should open properly', () => {
    const { container, getByTestId, getByText } = render(
      <Accordion>
        <AccordionItem value="1" summary="Item 1">
          Inner Item
        </AccordionItem>
      </Accordion>,
    );
    fireEvent.click(getByTestId('Disclosure'));
    expect(getByText(/Inner Item/i)).toBeDefined();
    expect(container).not.toBeNull();
  });
});
