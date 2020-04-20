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
  const key = `post-${title.replace(' ', '-')}`;
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
          <picture>
            <source type="image/webp" srcset={cover_image.replace(/\.(jpg|png)/, '.webp')}/>
            <source type="image/jpeg" srcset={cover_image}/>
            <img alt={description} loading="lazy" classes={[ css.image ]} src={cover_image} />
          </picture>
        </Link>
      </div>
    </section>
  );
});
