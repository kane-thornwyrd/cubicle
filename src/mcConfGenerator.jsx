import { pickBy, get, mapKeys } from 'lodash';

import INI from 'ini';

const MC_PROPS_REGEX = /^MC_(.+)$/;

const globalConfToServerProperties = (v, k) => get(k.match(MC_PROPS_REGEX), '[1]', false);

const defaultConf = {
  MCINTERNAL_version: '',
  FORGE_version: '',
  JAR_folder: '',
  JAR_version_url: 'https://launchermeta.mojang.com/mc/game/version_manifest.json',
  JAR_forge_version_url: 'http://files.minecraftforge.net/maven/net/minecraftforge/forge/promotions_slim.json',
  'MC_max-tick-time': 60000,
  'MC_generator-settings': '',
  'MC_allow-nether': true,
  'MC_force-gamemode': true,
  MC_gamemode: 0,
  'MC_enable-query': false,
  'MC_player-idle-timeout': 0,
  MC_difficulty: 2,
  'MC_spawn-monsters': true,
  'MC_op-permission-level': 4,
  'MC_announceplayer-achievements': true,
  MC_pvp: true,
  'MC_snooper-enabled': true,
  'MC_level-type': 'DEFAULT',
  MC_hardcore: false,
  'MC_enable-command-block': false,
  'MC_max-players': 12,
  'MC_network-compression-threshold': 256,
  'MC_resource-pack-sha1': '',
  'MC_max-world-size': false,
  'MC_server-port': 25565,
  'MC_server-ip': '',
  'MC_spawn-npcs': true,
  'MC_allow-flight': false,
  'MC_level-name': 'world',
  'MC_view-distance': 12,
  'MC_resource-pack': '',
  'MC_spawn-animals': true,
  MC_whitelist: false,
  'MC_generate-structures': true,
  'MC_online-mode': true,
  'MC_max-build-height': 256,
  'MC_level-seed': '',
  'MC_prevent-proxy-connections': false,
  MC_motd: 'Welcome to my server !',
  'MC_enable-rcon': false,
  'MC_use-native-transport': /^linux/.test(process.platform),
  JVM_10GB_JVM_OPTS: '-Xmx10G -Xms10G -Xmn1280m -XX:+DisableExplicitGC' +
    ' -XX:+UseConcMarkSweepGC -XX:+UseParNewGC -XX:+UseNUMA -XX:+CMSParallelRemarkEnabled' +
    ' -XX:MaxTenuringThreshold=15 -XX:MaxGCPauseMillis=30 -XX:GCPauseIntervalMillis=150' +
    ' -XX:+UseAdaptiveGCBoundary -XX:-UseGCOverheadLimit -XX:+UseBiasedLocking' +
    ' -XX:SurvivorRatio=8 -XX:TargetSurvivorRatio=90 -XX:MaxTenuringThreshold=15' +
    ' -Dfml.ignorePatchDiscrepancies=true -XX:+UseFastAccessorMethods -XX:+UseCompressedOops' +
    ' -XX:+OptimizeStringConcat -XX:+AggressiveOpts -XX:ReservedCodeCacheSize=2048m' +
    ' -XX:+UseCodeCacheFlushing -XX:SoftRefLRUPolicyMSPerMB=10000 -XX:ParallelGCThreads=10',
  JVM_3GB_JVM_OPTS: '-Xmx3G -Xms3G -Xmn768m -XX:+DisableExplicitGC -XX:+UseConcMarkSweepGC' +
    ' -XX:+UseParNewGC -XX:+UseNUMA -XX:+CMSParallelRemarkEnabled -XX:MaxTenuringThreshold=15' +
    ' -XX:MaxGCPauseMillis=30 -XX:GCPauseIntervalMillis=150 -XX:+UseAdaptiveGCBoundary' +
    ' -XX:-UseGCOverheadLimit -XX:+UseBiasedLocking -XX:SurvivorRatio=8 -XX:TargetSurvivorRatio=90' +
    ' -XX:MaxTenuringThreshold=15 -Dfml.ignorePatchDiscrepancies=true -XX:+UseFastAccessorMethods' +
    ' -XX:+UseCompressedOops -XX:+OptimizeStringConcat -XX:+AggressiveOpts' +
    ' -XX:ReservedCodeCacheSize=2048m -XX:+UseCodeCacheFlushing -XX:SoftRefLRUPolicyMSPerMB=10000' +
    ' -XX:ParallelGCThreads=10',
  JVM_1GB_JVM_OPTS: '-Xmx1G -Xms1G -Xmn128m -XX:+DisableExplicitGC -XX:+UseConcMarkSweepGC' +
    ' -XX:+UseParNewGC -XX:+UseNUMA -XX:+CMSParallelRemarkEnabled -XX:MaxTenuringThreshold=15' +
    ' -XX:MaxGCPauseMillis=30 -XX:GCPauseIntervalMillis=150 -XX:+UseAdaptiveGCBoundary' +
    ' -XX:-UseGCOverheadLimit -XX:+UseBiasedLocking -XX:SurvivorRatio=8 -XX:TargetSurvivorRatio=90' +
    ' -XX:MaxTenuringThreshold=15 -Dfml.ignorePatchDiscrepancies=true -XX:+UseFastAccessorMethods' +
    ' -XX:+UseCompressedOops -XX:+OptimizeStringConcat -XX:+AggressiveOpts' +
    ' -XX:ReservedCodeCacheSize=2048m -XX:+UseCodeCacheFlushing -XX:SoftRefLRUPolicyMSPerMB=2000' +
    ' -XX:ParallelGCThreads=10',
};

export default conf => Object.assign({}, defaultConf, conf);

export const serverProperties = conf => INI.stringify(
  mapKeys(
    pickBy(conf, globalConfToServerProperties),
    globalConfToServerProperties,
  ),
);
