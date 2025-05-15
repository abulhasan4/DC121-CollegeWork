#!/usr/bin/env node

var total = 0;

for (var i = 2; i < process.argv.length; i += 1)
   total += parseInt(process.argv[i]);

console.log(total);
