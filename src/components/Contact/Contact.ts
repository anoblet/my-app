import { html, LitElement, customElement, property } from "lit-element";
import { connect } from "pwa-helpers/connect-mixin.js";
import { Mixin } from "../../../packages/Mixin";
import { store } from "../../store";
import * as style from "./Contact.scss";
import template from "./ContactTemplate";
import styles from "../../styles";

@customElement("contact-component")
export class Contact extends LitElement {
  static get styles() {
    return [styles];
  }
  render() {
    return html`
      <style>
        ${style}
      </style>
      ${template.bind(this)()}
    `;
  }
}
