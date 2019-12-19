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
        /assets/images/learn-dojo-jumbotron-320.webp 320w,
        /assets/images/learn-dojo-jumbotron-640.webp 640w,
        /assets/images/learn-dojo-jumbotron-768.webp 768w,
        /assets/images/learn-dojo-jumbotron-1024.webp 1024w,
        /assets/images/learn-dojo-jumbotron-1366.webp 1366w,
        /assets/images/learn-dojo-jumbotron-1600.webp 1600w,
        /assets/images/learn-dojo-jumbotron-1920.webp 1920w
      "/>
      <source
        type="image/jpeg"
        srcset="
        /assets/images/learn-dojo-jumbotron-320.jpg 320w,
        /assets/images/learn-dojo-jumbotron-640.jpg 640w,
        /assets/images/learn-dojo-jumbotron-768.jpg 768w,
        /assets/images/learn-dojo-jumbotron-1024.jpg 1024w,
        /assets/images/learn-dojo-jumbotron-1366.jpg 1366w,
        /assets/images/learn-dojo-jumbotron-1600.jpg 1600w,
        /assets/images/learn-dojo-jumbotron-1920.jpg 1920w
      "/>
      <img alt={description} loading="lazy" classes={[ css.image ]} src="/assets/images/learn-dojo-jumbotron-768.jpg" />
    </picture>
      <h3 classes={[css.description]}>{description}</h3>
    </div>
  );
});
