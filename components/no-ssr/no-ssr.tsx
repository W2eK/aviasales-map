import dynamic from 'next/dynamic';
import { FC } from 'react';

const NoSsr: FC = ({ children }) => {
  return <>{children}</>;
};

const DynamicNoSsr = dynamic(() => Promise.resolve(NoSsr), { ssr: false });

export { DynamicNoSsr as NoSsr };
