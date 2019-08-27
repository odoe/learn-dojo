import { tsx, create } from '@dojo/framework/core/vdom';

import Footer from '../widgets/footer/Footer';
import Header from '../widgets/header/Header';
import Hero from '../widgets/hero/Hero';
import SignUp from '../widgets/signup/SignUp';

import * as css from './Layout.m.css';

import { SiteMeta } from '../interfaces';

const factory = create().properties<SiteMeta>();

export default factory(({ children, properties }) => {
  const { title, description, author, footerLinks } = properties();

  return (
    <div classes={[ css.root ]}>
      <Header title={title} />
      <Hero description={description} />
      <main classes={[ css.section ]}>{children()}</main>
      <SignUp />
      <Footer {...{ author, footerLinks }} />
    </div>
  );
});

