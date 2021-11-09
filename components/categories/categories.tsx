import { Icon } from 'components/icon';
import { usePageContext } from 'context/page-context';
import { FC } from 'react';
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
  const pageProps = usePageContext();
  const { state } = useStoreContext();
  if (pageProps.page === 'index' || !pageProps.city) return null;
  const Options = pageProps.city.categories.map(({ type, title }) => (
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
};
