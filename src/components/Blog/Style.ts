import { css } from "lit-element";

export default css`
  :host {
    overflow-x: hidden;
    flex: 1;
  }

  [slot="title"] a {
    color: inherit;
  }

  h3, h4 {
    margin-block-start: 0;
    margin-block-end: 0;
    color: var(--secondary-color);
  }

  grid-component {
    /* grid-gap: 0; */
  }

  /* card-component::part(card) {
    border-width: var(--border-size);
    border-style: solid;
    border-color: var(--border-color);
    border-radius: 0.5rem;
  } */
`;
