import { useRouter } from 'next/router';
import { usePageContext } from 'context/page-context';
import { CityPageProps } from 'pages/[city]';
import { FC, useCallback, useMemo } from 'react';
import { useStoreContext } from 'store/context';
import { Selector } from './selector';
import { Wrapper } from './wrapper';
import { Option } from './option';
import { Options } from './options';
import { Link } from 'components/shared/link';
import { PoiType } from 'interfaces/city.interface';

export const Categories: FC = () => {
  // Access to Store
  const pageProps = usePageContext() as CityPageProps;
  const { state } = useStoreContext();
  const { query } = useRouter();

  // Calculating State
  const hidden = state.poiType === null;
  const collapsed = !!query.category;
  const selected =
    query.category !== 'all'
      ? (query.category as PoiType) || state.poiType
      : state.poiType;
  const pinned = !!query.category && query.category !== 'all';
  const categories = pageProps.categories;

  if (typeof window !== 'undefined')
    (window as any).test = { hidden, collapsed, selected, pinned, categories };
  const renderLink = useCallback(
    (children: JSX.Element, type: PoiType) => (
      <Link pathname="/[city]/" query={{ ...query, category: type }}>
        {children}
      </Link>
    ),
    []
  );

  return (
    <Wrapper hidden={hidden}>
      <Selector collapsed={collapsed}>
        <Options
          categories={categories}
          selected={selected}
          pinned={pinned}
          collapsed={collapsed}
          renderLink={renderLink}
        />
      </Selector>
    </Wrapper>
  );
};
