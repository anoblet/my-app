import { css } from "lit-element";

export default css`
  * {
    box-sizing: border-box;
  }

  :host {
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
  }

  .grid {
    display: grid;
    flex: 1;
  }

  .row {
    display: grid;
    grid-template-columns: min-content 1fr 1fr min-content;
  }

  .column {
    flex: 1;
    padding: 0.5em 1em;
  }

  .no-grow {
    flex-grow: 0;
  }

  .no-visibility {
    visibility: hidden;
  }

  #dialog {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    background: var(--background-color);
  }
`;