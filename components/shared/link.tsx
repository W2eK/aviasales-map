import { default as NextLink } from 'next/link';
import { FC } from 'react';
import { ParsedUrlQuery } from 'querystring';

type LinkProps = {
  children: React.ReactNode;
  pathname: string;
  query: ParsedUrlQuery;
};

export const Link: FC<LinkProps> = ({ children, pathname, query }) => {
  return (
    <NextLink href={{ pathname, query }}>
      <a>{children}</a>
    </NextLink>
  );
};
