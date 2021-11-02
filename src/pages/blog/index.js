import { getRecentPosts } from 'lib/posts';
import Posts from '../../components/Posts';

const Blog = ({ posts }) => {
  return <Posts posts={posts} />;
};

export default Blog;

export async function getStaticProps() {
  const data = await getRecentPosts(10);
  const { posts } = data;
  return {
    props: {
      posts,
    },
  };
}
