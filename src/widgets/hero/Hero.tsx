import { tsx, create } from '@dojo/framework/core/vdom';
import breakpoint from '@dojo/framework/core/middleware/breakpoint';
import icache from '@dojo/framework/core/middleware/icache';

import * as css from './Hero.m.css';

const factory = create({ breakpoint, icache }).properties<{ description: string }>();

const imageMap = {
  SM: `/assets/images/learn-dojo-jumbotron-md`,
  MD: `/assets/images/learn-dojo-jumbotron-md`,
  LG: `/assets/images/learn-dojo-jumbotron-lg`,
  XL: `/assets/images/learn-dojo-jumbotron-xl`
};

const ELEMENT_KEY = 'hero-element';

export default factory(({ properties, middleware: { breakpoint, icache } }) => {
  const bp = icache.getOrSet('breakpoint', 'MD');
  const size = breakpoint.get(ELEMENT_KEY);
  if (size) {
    icache.set('breakpoint', size?.breakpoint);
  }
  const image = imageMap[bp];
  const { description } = properties();
  return (
    <div classes={[css.root]} key={ELEMENT_KEY}>
    <picture>
      <source type="image/webp" srcset={`${image}.webp`}/>
      <source type="image/jpeg" srcset={`${image}.jpg`}/>
      <img alt={description} loading="lazy" classes={[ css.image ]} src={`${image}.jpg`} />
    </picture>
      <h3 classes={[css.description]}>{description}</h3>
    </div>
  );
});
