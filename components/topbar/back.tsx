import { Icon } from 'components/icon';
import { Link } from 'components/shared/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { PoiParams } from 'pages/[city]/[category]/[poi]';
import { FC, useMemo } from 'react';
import { IconHolder } from './styled';

export const BackButton: FC = () => {
  const router = useRouter();
  const { city, category, poi } = router.query as Partial<PoiParams>;

  const pathname =
    poi !== undefined
      ? '/[city]/[category]/'
      : category !== undefined
      ? '/[city]/'
      : '/';

  const query =
    poi !== undefined
      ? { city, category }
      : category !== undefined
      ? { city }
      : {};

  // prettier-ignore
  return useMemo(() => (
    <Link pathname={pathname} query={query}>
      {/* <AnimatePresence> */}
        <IconHolder
          // as={motion.div}
          // initial={{opacity: 0, x: '300%'}}
          // animate={{opacity: 1, x: 0}}
          // exit={{opacity: 0, x: '-300%'}}
          // key={`${city}/${category}/${poi}`}
        >
          <Icon category="arrow" />
        </IconHolder>
      {/* </AnimatePresence> */}
    </Link>
  ),
  [city, category, poi]);
};
