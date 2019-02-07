import { html, LitElement, property } from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import style from "./PageComponentsStyle";
import template from "./PageComponentsTemplate";
import GlobalStyle from "../../GlobalStyle";
import { mdToHtml } from "../../../packages/Showdown/Showdown";

import(/* webpackChunkName: "EyeChart" */ "../EyeChart/EyeChartComponent");
import(/* webpackChunkName: "EyeExam" */ "../EyeExam/EyeExamComponent");
import(/* webpackChunkName: "WebSpeech" */ "../WebSpeech/WebSpeechComponent");
import(/* webpackChunkName: "PropertyEditor" */ "../PropertyEditor/PropertyEditor");

const components = ["eye-chart"];

export class PageComponents extends LitElement {
  @property() public component: string;

  public firstUpdated() {
    // if(this.component)
  }

  static get styles() {
    return [GlobalStyle, style];
  }

  get template() {
    if (!this.component) return template.bind(this)();
    else {
      return html`
        ${unsafeHTML(`<${this.component}></${this.component}>`)}
      `;
    }
  }

  public render() {
    return this.template;
  }
}

window.customElements.define("page-components", PageComponents);
