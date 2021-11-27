import { Link } from 'components/shared/link';
import { AnimatePresence } from 'framer-motion';
import { CategoryType } from 'interfaces/data.interface';
import { useRouter } from 'next/router';
import { PoiParams } from 'pages/[city]/[category]/[poi]';
import { FC } from 'react';

type MarkerLinkProps = {
  children: React.ReactNode | null;
  category: CategoryType;
  poi: number | null;
};

export const MarkerLink: FC<MarkerLinkProps> = ({
  children,
  category: destination,
  poi
}) => {
  const router = useRouter();
  const { city, category } = router.query as Partial<PoiParams>;
  return (
    <Link
      pathname="/[city]/[category]/"
      query={{ city, category: destination, poi }}
      onClick={e => e.nativeEvent.stopPropagation()}
    >
      <AnimatePresence>
        {category === undefined ? children : null}
      </AnimatePresence>
    </Link>
  );
};
