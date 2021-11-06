import { createContext, FC, useContext } from 'react';
import { HomePageProps } from 'pages';
import { CityPageProps } from 'pages/[city]';

type PageContextProps = HomePageProps | CityPageProps;

const PageContext = createContext<PageContextProps>({} as PageContextProps);

export const PageProvider: FC<{ pageProps: PageContextProps }> = ({
  children,
  pageProps
}) => {
  return (
    <PageContext.Provider value={pageProps}>{children}</PageContext.Provider>
  );
};

export const usePageContext = () => {
  return useContext(PageContext);
};
