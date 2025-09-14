declare module '@components/*' {
  import { FC } from 'react';
  const Component: FC;
  export default Component;
}

declare module '@components/layout' {
  import { FC } from 'react';
  export const Navbar: FC;
  export const Footer: FC;
}
