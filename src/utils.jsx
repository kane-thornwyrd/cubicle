const fs = require('fs');
const path = require('path');

export function getCurrentDirectoryBase(subdir = '.') {
  return path.basename(process.cwd(), subdir);
}

export function directoryExists(filePath) {
  try {
    return fs.statSync(filePath).isDirectory();
  } catch (err) {
    return false;
  }
}
