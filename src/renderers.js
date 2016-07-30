const chalk = require('chalk');

const Color = require('./data').Color;

// renderIndicator :: Indicator -> ConsoleIO (Side effect)
function renderIndicator(indicator) {
  if (indicator.color == Color('green')) {
    console.log(chalk.green(indicator.label + ': OK'));
  }
  else {
    console.log(chalk.bold.red('vvvvvvv'));
    console.log(chalk.red(indicator.label + ': NOT OK'));
    console.log(chalk.red('Message: ' + indicator.message));
    console.log(chalk.red('More information: ' + indicator.moreInfoUrl));
    console.log(chalk.bold.red('^^^^^^'));
  }
}

module.exports = {
    renderIndicator
}