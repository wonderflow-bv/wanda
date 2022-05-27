import {
  Elevator, Masonry, Stack,
} from '@wonderflow/react-components';

import { Browser } from '@/components/shared/browser';

import styles from './themes.module.css';

export const Themes = () => (
  <Elevator resting={4}>
    <Browser className={styles.Themes}>
      <Stack hPadding={16} vPadding={16}>
        <Masonry
          columns={{
            default: 3,
            small: 3,
          }}
        >
          <img alt="" width="122" loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1652298756973-b448d256fe6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=244&q=80" />
          <img alt="" width="122" loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1635792805734-4bb1f8ade575?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=244&q=80" />
          <img alt="" width="122" loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1592766472014-693f057233d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=244&q=80" />
          <img alt="" width="122" loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1598332601704-e1b27cce3370?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=244&q=80" />
          <img alt="" width="122" loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1652045143118-52f408271feb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=244&q=80" />
          <img alt="" width="122" loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1613370546003-ddc7faae1779?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=244&q=80" />
          <img alt="" width="122" loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1652045681043-34953d24892b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=244&q=80" />
          <img alt="" width="122" loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1635663684911-6b1a5d5affb9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=244&q=80" />
          <img alt="" width="122" loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1653203068247-f9e97de773db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=244&q=80" />
          <img alt="" width="122" loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1653202916210-9e41f0173b6b?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=244" />
          <img alt="" width="122" loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1635752038829-b2095d6bd8c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=244&q=80" />
        </Masonry>
      </Stack>
    </Browser>
  </Elevator>
);
