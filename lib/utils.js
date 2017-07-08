'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentDirectoryBase = getCurrentDirectoryBase;
exports.directoryExists = directoryExists;
var fs = require('fs');
var path = require('path');

function getCurrentDirectoryBase() {
  var subdir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.';

  return path.basename(process.cwd(), subdir);
}

function directoryExists(filePath) {
  try {
    return fs.statSync(filePath).isDirectory();
  } catch (err) {
    return false;
  }
}