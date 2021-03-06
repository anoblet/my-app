import { LitElement, css, customElement, html, property } from "lit-element";
import Firebase from "../../Firebase";
import { getIp } from "../../User";
import { Poll } from "./Types";
import { BeforeRender } from "@anoblet/mixins";

const Template = function() {
  return html`
    <grid-component>
      <h2>${this.data.title}</h2>
      <grid-component id="options">
        ${this.data.options.map(
          (option: string, index: number) =>
            html`
              <span class="label">${option}</span>
              ${!this.didVote
                ? html`
                    <button-component
                      label="Vote"
                      @click=${() => this.registerVote(index)}
                    ></button-component>
                  `
                : html`
                    ${this.data.result[index] || "0"}
                  `}
            `
        )}
        ${this.didVote
          ? html`
              <span>Total</span>
              <div>${this.data.result.total}</div>
            `
          : ""}
      </grid-component>
    </grid-component>
  `;
};

const Style = css`
  :host {
    flex: 1;
  }
  .label {
    display: flex;
    align-items: center;
  }

  #options {
    grid-template-columns: auto min-content;
  }
`;

@customElement("poll-view")
export class Component extends BeforeRender(LitElement) {
  public static styles = Style;
  public render = Template.bind(this);

  @property() public data: Poll;
  @property() public pollId: string;
  @property() public didVote: boolean = false;
  @property() public ip: string;

  public async beforeRender() {
    this.data = await Firebase.getDocument({
      path: `polls/${this.pollId}`
    });
    this.ip = await getIp();
    this.didVote = await this._didVote();
    Firebase.getDocument({
      path: `polls/${this.pollId}`,
      callback: async (data: Poll) => {
        this.data = data;
        this.didVote = await this._didVote();
      },
      watch: true
    });
  }

  /**
   * Check if the user voted already based on ip
   * @return boolean
   */
  public async _didVote() {
    return this.data.votedIps.includes(this.ip);
  }

  /**
   * Event handler to register a vote
   * @param  index The option index
   */
  public async registerVote(index: number) {
    if (await this._didVote()) return;
    this.data.result[index] = this.data.result[index] || 0;
    this.data.result[index]++;
    this.data.result.total++;
    this.data.votedIps.push(this.ip);
    Firebase.update({
      data: this.data,
      path: `polls/${this.pollId}`
    });
  }
}
