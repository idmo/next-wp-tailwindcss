import NextApp from 'next/app';

import { SiteContext, useSiteContext } from '../hooks/use-site';
import { SearchProvider } from '../hooks/use-search';
import { getSiteMetadata } from '../lib/site';
import { getRecentPosts } from '../lib/posts';
import { getTopLevelPages } from '../lib/pages';
import { getCategories } from '../lib/categories';
import { getTags } from '../lib/tags';
import { getAllMenus, createMenuFromPages, MENU_LOCATION_NAVIGATION_DEFAULT } from '../lib/menus';

import NextNProgress from 'nextjs-progressbar';

import '../styles/globals.css';

function App({ Component, pageProps = {}, metadata, recentPosts, categories, tags, menus }) {
  const site = useSiteContext({
    metadata,
    recentPosts,
    categories,
    tags,
    menus,
  });
  return (
    <SiteContext.Provider value={site}>
      <SearchProvider>
        <NextNProgress height={4} color="##0070f3" />
        <Component {...pageProps} />
      </SearchProvider>
    </SiteContext.Provider>
  );
}

App.getInitialProps = async function (appContext) {
  const appProps = await NextApp.getInitialProps(appContext);

  const { posts: recentPosts } = await getRecentPosts({
    count: 5,
  });

  const { categories } = await getCategories({
    count: 5,
  });

  const { tags } = await getTags({
    count: 10,
  });

  const { menus } = await getAllMenus();

  const defaultNavigation = createMenuFromPages({
    locations: [MENU_LOCATION_NAVIGATION_DEFAULT],
    pages: await getTopLevelPages(),
  });

  menus.push(defaultNavigation);

  return {
    ...appProps,
    metadata: await getSiteMetadata(),
    recentPosts,
    categories,
    tags,
    menus,
  };
};

export default App;
