import { customElement, html, unsafeCSS, property } from 'lit-element';
import { BoltElement } from '../../BoltElement.js';
import boxStyles from './Box.scss';

@customElement('my-box')
class MyBox extends BoltElement {
  // static noShadow = true;

  @property()
  size = '';

  static lazyStyles = [boxStyles];

  static get styles() {
    return [unsafeCSS(boxStyles)];
  }

  render() {
    return html`
      <div class="test-component--${this.size ? this.size : 'medium'}">
        ${this.slotify('default', 'Default content')}
        ${this.slotify('red') &&
          html`
            <div style="background: rgba(255, 0, 0, .4); padding: 1rem;">
              ${this.slotify('red')}
            </div>
          `}

        <div style="background: rgba(0, 128, 0, .4); padding: 1rem;">
          ${this.slotify('green', 'Default slotted green content!')}
        </div>
      </div>
    `;
  }
}

export { MyBox };
