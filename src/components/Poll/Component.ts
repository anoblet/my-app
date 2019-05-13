import { LitElement, customElement } from "lit-element";
import Style from "./Style";
import Template from "./Template";
import Properties from "./Properties";

/**
 * Poll component
 */
@customElement("poll-component")
export class Component extends LitElement {
  public static properties = Properties;
  public static styles = Style;
  public template = Template;
  public render = this.template.bind(this);

  public createDialog() {
    this.shadowRoot.querySelector("#create-dialog").removeAttribute("hidden");
  }
}