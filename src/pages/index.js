import Head from 'next/head';
import Link from 'next/link';
import { gql } from '@apollo/client';

import { getApolloClient } from 'lib/apollo-client';

export default function Home({ page, posts }) {
  const { title, description } = page;
  console.log(posts);
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>{title}</h1>
        <p>{description}</p>

        {posts &&
          posts.length > 0 &&
          posts.map(({ title, excerpt, slug, path }) => {
            return (
              <li key={slug}>
                <Link href={path}>
                  <a>
                    <h3 dangerouslySetInnerHTML={{ __html: title }} />
                    <div dangerouslySetInnerHTML={{ __html: excerpt }} />
                  </a>
                </Link>
              </li>
            );
          })}

        <ul>
          {!posts ||
            (posts.length === 0 && (
              <li>
                <p>Oops, no posts found!</p>
              </li>
            ))}
        </ul>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      {
        generalSettings {
          title
          description
        }
        posts(first: 10000) {
          edges {
            node {
              id
              excerpt
              title
              slug
            }
          }
        }
      }
    `,
  });

  const posts = data?.data.posts.edges
    .map(({ node }) => node)
    .map((post) => {
      return {
        ...post,
        path: `/posts/${post.slug}`,
      };
    });

  const page = {
    ...data?.data.generalSettings,
  };

  return {
    props: {
      page,
      posts,
    },
  };
}
