import request from 'request';

import forgeVersionComparator from 'forge-versions-comparator';

const cache = [];
let cacheTimestamp;
const cacheTime = 36000000;

function forgeParser(body) {
  const out = [];
  for(const entry in body.promos){
    if(entry.split('-')[0].match(/^(\d\.?){2,}$/)){
      out.push({
        id: body.promos[entry],
        type: entry.split('-')[1],
        dep: entry.split('-')[0],
      });
    }
  }
  return out.sort((a, b) => forgeVersionComparator(a.id, b.id)).reverse();
}

function minecraftParser(body) {
  return body.versions.map((v) => {
    const {
      id,
      type,
      releaseTime,
      url,
    } = v;
    return {
      id,
      type,
      dep: '',
      releaseTime,
      url,
    }
  }).sort((a, b) => {
    const dateA = new Date(a.releaseTime);
    const dateB = new Date(b.releaseTime);
    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    return 0;
  }).reverse();
}

export default async function (VERSIONURL, parserName) {
  function getVersion() {
    return new Promise((resolve, reject) => {
      request.get({
        url: VERSIONURL,
        json: true,
      }, (err, res, body) => {
        if (err) return reject(err);
        switch (parserName) {
          case 'forge':
            resolve(forgeParser(body));
            break;
          case 'minecraft':
          default:
            resolve(minecraftParser(body));
        }
        return undefined;
      });
    });
  }

  const now = Date.now();
  cache[parserName] = cache[parserName] || {};

  if (!cache[parserName].cacheTimestamp || cache[parserName].cacheTimestamp < now) {
    try {
      cache[parserName].content = await getVersion();
    } catch (e) {
      throw e;
    }
    cache[parserName].cacheTimestamp = now + cacheTime;
  }

  return cache[parserName].content;
}
