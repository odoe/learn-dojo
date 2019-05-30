import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';

import Button from '@dojo/widgets/button';

import * as css from './SignUp.m.css';

export default class SignUp extends WidgetBase {
	protected render() {
		return (
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
							<div classes={[ css.column, css.gdpr ]}>
								<h3 classes={[ css.title ]}>
									<strong>Subscribe to newsletter</strong>
								</h3>
								<div classes={[ css.info ]}>
									<div>
										<label>Marketing Permissions</label>
										<p>Please select all the ways you would like to hear from odoenet:</p>
										<fieldset classes={[ css.fieldset ]} name="interestgroup_field">
											<label classes={[ css.gdprcheck ]} for="gdpr_7561">
												<input
													type="checkbox"
													id="gdpr_7561"
													name="gdpr[7561]"
													value="Y"
													classes={[ css.checkbox ]}
												/>
												<span>Email</span>{' '}
											</label>
										</fieldset>
										<p>
											You can unsubscribe at any time by clicking the link in the footer of our
											emails. For information about our privacy practices, please visit our
											website.
										</p>
									</div>
								</div>
							</div>
							<div classes={[ css.column ]}>
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
		);
	}
}
