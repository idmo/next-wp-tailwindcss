import { getAllTags, getTagBySlug } from 'lib/tags';
import { getPostsByTagId } from 'lib/posts';
import { Fragment } from 'react';

export default function Tag({ tag, posts }) {
  const { name, description } = tag;
  console.log(JSON.stringify(posts));
  return (
    <Fragment>
      <div className="text-3xl font-black">This is a Tag Listing Page</div>
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
