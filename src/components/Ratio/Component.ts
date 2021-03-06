import { LitElement, customElement, property } from "lit-element";

import { ResizeObserver } from "resize-observer";
import Style from "./Style";
import Template from "./Template";

@customElement("ratio-component")
export class RatioComponent extends LitElement {
  public static styles = Style;
  public render = Template.bind(this);

  @property() public ratio: number = 1;
  @property() public width: number = 0;

  public connectedCallback() {
    super.connectedCallback();

    // Register observer
    this.observeResize();
  }

  // Fire event on property change
  public updated(changedProperties) {
    if (changedProperties.has("ratio")) this.onResize(this.width);
  }

  // Observer
  public observeResize() {
    const resizeObserver = new ResizeObserver((entries: any) => {
      for (const entry of entries) {
        this.width = entry.contentRect.width;
        // Fire event
        this.onResize(this.width);
      }
    });
    resizeObserver.observe(this);
  }

  // Event
  public onResize(width: number) {
    const height = width * this.ratio;
    this.style.setProperty("height", height + "px");
  }
}
