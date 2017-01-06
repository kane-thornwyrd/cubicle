import request from 'request';
import { forEach } from 'lodash';

let cache;
let cacheTimestamp;
const cacheTime = 36000000;

function forgeParser(body){
  const out = [];
  forEach(body.promos, (v, k) => {
    out.push({
      id: v,
      type: k.split('-')[1],
      dep: k.split('-')[0],
    })
  });
  return out;
}

function minecraftParser(body){
  console.log(body);
  return body.versions;
}

export default async function(VERSIONURL, parserName){
  function getVersion(){
    return new Promise((resolve, reject) =>{
      const req = request.get({
        url: VERSIONURL,
        json: true,
      }, function(err, res, body) {
        if(err) return reject(err);
        switch(parserName){
          case 'forge':
            resolve(forgeParser(body));
          break;
          case 'minecraft':
          default:
            resolve(minecraftParser(body));
        }
      });
    });
  }

  // const now = Date.now();

  // if (!cacheTimestamp || cacheTimestamp < now) {
    try {
      cache = await getVersion();
    } catch(e) {
      throw e;
    }
  //   cacheTimestamp = now + cacheTime;
  // }

  return cache;
}
