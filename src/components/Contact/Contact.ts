import { LitElement, customElement, html } from "lit-element";

import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import template from "./ContactTemplate";
import { toast } from "../Toast/Toast";

@customElement("contact-component")
export class Contact extends LitElement {
  public send() {
    setTimeout(() => toast("Our email has not been set up yet :/"), 2000);
  }

  static styles = [GlobalStyle, Style];

  public render() {
    return html`
      ${template.bind(this)()}
    `;
  }
}
