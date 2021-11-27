import { default as NextLink } from 'next/link';
import { AnchorHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import { AllPageParams } from 'interfaces/params.interface';

type LinkProps = {
  children: React.ReactNode | string;
  pathname: string;
  query: AllPageParams;
  shallow?: boolean;
} & DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export const Link: FC<LinkProps> = ({
  children,
  pathname,
  query,
  shallow,
  ...rest
}) => {
  return (
    <NextLink href={{ pathname, query }} shallow={shallow}>
      <a {...rest}>{children}</a>
    </NextLink>
  );
};
