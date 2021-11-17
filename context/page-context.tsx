import { createContext, FC, useContext } from 'react';
import { HomePageProps } from 'pages';
import { CityPageProps } from 'interfaces/city.interface';

type PageContextProps = HomePageProps | CityPageProps;

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
