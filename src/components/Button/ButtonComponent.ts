import { css, html, LitElement, customElement, property } from "lit-element";

@customElement("button-component")
export class ButtonComponent extends LitElement {
  @property() public label: string;
  @property() public theme: string = "native";

  static get styles() {
    return [
      css`
        button {
          display: flex;
          flex-grow: 1;
          justify-content: center;
          background: inherit;
          border: 1px solid var(--button-color);
          padding: var(--padding);
          color: var(--button-color);
        }
      `
    ];
  }

  public render() {
    return html`
      ${this.theme === "material"
        ? html`
            <mwc-button label=${this.label}></mwc-button>
          `
        : ""}
      ${this.theme === "native"
        ? html`
            <button>${this.label}</button>
          `
        : ""}
    `;
  }
}