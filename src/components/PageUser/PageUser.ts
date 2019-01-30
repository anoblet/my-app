import { html, LitElement, property } from "lit-element";
import { Mixin } from "../../../packages/Mixin";
import { BaseMixin } from "../../../packages/BaseMixin";
import { TaskMixin } from "../../../packages/TaskMixin";
import { connect } from "pwa-helpers/connect-mixin.js";
import { store } from "../../Store";
import { StateMixin } from "../../../packages/StateMixin";
import { FirebaseMixin } from "../../../packages/FirebaseMixin";
import Template from "./PageUserTemplate";
import * as Style from "./PageUser.scss";
import { until } from "lit-html/directives/until";
import { AppUser } from "../AppUser/AppUser";
import { signOut } from "../../User";

export class PageUser extends Mixin(connect(store)(LitElement), [
  TaskMixin,
  StateMixin,
  FirebaseMixin
]) {
  @property({ type: String }) action: string = "index";

  connectedCallback() {
    super.connectedCallback();
    this[this.action]();
  }

  index() {
    this._template = html`
      ${until(this.getActionTemplate("index"), "")}
    `;
  }

  signin() {}

  signout() {
    this._template = html`
      <pre>${this.state}</pre>
    `;
    signOut();
  }

  getActionTemplate(action: string) {
    return import(`./${action}`).then((module: any) => {
      return module.default.bind(this)(this.state);
    });
  }

  render() {
    return html`
      ${this._template}
    `;
  }
}

window.customElements.define("page-user", PageUser);
