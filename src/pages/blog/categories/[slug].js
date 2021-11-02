import { getAllCategories, getCategoryBySlug } from 'lib/categories';
import { getPostsByCategoryId } from 'lib/posts';
import { Fragment } from 'react';

export default function Category({ category, posts }) {
  const { name, description } = category;
  console.log(JSON.stringify(posts));
  return (
    <Fragment>
      <div className="text-3xl font-black">This is a Category Listing Page</div>
      <div>
        <div>{name}</div>
        <div>{description}</div>
      </div>
      <div>
        <div>Raw Content</div>
        <div>{JSON.stringify(posts)}</div>
      </div>
    </Fragment>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { category } = await getCategoryBySlug(params?.slug);

  // use the Category DatabaseId because it's an Integer
  // for some reason a Category ID is a Int,
  // a tag is a String in Graphql
  const { posts } = await getPostsByCategoryId(category.databaseId);

  return {
    props: {
      category,
      posts,
    },
  };
}

export async function getStaticPaths() {
  const { categories } = await getAllCategories();

  const paths = categories.map((category) => {
    const { slug } = category;
    return {
      params: {
        slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
