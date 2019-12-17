import { tsx, create } from '@dojo/framework/core/vdom';
// import theme from '@dojo/framework/core/middleware/theme';

import * as css from './Article.m.css';

const factory = create();

export default factory(({ children }) => {
  return <article classes={[ css.root ]}>{children()}</article>
});
