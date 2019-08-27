import { tsx, create } from '@dojo/framework/core/vdom';

import Link from '@dojo/framework/routing/Link';

import { dateFormatter } from '../../utils/formatter';

import * as css from './Card.m.css';

interface CardProperties {
	author?: string;
	title: string;
	date: string;
	description: string;
	cover_image: string;
	path: string;
}

const factory = create().properties<CardProperties>();

export default factory(({ properties }) => {
  const { title, date, description, path, cover_image } = properties();
  return (
    <section classes={[ css.root ]}>
      <div classes={[ css.column ]}>
        <Link
          to="blog"
          params={{
            path: path.replace('posts/', '').replace('.md', '')
          }}
        >
          {title}
        </Link>
        <p>{dateFormatter(new Date(date))}</p>
        <span>{description}</span>
      </div>
      <div classes={[ css.column ]}>
        <Link
          to="blog"
          params={{
            path: path.replace('posts/', '').replace('.md', '')
          }}
        >
          <img alt={description} loading="lazy" classes={[ css.image ]} src={cover_image} />
        </Link>
      </div>
    </section>
  );
});
