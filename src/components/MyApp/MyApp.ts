import { html, LitElement, property } from '@polymer/lit-element';
import { connectRouter } from 'lit-redux-router';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { config } from '../../../config';
import { BaseMixin } from '../../../packages/BaseMixin';
import { FirebaseMixin } from '../../../packages/FirebaseMixin';
import { Mixin } from '../../../packages/Mixin';
import { StateMixin } from '../../../packages/StateMixin';
import { TaskMixin } from '../../../packages/TaskMixin';
import { TemplateMixin } from '../../../packages/TemplateMixin';
import { store } from '../../store.js';
import * as style from './MyApp.scss';
import Template from './MyAppTemplate';
connectRouter(store);

/**
 * @todo Extend BaseElement
 */

export class MyApp extends Mixin(connect(store)(LitElement), [TemplateMixin, TaskMixin, StateMixin, FirebaseMixin]) {
  @property({ type: String }) public title = 'Andrew Noblet';
  public defaultDocument = {
    backgroundColor: '#242424',
    borderColor: '#CCC',
    primaryColor: '#00ff00',
    secondaryColor: '#ff0080',
    textColor: '#CCC',
  };
  public firebaseConfig = config.firebase;
  public firebaseDocumentPath = 'app';
  public state: any;
  public stateType: 'app';
  public taskPending = false;
  public template: any = Template;
  public templatePath = 'src/components/MyApp/MyAppTemplate';
  public componentStyle: any = style;

  // Lifecycle
  constructor() {
    super();
    this.setStore(store);
    this.addReducer('app'),
    this.addReducer('user'),
    this.addReducer('theme');
    this.setState(this.defaultDocument, 'theme');
  }

  public connectedCallback() {
    super.connectedCallback();
    this.runTasks([
      import(/* webpackChunkName: "MyFlex" */'../../../packages/my-flex'),
      import(/* webpackChunkName: "MyGrid" */ '../../../packages/my-grid'),
      import(/* webpackChunkName: "MyLoader" */'../../../packages/my-loader'),
      import(/* webpackChunkName: "MyCard" */'../../../packages/my-card'),
      import(/* webpackChunkName: "MWC-Icon" */'@material/mwc-icon'),
      import(/* webpackChunkName: "MWC-Fab" */'@material/mwc-fab'),
      import(/* webpackChunkName: "AppDrawer" */ '../AppDrawer/AppDrawer'),
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
          if (document) { this.setState(document, 'theme'); }
          resolve();
        });
      }),
      new Promise((resolve, reject) => {
        // this.importTemplate();
        resolve();
      })
    ]);
  }

  // Events
  public _toggleDrawer() {
    const drawer = this.shadowRoot.querySelector('#drawer');
    const drawerContainer = this.shadowRoot.querySelector('#drawer-container');
    drawer._toggleAttribute('hidden');
    drawerContainer._toggleAttribute('opened');
  }

  public updateStyles(theme: any) {
    this.style.setProperty('--background-color', theme.backgroundColor);
    this.style.setProperty('--text-color', theme.textColor);
    this.style.setProperty('--primary-color', theme.primaryColor);
    this.style.setProperty('--secondary-color', theme.secondaryColor);
  }

  // State
  public stateChanged(state: any) {
    super.stateChanged(state);
    if (state.theme) { this.updateStyles(state.theme); }
  }

  public render() {
    return html`
      <style>${this.componentStyle}</style>
      ${!this.taskPending ? this.template(this.state) : html`<my-loader></my-loader>`}
    `;
  }
}

window.customElements.define('my-app', MyApp);
