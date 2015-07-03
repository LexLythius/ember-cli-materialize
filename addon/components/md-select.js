import Ember from 'ember';
import MaterializeInputField from './md-input-field';
import layout from '../templates/components/md-select';

export default MaterializeInputField.extend({
  layout: layout,

  optionLabelPath: 'content',
  optionValuePath: 'content',

  didInsertElement() {
    this._super(...arguments);
    this._setupSelect();
  },

  _setupSelect() {
    this.$('select').material_select();
  },

  _valueChanged: Ember.observer('value', function () {
    var val = this.get('value');
    var $sel = this.$('select');
    if (val !== $sel.val()) {
      val = Ember.isBlank(val) ? "" : String(val);
      var text = '';
      $sel.find('option')
        .each(function (i, opt) {
          var $opt = $(opt);
          var match = ($opt.val() === val);
          $opt.prop('selected', match);
          if (match) {
            text = $opt.text();
          }
        });
      $sel.trigger('change');
      this.$('input.select-dropdown').val(text);
      $sel.val(val).trigger('change');
    }
  }),

  //TODO: clean up any listeners that $.select() puts in place
  // _teardownSelect() {
  //
  // }

  //TODO: this could be converted to a computed property, returning a string
  //  that is bound to the class attribute of the inputSelector
  errorsDidChange: Ember.observer('errors', function() {
    var inputSelector = this.$('input');
    // monitor the select's validity and copy the appropriate validation class to the materialize input element.
    Ember.run.later(this, function() {
      var isValid = this.$('select').hasClass('valid');
      if (isValid) {
        inputSelector.removeClass('invalid');
        inputSelector.addClass('valid');
      } else {
        inputSelector.removeClass('valid');
        inputSelector.addClass('invalid');
      }
    }, 150);
  })
});
