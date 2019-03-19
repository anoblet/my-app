import { html } from "lit-element";
import { isAdmin } from "../../User";

export default function() {
  return html`
    <grid-component id="content-grid">
      <card-component title="Components">
        <div slot="content">
          <ul>
            ${this.components.map(
              (component: any) => html`
                <li>
                  <a href="/components/${component.tag}">${component.name}</a>
                </li>
              `
            )}
            ${true // isAdmin()
              ? html`
                  <a href="/components/eye-exam"><li>Eye Exam</li></a>
                  <a href="/components/collection-list"
                    ><li>Collection list</li></a
                  >
                  <a href="/components/color-picker"><li>Color</li></a>
                  <a href="/components/dasboard-component"
                    ><li>Dashboard component</li></a
                  >
                  <a href="/components/lights-component"
                    ><li>Philips Hue</li></a
                  >
                  <a href="/components/philips-hue-demo"
                    ><li>Philips Hue Demo</li></a
                  >
                  <a href="/components/contacts-component"><li>Contacts</li></a>
                  <a href="/components/muuri-component"><li>muuri</li></a>
                `
              : ""}
          </ul>
        </div></card-component
      >
    </grid-component>
  `;
}
