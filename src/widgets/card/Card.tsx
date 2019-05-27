import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

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

export default class Card extends WidgetBase<CardProperties> {
	protected render() {
		const { title, date, description, path, cover_image } = this.properties;
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
					<br />
					<Link
						to="blog"
						params={{
							path: path.replace('posts/', '').replace('.md', '')
						}}
					>
						READ MORE
					</Link>
				</div>
				<div classes={[ css.column ]}>
					<img classes={[ css.image ]} src={cover_image} />
				</div>
			</section>
		);
	}
}
