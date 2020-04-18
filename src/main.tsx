import renderer, { tsx } from '@dojo/framework/core/vdom';
import Registry from '@dojo/framework/core/Registry';
import { registerRouterInjector } from '@dojo/framework/routing/RouterInjector';
import { StateHistory } from '@dojo/framework/routing/history/StateHistory';

import { meta } from './site-config';
import routes from './routes';
import App from './App';

const registry = new Registry();
const router = registerRouterInjector(routes, registry, { HistoryManager: StateHistory });

const r = renderer(() => <App siteMeta={meta} />);
const domNode = document.getElementById('root') as HTMLElement;
r.mount({ registry, domNode });

router.on('nav', () => scroll(0, 0));
