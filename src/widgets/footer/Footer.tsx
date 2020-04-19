import { tsx, create } from '@dojo/framework/core/vdom';

import * as css from './Footer.m.css';

import { FooterLink } from '../../interfaces';

interface FooterProperties {
  footerLinks: FooterLink[];
  author: string;
}

const dateFormatter = new Intl.DateTimeFormat('en-US');

function asImage({logo, text}: Pick<FooterLink, 'logo' | 'text'>) {
  return (
    <picture>
      <source type="image/webp" srcset={logo?.replace(/\.(jpg|png)/, '.webp')}/>
      <source type="image/jpeg" srcset={logo}/>
      <img alt={text} loading="lazy" classes={[ css.logo ]} src={logo} />
    </picture>
  );
}

function createLinks(links: FooterLink[]) {
  return links.map(({ href, text, logo }) => (
    <a classes={[css.link]} key={href} href={href} rel="noopener noreferrer" target="_blank" aria-label={text}>
      {logo ? asImage({logo, text}) : <virtual><br />{text}</virtual>}
    </a>
  ));
}

const factory = create().properties<FooterProperties>();

export default factory(({ properties }) => {
  const { author, footerLinks } = properties();
  const d = new Date();
  // const buildTime = has('build-time-render') ? dateFormatter.format(d) : null;
  // const name = has('build-time-render') ? author : null;
  const buildTime = dateFormatter.format(d);
  const name = author;
  const links = createLinks(footerLinks);
  return (
    <footer key="footer" classes={[css.root]}>
      <span>&copy; {`${d.getFullYear()}, ${name}`}</span>
      <br />
      <div>
      {links}
      </div>
      <br />
      <span classes={[css.details]} key="footer">
        Last build: {`${buildTime}`}
      </span>
      <br />
    </footer>
  );
});
