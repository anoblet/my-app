import { css } from "lit-element";

export default css`
  * {
    box-sizing: border-box;
  }

  :host {
    --background-color: #fff;
    --text-color: #242424;
    --border-color: #9e9e9e;
    --primary-color: #00ff00;
    --secondary-color: #ff0080;
    --debug-padding: 0;
    --debug-border: 0;
    --padding: 1em;
    --button-color: var(--primary-color);

    --background-color-elevated: var(--primary-color);

    --mdc-theme-primary: var(--primary-color);
    --mdc-theme-secondary: var(--secondary-color);

    display: flex;
    flex: 1;
    flex-direction: column;
    background: var(--background-color);
    color: var(--text-color);
    font-family: "Roboto", sans-serif;
  }

  :host([dark]) {
    --background-color: #242424;
    --text-color: #9e9e9e;
    --border-color: #9e9e9e;
    --primary-color: #242424;
    --secondary-color: #fff;
  }

  :host([debug]) {
    --debug-padding: 1em;
    --debug-border: 1px solid var(--border-color);
  }

  app-drawer-absolute {
    min-width: 50%;
  }

  #drawer {
    box-shadow: var(--box-shadow);
  }

  #drawer[media-size="mobile"] {
    position: absolute;
    background: var(--background-color);
    height: 100%;
    z-index: 3;
  }

  #drawer-container {
    flex: 1;
    position: relative;
    grid-gap: 0;
  }

  [full-height] {
    // height: 100%;
  }

  #drawer[hidden] {
    display: none;
  }

  :host([drawer-opened]) #drawer-container:not([media-size="mobile"]) {
    grid-template-columns: minmax(min-content, auto) 4fr;
  }

  #container {
    flex: 1;
  }

  #top,
  #bottom {
    align-items: center;
    justify-content: space-between;
  }

  #top {
    padding: 1em 1.25em 1em 1.25em !important;
  }

  #bottom {
    position: fixed;
    bottom: 0;
    padding: 0 1em 0.5em 1em !important;
    /* Weird hack */
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    /**/
    z-index: 2;
  }

  #content-grid {
    padding-right: 1em;
  }

  #menu:hover {
    cursor: pointer;
  }

  #center {
    display: flex;
    flex: 1;
    overflow: auto;
  }

  #drawer-container[opened] {
    /* grid-template-columns: minmax(128px,1fr) 4fr; */
  }

  #container {
    grid-template-rows: min-content 1fr min-content;
  }

  #bottom {
    align-items: center;
    justify-content: center;
  }

  #content {
    /*
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius) 0 0 var(--border-radius);
    */
    flex-direction: column;
  }

  mwc-icon {
    color: var(--mdc-theme-primary);
  }

  ul {
    list-style-type: none;
    padding-inline-start: 0;
  }

  .pad {
    padding: 1em !important;
  }

  .scroll {
    overflow: auto;
  }

  #profile-menu {
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    border-top: 0;
    border-right: 0;
    padding: 1em 2em 2em 1em;
    position: absolute;
    right: 0;
    z-index: 1;
  }

  #profile-menu li {
    padding-bottom: 0.25em;
  }

  #drawer[media-size="mobile"] {
    border: 0;
    border-right: 1px solid var(--border-color);
  }

  breadcrumb-component {
  }

  breadcrumb-component a {
    display: block;
  }

  #made-width {
    text-align: center;
  }

  mwc-fab {
    --mdc-theme-secondary: var(--background-color);
  }

  #menu {
    cursor: pointer;
    padding: 1em;
  }

  #userProfile {
    cursor: pointer;
  }
`;