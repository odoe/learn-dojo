import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

import * as css from './Hero.m.css';

export default class Hero extends WidgetBase<{ description: string }> {
	protected render() {
		const { description } = this.properties;
		return (
			<div classes={[css.root]}>
				<h3 classes={[css.description]}>{description}</h3>
			</div>
		);
	}
}
