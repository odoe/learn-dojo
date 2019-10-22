import { tsx, create } from '@dojo/framework/core/vdom';

import Button from '@dojo/widgets/button';

import * as css from './SignUp.m.css';

const factory = create();

export default factory(() => (
  <aside classes={[ css.root ]}>
    <div classes={[ css.email ]}>
      <form
        classes={[ css.form ]}
        action="https://odoe.us9.list-manage.com/subscribe/post?u=711bff655927baa32886103d5&amp;id=6d978f8bcf"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        target="_blank"
        novalidate
      >
        <div classes={[ css.gridcontainer ]}>
          <div classes={[ css.column ]}>
            <h3 classes={[ css.title ]}>
              <strong>Subscribe to newsletter</strong>
            </h3>
            <div>
              <input
                placeholder="Your email"
                type="email"
                value=""
                name="EMAIL"
                classes={[ css.input ]}
                id="mce-EMAIL"
              />
            </div>
            <div>
              <input
                placeholder="Your first name"
                type="text"
                value=""
                name="FNAME"
                classes={[ css.input ]}
                id="mce-FNAME"
              />
            </div>
            <Button type="submit">Submit</Button>
            <div classes={[ css.info ]}>
              <p>
                We use Mailchimp as our marketing platform. By clicking below to subscribe, you
                acknowledge that your information will be transferred to Mailchimp for
                processing.{' '}
                <a href="https://mailchimp.com/legal/" target="_blank">
                  Learn more about Mailchimp's privacy practices here.
                </a>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  </aside>
));
