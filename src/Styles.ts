import { css } from "lit-element";

export default css`
  :host([hidden]) {
    display: none;
  }

  a {
    color: var(--primary-color);
    /* font-weight: 550; */
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  ul {
    list-style-type: none;
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
  }

  [flex] {
    display: flex;
  }

  [grow] {
    flex-grow: 1;
  }
`;
