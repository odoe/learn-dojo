import WidgetBase from "@dojo/framework/widget-core/WidgetBase";
import { tsx } from "@dojo/framework/widget-core/tsx";
import Link from "@dojo/framework/routing/Link";

import * as css from "./Header.m.css";

export default class Header extends WidgetBase<{ title: string }> {
  protected render() {
    const { title } = this.properties || "My Site";
    return (
      <header classes={[ css.root ]}>
        <div classes={[ css.title ]}>
          <Link to="/" isOutlet={false} classes={[ css.link ]}>
            {title}
          </Link>
        </div>
      </header>
    );
  }
}
