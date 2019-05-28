import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Outlet from '@dojo/framework/routing/Outlet';

import Blog from './pages/Blog';

import Layout from './layouts/Layout';

import { AppProperties } from './interfaces';

export default class App extends WidgetBase<AppProperties> {
	protected render() {
		return (
			<Layout {...this.properties.siteConfig}>
				<Outlet
					key="blog"
					id="blog"
					renderer={(matchDetails) => {
						const { params } = matchDetails;
						if (params.path && params.path !== '') {
							return <Blog standalone path={params.path} />;
						}
						return <Blog />;
					}}
				/>
			</Layout>
		);
	}
}
