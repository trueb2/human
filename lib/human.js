(function() {
  var CompositeDisposable, fs;

  ({CompositeDisposable} = require('atom'));

  fs = require('fs');

  module.exports = {
    state: 'off',
    config: {
      inputText: {
        type: 'string',
        default: './input.txt'
      },
      waitMs: {
          type: 'number',
          default: 250
      }
    },
    activate: function(state) {
      console.log('Human activated');
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'human:toggle': () => {
          return this.toggle();
        }
      }));
      return console.log('Using ', atom.config.get('human.inputText'));
    },
    deactivate: function(state) {
      return console.log('Human deactivated');
    },
    toggle: function() {
      console.log('Human toggled!');
      if (this.state === 'off') {
        this.state = 'on';
        return this.beHuman();
      } else {
        return this.state = 'off';
      }
    },
    beHuman: function() {
      var callback;
      return callback = fs.readFile(atom.config.get('human.inputText'), this.type);
    },
    type: async function(err, data) {
      var chars, editor, td, waitMs;
      if (err) {
        return console.log(err);
      } else {
        editor = atom.workspace.getActiveTextEditor();
        if (editor) {
          td = new TextDecoder('utf-8');
          chars = Array.from(td.decode(data));
          waitMs = parseInt(atom.config.get('human.waitMs');
          return chars.forEach(async(c) => {
            editor.insertText(c);
            return (await new Promise((resolve) => {
              setTimeout(resolve, waitMs);
            }));
          });
        }
      }
    }
  };

}).call(this);
