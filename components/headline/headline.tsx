import { usePageContext } from 'context/page-context';
import { FC, useMemo } from 'react';
import { useStoreContext } from 'store/context';
import { Header, Subheader, Wrapper } from './styled';

export const Headline: FC = () => {
  const { state } = useStoreContext();
  const pageProps = usePageContext();
  return useMemo(() => {
    if (pageProps.page === 'index') return null;
    const district = pageProps.city.poi.find(
      poi => poi.id === state.districtHover
    );
    if (district === undefined || !('description' in district)) {
      return null;
    } else {
      return (
        <Wrapper>
          <Header>{district.name}</Header>
          <Subheader>{district.description}</Subheader>
        </Wrapper>
      );
    }
  }, [state.districtHover, pageProps.page]);
};
