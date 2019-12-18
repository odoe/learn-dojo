import { tsx, create } from '@dojo/framework/core/vdom';

import * as css from './Hero.m.css';

const factory = create().properties<{ description: string }>();

export default factory(({ properties }) => {
  const { description } = properties();
  return (
    <div classes={[css.root]}>
    <picture>
      <source
        type="image/webp"
        srcset="
        /assets/images/learn-dojo-jumbotron-md.webp 576w,
        /assets/images/learn-dojo-jumbotron-lg.webp 768w,
        /assets/images/learn-dojo-jumbotron-xl.webp 960w
      "/>
      <source
        type="image/jpeg"
        srcset="
        /assets/images/learn-dojo-jumbotron-md.jpg 576w,
        /assets/images/learn-dojo-jumbotron-lg.jpg 768w,
        /assets/images/learn-dojo-jumbotron-xl.jpg 960w
      "/>
      <img alt={description} loading="lazy" classes={[ css.image ]} src="/assets/images/learn-dojo-jumbotron-xl.jpg" />
    </picture>
      <h3 classes={[css.description]}>{description}</h3>
    </div>
  );
});
