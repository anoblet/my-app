import { customElement, html, LitElement, property } from "lit-element";
import { getLights } from "./PhilipsHue";
import { BeforeRender } from "../../mixins/BeforeRender";

import("./LightComponent");

@customElement("lights-component")
export class Lights extends BeforeRender(LitElement) {
  @property() public lights: any;

  constructor() {
    super();
  }

  public async beforeRender() {
    const lights = await getLights({
      ip: "192.168.43.221",
      user: "mWHCs99pkPAniHe0lsSG8ES7qG1xDF8qDQw0h0dN",
      id: 4
    });
    const keys = Object.keys(lights);
    const lightArray: any = [];
    keys.map((key: any) => {
      lightArray.push({ id: key, ...lights[key] });
    });
    this.lights = lightArray;
  }

  public render() {
    return html`
      <grid-component>
        ${this.lights.map((light: any) => {
          return html`
            <light-component .lightId=${light.id}></light-component>
          `;
        })}
      </grid-component>
    `;
  }
}
