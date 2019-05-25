import "../Dialog/Component";

import { delete_outline } from "../../Icons";
import { html } from "lit-element";
const readme = require("./readme.md");
import { unsafeHTML } from "lit-html/directives/unsafe-html"

export default function() {
  return html`
    <grid-component>
      ${unsafeHTML(readme)}
      <button-component
        label="Create"
        outlined
        @click=${this.showCreateDialog}
      ></button-component>
      <h2>Polls</h2>
      <grid-component id="list"
        ><span>Title</span> ${this.polls.map(
          poll =>
            html`
              <a href="/poll/${poll.id}">${poll.title}</a>
            `
        )}</grid-component
      >
    </grid-component>
    <dialog-component id="create-dialog" fixed
      ><h3 slot="title">Create</h3>
      <div slot="content">${createDialog.bind(this)()}</div></dialog-component
    >
  `;
}

const createDialog = function() {
  return html`
    <grid-component>
      <form id="form-create">
        <grid-component>
          <grid-component id="title-container">
            <label for="title">Title</label
            ><input
              id="title"
              type="text"
              name="title"
              .value=${this.title}
              @input=${e => (this.title = e.target.value)}
            />
          </grid-component>
          <div id="actions">
            <button-component
              label="Add item"
              @click=${this.addItem}
            ></button-component>
            <button-component
              label="Save"
              @click=${this.save}
            ></button-component>
          </div>
          <grid-component id="option-container">
            ${this.items.map(
              (item: any, index: number) =>
                html`
                  <label>#${index}</label>
                  <input
                    type="text"
                    .value=${item}
                    @input=${(e: any) => (this.items[index] = e.target.value)}
                  />
                  <span class="icon" @click=${() => this.removeItem(index)}
                    >${delete_outline}</span
                  >
                `
            )}
          </grid-component>
        </grid-component>
      </form>
      <card-component title="Form data">
        Title: ${JSON.stringify(this.title)} Items:
        ${JSON.stringify(this.items)}
      </card-component>
    </grid-component>
  `;
};
