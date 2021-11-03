import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import Link from 'next/link';
import useSite from '../../hooks/use-site';
import { helmetSettingsFromMetadata } from '../../lib/site';

import Footer from '../Footer';
import Nav from '../Nav';

const Layout = ({ children }) => {
  const router = useRouter();
  const { asPath } = router;

  const { homepage, metadata = {} } = useSite();

  if (!metadata.og) {
    metadata.og = {};
  }

  metadata.og.url = `${homepage}${asPath}`;

  const helmetSettings = {
    defaultTitle: metadata.title,
    titleTemplate: process.env.WORDPRESS_PLUGIN_SEO === true ? '%s' : `%s - ${metadata.title}`,
    ...helmetSettingsFromMetadata(metadata, {
      setTitle: false,
      link: [
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          href: '/feed.xml',
        },

        // Favicon sizes and manifest generated via https://favicon.io/

        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
      ],
    }),
  };

  return (
    <div>
      <Helmet {...helmetSettings} />
      <div className="mx-auto w-[960px]">
        <Nav />
        <div className="h-full prose">{children}</div>
      </div>
      <div className="py-4">
        <div className="mx-auto w-[960px]">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
