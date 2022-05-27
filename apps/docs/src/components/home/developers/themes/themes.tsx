import {
  Elevator, Masonry,
} from '@wonderflow/react-components';

import { Browser } from '@/components/shared/browser';

export const Themes = () => (
  <Elevator resting={4}>
    <Browser>
      <Masonry
        columns={{
          default: 3,
          small: 3,
        }}
      >
        <img alt="" src="https://picsum.photos/200/300" />
        <img alt="" src="https://picsum.photos/200/300" />
        <img alt="" src="https://picsum.photos/200/300" />
        <img alt="" src="https://picsum.photos/200/300" />
        <img alt="" src="https://picsum.photos/200/300" />
        <img alt="" src="https://picsum.photos/200/300" />
        <img alt="" src="https://picsum.photos/200/300" />
      </Masonry>
    </Browser>
  </Elevator>
);
