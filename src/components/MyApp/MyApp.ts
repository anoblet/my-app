import { LitElement, property } from '@polymer/lit-element';
import { Mixin } from '@anoblet/mixin';
import { BaseMixin } from '@anoblet/base-mixin'
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../..//store.js';

import Template from './MyAppTemplate';

import * as firebase from "firebase";

const app = firebase.initializeApp({
  apiKey: "AIzaSyA1sarBCzD7i_UBEMcE5321POKcAX48YYs",
  authDomain: "my-project-75792.firebaseapp.com",
  databaseURL: "https://my-project-75792.firebaseio.com",
  projectId: "my-project-75792",
  storageBucket: "",
  messagingSenderId: "552770278955"
});

/**
 * @todo Extend BaseElement
 * 
 * import { BaseElement } from '@anoblet/base-element';
 * class BaseElement2 extends Mixin(LitElement, [BaseMixin]) {}
 * 
 * class BaseElement2 extends Mixin(LitElement, [DebugMixin]) {}
 */
export class MyApp extends connect(store)(Mixin(LitElement, [BaseMixin])) {
  @property({type: String}) title = 'Andrew Noblet'

  _toggleDrawer() {
    const drawer = this.shadowRoot.querySelector('#drawer');
    const drawerContainer = this.shadowRoot.querySelector('#drawer-container')
    drawer._toggleAttribute('hidden');
    drawerContainer._toggleAttribute('opened');
}

  stateChanged(state: any) {
    state.settings.debug ? this.setAttribute('debug', '') : this.removeAttribute('debug');
    state.settings.theme == 'light' ? this.getAttribute('dark') == '' ? this.removeAttribute('dark') :false : this.setAttribute('dark', '');
  }

  render() {
    return Template.bind(this)();
  }
}

window.customElements.define('my-app', MyApp);
