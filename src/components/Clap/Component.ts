import { LitElement, css, customElement, property } from "lit-element";

import Template from "./Template";

@customElement("component-clap")
export class Clap extends LitElement {
  public static styles = css`
    :host {
      background: blue;
    }
  `;
  
  public render = Template.bind(this);

  @property({ type: Number }) public count = 0;

  public increaseCount() {
    this.count++;
    this.dispatchEvent(
      new CustomEvent("count-changed", {
        detail: {
          count: this.count
        }
      })
    );
  }
}
