import { render } from '@testing-library/react';

import {
  Chip,
  Symbol,
} from '../..';
import { Text, TextVariants } from './text';

describe('<Text>', () => {
  test(' it should render properly', () => {
    const { container } = render(
      <Text>Some text</Text>,
    );
    expect(container).not.toBeNull();
  });

  test(' it should render properly as <span>', () => {
    const { container } = render(
      <Text as="span">Some text</Text>,
    );
    expect(container).not.toBeNull();
  });

  test(' it should render properly with all variants', () => {
    const v = [
      'display-1',
      'display-2',
      'display-3',
      'display-4',
      'heading-1',
      'heading-2',
      'heading-3',
      'heading-4',
      'heading-5',
      'heading-6',
      'subtitle-1',
      'subtitle-2',
      'tagline-1',
      'tagline-2',
      'tagline-3',
      'body-1',
      'body-2',
      'body-3'] as TextVariants[];
    v.map((el) => {
      const { container } = render(<Text variant={el}>Some text</Text>);
      return expect(container).not.toBeNull();
    });
  });

  test(' it should render properly with colors', () => {
    const c = ['positive', 'informative', 'danger', 'warning'] as Array<'positive' | 'informative' | 'danger' | 'warning'>;
    c.map((col) => {
      const { container } = render(<Text color={col}>Some text</Text>);
      return expect(container).not.toBeNull();
    });
  });

  test(' it should render properly with different alignment', () => {
    const a = ['start', 'center', 'end', 'justify'] as Array<'start' | 'center' | 'end' | 'justify'>;
    a.map((t) => {
      const { container } = render(<Text textAlign={t}>Some text</Text>);
      return expect(container).not.toBeNull();
    });
  });

  test(' it should render properly with props', () => {
    const { container } = render(<Text preventBreakWord preventResponsive truncate>Some text</Text>);
    return expect(container).not.toBeNull();
  });

  test(' it should render properly with anchor', () => {
    const { container } = render(<Text variant="heading-1" anchor id="heading-1">Some text</Text>);
    return expect(container).not.toBeNull();
  });

  test(' it should render properly with anchor w/o id', () => {
    const { container } = render(<Text variant="display-1" anchor>Some text</Text>);
    return expect(container).not.toBeNull();
  });

  test(' it should render properly with decorator start icon', () => {
    const s = ['small', 'medium', 'big'] as Array<'small' | 'medium' | 'big'>;

    s.map(((t) => {
      const { container } = render(
        <Text
          decoratorStart={(
            <Symbol
              source="circle-check"
              weight="solid"
            />
          )}
          decoratorSize={t}
        >
          Some text
        </Text>,
      );

      return expect(container).not.toBeNull();
    }));
  });
  test(' it should render properly with decorator start chip', () => {
    const s = ['small', 'medium', 'big'] as Array<'small' | 'medium' | 'big'>;

    s.map(((t) => {
      const { container } = render(
        <Text
          decoratorStart={(
            <Chip color="red">Chip</Chip>
          )}
          decoratorSize={t}
        >
          Some text
        </Text>,
      );

      return expect(container).not.toBeNull();
    }));
  });
  test(' it should render properly with decorator end icon', () => {
    const s = ['small', 'medium', 'big'] as Array<'small' | 'medium' | 'big'>;

    s.map(((t) => {
      const { container } = render(
        <Text
          decoratorEnd={(
            <Symbol
              source="circle-check"
              weight="solid"
            />
          )}
          decoratorSize={t}
        >
          Some text
        </Text>,
      );

      return expect(container).not.toBeNull();
    }));
  });

  test(' it should render properly with decorator end chip', () => {
    const s = ['small', 'medium', 'big'] as Array<'small' | 'medium' | 'big'>;

    s.map(((t) => {
      const { container } = render(
        <Text
          decoratorEnd={(
            <Chip color="red">Chip</Chip>
          )}
          decoratorSize={t}
        >
          Some text
        </Text>,
      );

      return expect(container).not.toBeNull();
    }));
  });
});
