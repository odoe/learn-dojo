import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Link from '@dojo/framework/routing/ActiveLink';
import Toolbar from '@dojo/widgets/toolbar';

import * as css from './Header.m.css';

const extendedCSS = {
	'@dojo/widgets/toolbar': {
		root: [ css.root ],
		menuButton: [ css.menu ]
	},
	'@dojo/widgets/slide-pane': {
		content: [ css.content ]
	}
};

export default class Header extends WidgetBase<{ title: string }> {
	protected render() {
		const { title } = this.properties || 'My Site';
		return (
			<header>
				<Toolbar classes={extendedCSS} heading={title} collapseWidth={600}>
					<Link to="home" classes={[ css.link ]} activeClasses={[ css.selected ]}>
						Home
					</Link>
					<Link to="blog" classes={[ css.link ]} activeClasses={[ css.selected ]}>
						Blog
					</Link>
				</Toolbar>
			</header>
		);
	}
}
