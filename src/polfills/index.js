/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



/*
 * Polyfills loaded: HTML Imports, Custom Elements, platform polyfills, template
 * Used in: IE 11
 */

import './platform/es6-misc.js';
import './platform/custom-event.js';
import '@webcomponents/template/template.js';
import './platform/promise.js';
// import 'es6-promise/auto';
import './platform/symbol.js';
import './platform/flag-parser.js';
// import '@webcomponents/shadydom/src/shadydom.js';

/** CUSTOM ELEMENTS */
import '@webcomponents/custom-elements/src/custom-elements.js';

// import '@webcomponents/shadycss/entrypoints/scoping-shim.js';
import '@webcomponents/url/url.js';
import './platform/baseuri.js';
import './platform/unresolved.js';