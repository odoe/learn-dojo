import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Outlet from '@dojo/framework/routing/Outlet';

import Home from './pages/Home';
import Blog from './pages/Blog';

import Layout from './layouts/Layout';

import { AppProperties } from './interfaces';

export default class App extends WidgetBase<AppProperties> {
	protected render() {
		return (
			<Layout {...this.properties.siteConfig}>
				<Outlet key="home" id="home" renderer={() => <Home />} />
				<Outlet
					key="blog"
					id="blog"
					renderer={(matchDetails) => {
						console.log('route', matchDetails);
						if (matchDetails.isExact()) {
							return <Blog />;
						}
						return <Blog standalone />;
					}}
				/>
			</Layout>
		);
	}
}
