import { getAllTags, getTagBySlug } from 'lib/tags';
import { getPostsByTagSlug } from 'lib/posts';

export default function Tag({ tag, posts }) {
  console.log(posts);
  const { name, description } = tag;

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
  const { tag } = await getTagBySlug(params?.slug);
  const { posts } = await getPostsByTagSlug(tag.slug);

  return {
    props: {
      tag,
      posts,
    },
  };
}

export async function getStaticPaths() {
  const { tags } = await getAllTags();

  const paths = tags.map((tag) => {
    const { slug } = tag;
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
