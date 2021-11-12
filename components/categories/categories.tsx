import { Icon } from 'components/icon';
import { usePageContext } from 'context/page-context';
import { CityPageProps } from 'pages/[city]';
import { FC, useMemo } from 'react';
import { useStoreContext } from 'store/context';
import {
  IconHolder,
  RadioButton,
  RadioContainer,
  LabelContent,
  Wrapper,
  LabelWrapper
} from './styled';

export const Categories: FC = () => {
  const { state } = useStoreContext();
  const pageProps = usePageContext() as CityPageProps;
  return useMemo(() => {
    const Options = pageProps.categories.map(({ type, title }) => (
      <RadioContainer
        key={type}
        animate={type === state.poiType ? 'active' : 'inactive'}
      >
        <LabelWrapper>
          <LabelContent>{title}</LabelContent>
        </LabelWrapper>
        <RadioButton />
        <IconHolder>
          <Icon category={type} />
        </IconHolder>
      </RadioContainer>
    ));
    return <Wrapper>{Options}</Wrapper>;
  }, [state.poiType]);
};
