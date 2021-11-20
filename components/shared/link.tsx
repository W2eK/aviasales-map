import { default as NextLink } from 'next/link';
import { FC } from 'react';
import { AllPageParams } from 'interfaces/params.interface';

type LinkProps = {
  children: React.ReactNode | string;
  pathname: string;
  query: AllPageParams;
};

export const Link: FC<LinkProps> = ({ children, pathname, query }) => {
  return (
    <NextLink href={{ pathname, query }}>
      <a>{children}</a>
    </NextLink>
  );
};
