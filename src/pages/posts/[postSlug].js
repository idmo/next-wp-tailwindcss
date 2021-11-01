import Head from 'next/head';
import Link from 'next/link';
import { gql } from '@apollo/client';

import { getApolloClient } from 'lib/apollo-client';

export default function Post({ post, site }) {
  return (
    <div>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={`Read more about ${post.title} on ${site.title}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="font-black">{post.title}</h1>

        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
        </div>

        <p>
          <Link href="/">
            <a>&lt; Back to home</a>
          </Link>
        </p>
      </main>
    </div>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { postSlug } = params;

  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      query PostBySlug($slug: String!) {
        generalSettings {
          title
        }
        postBy(slug: $slug) {
          id
          content
          title
          slug
        }
      }
    `,
    variables: {
      slug: postSlug,
    },
  });

  const post = data?.data.postBy;

  const site = {
    ...data?.data.generalSettings,
  };

  return {
    props: {
      post,
      site,
    },
  };
}

export async function getStaticPaths() {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      {
        posts(first: 10000) {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
      }
    `,
  });

  const posts = data?.data.posts.edges.map(({ node }) => node);

  return {
    paths: posts.map(({ slug }) => {
      return {
        params: {
          postSlug: slug,
        },
      };
    }),
    fallback: false,
  };
}
