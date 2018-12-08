import { html } from '@polymer/lit-element';
import { until } from 'lit-html/directives/until';

export default function ({ router, user }: any) {
  return html`
    <my-flex direction="column" id="container" style="grid-gap: 0;">
      <my-card grow>
        <div slot="title">
          <app-header>
            <mwc-icon id="menu" @click="${() => this._toggleDrawer()}">menu</mwc-icon>
            <span id="title"><a href="/">${this.title}</a></span>
            <a href="/user"><mwc-fab id="userProfile" mini label="Account" @click="${() => this._toggleProfile()}">Profile</mwc-fab></a>
          </app-header>
        </div>
        <div slot="content">
          <my-flex id="center" style="word-wrap: break-word;">
            <my-grid id="drawer-container" opened>
              <my-flex id="drawer" class="scroll" grow>
                <my-card grow full-height>
                  <h3 slot="title">Menu</h3>
                  <div slot="content">
                    <ul>
                      <li>
                        <a href="/">Home</a>
                      </li>
                      <li>
                        <a href="/user">User</a>
                      </li>
                      <li>
                        <a href="/theme">Theme</a>
                      </li>
                      <li>
                        <a href="/info">Info</a>
                      </li>
                    </ul>
                  </div>
                </my-card>
              </my-flex>
              <my-flex id="content" grow scroll>
                <my-card grow no-inside-border no-outside-border>
                  <my-flex slot="content">
                    <lit-route ?active=${this.state.router.activeRoute == '/'} path="/" component="page-home"></lit-route>
                    <lit-route ?active=${this.state.router.activeRoute == '/user'} path="/user" component="page-user"></lit-route>
                    <lit-route ?active=${this.state.router.activeRoute == '/theme'} path="/theme" component="app-theme"></lit-route>
                    <lit-route ?active=${this.state.router.activeRoute == '/info'} path="/info" component="page-info"></lit-route>
                  </my-flex>
                </my-card>
              </my-flex>
            </my-grid>
          </my-flex>
          <my-flex id="bottom">
            <app-footer></app-footer>
          </my-flex>
        </div>
      </my-card>
    </my-flex>
  `
}
