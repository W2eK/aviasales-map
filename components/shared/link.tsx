import { default as NextLink } from 'next/link';
import { FC } from 'react';
import { AllPageParams } from 'interfaces/params.interface';

type LinkProps = {
  children: React.ReactNode | string;
  pathname: string;
  query: AllPageParams;
  shallow?: boolean;
};

export const Link: FC<LinkProps> = ({ children, pathname, query, shallow }) => {
  return (
    <NextLink href={{ pathname, query }} shallow={shallow}>
      <a>{children}</a>
    </NextLink>
  );
};
