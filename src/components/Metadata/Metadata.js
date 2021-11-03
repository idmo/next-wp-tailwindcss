import Link from 'next/link';

import { categoryPathBySlug } from '../../lib/categories';
import { tagPathBySlug } from '../../lib/tags';
import { authorPathByName } from '../../lib/users';
import { formatDate } from '../../lib/datetime';

const DEFAULT_METADATA_OPTIONS = {
  compactCategories: true,
  compactTags: true,
};

const Metadata = ({ author, date, categories, tags, options = DEFAULT_METADATA_OPTIONS, isSticky = false }) => {
  const { compactCategories, compactTags } = options;
  return (
    <ul>
      {author && (
        <li>
          <address>
            {author.avatar && (
              <img
                width={author.avatar.width}
                height={author.avatar.height}
                src={author.avatar.url}
                alt="Author Avatar"
              />
            )}
            By{' '}
            <Link href={authorPathByName(author.name)}>
              <a rel="author">{author.name}</a>
            </Link>
          </address>
        </li>
      )}
      {date && (
        <li>
          <time pubdate="pubdate" dateTime={date}>
            {formatDate(date)}
          </time>
        </li>
      )}
      {Array.isArray(categories) && categories[0] && (
        <li>
          {compactCategories && (
            <p title={categories.map(({ name }) => name).join(', ')}>
              <Link href={categoryPathBySlug(categories[0].slug)}>
                <a>{categories[0].name}</a>
              </Link>
              {categories.length > 1 && ' and more'}
            </p>
          )}
          {!compactCategories && (
            <ul>
              {categories.map((category) => {
                return (
                  <li key={category.slug}>
                    <Link href={categoryPathBySlug(category.slug)}>
                      <a>{category.name}</a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      )}

      {Array.isArray(tags) && tags[0] && (
        <li>
          {compactTags && (
            <p title={tags.map(({ name }) => name).join(', ')}>
              <Link href={tagPathBySlug(categories[0].slug)}>
                <a>{tags[0].name}</a>
              </Link>
              {tags.length > 1 && ' and more'}
            </p>
          )}
          {!compactTags && (
            <ul>
              {tags.map((tag) => {
                return (
                  <li key={tag.slug}>
                    <Link href={tagPathBySlug(tag.slug)}>
                      <a>{tag.name}</a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      )}
      {isSticky && <li>Sticky Post</li>}
    </ul>
  );
};

export default Metadata;
