import { tsx, create } from '@dojo/framework/core/vdom';
import Outlet from '@dojo/framework/routing/Outlet';

import Blog from './pages/Blog';
import BlogList from './blog-list/BlogList';

import Layout from './layouts/Layout';

import { AppProperties } from './interfaces';

const factory = create().properties<AppProperties>();

export default factory(({ properties }) => {
	const { siteMeta } = properties();
	return (
		<Layout {...siteMeta}>
			<Outlet
				id="main"
				matcher={(matches, matchMap) => {
					matches.list = matchMap.has('list') && matchMap.get('list')!.isExact();
					return matches;
				}}
			>
				{{
					list: <BlogList />,
					blog: ({ params: { path } }) => <Blog path={path} />,
				}}
			</Outlet>
		</Layout>
	);
});
