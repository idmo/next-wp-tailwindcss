import { getAllCategories, getCategoryBySlug } from 'lib/categories';
import { getPostsByCategoryId } from 'lib/posts';

export default function Category({ category, posts }) {
  const { name, description } = category;

  return (
    <div>
      <h1 className="text-xl font-black">{name}</h1>
      <div dangerouslySetInnerHTML={{ __html: description }}></div>
      <ol>
        {posts.map(({ title, id }) => (
          <li className="border-b border-black" key={id} dangerouslySetInnerHTML={{ __html: title }} />
        ))}
      </ol>
    </div>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  console.log(params);
  const { category } = await getCategoryBySlug(params?.slug);
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
