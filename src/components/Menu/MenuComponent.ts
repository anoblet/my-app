import "@material/mwc-fab";

import { LitElement, html } from "@polymer/lit-element";

import { BaseMixin } from "../../../packages/BaseMixin";
import { Mixin } from "../../../packages/Mixin";
import Template from "./MenuTemplate";

export class MenuComponent extends Mixin(LitElement, [BaseMixin]) {
  public render() {
    return Template.bind(this)(this);
  }
}

window.customElements.define("menu-component", MenuComponent);
