import { tsx, create } from '@dojo/framework/core/vdom';
import Outlet from '@dojo/framework/routing/Outlet';

import Blog from './pages/Blog';

import Layout from './layouts/Layout';

import { AppProperties } from './interfaces';

const factory = create().properties<AppProperties>();

export default factory(({ properties }) => {
  const { siteMeta } = properties();
  return (
    <Layout { ...siteMeta}>
      <Outlet
        id="blog"
        renderer={(matchDetails) => {
          console.log('OUTLET', matchDetails);
          const { params } = matchDetails;
          console.log('params?', params);
          if (params.path && params.path !== '') {
            return <Blog standalone path={params.path} />;
          }
          return <Blog />;
        }}
      />
    </Layout>
  );
});
