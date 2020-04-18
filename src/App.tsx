import { tsx, create } from '@dojo/framework/core/vdom';
import Route from '@dojo/framework/routing/Route';

import Blog from './pages/Blog';
import BlogList from './blog-list/BlogList';

import Layout from './layouts/Layout';

import { AppProperties } from './interfaces';

const factory = create().properties<AppProperties>();

export default factory(({ properties }) => {
  const { siteMeta } = properties();
  return (
    <Layout { ...siteMeta}>
      <Route
        id="blog"
        renderer={(matchDetails) => {
          const { params } = matchDetails;
          if (params.path && params.path !== '') {
            return <Blog path={params.path} />;
          }
          return <BlogList />;
        }}
      />
    </Layout>
  );
});
