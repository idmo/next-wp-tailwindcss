import { getRecentPosts } from 'lib/posts';
import Posts from '../../components/Posts';
import Layout from 'components/Layout';

const Blog = ({ posts }) => {
  return (
    <Layout>
      <Posts posts={posts} />
    </Layout>
  );
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
