/* eslint-disable class-methods-use-this,max-classes-per-file */
export class TemplateLike extends HTMLElement {}
// export type Template = HTMLTemplateElement | TemplateLike;

export const Slotify = Base =>
  class extends Base {
    templateMap = new Map();

    assignSlotToContent(child) {
      // console.log(child.slot);
      // console.log(;
      return child.getAttribute ? child.getAttribute('slot') || 'default' : 'default';
      // return child.slot || child.getAttribute
      //   ? child.getAttribute('slot')
      //   : 'default';
    }

    isEmptyTextNode(child) {
      return child && (!child.textContent || !child.textContent.trim());
    }

    // Save a reference to the pseudoSlot content before lit-element renders
    saveSlots() {
      // const childNodes = [];
      Array.from(this.childNodes).forEach(child => {
        const slot = this.assignSlotToContent(child);

        // if (!(child instanceof TemplateLike) && !(child instanceof HTMLTemplateElement)) {
        //   // console.log(child.textContent);
        //   // console.log(slot);
        //   // return childNodes.push(child);
        // }

        // console.log(child.getAttribute === true || !child.textContent || child.textContent.trim().length > 0);

        if (!child.textContent || child.textContent.trim().length > 0) {
          // console.log(child);
          if (!this.templateMap.has(slot)) {
            this.templateMap.set(slot, [child]);
          } else {
            this.templateMap.set(slot, [...this.templateMap.get(slot), child]);
          }
        } else if (slot && child instanceof HTMLElement) {
          // console.log();
          // console.log(slot, child);

          if (!this.templateMap.has(slot)) {
            this.templateMap.set(slot, [child]);
          } else {
            this.templateMap.set(slot, [...this.templateMap.get(slot), child]);
          }

          // console.log(slot);
        }
      });

      // console.log(shouldSlotChildren);

      // const shouldSlotChildren =
      //   childNodes.length > 0 ||
      //   childNodes.some(child => !this.isEmptyTextNode(child));

      // console.log(shouldSlotChildren);

      // if (shouldSlotChildren) {
      //   // console.log(shouldSlotChildren);
      //   childNodes.forEach(child => {
      //     console.log(child);
      //     if (child)
      //   });
      //   // const fragment = document.createDocumentFragment();

      //   // childNodes.forEach(child => {
      //   //   fragment.appendChild(child);
      //   // });

      //   // this.templateMap.set('default', fragment);

      //   // if (!this.templateMap.has('default')) {
      //   //   this.templateMap.set('default', [childNodes]);
      //   // } else {
      //   //   this.templateMap.set('default', [...this.templateMap.get('default'), childNodes]);
      //   // }
      // }
    }

    update(changedProperties) {
      if (!this.hasUpdated) {
        this.saveSlots();
      }

      super.update(changedProperties);
    }

    slotify(slot = 'default', defaultContent) {
      const slotContent = this.templateMap.get(slot);

      // render slots when using Shadow DOM
      if (this.shadowRoot && slotContent) {
        const realSlot = document.createElement('slot');
        if (slot !== 'default') {
          realSlot.setAttribute('name', slot);
        }
        return realSlot;
      }

      if (slotContent && slotContent.content) {
        return slotContent.content;
      }
      if (slotContent && slotContent.childNodes) {
        return Array.from(slotContent.childNodes);
      }
      if (slotContent) {
        return slotContent;
      }
      if (defaultContent) {
        return defaultContent;
      }

      return null;
    }
  };
