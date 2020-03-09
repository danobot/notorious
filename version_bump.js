var v = require('./package.json').version
// const replace = require('replace-in-file');
// const regex = new RegExp(/.*/, 'i');
// const options = {
//     files: '.version',
//     from: regex,
//     to: "v" + v,
// };

// var changes = replace.sync(options)

console.log("[skip ci] chore(release): " + v)
