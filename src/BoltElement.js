/* eslint-disable no-unused-expressions */
import { LitElement } from 'lit-element';

import { Slotify } from './slotify';
import styleInjector from './style-injector';

const useShadow =
  ('attachShadow' in Element.prototype && 'getRootNode' in Element.prototype) || window.ShadyDOM;

class BoltElement extends Slotify(LitElement) {
  createRenderRoot() {
    if (useShadow && !this.constructor.noShadow && this.attachShadow) {
      // eslint-disable-next-line wc/attach-shadow-constructor
      return this.attachShadow({ mode: 'open' });
    }
    return this;
  }

  connectedCallback(){
    super.connectedCallback && super.connectedCallback();
    if (this.constructor.lazyStyles && !this.shadowRoot){
      styleInjector([].concat.apply([], this.constructor.lazyStyles)).add();
    }
  }

  disconnectedCallback(){
    super.disconnectedCallback && super.disconnectedCallback();
    
    if (this.constructor.lazyStyles && !this.shadowRoot){
      styleInjector([].concat.apply([], this.constructor.lazyStyles)).remove();
    }
  }
}

export { BoltElement };
