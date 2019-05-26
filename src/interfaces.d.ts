interface FooterLink {
	href: string;
	text: string;
}

export interface SiteConfig {
	title: string;
	author: string;
	footerLinks: FooterLink[];
}

export interface AppProperties {
	siteConfig: SiteConfig;
}
