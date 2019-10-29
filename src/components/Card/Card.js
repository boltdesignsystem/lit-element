import { customElement, unsafeCSS, property, html } from 'lit-element';
import { BoltElement } from '../../BoltElement.js';
import cardStyles from './Card.scss';

@customElement('my-card')
class MyCard extends BoltElement {
  // static noShadow = true; // uncomment to manually disable Shadow DOM

  static lazyStyles = [cardStyles];

  static get styles() {
    return [unsafeCSS(cardStyles)];
  }

  @property()
  size = 'medium';

  render() {
    return html`
      <div class="c-card">
        ${this.slotify('image') &&
          html`
            <div class="c-card__image">
              ${this.slotify('image')}
            </div>
          `}
        ${this.slotify('default') &&
          html`
            <div class="c-card__body c-card__body--${this.size}">
              ${this.slotify('default')}
            </div>
          `}
      </div>
    `;
  }
}

export { MyCard };
