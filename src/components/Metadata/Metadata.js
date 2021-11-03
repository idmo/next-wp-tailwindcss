/* This is for extra information about the post. It's empty for now. */

const Metadata = ({ post }) => {
  return <div>{JSON.stringify(post)}</div>;
};

export default Metadata;
