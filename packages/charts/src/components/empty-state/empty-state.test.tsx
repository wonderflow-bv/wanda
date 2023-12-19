import { render, screen } from '@testing-library/react';

import { EmptyState } from './empty-state';

describe('<EmptyState>', () => {
  it('should render the component', () => {
    const position = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };
    const dimension = {
      maxWidth: 800,
      maxHeight: 600,
    };
    render(<EmptyState position={position} dimension={dimension} isVisible />);
    const element = screen.getByTestId('empty-state');
    expect(element).toBeDefined();
  });

  it('should render the component with a custom content', () => {
    const position = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };
    const dimension = {
      maxWidth: 800,
      maxHeight: 600,
    };
    const custom = <div>test</div>;
    render(<EmptyState position={position} dimension={dimension} isVisible customEmptyState={custom} />);
    const element = screen.getByTestId('empty-state-custom');
    expect(element).toBeDefined();
  });

  it('should render the component w a custom message', () => {
    const position = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };
    const dimension = {
      maxWidth: 800,
      maxHeight: 600,
    };
    render(<EmptyState position={position} dimension={dimension} isVisible message="test message" />);
    const element = screen.getByText('test message');
    const msg = screen.getByTestId('empty-state-message');
    expect(element).toBeDefined();
    expect(msg).toBeDefined();
  });

  it('should render nothing when isVisible prop is false', () => {
    const position = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };
    const dimension = {
      maxWidth: 800,
      maxHeight: 600,
    };
    const { container } = render(<EmptyState position={position} dimension={dimension} />);
    expect(container.firstChild).toBeNull();
  });
});
