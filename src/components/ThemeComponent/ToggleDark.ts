import { html, LitElement, property } from "lit-element";

import { store } from "../../Store";
import { updateDocument } from "../../../packages/firebase-helpers/firebase-helpers";

export const toggleDark = () => {
  const state = store.getState();
  return html`
    <label>Toggle dark</label>
    <mwc-switch
      ?checked=${state.settings.dark}
      @change=${(e: any) => {
        const theme = e.target.checked
          ? {
              backgroundColor: "#000000",
              borderColor: "#c0c0c0",
              primaryColor: "#666666",
              secondaryColor: "#000000",
              textColor: "#ffffff"
            }
          : {
              backgroundColor: "#ffffff",
              borderColor: "#c0c0c0",
              primaryColor: "#666666",
              secondaryColor: "#000000",
              textColor: "#000000"
            };
        updateDocument({
          path: `users/${state.user.uid}/settings/default`,
          data: { dark: e.target.checked }
        });
        updateDocument({
          path: `users/${state.user.uid}/settings/theme`,
          data: { currentTheme: theme }
        });
      }}
    ></mwc-switch>
  `;
};
