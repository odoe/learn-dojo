import { tsx, create } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import intersection from '@dojo/framework/core/middleware/intersection';

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

const factory = create({ icache, intersection }).properties<CardProperties>();

const FALLBACK_IMG = '/assets/blog/fallback.jpg';

export default factory(({ properties, middleware: { icache, intersection } }) => {
  const { title, date, description, path, cover_image } = properties();
  const key = `$intersect-${title.replace(' ', '-')}`;
  const { isIntersecting } = intersection.get(key);
  const viewed = icache.getOrSet('viewed', false);
  const imgSrc = (isIntersecting || viewed) ? cover_image : FALLBACK_IMG;
  if (isIntersecting) {
    icache.set('viewed', true);
  }
  return (
    <section classes={[ css.root ]} key={key}>
      <div classes={[ css.column ]}>
        <Link
          classes={[css.link]}
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
          classes={[css.link]}
          to="blog"
          aria-label={description}
          params={{
            path: path.replace('posts/', '').replace('.md', '')
          }}
        >
          <img alt={description} loading="lazy" classes={[ css.image ]} src={imgSrc} />
        </Link>
      </div>
    </section>
  );
});
