import { Fragment } from 'react';
import Title from '../Title';
import Content from '../Content';
import Tags from '../Tags';
import Categories from '../Categories';

const Posts = ({ posts }) => {
  return posts.map((post, idx) => <Post key={idx} post={post} />);
};

const Post = ({ post }) => {
  const { title, content, tags, categories, isSticky } = post;
  return (
    <Fragment>
      {isSticky && 'Sticky'}
      <Title title={title} />
      <Content content={content} />
      <Tags tags={tags} />
      <Categories categories={categories} />
    </Fragment>
  );
};

export default Posts;
