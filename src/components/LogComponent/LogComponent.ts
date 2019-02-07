import { LitElement, customElement, html } from "lit-element";

import { getHistory } from "../../Debug";

@customElement("log-component")
export class Log extends LitElement {
  public render() {
    const history = getHistory();
    return html`
      <ul>
        ${history.map(
          (item: any, index: number) =>
            html`
              ${!index
                ? html`
                    <li>...${Math.round(item.time)}ms</li>
                    <li>${item.message}</li>
                  `
                : html`
                    <li>
                      ${item.message}
                      (+${Math.round(item.time - history[index - 1].time)}ms)
                    </li>
                  `}
            `
        )}
      </ul>
    `;
  }
}
