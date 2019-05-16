import { LitElement, customElement, property, query } from "lit-element";
import Style from "./Style";
import Template from "./Template";
import Properties from "./Properties";
import Firebase from "../../Firebase";

/**
 * Voting component
 */
@customElement("voting-component")
export class Component extends LitElement {
  public static properties = Properties;
  public static styles = Style;
  public template = Template;
  public render = this.template.bind(this);

  @property({ type: Array }) public items = ["test"];
  @property({ type: Array }) public title = " ";
  @property({ type: Array }) public polls = [];

  @query("#create-dialog") public dialog;

  public constructor() {
    super();
    this.getPolls();
  }

  public showCreateDialog() {
    this.dialog.open();
  }

  public save() {
    const form = this.shadowRoot.querySelector("#form-create");
    if (!form) return;
    const titleElement: any = form.querySelector("#title");
    const title = titleElement.value;
    const inputList = form.querySelectorAll("#option-container input");
    const inputArray = Array.from(inputList);
    const options = [];
    inputArray.map((input: any) => options.push(input.value));
    const data = {
      title,
      options
    };

    Firebase.add({ path: "polls", data });
    this.dialog.close();
    this.title = "";
    this.items = [];
  }

  public addItem() {
    // if (this.items[this.items.length - 1] !== "")
    this.items = [...this.items, ""];
  }

  public removeItem(index: number) {
    const items = [...this.items];
    items.splice(index, 1);
    this.items = [...items];
  }

  public async getPolls() {
    return Firebase.getCollection({
      path: "/polls",
      callback: polls => {
        this.polls = polls;
      }
    });
  }
}
