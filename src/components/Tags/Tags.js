import Link from 'next/link';

const Tags = ({ tags }) => {
  return tags.map(({ name, slug }, idx) => (
    <Tag key={idx} slug={slug}>
      {name}
    </Tag>
  ));
};

const Tag = ({ children, slug }) => {
  return (
    <Link href={`/blog/tags/${slug}/`}>
      <a>{children}</a>
    </Link>
  );
};

export default Tags;
