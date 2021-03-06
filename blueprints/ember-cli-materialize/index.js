var RSVP = require('rsvp');

module.exports = {
  normalizeEntityName: function() {},

  beforeInstall: function(options) {
    return this.addBowerPackageToProject('materialize', '~0.96.1');
  },

  afterInstall: function() {
    return RSVP.all([
      this.addPackageToProject('ember-radio-button', '1.0.4'),
      this.addPackageToProject('ember-new-computed', '~1.0.0'),
      this.addPackageToProject('ember-key-responder', '0.2.1'),
      this.addPackageToProject('ember-modal-dialog', '0.7.0'),
      this.addPackageToProject('ember-cli-sass', '^3.3.0')
    ]);
  }
}
