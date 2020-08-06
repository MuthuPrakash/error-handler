var common = [
    `--format ${
    process.env.CI || !process.stdout.isTTY ? 'progress' : 'progress-bar'
    }`,
    //'--parallel 20',
    '--require ./test/steps/**/*.js',
    '--require ./test/steps/*.js',
    '--require ./test/support/*.js'
].join(' ');

module.exports = {
    default: common,
};