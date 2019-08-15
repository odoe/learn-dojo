import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';

import * as css from './Article.m.css';

const factory = create({ theme });

export default factory(({ children, middleware: { theme } }) => {
  const { root } = theme.classes(css);
  return <article classes={[ root ]}>{children}</article>
});
