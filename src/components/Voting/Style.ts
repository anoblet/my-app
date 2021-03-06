import { css } from "lit-element";

export default css`
  :host {
    position: relative;
    flex: 1;
  }

  #actions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, max-content));
    grid-gap: 1em;
    justify-content: flex-end;
  }

  .icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  svg {
    fill: currentColor;
  }

  #title-container {
    grid-template-columns: repeat(2, max-content);
  }

  #option-container {
    grid-template-columns: max-content auto max-content;
  }

  grid-component {
    flex: 1;
  }

  #list > s*:nth-child(n + 2) {
    padding-top: 1em;
    border-top: 1px solid var(--border-color);
  }

  #list a {
    display: flex;
    align-items: center;
  }

  [slot="title"] {
    line-height: 1;
    margin-block-start: 0;
    margin-block-end: 0;
  }

  .item {
    grid-template-columns: auto max-content;
  }
`;
