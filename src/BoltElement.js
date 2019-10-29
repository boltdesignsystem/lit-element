/* eslint-disable no-unused-expressions */
import { LitElement } from 'lit-element';
import { Slotify } from './_Slotify.js';
import styleInjector from './style-injector.js';

const useShadow =
  ('attachShadow' in Element.prototype && 'getRootNode' in Element.prototype) || window.ShadyDOM;

class BoltElement extends Slotify(LitElement) {
  createRenderRoot() {
    if (useShadow && !this.constructor.noShadow && this.attachShadow) {
      this.noShadow = false;
      return this.attachShadow({ mode: 'open' });
    }
    this.noShadow = true;
    return this;
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    this.lazyStyles = this.constructor.lazyStyles;

    if (this.lazyStyles && this.noShadow) {
      styleInjector(...this.lazyStyles).add();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();

    if (this.lazyStyles && this.noShadow) {
      styleInjector(...this.lazyStyles).remove();
    }
  }
}

export { BoltElement };
