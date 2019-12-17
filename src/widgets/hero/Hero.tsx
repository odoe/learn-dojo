import { tsx, create } from '@dojo/framework/core/vdom';

import * as css from './Hero.m.css';

const factory = create().properties<{ description: string }>();

export default factory(({ properties }) => {
  const { description } = properties();
  return (
    <div classes={[css.root]}>
    <picture>
      <source type="image/webp" srcset={'/assets/images/learn-dojo-jumbotron.webp'}/>
      <source type="image/jpeg" srcset={'/assets/images/learn-dojo-jumbotron.jpg'}/>
      <img alt={description} loading="lazy" classes={[ css.image ]} src={'/assets/images/learn-dojo-jumbotron.jpg'} />
    </picture>
      <h3 classes={[css.description]}>{description}</h3>
    </div>
  );
});
