import { render } from '@testing-library/react';

import { List } from './list';

describe('<List>', () => {
  test(' it should render properly', () => {
    const { container } = render(
      <List>
        <List.Li marker="circle-check" markerColor="var(--highlight-green-foreground)">List item text</List.Li>
        <List.Li dimension="small">List item text no props</List.Li>
      </List>,
    );
    expect(container).not.toBeNull();
  });

  test(' it should render properly with no marker as "ol"', () => {
    const { container } = render(
      <List hideMarker as="ol">
        <List.Li marker="circle-check" markerColor="var(--highlight-green-foreground)">List item text</List.Li>
        <List.Li dimension="small">List item text no props</List.Li>
      </List>,
    );
    expect(container).not.toBeNull();
  });
});
