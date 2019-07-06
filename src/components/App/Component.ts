import { LitElement, customElement, property } from "lit-element";

import { BeforeRender } from "../../mixins/BeforeRender";
import Debug from "../../Debug";
import GlobalStyle from "../../GlobalStyle";
import Style from "./Style";
import Template from "./Template";
import Theme from "../../Theme";
import { addDefaultReducers } from "./Utility";
import { beforeRender } from "./BeforeRender";
import { config } from "../../../config";
import { installOfflineWatcher } from "pwa-helpers/network.js";
import { installRouter } from "pwa-helpers/router.js";
import { media } from "../../Media";
import { router } from "../../Router";
import { routes } from "./Routes";
import { state } from "../../State";
import { store } from "../../Store";
import { toast } from "../Toast/Toast";

@customElement("app-component")
export class App extends BeforeRender(LitElement) {
  public static styles = [GlobalStyle, Style];
  public render = Template.bind(this);

  @property({ reflect: true, attribute: "drawer-opened", type: Boolean })
  public drawerOpened: boolean = false;
  @property() public mediaSize: string;

  // Lifecycle
  constructor() {
    super();
    Debug.log("Constructor");
    addDefaultReducers();
    if (config.theme) {
      Theme.set(Theme.convert(config.theme), document.body);
      state.set({
        type: "app",
        data: { settings: { theme: config.theme } },
        store
      });
    }
    this.initMediaSize();
  }

  public connectedCallback() {
    super.connectedCallback();
    // Register drawer listeners
    this.registerlisteners();
  }

  public beforeRender = beforeRender.bind(this);

  public firstUpdated() {
    Debug.log("First updated");
    store.subscribe(() => this.requestUpdate());
    this.registerRouter();
    installOfflineWatcher((offline: boolean) => {
      if (offline) toast("Offline");
    });
  }

  /**
   * Set an observer for the client media size
   */
  public initMediaSize() {
    this.drawerOpened = false;
    media.subscribe((mediaSize: string) => {
      this.mediaSize = mediaSize;
    });
  }

  public registerlisteners() {
    this.addEventListener("close-drawer", this._closeDrawer);
    this.addEventListener("drawer-toggled", this._toggleDrawer);
  }

  public async registerRouter() {
    installRouter((location: any) => {
      router.routeChanged({
        location,
        routes,
        portal: this.shadowRoot.querySelector("#portal")
      });
      // Reset scroll position
      const scrollTarget = this.shadowRoot.querySelector("#portal");
      scrollTarget.scrollTo(0, 0);
      // Update store
      state.set({
        type: "app",
        data: { activeRoute: location.pathname },
        store
      });
    });
  }

  // Handlers
  public _openDrawer() {
    this.drawerOpened = true;
  }

  public _closeDrawer() {
    this.drawerOpened = false;
  }

  public _toggleDrawer() {
    const drawer: any = this.renderRoot.querySelector("drawer-component");
    if (drawer) drawer.toggle();
    this.drawerOpened = !this.drawerOpened;
    window.dispatchEvent(
      new CustomEvent("drawer-toggled", {
        composed: true
      })
    );
  }

  public _toggleProfile() {
    const menu: any = this.renderRoot.querySelector("#profile-menu");
    menu.hidden ? menu.open() : menu.close();
  }

  public closeMenus() {
    this.drawerOpened = false;
    const menu: any = this.renderRoot.querySelector("#profile-menu");
    menu.close();
  }
}
