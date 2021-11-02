import { getAllCategories, getCategoryBySlug } from 'lib/categories';
import { getPostsByCategoryId } from 'lib/posts';

export default function Category({ category, posts }) {
  const { name, description } = category;

  return (
    <div>
      <h1>{name}</h1>
      <div dangerouslySetInnerHTML={{ __html: description }}></div>
      <ol>
        {posts.map(({ title, id }) => (
          <li key={id} dangerouslySetInnerHTML={{ __html: title }} />
        ))}
      </ol>
    </div>
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
