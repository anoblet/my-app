import { css } from "lit-element";

export default css`
  * {
    box-sizing: border-box;
  }

  :host {
    display: flex;
    flex: 1;
  }

  .grid {
    display: grid;
    flex: 1;
    height: min-content;
  }

  .row {
    /*
        display: flex;
        */
    display: grid;
    grid-template-columns: min-content 1fr min-content;
  }

  .column {
    flex: 1;
    padding: 0.5em 1em;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .no-grow {
    flex-grow: 0;
  }

  .no-visibility {
    visibility: hidden;
  }

  card-component {
    max-width: 100%;
  }
`;
