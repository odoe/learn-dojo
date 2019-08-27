import { tsx, create } from '@dojo/framework/core/vdom';
import * as css from './Hero.m.css';

const factory = create().properties<{ description: string }>();

export default factory(({ properties }) => {
  const { description } = properties();
  return (
    <div classes={[css.root]}>
      <h3 classes={[css.description]}>{description}</h3>
    </div>
  );
});
