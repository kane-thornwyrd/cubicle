require('file?name=../[name].[ext]!./conf.js');

import { forEach }  from 'lodash';
import cliArgs      from 'commander';
import inquirer     from 'inquirer';

import { getVersions } from './gameSetup';

import pkgjson from '../package.json';
import confjson from '../conf.js';

let conf = {
  MC_CONF_FILE: 'conf.json',
  MC_VERSION_URL: 'https://launchermeta.mojang.com/mc/game/version_manifest.json',
  MC_FORGE_VERSION_URL: 'http://files.minecraftforge.net/maven/net/minecraftforge/forge/promotions_slim.json',
  MC_EULA: false,
  MC_PORT: 25565,
  MC_DIFFICULTY: 2,
  MC_WHITELIST:false,
  MC_OPS:false,
  MC_ICON:false,
  MC_RCON: false,
  MC_QUERY: true,
  MC_MAX_PLAYERS: 12,
  MC_MAX_WORLD_SIZE: false,
  MC_ALLOW_NETHER: true,
  MC_ANNOUNCE_PLAYER_ACHIEVEMENTS: true,
  MC_ENABLE_COMMAND_BLOCK: true,
  MC_FORCE_GAMEMODE: true,
  MC_GENERATE_STRUCTURES: true,
  MC_HARDCORE: false,
  MC_MAX_BUILD_HEIGHT: 256,
  MC_MAX_TICK_TIME: 60000,
  MC_SPAWN_ANIMALS: true,
  MC_SPAWN_MONSTERS: true,
  MC_SPAWN_NPCS: true,
  MC_VIEW_DISTANCE: 12,
  MC_SEED: false,
  MC_MODE: 'survival',
  MC_MOTD: 'Welcome to my server !',
  MC_PVP: true,
  MC_LEVEL_TYPE: 'DEFAULT',
  MC_GENERATOR_SETTINGS: '',
  MC_LEVEL: 'world',
  MC_WORLD: false,
  MC_MODPACK: false,
  MC_ONLINE_MODE: true,
  MC_10GB_JVM_OPTS: `-Xmx10G -Xms10G -Xmn1280m -XX:+DisableExplicitGC
  -XX:+UseConcMarkSweepGC -XX:+UseParNewGC -XX:+UseNUMA
  -XX:+CMSParallelRemarkEnabled -XX:MaxTenuringThreshold=15
  -XX:MaxGCPauseMillis=30 -XX:GCPauseIntervalMillis=150
  -XX:+UseAdaptiveGCBoundary -XX:-UseGCOverheadLimit -XX:+UseBiasedLocking
  -XX:SurvivorRatio=8 -XX:TargetSurvivorRatio=90 -XX:MaxTenuringThreshold=15
  -Dfml.ignorePatchDiscrepancies=true -XX:+UseFastAccessorMethods
  -XX:+UseCompressedOops -XX:+OptimizeStringConcat -XX:+AggressiveOpts
  -XX:ReservedCodeCacheSize=2048m -XX:+UseCodeCacheFlushing
  -XX:SoftRefLRUPolicyMSPerMB=10000 -XX:ParallelGCThreads=10`,
  MC_3GB_JVM_OPTS: `-Xmx3G -Xms3G -Xmn768m -XX:+DisableExplicitGC
  -XX:+UseConcMarkSweepGC -XX:+UseParNewGC -XX:+UseNUMA
  -XX:+CMSParallelRemarkEnabled -XX:MaxTenuringThreshold=15
  -XX:MaxGCPauseMillis=30 -XX:GCPauseIntervalMillis=150
  -XX:+UseAdaptiveGCBoundary -XX:-UseGCOverheadLimit -XX:+UseBiasedLocking
  -XX:SurvivorRatio=8 -XX:TargetSurvivorRatio=90 -XX:MaxTenuringThreshold=15
  -Dfml.ignorePatchDiscrepancies=true -XX:+UseFastAccessorMethods
  -XX:+UseCompressedOops -XX:+OptimizeStringConcat -XX:+AggressiveOpts
  -XX:ReservedCodeCacheSize=2048m -XX:+UseCodeCacheFlushing
  -XX:SoftRefLRUPolicyMSPerMB=10000 -XX:ParallelGCThreads=10`,
  MC_1GB_JVM_OPTS: `-Xmx1G -Xms1G -Xmn128m -XX:+DisableExplicitGC
  -XX:+UseConcMarkSweepGC -XX:+UseParNewGC -XX:+UseNUMA
  -XX:+CMSParallelRemarkEnabled -XX:MaxTenuringThreshold=15
  -XX:MaxGCPauseMillis=30 -XX:GCPauseIntervalMillis=150
  -XX:+UseAdaptiveGCBoundary -XX:-UseGCOverheadLimit -XX:+UseBiasedLocking
  -XX:SurvivorRatio=8 -XX:TargetSurvivorRatio=90 -XX:MaxTenuringThreshold=15
  -Dfml.ignorePatchDiscrepancies=true -XX:+UseFastAccessorMethods
  -XX:+UseCompressedOops -XX:+OptimizeStringConcat -XX:+AggressiveOpts
  -XX:ReservedCodeCacheSize=2048m -XX:+UseCodeCacheFlushing
  -XX:SoftRefLRUPolicyMSPerMB=2000 -XX:ParallelGCThreads=10`,
};

Object.assign(conf, confjson);

forEach(process.env, (v, k) => { if (typeof conf[k] !== 'undefined'){
  if(!!v.match(/^true$/i)) v = true;
  if(!!v.match(/^false$/i)) v = false;

  conf[k] = v;
}});

cliArgs.version(pkgjson.version);

const runtimeArgs = [
  {
    s: 'm', f: 'mcVersion', d: 'Minecraft version',
    solver: async function(){
      const versions = await getVersions(conf.MC_VERSION_URL, 'minecraft');
      return versions.map( o => o.id);
    },
  },
  {
    s: 'f', f: 'forgeVersion', d: 'Forge version',
    solver: async function(){
      const versions = await getVersions(conf.MC_FORGE_VERSION_URL, 'forge');
      return versions.map( o => o.id);
    },
  },
];

runtimeArgs.map(a => { cliArgs.option(`-${a.s}, --${a.f}`, a.d) });

conf.cliArgs = cliArgs.parse(process.argv);

(async function(){
  const versions = await getVersions(conf.MC_VERSION_URL, 'minecraft');
  // inquirer.prompt([
  //   {
  //     type: 'list',
  //     name: 'version',
  //     message: 'Which version ?',
  //     choices
  //   },
  // ]).then(function (answers) {
  //   console.log(JSON.stringify(answers, null, '  '));
  // });
})()

export default conf;
