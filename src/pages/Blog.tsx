import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import Block from '@dojo/framework/widget-core/meta/Block';
import { tsx } from '@dojo/framework/widget-core/tsx';

import compileBlogIndex from '../blocks/compile-blog-index.block';

import Post from '../templates/blog-post/BlogPost';

import * as css from './Blog.m.css';
// import Outlet from '@dojo/framework/routing/Outlet';

export default class Blog extends WidgetBase<{ standalone?: boolean; path?: string }> {
	protected render() {
		const { standalone = false, path } = this.properties;
		const blogs: any = this.meta(Block).run(compileBlogIndex)({});
		return (
			<div classes={[ css.root ]}>
				{!standalone ? (
					blogs &&
					blogs.map((blog: any) => [
						<Post key={blog.file} path={blog.file} excerpt />,
						<hr key={blog.file} />
					])
				) : (
					undefined
				)}
				{path && path.length && <Post key={path} path={path} />}
			</div>
		);
	}
}
