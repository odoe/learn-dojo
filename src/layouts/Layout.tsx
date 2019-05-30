import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

import Footer from '../widgets/footer/Footer';
import Header from '../widgets/header/Header';
import Hero from '../widgets/hero/Hero';
import SignUp from '../widgets/signup/SignUp';

import * as css from './Layout.m.css';

import { SiteConfig } from '../interfaces';

export default class Layout extends WidgetBase<SiteConfig> {
	protected render() {
		const { title, description, author, footerLinks } = this.properties;
		return (
			<div classes={[css.root]}>
				<Header title={title} />
				<Hero description={description} />
				<main classes={[css.section]}>{this.children}</main>
				<SignUp />
				<Footer {...{ author, footerLinks }} />
			</div>
		);
	}
}
