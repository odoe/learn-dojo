import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import ThemedMixin, { theme, ThemedProperties } from '@dojo/framework/widget-core/mixins/Themed';

import * as css from './Content.m.css';

@theme(css)
export default class Content extends ThemedMixin(WidgetBase)<ThemedProperties> {
	protected render() {
		return <article classes={[ this.theme(css.root) ]}>{this.children}</article>;
	}
}
