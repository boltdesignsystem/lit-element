import { customElement, html, LitElement, css, unsafeCSS, property } from "lit-element";
import { BoltElement } from '../../BoltElement';
import styles from "./Box.scss";

@customElement("my-box")
class MyBox extends BoltElement {

  @property()
  size = '';

  static get styles() {
    return [unsafeCSS(styles)];
  }

  render() {
    return html`
      <div class="test-component--${this.size ? this.size : "medium"}">
        
        ${this.slotify("default", "Default content")}
        
        ${this.slotify("red") && html`
          <div style="background: red;">
            ${this.slotify("red")}
          </div>
        `}

        <div style="background: green;">
          ${this.slotify("green", "default green content!!!")}
        </div>
      </div>
    `;
  }
}

export { MyBox };
