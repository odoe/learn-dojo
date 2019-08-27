import renderer, { tsx } from '@dojo/framework/core/vdom';
import Registry from '@dojo/framework/core/Registry';
import { registerRouterInjector } from '@dojo/framework/routing/RouterInjector';
import { registerThemeInjector } from '@dojo/framework/core/mixins/Themed';
import { StateHistory } from '@dojo/framework/routing/history/StateHistory';

import dojo from '@dojo/themes/dojo';
import '@dojo/themes/dojo/index.css';

import { meta, routes } from './site-config';
import App from './App';

const registry = new Registry();
const router = registerRouterInjector(routes, registry, { HistoryManager: StateHistory });
registerThemeInjector(dojo, registry);

const r = renderer(() => <App siteMeta={meta} />);
const domNode = document.getElementById('root') as HTMLElement;
r.mount({ registry, domNode });

router.on('nav', () => scroll(0, 0));
