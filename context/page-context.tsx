import { createContext, FC, useContext } from 'react';
import { HomePageProps } from 'pages';
import { CityPageProps } from 'pages/[city]';
import { PoiPageProps } from 'pages/[city]/[poi]';

type PageContextProps = HomePageProps | CityPageProps | PoiPageProps;

const PageContext = createContext<PageContextProps>({} as PageContextProps);
export const PageProvider: FC<{ pageProps: PageContextProps }> = ({
  children,
  pageProps
}) => {
  if (typeof window !== 'undefined') (window as any).pageProps = pageProps;
  return (
    <PageContext.Provider value={pageProps}>{children}</PageContext.Provider>
  );
};

export const usePageContext = () => {
  return useContext(PageContext);
};
