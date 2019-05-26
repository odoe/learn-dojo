import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import Block from '@dojo/framework/widget-core/meta/Block';
import { tsx } from '@dojo/framework/widget-core/tsx';

import compileBlogIndex from '../blocks/compile-blog-index.block';

import Post from '../templates/blog-post/BlogPost';

import * as css from './Blog.m.css';
import Outlet from '@dojo/framework/routing/Outlet';

export default class Blog extends WidgetBase<{ standalone?: boolean }> {
	protected render() {
		const { standalone = false } = this.properties;
		const blogs: any = this.meta(Block).run(compileBlogIndex)({});
		console.log('standalone?', standalone);
		return (
			<div classes={[ css.root ]}>
				{!standalone ? (
					blogs && blogs.map((blog: any) => [ <Post path={blog.file} excerpt />, <hr /> ])
				) : (
					undefined
				)}
				<Outlet
					id="blog-post"
					renderer={({ params }) => {
						return <Post path={params.path} />;
					}}
				/>
			</div>
		);
	}
}
