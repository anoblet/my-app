import { LitElement, customElement, property, html } from "lit-element";

import Style from "./Style";
import Template from "./Template";

/**
 * Almanac class
 * Position could be defined with an x,y value indicating category, topic
 * Horizontal navitation would reset y
 * @todo lazy-load documents one degree in any direction, re-run after position change
 */
@customElement("component-almanac")
export class Almanac extends LitElement {
  public static styles = Style;
  public render = Template.bind(this);

  public x = 0;
  public y = 0;

  public async loadDocument(categoryID, topicId) {}

  // Handlers
  public swap(direction) {
    let spread;
    const currentDocument = () => {
      switch (direction) {
        case "up": {
          spread = { x: this.x, y: this.y - 1 };
        }
        case "right": {
          spread = { x: this.x + 1, y: this.y };
        }
        case "down": {
          spread = { x: this.x, y: this.y + 1 };
        }
        case "left": {
          spread = { x: this.x - 1, y: this.y };
        }
      }
      return this.loadDocument(spread.x, spread.y);
    };
  }

  public up() {
    return this.loadDocument(this.x, this.y - 1);
  }

  public right() {
    return this.loadDocument(this.x + 1, 0);
  }

  public down() {
    return this.loadDocument(this.x, this.y + 1);
  }

  public left() {
    return this.loadDocument(this.x - 1, 0);
  }
}
