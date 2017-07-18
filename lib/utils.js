'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentDirectoryBase = getCurrentDirectoryBase;
exports.directoryExists = directoryExists;
const fs = require('fs');
const path = require('path');

function getCurrentDirectoryBase(subdir = '.') {
  return path.basename(process.cwd(), subdir);
}

function directoryExists(filePath) {
  try {
    return fs.statSync(filePath).isDirectory();
  } catch (err) {
    return false;
  }
}