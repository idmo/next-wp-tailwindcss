import Link from 'next/link';

const Categories = ({ categories }) => {
  return categories.map(({ name, slug }, idx) => (
    <Category key={idx} slug={slug}>
      {name}
    </Category>
  ));
};

export default Categories;

const Category = ({ children, slug }) => {
  return (
    <Link href={`/blog/categories/${slug}/`}>
      <a>{children}</a>
    </Link>
  );
};
