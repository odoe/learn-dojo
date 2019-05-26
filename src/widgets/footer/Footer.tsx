import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import has from '@dojo/framework/has/has';

import * as css from './Footer.m.css';

import { FooterLink } from '../../interfaces';

interface FooterProperties {
	footerLinks: FooterLink[];
	author: string;
}

const dateFormatter = new Intl.DateTimeFormat('en-US');

function createLinks(links: FooterLink[]) {
	return links.map(({ href, text }) => [
		<a key={href} href={href} target="_blank">
			{text}
		</a>,
		<br />
	]);
}

export default class Footer extends WidgetBase<FooterProperties> {
	protected render() {
		const { author, footerLinks } = this.properties;
		const d = new Date();
		const buildTime = has('build-time-render') ? dateFormatter.format(d) : null;
		const name = has('build-time-render') ? author : null;
		const links = createLinks(footerLinks);
		return (
			<footer key="footer" classes={[ css.root ]}>
				<span>&copy; 2019 {name}</span>
				<br />
				{links}
				<span classes={[ css.details ]} key="footer">
					Last build: {buildTime}
				</span>
			</footer>
		);
	}
}
