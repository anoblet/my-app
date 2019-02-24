import { LitElement, html, property } from "lit-element";
import {
  addDocument,
  getDocument,
  updateDocument
} from "../../../packages/firebase-helpers";

import { Mixin } from "../../../packages/Mixin";
import { TemplateMixin } from "../../../packages/TemplateMixin";
import globalStyle from "../../GlobalStyle";
import { renderForm } from "../PropertyEditor/PropertyEditor";
import style from "./PostStyle";
import template from "./PostTemplate";
import { toast } from "../../Toast";

import("../../../packages/PellComponent/PellComponent");

export interface PostComponent {
  [key: string]: any; // Add index signature
}

export class PostComponent extends Mixin(LitElement, [TemplateMixin]) {
  @property({ type: Boolean }) public editable: boolean;
  @property({ type: String }) public content: string;
  @property({ type: Boolean }) public create: boolean;

  public template = template;
  @property({ type: Boolean }) public taskPending = true;

  public async beforeRender() {
    return await getDocument({
      path: `posts/${this.id}`
    }).then((document: any) => {
      if (document) {
        Object.keys(document).map((key: any) => (this[key] = document[key]));
        this.taskPending = false;
      }
    });
  }

  public text({ field, value }: any) {
    return html`
      <label>${field.label}</label>:
      <input
        name="${field.name}"
        label="${field.label}"
        type="text"
        value="${value ? value : ""}"
      />
    `;
  }

  public textarea({ field, value }: any) {
    return html`
      <textarea name="${field.name}">${value}</textarea>
    `;
  }

  public submitForm(e: any) {
    e.preventDefault();
    const title = this.shadowRoot.querySelector("[name='title']").value;
    const author = this.shadowRoot.querySelector("[name='author']").value;
    const body = this.shadowRoot.querySelector("[name='body']").value;
    let sortOrder = this.shadowRoot.querySelector("[name='sortOrder']").value;
    sortOrder = parseInt(sortOrder, 10);
    const data: any = {
      title,
      author,
      body,
      sortOrder
    };

    if (this.create) {
      addDocument({ path: "posts", data })
        .then((result: any) => toast("Document added"))
        .catch((error: any) => toast("Error"));
    } else {
      updateDocument({ path: `posts/${this.id}`, data })
        .then((result: any) => {
          this.editable = !this.editable;
        })
        .then(() => toast("Document updated"))
        .catch((error: any) =>
          toast(
            "Error, could not update the document. Maybe you do not have the right permissions?"
          )
        );
    }
  }

  public connectedCallback() {
    super.connectedCallback();
    if (this.id) this.beforeRender();
    else this.taskPending = false;
  }

  public shouldUpdate(changedProperties: any) {
    if (this.taskPending) return false;
    else return super.shouldUpdate(changedProperties);
  }

  // Property editor respects this order...
  static get properties() {
    return {
      id: { disabled: true, label: "ID", type: String },
      title: { label: "Title", type: String, description: "Title of the post" },
      author: { label: "Author", type: String },
      date: { label: "Date", type: String },
      sortOrder: { label: "Sort order", type: Number },
      featured: { label: "Featured", type: Boolean },
      body: { label: "Body", type: String, inputType: "pell" }
    };
  }

  static get styles() {
    return [globalStyle, style];
  }

  public render() {
    // @ts-ignore
    console.log(this.body);
    return html`
      <card-component>
        ${renderForm(
          this,
          null,
          (_property: string, value: any) => (this[_property] = value)
        )}
        <div slot="actions">
          <mwc-button outlined @click=${(e: any) => this.submitForm(e)}
            >Save</mwc-button
          >
        </div>
      </card-component>
    `;
  }
}

window.customElements.define("post-component", PostComponent);
