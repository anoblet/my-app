import { html } from "lit-element";
import { printContent } from "../../Utility";

export default function() {
  return html`
    <card-component title="Contacts">
      <grid-component>
        <card-component>Monitor eye-contacts (RGP or rigid gas permeable lens) usage</card-component>
        <card-component>
          <grid-component id="buttons">
            <button-component label="In" @click=${this.in}></button-component>
            <button-component label="Out" @click=${this.out}></button-component>
          </grid-component>
        </card-component>
        <card-component>
          <grid-component id="log">
            ${this.data &&
              this.data.log &&
              this.data.log.map(
                (entry: any) => html`
                  <div>
                    ${entry.type}
                  </div>
                  <div>${new Date(entry.time).toLocaleString()}</div>
                `
              )}
          </grid-component>
          <!-- <button-component
            label="Print"
            @click=${() => printContent(this)}
          ></button-component> -->
        </card-component>
      </grid-component>
    </card-component>
  `;
}
