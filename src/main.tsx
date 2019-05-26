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
registerRouterInjector(routes, registry, { HistoryManager: StateHistory });
registerThemeInjector(dojo, registry);

const r = renderer(() => <App siteConfig={siteConfig} />);
const domNode = document.getElementById('root') as HTMLElement;
r.mount({ registry, domNode });
