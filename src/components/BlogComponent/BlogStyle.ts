import { css } from "lit-element";

export default () => {
  return css`
    * {
      box-sizing: border-box;
    }

    :host {
      display: grid;
      grid-gap: 1em;
      flex: 1;
      position: relative;
    }
  `;
}
