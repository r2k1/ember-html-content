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