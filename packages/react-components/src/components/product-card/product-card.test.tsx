import {
  createEvent, fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { useState } from 'react';

import { ProductCard } from './product-card';

describe('<ProductCard>', () => {
  const SourceImages = [
    'https://products.gumlet.io/image-1675779605803.jpeg',
    'https://storage.googleapis.com/wonderflow-product-images/KITCHENAID%205KSM15%20SERIES.png',
    'https://storage.googleapis.com/wonderflow-product-images/CLASSIC%204.5%20QT.png',
    'this-is-a-broken-link.png',
  ];
  test('it should render properly', () => {
    const { container } = render(
      <ProductCard isLoading />,
    );

    expect(container).not.toBeNull();
  });

  test('it should render properly with props', () => {
    const { container } = render(
      <ProductCard
        title="title"
        subtitle="subtitle"
        source={SourceImages}
        rating={1.2}
        feedbackCount={1.2}
        votesCount={1.2}
        votesRating={1.2}
        sentiment={1.2}
        nps={1.2}
        groups={1.2}
        priceMin={1.2}
        priceMax={1.2}
        users={1.2}
        skus={1.2}
        kpiItems={2}
        kpisRowGap={16}
        bordered
        highlightOnHover
        ratio="1/1"
      />,
    );

    expect(container).not.toBeNull();
  });

  test('it should render properly with overlay actions', () => {
    const { container } = render(
      <ProductCard
        title="title"
        subtitle="subtitle"
        source={SourceImages}
        rating={1.2}
        feedbackCount={1.2}
        votesCount={1.2}
        overlayActions={<div>some content</div>}
      />,
    );

    expect(container).not.toBeNull();
  });

  test('it should render properly with on click', () => {
    const spyOnClick = jest.fn();
    const { container } = render(
      <ProductCard
        title="title"
        subtitle="subtitle"
        source={SourceImages}
        rating={1.2}
        feedbackCount={1.2}
        votesCount={1.2}
        onClick={spyOnClick}
      />,
    );

    expect(container).not.toBeNull();
  });

  test('it should render properly with children', () => {
    const spyOnClick = jest.fn();
    const { container } = render(
      <ProductCard
        title="title"
        subtitle="subtitle"
        source={SourceImages}
        rating={1.2}
        feedbackCount={1.2}
        votesCount={1.2}
        onClick={spyOnClick}
        footer={<div>some content</div>}
      >
        <div>some content</div>
      </ProductCard>,
    );

    expect(container).not.toBeNull();
  });

  test('it should render properly with colored cover', () => {
    const { container } = render(
      <ProductCard
        title="title"
        subtitle="subtitle"
        rating={1.2}
        feedbackCount={1.2}
        votesCount={1.2}
        votesRating={1.2}
        sentiment={1.2}
        nps={1.2}
        groups={1.2}
        priceMin={1.2}
        priceMax={1.2}
        users={1.2}
        skus={1.2}
        kpiItems={2}
        kpisRowGap={16}
        bordered
        highlightOnHover
      />,
    );

    expect(container).not.toBeNull();

    const coverText = screen.getByText('ti');
    expect(coverText).toBeDefined();
  });

  test('it should render the top bar only when sourceLabel is set', () => {
    const { container, rerender } = render(<ProductCard title="title" />);

    expect(container.querySelector('[data-inner-element="ProductCard-TopBar"]')).toBeNull();

    rerender(<ProductCard title="title" sourceLabel="Amazon" sourceIcon={<img alt="logo" src="logo.png" />} />);

    expect(container.querySelector('[data-inner-element="ProductCard-TopBar"]')).not.toBeNull();
    expect(screen.getByText('Amazon')).toBeDefined();
    expect(screen.getByAltText('logo')).toBeDefined();
  });

  test('it should render the badge over the cover and not while loading', () => {
    const { container, rerender } = render(<ProductCard title="title" source={SourceImages} badge="New" />);
    const badge = () => container.querySelector('[data-inner-element="ProductCard-Badge"]');

    expect(badge()).not.toBeNull();
    expect(screen.getByText('New')).toBeDefined();

    rerender(<ProductCard title="title" badge="New" />);
    expect(badge()).not.toBeNull();

    rerender(<ProductCard title="title" source={SourceImages} badge="New" isLoading />);
    expect(badge()).toBeNull();

    rerender(<ProductCard title="title" badge="New" isLoading />);
    expect(badge()).toBeNull();
  });

  test('it should render the media or the colored cover, with overlay actions only inside the cover', () => {
    const { container, rerender } = render(
      <ProductCard title="title" source={SourceImages} overlayActions={<button type="button">Action</button>} />,
    );
    const cover = () => container.querySelector('[data-inner-element="ProductCard-Cover"]');
    const media = () => container.querySelector('[data-inner-element="ProductCard-Media"]');
    const coloredCover = () => container.querySelector('[data-inner-element="ProductCard-ColoredCover"]');
    const overlay = () => container.querySelector('[data-inner-element="ProductCard-OverlayActions"]');

    expect(media()).not.toBeNull();
    expect(coloredCover()).toBeNull();
    expect(cover()?.contains(overlay())).toBe(true);
    expect(screen.getByText('Action')).toBeDefined();

    rerender(<ProductCard title="title" overlayActions={<button type="button">Action</button>} />);
    expect(media()).toBeNull();
    expect(coloredCover()).not.toBeNull();
    expect(screen.getByText('ti')).toBeDefined();
    expect(cover()?.contains(overlay())).toBe(true);

    rerender(<ProductCard title="title" overlayActions={<button type="button">Action</button>} onClick={jest.fn()} />);
    expect(overlay()).toBeNull();

    rerender(<ProductCard title="title" overlayActions={<button type="button">Action</button>} isLoading />);
    expect(overlay()).toBeNull();
    expect(cover()).not.toBeNull();
    expect(coloredCover()).toBeNull();
  });

  test('it should hide the KPIs and lock the card while the overlay actions are open, only when the overlay is available', () => {
    const overlayActions = <button type="button">Action</button>;
    const { container, rerender } = render(<ProductCard title="title" rating={4.3} overlayActions={overlayActions} />);
    const card = () => container.querySelector('[data-card-locked]')!;
    const cover = () => container.querySelector('[data-inner-element="ProductCard-Cover"]')!;
    const kpis = () => container.querySelector('[data-inner-element="ProductCard-KpisCollapse"]')!;

    expect(card().getAttribute('data-card-overlay-open')).toBe('false');
    expect(kpis().getAttribute('data-kpis-hidden')).toBe('false');

    fireEvent.mouseEnter(cover());
    expect(card().getAttribute('data-card-overlay-open')).toBe('true');
    expect(card().getAttribute('data-card-locked')).toBe('true');
    expect(kpis().getAttribute('data-kpis-hidden')).toBe('true');
    expect(kpis().getAttribute('aria-hidden')).toBe('true');

    fireEvent.mouseLeave(cover());
    expect(card().getAttribute('data-card-overlay-open')).toBe('false');
    expect(kpis().getAttribute('data-kpis-hidden')).toBe('false');
    expect(card().getAttribute('data-card-locked')).toBe('true');

    const transitionEnd = createEvent.transitionEnd(kpis());
    Object.defineProperty(transitionEnd, 'propertyName', { value: 'grid-template-rows' });
    fireEvent(kpis(), transitionEnd);
    expect(card().getAttribute('data-card-locked')).toBe('false');

    rerender(<ProductCard title="title" rating={4.3} overlayActions={overlayActions} onClick={jest.fn()} />);
    fireEvent.mouseEnter(cover());
    expect(card().getAttribute('data-card-overlay-open')).toBe('false');
    expect(card().getAttribute('data-card-locked')).toBe('false');
    expect(kpis().getAttribute('data-kpis-hidden')).toBe('false');
  });

  test('it should render the footer separator only with a footer or while loading', () => {
    const { container, rerender } = render(<ProductCard title="title" />);

    expect(container.querySelectorAll('hr')).toHaveLength(0);

    rerender(<ProductCard title="title" footer="Apr 2023" />);
    expect(container.querySelectorAll('hr')).toHaveLength(1);

    rerender(<ProductCard title="title" isLoading />);
    expect(container.querySelectorAll('hr')).toHaveLength(1);

    rerender(<ProductCard title="title" sourceLabel="Amazon" footer="Apr 2023" />);
    expect(container.querySelectorAll('hr')).toHaveLength(2);
  });

  test('it should render the description and hide the KPIs block when kpiItems is 0', () => {
    const { rerender } = render(<ProductCard title="title" rating={4.3} />);

    expect(screen.queryByText('A description')).toBeNull();
    expect(screen.getByText('4.3')).toBeDefined();

    rerender(<ProductCard title="title" description="A description" rating={4.3} kpiItems={0} />);
    expect(screen.getByText('A description')).toBeDefined();
    expect(screen.queryByText('4.3')).toBeNull();
  });

  test('it should be bordered by default', () => {
    const { container, rerender } = render(<ProductCard title="title" />);

    expect(container.querySelector('[data-card-bordered="true"]')).not.toBeNull();

    rerender(<ProductCard title="title" bordered={false} />);
    expect(container.querySelector('[data-card-bordered="false"]')).not.toBeNull();
  });

  describe('expandable KPIs', () => {
    const kpis = {
      rating: 4.3, nps: 23, feedbackCount: 123, votesRating: 2.3, tgw: 0.8,
    };
    const isHidden = (text: string) => !!screen.getByText(text).closest('[aria-hidden="true"]');
    const toggle = () => screen.queryByRole('button', { name: /show (more|less)/i });

    test('it should render the toggle only when expandable and not loading, whatever the number of KPIs', () => {
      const { rerender } = render(<ProductCard title="title" {...kpis} kpiItems={2} />);
      expect(toggle()).toBeNull();

      rerender(<ProductCard title="title" {...kpis} kpiItems={5} expandable />);
      expect(toggle()).not.toBeNull();

      rerender(<ProductCard title="title" rating={4.3} kpiItems={2} expandable />);
      expect(toggle()).not.toBeNull();

      rerender(<ProductCard title="title" {...kpis} kpiItems={2} expandable isLoading />);
      expect(toggle()).toBeNull();
    });

    test('it should reveal KPIs that arrive asynchronously after expanding, and keep them mounted while collapsing', async () => {
      const Consumer = () => {
        const [extra, setExtra] = useState({});

        return (
          <ProductCard
            title="title"
            rating={4.3}
            nps={23}
            {...extra}
            kpiItems={2}
            expandable
            onExpandedChange={(expanded) => {
              if (!expanded) setExtra({});
              else setTimeout(() => setExtra({ feedbackCount: 123 }), 50);
            }}
          />
        );
      };

      render(<Consumer />);
      expect(screen.queryByText('123')).toBeNull();

      fireEvent.click(screen.getByRole('button', { name: 'Show more' }));
      expect(screen.getByRole('button', { name: 'Show less' })).toBeDefined();
      expect(screen.queryByText('123')).toBeNull();

      await waitFor(() => expect(isHidden('123')).toBe(false));

      fireEvent.click(screen.getByRole('button', { name: 'Show less' }));
      expect(screen.getByRole('button', { name: 'Show more' })).toBeDefined();
      // The consumer dropped the KPIs, but they stay (hidden) until the collapse animation is over.
      expect(isHidden('123')).toBe(true);
      await waitFor(() => expect(screen.queryByText('123')).toBeNull());
    });

    test('it should expand and collapse the KPIs without triggering the card click', () => {
      const onClick = jest.fn();
      const { container } = render(
        <ProductCard title="title" {...kpis} kpiItems={2} expandable onClick={onClick} />,
      );
      const card = () => container.querySelector('[data-card-expanded]');

      expect(screen.getByText('4.3')).toBeDefined();
      expect(screen.getByText('23')).toBeDefined();
      expect(isHidden('123')).toBe(true);
      expect(card()?.getAttribute('data-card-expanded')).toBe('false');

      fireEvent.click(screen.getByRole('button', { name: 'Show more' }));
      expect(isHidden('123')).toBe(false);
      expect(isHidden('0.8')).toBe(false);
      expect(toggle()?.getAttribute('aria-expanded')).toBe('true');
      expect(toggle()?.textContent).toBe('Show less');
      expect(card()?.getAttribute('data-card-expanded')).toBe('true');

      fireEvent.click(screen.getByRole('button', { name: 'Show less' }));
      expect(isHidden('123')).toBe(true);
      expect(toggle()?.getAttribute('aria-expanded')).toBe('false');
      expect(card()?.getAttribute('data-card-expanded')).toBe('false');
      expect(onClick).not.toHaveBeenCalled();
    });

    test('it should keep the card locked while collapsing and release it when the transition ends', () => {
      const { container } = render(<ProductCard title="title" {...kpis} kpiItems={2} expandable />);
      const card = () => container.querySelector('[data-card-locked]');
      const extras = () => container.querySelector('[data-inner-element="ProductCard-KpisExtras"]')!;

      expect(card()?.getAttribute('data-card-locked')).toBe('false');

      fireEvent.click(screen.getByRole('button', { name: 'Show more' }));
      expect(card()?.getAttribute('data-card-locked')).toBe('true');

      fireEvent.click(screen.getByRole('button', { name: 'Show less' }));
      expect(card()?.getAttribute('data-card-locked')).toBe('true');

      const transitionEnd = createEvent.transitionEnd(extras());
      Object.defineProperty(transitionEnd, 'propertyName', { value: 'grid-template-rows' });
      fireEvent(extras(), transitionEnd);
      expect(card()?.getAttribute('data-card-locked')).toBe('false');
    });

    test('it should temporarily restore the default state while hovering the cover', () => {
      const { container } = render(
        <ProductCard title="title" {...kpis} kpiItems={2} expandable expandLabel="More" collapseLabel="Less" />,
      );
      const cover = container.querySelector('[data-inner-element="ProductCard-Cover"]')!;

      fireEvent.click(screen.getByRole('button', { name: 'More' }));
      expect(isHidden('123')).toBe(false);

      fireEvent.mouseEnter(cover);
      expect(isHidden('123')).toBe(true);
      expect(screen.getByRole('button', { name: 'More' })).toBeDefined();
      expect(container.querySelector('[data-card-expanded="false"]')).not.toBeNull();

      fireEvent.mouseLeave(cover);
      expect(isHidden('123')).toBe(false);
      expect(screen.getByRole('button', { name: 'Less' })).toBeDefined();
      expect(container.querySelector('[data-card-expanded="true"]')).not.toBeNull();
    });
  });
});
