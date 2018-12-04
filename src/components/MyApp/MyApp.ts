import { html, LitElement, property } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { config } from '../../../config';
import { BaseMixin } from '../../../packages/BaseMixin';
import { StateMixin } from '../../../packages/StateMixin';
import { Mixin } from '../../../packages/Mixin';
import { store } from '../../store.js';
import { TaskMixin } from '../../../packages/TaskMixin';
import * as style from './MyApp.scss';
import Template from './MyAppTemplate';
import { FirebaseMixin } from '../../../packages/FirebaseMixin';

/**
 * @todo Extend BaseElement
 */

export class MyApp extends Mixin(connect(store)(LitElement), [/* BaseMixin,*/ TaskMixin, StateMixin, FirebaseMixin]) {
  @property({ type: String }) title = 'Andrew Noblet'
  defaultDocument = {
    backgroundColor: "#242424",
    borderColor: "#CCC",
    textColor: "#CCC",
    primaryColor: "#00ff00",
    secondaryColor: "#ff0080"
  };
  firebaseConfig = config.firebase;
  firebaseDocumentPath = 'app';
  state: any;
  stateType: 'app'
  taskPending = false;

  // Lifecycle
  constructor() {
    super();
    this.setStore(store);
    this.addType('theme');
    this.setState(this.defaultDocument, 'theme');
  }

  connectedCallback() {
    super.connectedCallback();
    this.runTasks([
      import(/* webpackChunkName: "MyFlex" */'../../../packages/my-flex'),
      import(/* webpackChunkName: "MyGrid" */ '../../../packages/my-grid'),
      import(/* webpackChunkName: "MyLoader" */'../../../packages/my-loader'),
      import(/* webpackChunkName: "MyLoader" */'../../../packages/my-card'),
      import(/* webpackChunkName: "MWC-Icon" */'@material/mwc-icon'),
      import(/* webpackChunkName: "MWC-Fab" */'@material/mwc-fab'),
      import(/* webpackChunkName: "AppFooter" */ '../AppFooter/AppFooter'),
      import(/* webpackChunkName: "AppUser" */ '../AppUser/AppUser'),
      import(/* webpackChunkName: "AppTheme" */ '../AppTheme/AppTheme'),
      this.firebaseInit(),
      // Does nothing but resolve?
      this.checkRedirect(),
      this.getUser().then((user: any) => {
        this.addType('user');
        this.setState(user, 'user');
      }),
      this.getDocument('theme').then(
        (document: any) => this.setState(document, 'theme')
      )
    ]);
  }

  // Hooks
  setButtonBackground() {
    const fab = this.shadowRoot.querySelector('mwc-fab');
    const button = fab.shadowRoot.querySelector('button')
    if(button) {
      button.style.background = `url('${this.state.user.photo}')`;
      button.style.backgroundSize = "contain";
    }
  }

  // Helpers (Needed at tuntime to complete the login)
  checkRedirect() {
    return new Promise((resolve, reject) => {
      Promise.all([
        import(/* webpackChunkName: "FirebaseApp" */'firebase/app'),
        import(/* webpackChunkName: "FirebaseAuth" */'firebase/auth'),
        import(/* webpackChunkName: "FirebaseUI" */'firebaseui'),
      ]).then(([app, auth, ui]) => {
        let instance = ui.auth.AuthUI.getInstance() || new ui.auth.AuthUI(app.auth());
        if (instance.isPendingRedirect()) {
          instance.start(document.createElement('div'), {});
        }
        resolve();
      })
    });
  }

  // Events
  _toggleDrawer() {
    const drawer = this.shadowRoot.querySelector('#drawer');
    const drawerContainer = this.shadowRoot.querySelector('#drawer-container')
    drawer._toggleAttribute('hidden');
    drawerContainer._toggleAttribute('opened');
  }

  updateStyles(theme: any) {
    this.style.setProperty('--background-color', theme.backgroundColor);
    this.style.setProperty('--text-color', theme.textColor);
    this.style.setProperty('--primary-color', theme.primaryColor);
    this.style.setProperty('--secondary-color', theme.secondaryColor);
  }

  // State
  stateChanged(state: any) {
    super.stateChanged(state);
    if(state.theme) this.updateStyles(state.theme);
  }

  // Template
  render() {
    return html`
      <style>${style}</style>
      ${!this.taskPending ? Template.bind(this)(this.state) : html`<my-loader></my-loader>`}
    `;
  }
}

window.customElements.define('my-app', MyApp);
