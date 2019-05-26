import renderer from '@dojo/framework/widget-core/vdom';
import Registry from '@dojo/framework/widget-core/Registry';
import { tsx } from '@dojo/framework/widget-core/tsx';
import { registerRouterInjector } from '@dojo/framework/routing/RouterInjector';
import { registerThemeInjector } from '@dojo/framework/widget-core/mixins/Themed';
import { StateHistory } from '@dojo/framework/routing/history/StateHistory';

import dojo from '@dojo/themes/dojo';
import '@dojo/themes/dojo/index.css';

import './typography';

import routes from './routes';
import siteConfig from './site-config';
import App from './App';

const registry = new Registry();
const router = registerRouterInjector(routes, registry, { HistoryManager: StateHistory });
registerThemeInjector(dojo, registry);

router.on('outlet', ({ outlet, action }) => {
	console.log('outlet action', action, outlet);
	if (action === 'enter') {
		console.log('outlet?', outlet);
		if (outlet.id === 'blog-post') {
			// do something, perhaps fetch data or set state
			console.log('entering blog post');
		}
	}
});

const r = renderer(() => <App siteConfig={siteConfig} />);
const domNode = document.getElementById('root') as HTMLElement;
r.mount({ registry, domNode });
