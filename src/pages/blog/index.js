import useSite from '../../hooks/use-site';
import { getPaginatedPosts } from '../../lib/posts';
import { WebsiteJsonLd } from '../../lib/json-ld';

import Layout from '../../components/Layout';
import Header from '../../components/Header';

import PostCard from '../../components/PostCard';
import Pagination from '../../components/Pagination';

export default function Home({ posts, pagination }) {
  const { metadata = {} } = useSite();
  const { title, description } = metadata;

  return (
    <Layout>
      <WebsiteJsonLd siteTitle={title} />
      <Header>
        <h1
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />

        <p
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      </Header>

      <h2 className="sr-only">Posts</h2>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          );
        })}
      </ul>
      {pagination && (
        <Pagination
          addCanonical={false}
          currentPage={pagination?.currentPage}
          pagesCount={pagination?.pagesCount}
          basePath={pagination?.basePath}
        />
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const { posts, pagination } = await getPaginatedPosts();
  return {
    props: {
      posts,
      pagination: {
        ...pagination,
        basePath: '/posts',
      },
    },
  };
}
