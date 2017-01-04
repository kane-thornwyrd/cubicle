import fs       from 'fs';
import path     from 'path';
import { spawn } from 'child_process';
import { getCurrentDirectoryBase } from 'root/helpers';

export default function(){
  const dir = path.resolve(process.cwd(), './bin');
  var wrapper = spawn(`${dir}/wrapper`, ['okook']);

  wrapper.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  wrapper.on('close', function (code) {
    console.log('child process exited with code ' + code);
  });
}
