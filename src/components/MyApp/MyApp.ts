import { html, LitElement, property } from '@polymer/lit-element';
import { until } from 'lit-html/directives/until';

import { Mixin } from '@anoblet/mixin';
import { BaseMixin } from '@anoblet/base-mixin'
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

import * as style from './MyApp.scss';
import { AppSettings } from '../AppSettings/AppSettings';
const AppSettingsI = new AppSettings;

import Template from './MyAppTemplate';

// import(/* webpackChunkName: "AppLogin" */ '../AppLogin/AppLogin');
// import(/* webpackChunkName: "MyRouter" */ '@anoblet/my-router');

const config = {
  apiKey: "AIzaSyA1sarBCzD7i_UBEMcE5321POKcAX48YYs",
  authDomain: "my-project-75792.firebaseapp.com",
  databaseURL: "https://my-project-75792.firebaseio.com",
  projectId: "my-project-75792",
  storageBucket: "",
  messagingSenderId: "552770278955"
};

/**
 * @todo Extend BaseElement
 * 
 * import { BaseElement } from '@anoblet/base-element';
 * class BaseElement2 extends Mixin(LitElement, [BaseMixin]) {}
 * 
 * class BaseElement2 extends Mixin(LitElement, [DebugMixin]) {}
 */
export class MyApp extends connect(store)(Mixin(LitElement, [BaseMixin])) {
  @property({ type: String }) title = 'Andrew Noblet'
  firebaseConfig = {
    apiKey: "AIzaSyA1sarBCzD7i_UBEMcE5321POKcAX48YYs",
    authDomain: "my-project-75792.firebaseapp.com",
    databaseURL: "https://my-project-75792.firebaseio.com",
    projectId: "my-project-75792",
    storageBucket: "",
    messagingSenderId: "552770278955"
  }
  taskPending = false;
  template = './MyAppTemplate'

  connectedCallback() {
    super.connectedCallback();
    this.startFirebase();
    this.runTasks([
      import(/* webpackChunkName: "AppLogin" */ '../AppLogin/AppLogin'),
      import(/* webpackChunkName: "AppSettings" */ '../AppSettings/AppSettings'),
      import(/* webpackChunkName: "MyGrid" */ '@anoblet/my-grid'),
      import(/* webpackChunkName: "MyFlex" */'@anoblet/my-flex'),
      import(/* webpackChunkName: "MyLoader" */'@anoblet/my-loader'),
      import(/* webpackChunkName: "MWC-Icon" */'@material/mwc-icon'),
      import(/* webpackChunkName: "MWC-Fab" */'@material/mwc-fab'),
      this.checkRedirect(),
      AppSettingsI._firebaseDown()
    ]);
  }

  startFirebase() {
    import('firebase/app').then((app) => {
      if (app.apps.length === 0) app.initializeApp(config);
    });
  }

  _toggleDrawer() {
    const drawer = this.shadowRoot.querySelector('#drawer');
    const drawerContainer = this.shadowRoot.querySelector('#drawer-container')
    drawer._toggleAttribute('hidden');
    drawerContainer._toggleAttribute('opened');
  }

  checkRedirect() {
    return new Promise((resolve, reject) => {
      Promise.all([
        import('firebase/app'),
        import('firebase/auth'),
        import('firebaseui'),
      ]).then(([app, auth, ui]) => {
        let instance = ui.auth.AuthUI.getInstance() || new ui.auth.AuthUI(app.auth());
        if (instance.isPendingRedirect()) {
          const e = document.createElement('div');
          instance.start(e, {});
          app.auth().onAuthStateChanged((user: any) => {
            if (user) resolve();
          });
        } else {
          resolve();
        }
      })
    });
  }

  startTask() {
    this.taskPending = true;
    this.requestUpdate();
  }

  stopTask() {
    this.taskPending = false;
    this.requestUpdate();
  }

  runTasks(tasks: any) {
    this.startTask();
    return new Promise((resolve, reject) => {
      return Promise.all(tasks).then((results: any) => {
        this.stopTask();
        return results;
      });
    });
  }

  taskChain(tasks: any) {
    this.startTask();
    return tasks.reduce((promiseChain: any, currentTask: any) => {
      return promiseChain.then((chainResults: any) =>
        currentTask.then((currentResult: any) =>
          [...chainResults, currentResult]
        )
      );
    }, Promise.resolve([])).then((arrayOfResults: any) => {
      this.stopTask();
    });
  }

  stateChanged(state: any) {
    if (state.settings.debug != null) {
      state.settings.debug ? this.setAttribute('debug', '') : this.removeAttribute('debug');
    }
    if (state.settings.theme != null) {
      state.settings.theme == 'light' ? this.getAttribute('dark') == '' ? this.removeAttribute('dark') : false : this.setAttribute('dark', '');
    }
  }

  render() {
    return this.taskPending ?
      html`<style>${style}</style><my-loader></my-loader>` :
      Template.bind(this)();
  }
}

window.customElements.define('my-app', MyApp);
