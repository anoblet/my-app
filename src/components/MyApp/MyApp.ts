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
import { connectRouter } from 'lit-redux-router';
connectRouter(store);

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
  template: any;
  templatePath = './MyAppTemplate'

  // Lifecycle
  constructor() {
    super();
    this.setStore(store);
    this.addReducer('app'),
    this.addReducer('user'),
    this.addReducer('theme');
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
      import(/* webpackChunkName: "AppHeader" */ '../AppHeader/AppHeader'),
      import(/* webpackChunkName: "AppFooter" */ '../AppFooter/AppFooter'),
      import(/* webpackChunkName: "AppUser" */ '../AppUser/AppUser'),
      import(/* webpackChunkName: "AppTheme" */ '../AppTheme/AppTheme'),
      import(/* webpackChunkName: "PageHome" */ '../PageHome/PageHome'),
      import(/* webpackChunkName: "PageInfo" */ '../PageInfo/PageInfo'),
      import(/* webpackChunkName: "PageUser" */ '../PageUser/PageUser'),
      this.firebaseInit(),
      this.firebaseCheckRedirect(),
      this.getUser().then((user: any) =>
        this.setState(user, 'user')
      ),
      new Promise((resolve, reject) => {
        this.watchDocument('theme', (document: any) => {
          if(document) this.setState(document, 'theme')
          resolve();
        })
      })
    ]);
    import(`${this.templatePath}`).then((module: any) => {
      this.template = module.default.bind(this);
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
      ${!this.taskPending ? this.template(this.state) : html`<my-loader></my-loader>`}
    `;
  }
}

window.customElements.define('my-app', MyApp);
