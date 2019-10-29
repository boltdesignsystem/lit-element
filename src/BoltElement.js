/* eslint-disable no-unused-expressions */
import { LitElement } from 'lit-element';

import { Slotify } from './slotify.js';
import styleInjector from './style-injector.js';

const useShadow =
  ('attachShadow' in Element.prototype && 'getRootNode' in Element.prototype) || window.ShadyDOM;

class BoltElement extends Slotify(LitElement) {
  createRenderRoot() {
    if (useShadow && !this.constructor.noShadow && this.attachShadow) {
      this.useShadow = true;
      return this.attachShadow({ mode: 'open' });
    }
    this.useShadow = false;
    return this;
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this.lazyStyles = this.constructor.lazyStyles;

    if (this.lazyStyles && !this.useShadow) {
      styleInjector(...this.lazyStyles).add();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();

    if (this.lazyStyles && !this.useShadow) {
      styleInjector(...this.lazyStyles).remove();
    }
  }
}

export { BoltElement };
