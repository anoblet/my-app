import * as style from "./PostComponent.scss";

import { LitElement, html, property } from "lit-element";

import { FirebaseMixin } from "../../packages/FirebaseMixin";
import { TemplateMixin } from "../../packages/TemplateMixin";
import { Mixin } from "../../packages/Mixin";
import model from "./PostModel";
import { navigate } from "lit-redux-router";
import Template from "./PostComponentTemplate.ts";
import { store } from "../Store";
import { addDocument } from "../../packages/firebase-helpers";
import { getDocument } from "../../packages/firebase-helpers";
import { updateDocument } from "../../packages/firebase-helpers";

import("../../packages/PellComponent/PellComponent");

export interface PostComponent {
  [key: string]: any; // Add index signature
}

export class PostComponent extends Mixin(LitElement, [
  FirebaseMixin,
  TemplateMixin
]) {
  @property({ type: Boolean }) editable: boolean;
  @property({ type: String }) id: string;
  @property({ type: String }) author: string;
  @property({ type: String }) title: string;
  @property({ type: String }) content: string;
  @property({ type: Boolean }) create: boolean;

  template = Template;

  constructor() {
    super();
    this.model = model;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.id)
      getDocument({
        path: `posts/${this.id}`,
        callback: (document: any) => {
          if (document) {
            const keys = Object.keys(document);
            keys.map((key: any) => (this[key] = document[key]));
            this.requestUpdate();
          }
        },
        watch: true
      });
  }

  text({ field, value }: any) {
    return html`
      ${field.label}
      <input
        name="${field.name}"
        label="${field.label}"
        value="${value ? value : ""}"
      ></input>
    `;
  }

  textarea({ field, value }: any) {
    return html`
      <textarea name="${field.name}">${value}</textarea>
    `;
  }

  submitForm(e: any) {
    e.preventDefault();
    const title = this.shadowRoot.querySelector(
      "[name='title']"
    ) as HTMLInputElement;
    const author = this.shadowRoot.querySelector(
      "[name='author']"
    ) as HTMLInputElement;
    const content = this.shadowRoot.querySelector(
      "[name='content']"
    ) as HTMLInputElement;
    const data: any = {
      title: title.value,
      author: author.value,
      content: content.value
    };

    if (this.create) {
      addDocument({ path: "posts", data }).then((result: any) => {
        store.dispatch(navigate(`/post/read/${result}`));
      });
    } else {
      updateDocument({ path: `posts/${this.id}`, data }).then((result: any) => {
        this.editable = !this.editable;
      });
    }
  }
}

window.customElements.define("post-component", PostComponent);
