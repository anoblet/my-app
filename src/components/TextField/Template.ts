import { html } from "lit-element";

export default function() {
  return html`
    <input @input=${this.handleInput} />
  `;
}
