import { tsx, create } from '@dojo/framework/core/vdom';
import has from '@dojo/framework/core/has';

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

const factory = create().properties<FooterProperties>();

export default factory(({ properties }) => {
  const { author, footerLinks } = properties();
  const d = new Date();
  const buildTime = has('build-time-render') ? dateFormatter.format(d) : null;
  const name = has('build-time-render') ? author : null;
  const links = createLinks(footerLinks);
  return (
    <footer key="footer" classes={[css.root]}>
      <span>&copy; {d.getFullYear()} {name}</span>
      <br />
      {links}
      <a href="/atom.xml">rss feed</a>
      <br />
      <span classes={[css.details]} key="footer">
        Last build: {buildTime}
      </span>
    </footer>
  );
});
