import { LitElement, css, customElement, html } from "lit-element";
import GlobalStyle from "../GlobalStyle";
import "./PatreonComponent";

const Style = css`
  :host {
    flex: 1;
  }

  grid-component > .grid-item {
    display: flex;
    flex: 1;
    justify-content: center;
  }

  .material-icons {
    display: block;
    padding: 1em;
    text-align: center;
  }

  .label {
    display: block;
    padding: var(--padding);
  }

  .grid-item > a:hover !important {
    text-decoration: none;
  }

  li {
    padding: 0.5em 0px;
  }
`;

const version = () => 1;

@customElement("page-static")
export class PageStatic extends LitElement {
  public static styles = [GlobalStyle, Style];

  public render() {
    return html`
      ${version() === 2
        ? html`
            <grid-component style="grid-template-columns: repeat(3, 1fr)">
              <div class="grid-item">
                <div class="item">
                  <span class="label"
                    ><h1><a href="/readme">Readme</a></h1></span
                  >
                  <i class="material-icons">notes</i>
                </div>
              </div>
              <div class="grid-item">
                <div class="item">
                  <span class="label"
                    ><h1><a href="/blog">Blog</a></h1></span
                  >
                  <i class="material-icons">create</i>
                </div>
              </div>
              <div class="grid-item">
                <div class="item">
                  <span class="label"
                    ><h1><a href="/Performance">Performance</a></h1></span
                  >
                  <i class="material-icons">show_chart</i>
                </div>
              </div>
            </grid-component>
          `
        : ""}
      ${version() === 1
        ? html`
            <grid-component>
              <card-component title="Welcome">
                Check out our <a href="/components">Components</a> See what's
                new on our <a href="/blog">Blog</a> See the
                <a href="/performance">Performance</a>
              </card-component>
              <card-component title="Patreon">
                <patreon-component></patreon-component>
              </card-component>
              <card-component title="Open WC">
                Best guys in the game:
                <a href="https://open-wc.org/">Open WC</a>
              </card-component>
            </grid-component>
          `
        : ""}
    `;
  }
}
