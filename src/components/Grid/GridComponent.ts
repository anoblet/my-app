import { LitElement, css, customElement } from "lit-element";

import template from "./GridTemplate";

@customElement("grid-component")
export class GridComponent extends LitElement {
  static get styles() {
    return css`
      :host {
        display: grid;
        grid-gap: var(--grid-gap, 1em);
      }
    `;
  }
  public render() {
    return template.bind(this)();
  }
}
