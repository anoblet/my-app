import { LitElement, customElement } from "lit-element";
import Style from "./Style";
import Template from "./Template";
import Properties from "./Properties";

@customElement("pomodoro-component")
export class Component extends LitElement {
  public static properties = Properties;
  public static styles = Style;
  public template = Template;
  public render = this.template.bind(this);

  protected _timeleft = 1200;
  protected _interval: any;
  protected _currentStep: number = 0;
  protected _currentMode: number = 0;

  public get _minutes() {
    return Math.floor(this._timeleft / 60);
  }

  public get _seconds() {
    return this._timeleft - this._minutes * 60;
  }

  public start() {
    this._interval = setInterval(() => this._timeleft--, 1000);
  }

  public stop() {
    clearInterval(this._interval);
    this._interval = false;
  }

  public reset() {
    this.stop();
    this._timeleft = 1200;
  }

  public selectMode(mode: number) {
    this.stop();
    this._currentMode = mode;
    this.setTimeLeft();
  }

  protected setTimeLeft() {
    switch (this._currentMode) {
      case 0:
        this._timeleft = 1200;
        break;
      case 1:
        this._timeleft = 300;
    }
  }
}
