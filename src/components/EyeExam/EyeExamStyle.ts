import { css } from "lit-element";

export default css`
  #character {
    display: flex;
    justify-content: center;
  }

  button-component {
    display: flex;
    flex-grow: 1;
  }

  grid-component {
    flex-grow: 1;
  }

  web-speech button {
    background: blue;
  }

  #fontSize {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
  }

  .relative {
    position: relative
  }
`;
