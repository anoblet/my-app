import "./Component";

import { LitElement, css, customElement, html } from "lit-element";

import { BeforeRender } from "@anoblet/mixins";

import GlobalStyle from "../../GlobalStyle";

@customElement("dialog-component-demo")
export class Demo extends BeforeRender(LitElement) {
  public static styles = [
    GlobalStyle,
    css`
      :host {
        flex: 1;
        contain: initial;
      }
    `
  ];

  public async beforeRender() {
    return;
  }

  public render() {
    return html`
      <card-component
        ><button-component
          label="Open"
          @click=${this.openDialog}
        ></button-component
      ></card-component>
      <dialog-component id="dialog" fixed
        ><span slot="title">Title</span>
        <div slot="content">
          This is my dialog
        </div>
      </dialog-component>
    `;
  }

  public openDialog() {
    const dialog: any = this.shadowRoot.querySelector("#dialog");
    dialog.open();
  }
}
