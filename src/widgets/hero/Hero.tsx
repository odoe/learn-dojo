import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

import * as css from './Hero.m.css';

export default class Hero extends WidgetBase {
	protected render() {
		return <div classes={[ css.root ]} />;
	}
}
