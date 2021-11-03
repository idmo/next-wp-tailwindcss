import Head from 'next/head';
import Link from 'next/link';
import { gql } from '@apollo/client';
import Layout from 'components/Layout';

import { getApolloClient } from 'lib/apollo-client';

export default function Home({ page, posts }) {
  const { title, description } = page;

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 dangerouslySetInnerHTML={{ __html: title }} />
      <div dangerouslySetInnerHTML={{ __html: description }} />
      <ul>
        {posts &&
          posts.length > 0 &&
          posts.map(({ title, excerpt, slug, path, tags, categories }) => {
            return (
              <li key={slug}>
                <Tags tags={tags} />
                <Categories categories={categories} />
                <Link href={path}>
                  <a>
                    <h3 dangerouslySetInnerHTML={{ __html: title }} />
                    <div dangerouslySetInnerHTML={{ __html: excerpt }} />
                  </a>
                </Link>
              </li>
            );
          })}

        {!posts || (posts.length === 0 && <p>Oops, no posts found!</p>)}
      </ul>
    </Layout>
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
        posts(first: 100000) {
          edges {
            node {
              tags {
                edges {
                  node {
                    id
                    databaseId
                    name
                    link
                    slug
                  }
                }
              }
              categories {
                edges {
                  node {
                    databaseId
                    id
                    link
                    name
                    slug
                  }
                }
              }
              id
              title
              slug
              excerpt
              modifiedGmt
              date
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

const Tags = ({ tags }) => {
  return tags.edges
    .map(({ node }) => node)
    .map(({ name, id, slug }) => (
      <div key={id}>
        <Link href={`/tags/${slug}`}>
          <a>{name}</a>
        </Link>
      </div>
    ));
};

const Categories = ({ categories }) => {
  return categories.edges
    .map(({ node }) => node)
    .map(({ name, id, slug }) => (
      <div key={id}>
        <Link href={`/categories/${slug}`}>
          <a>{name}</a>
        </Link>
      </div>
    ));
};
