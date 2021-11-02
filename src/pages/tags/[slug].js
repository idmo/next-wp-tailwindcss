import { getAllTags, getTagBySlug } from 'lib/tags';
import { getPostsByTagId } from 'lib/posts';

export default function Tag({ tag, posts }) {
  const { name, description } = tag;
  console.log(posts);
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
  const { tag } = await getTagBySlug(params?.slug);

  // use the Tag ID because it's a string
  // for some reason a Tag ID is a string,
  // a caterogy is an Int in Graphql
  const { posts } = await getPostsByTagId(tag.id);

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
