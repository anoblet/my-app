import { css } from "lit-element";

export default css`
  :host {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--background-color);
  }

  :host([fixed]) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--background-color);
  }

  #title {
    display: flex;
    justify-content: space-between;
  }
`;