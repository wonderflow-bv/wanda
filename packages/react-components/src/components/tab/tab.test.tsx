import { fireEvent, render } from '@testing-library/react';

import { Tab } from './tab';

describe('<Tab>', () => {
  test(' it should render properly', () => {
    const { container } = render(
      <Tab>
        <Tab.Panel value="1" label="Tab 1">Panel 1</Tab.Panel>
        <Tab.Panel value="2" label="Tab mid long 2">Panel 2</Tab.Panel>
        <Tab.Panel value="3" label="Tab short 3">Panel 3</Tab.Panel>
        <Tab.Panel value="4" label="Tab veryy long 4">Panel 4</Tab.Panel>
        <Tab.Panel value="5" label="Tab 5">Panel 5</Tab.Panel>
        <Tab.Panel value="6" label="Tab 6" icon="bell">Panel 6</Tab.Panel>
      </Tab>,
    );
    expect(container).not.toBeNull();
  });

  test(' it should render properly with props', async () => {
    const { container, getByLabelText, getByTestId } = render(
      <Tab dimension="big" value="1">
        <Tab.Panel value="1" label="Tab 1">Panel 1</Tab.Panel>
        <Tab.Panel value="2" label="Tab mid long 2">Panel 2</Tab.Panel>
        <Tab.Panel value="3" label="Tab short 3">Panel 3</Tab.Panel>
        <Tab.Panel value="4" label="Tab veryy long 4">Panel 4</Tab.Panel>
        <Tab.Panel value="5" label="Tab 5">Panel 5</Tab.Panel>
        <Tab.Panel value="6" label="Tab 6" icon="bell">Panel 6</Tab.Panel>
      </Tab>,
    );

    fireEvent.click(getByTestId('TabRoot'));
    fireEvent.click(getByLabelText('Tab 5'));

    expect(container).not.toBeNull();
  });
});
