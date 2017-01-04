import request         from 'request';

let cache;
let cacheTimestamp;
const cacheTime = 36000000;

export default async function(VERSIONURL){
  function getVersion(){
    return new Promise((resolve, reject) =>{
      const req = request.get({
        url: VERSIONURL,
        json: true,
      }, function(err, res, body) {
        if(err) return reject(err);
        resolve(body.versions);
      });
    });
  }

  const now = Date.now();

  if (!cacheTimestamp || cacheTimestamp < now) {
    cache = await getVersion();
    cacheTimestamp = now + cacheTime;
  }

  return cache;
}
