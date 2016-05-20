# ember-html-content

An ember-cli addon adds transition support to `<a href=""></a>` in html content (in most cases comes from server).

## Problem definition

If you use server rendered html you probably noticed `<a href="/something"></a>` behaves different compare with `link-to` component. `link-to` component offers fast page transitions while `<a></a>` clicks fire full page reloading.

This addon adds fast transition behavior to links presented in html.

## Installation

`ember install ember-font-awesome`

### Alternative installation

If you're like me and don't like external dependency you can simply create 2 files:

app/components/html-content/component.js
```
import Ember from 'ember';

export default Ember.Component.extend({
  content: null,
  routing: Ember.inject.service('-routing'),
  click(event) {
    let target = this.$(event.target).closest('a[href]');
    if (target.length > 0 && this.isExternalLink(target[0].href)) {
      event.preventDefault();
      this.get("routing.router").transitionTo(target[0].pathname);
      return false;
    }
  },

  isExternalLink(href) {
    let regExp = new RegExp("//" + location.host + "($|/)");
    return regExp.test(href);
  }
});
```

app/component/html-content/template.hbs
```
{{{content}}}
```

## Use
`{{html-content content=content}}`

where `content` contains html

## Compatibility

This addon only tested with ember 2.5.0. Share your experience if it works for older versions.