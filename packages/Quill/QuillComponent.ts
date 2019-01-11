import { LitElement, html, property } from "@polymer/lit-element";
import * as style from "./Quill.scss";
const Quill = require("quill");
import { unsafeHTML } from "lit-html/directives/unsafe-html";

export class QuillComponent extends LitElement {
  @property({ type: Object }) delta: any;
  @property({ type: String }) value: string;
  @property({ type: String }) html: string;
  @property({ type: Boolean }) output: boolean = false;

  firstUpdated() {
    const container = this.shadowRoot.querySelector("#editor");
    const options = {
      theme: "snow"
    };
    const quill = new Quill(container, options);
    console.log(this.value);
    if (this.value) {
      const content = JSON.parse(this.value);
      quill.setContents(content);
    }
    quill.on("text-change", (value: any) => {
      this.value = JSON.stringify(quill.getContents());
      this.html = quill.root.innerHTML;
    });
  }

  render() {
    return html`
      <style>
        ${style}
      </style>
      <div id="editor"></div>
    `;
  }
}

window.customElements.define("quill-component", QuillComponent);
