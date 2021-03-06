import { LitElement, customElement, html, property } from "lit-element";

import { BeforeRender } from "@anoblet/mixins";
import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";
import { components } from "../../Components";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

@customElement("page-components")
export class PageComponents extends BeforeRender(LitElement) {
  @property() public component: string;
  @property() public components = components;

  public static styles = [GlobalStyle, Style];

  public async beforeRender() {
    if (this.component)
      components.map((component: any) => {
        if (component.tag === this.component) component.src();
      });
    this.components.sort((a, b) => (a.label > b.label ? 1 : -1));
  }

  public render() {
    const element: any = document.createElement(this.component);
    this.renderRoot.appendChild(element);

    return this.component
      ? html`
          ${unsafeHTML(`<${this.component}></${this.component}>`)}
        `
      : Template.bind(this)();
  }
}
