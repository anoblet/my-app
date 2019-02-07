import { html, LitElement, property } from "lit-element";
import { connect } from "pwa-helpers/connect-mixin.js";
import { Mixin } from "../../../packages/Mixin";
import { store } from "../../Store";
import * as style from "./ProfileMenu.scss";
import template from "./ProfileMenuTemplate";
import { StateMixin } from "../../../packages/StateMixin";
import GlobalStyle from "../../GlobalStyle";

export class ProfileMenu extends Mixin(connect(store)(LitElement), [
  StateMixin
]) {
  @property({ type: Boolean, reflect: true })
  public hidden: boolean = true;
  public handler: any;

  public connectedCallback() {
    super.connectedCallback();
    this.handler = (e: any) => {};
  }

  public firstUpdated() {
    // Close ProfileMenu on link click
    const links = this.shadowRoot.querySelectorAll("a");
    links.forEach((link: any) =>
      link.addEventListener("click", this._closeProfileMenu.bind(this))
    );
  }

  public close() {
    this.hidden = true;
  }

  public open() {
    this.hidden = false;
  }

  // Handlers
  public _closeProfileMenu() {
    this.hidden = true;
  }

  static get styles() {
    return GlobalStyle;
  }

  public render() {
    return html`
      <style>
        ${style}
      </style>
      ${template.bind(this)(this.state)}
    `;
  }
}

window.customElements.define("profile-menu", ProfileMenu);
