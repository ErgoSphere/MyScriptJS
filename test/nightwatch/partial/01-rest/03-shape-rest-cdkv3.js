const inkPlayer = require('../../lib/inkPlayer');
const config = require('../../../lib/configuration').getConfiguration('SHAPE', 'REST', 'V3');

function runInkTests(ink) {
  module.exports[config.header + ' checkUndoRedo ' + ink.name] = function checkUndoRedo(browser) {
    inkPlayer.checkUndoRedo(browser, config, ink.strokes, ink.exports.SEGMENTS);
  };
}

config.inks
  .filter(ink => ['shape'].includes(ink.name))
  .forEach(ink => runInkTests(ink));
