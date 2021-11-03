import Head from 'next/head';
import { gql } from '@apollo/client';
import { getApolloClient } from 'lib/apollo-client';
import Layout from 'components/Layout';

export default function Post({ post, site }) {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={`Read more about ${post.title} on ${site.title}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="text-3xl font-black">Post Slug Page</div>
      <div>
        <div>{JSON.stringify(site)}</div>
      </div>
      <div>
        <div>{JSON.stringify(post)}</div>
      </div>
    </Layout>
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
