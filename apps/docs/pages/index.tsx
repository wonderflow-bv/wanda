import type { NextPage } from 'next';

import { Meta } from '@/components/meta';
import { ThemeSwitcher } from '@/components/theme-switcher';

const Home: NextPage = () => (
  <div>
    <Meta />
    <ThemeSwitcher />
  </div>
);

export default Home;
