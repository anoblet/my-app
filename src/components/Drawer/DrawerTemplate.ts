import { html } from "lit-element";
import { render } from "lit-html";

export default function() {
  return html`
    <ul id="nav">
      <a href="/"> <li>Home</li></a
      ><a href="/blog"> <li>Blog</li></a
      ><a href="/contact"> <li>Contact</li></a
      ><a href="/info"> <li>Info</li></a>
    </ul>
  `;
}
