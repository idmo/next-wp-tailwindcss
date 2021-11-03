import Link from 'next/link';

import { postPathBySlug, sanitizeExcerpt } from '../../lib/posts';

import Metadata from '../../components/Metadata';

const PostCard = ({ post, options = {} }) => {
  const { title, excerpt, slug, date, author, categories, tags, isSticky = false } = post;
  const { excludeMetadata = [] } = options;

  const metadata = {};

  if (!excludeMetadata.includes('author')) {
    metadata.author = author;
  }

  if (!excludeMetadata.includes('date')) {
    metadata.date = date;
  }

  if (!excludeMetadata.includes('categories')) {
    metadata.categories = categories;
  }

  if (!excludeMetadata.includes('tags')) {
    metadata.tags = tags;
  }

  if (isSticky) {
    ('sticky');
  }

  return (
    <div>
      {isSticky && 'Sticky'}
      <Link href={postPathBySlug(slug)}>
        <a>
          <h3
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
        </a>
      </Link>
      <Metadata {...metadata} />
      {excerpt && (
        <div
          dangerouslySetInnerHTML={{
            __html: sanitizeExcerpt(excerpt),
          }}
        />
      )}
    </div>
  );
};

export default PostCard;
