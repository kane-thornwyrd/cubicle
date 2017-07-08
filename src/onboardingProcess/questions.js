import getVersions from '../getVersions';
import Separator from 'choices-separator';
import { groupBy, forEach } from 'lodash';

export default async (conf) => {
  const mcVersions = await getVersions(conf.JAR_version_url, 'minecraft');
  const forgeVersions = await getVersions(conf.JAR_forge_version_url, 'forge');


  let pagecurrent = 1;
  const pager = () => {
    return `${pagecurrent++}/40 `
  };

  let questions = [
    {
      type: 'list',
      name: 'MCINTERNAL_version',
      message: 'Which version of Minecraft ?',
      choices: mcVersions.map(le => le.id).concat([new Separator()]),
      prefix: pager(),
    },
  ];

  const forgeVersionPage = pager();
  forEach(groupBy(forgeVersions, v => v.dep), (le, k) => {
    questions.push({
      when: an => an.MCINTERNAL_version === k,
      type: 'list',
      name: 'FORGE_version',
      message: 'Which version of Forge ?',
      choices: [''].concat(le.map(info => info.id)).concat([new Separator()]),
      filter: v => v || false,
      prefix: forgeVersionPage,
    });
  });

  const GAMEMODES = [
    'survival',
    'creative',
    'adventure',
    'spectator'
  ];

  const DIFFICULTY_LEVELS = [
    'peaceful',
    'easy',
    'normal',
    'hard'
  ];

  const JVM_PARAMETERS_TEMPLATES = [
    '-Xmx10G -Xms10G -Xmn1280m -XX:+DisableExplicitGC' +
    ' -XX:+UseConcMarkSweepGC -XX:+UseParNewGC -XX:+UseNUMA -XX:+CMSParallelRemarkEnabled' +
    ' -XX:MaxTenuringThreshold=15 -XX:MaxGCPauseMillis=30 -XX:GCPauseIntervalMillis=150' +
    ' -XX:+UseAdaptiveGCBoundary -XX:-UseGCOverheadLimit -XX:+UseBiasedLocking' +
    ' -XX:SurvivorRatio=8 -XX:TargetSurvivorRatio=90 -XX:MaxTenuringThreshold=15' +
    ' -Dfml.ignorePatchDiscrepancies=true -XX:+UseFastAccessorMethods -XX:+UseCompressedOops' +
    ' -XX:+OptimizeStringConcat -XX:+AggressiveOpts -XX:ReservedCodeCacheSize=2048m' +
    ' -XX:+UseCodeCacheFlushing -XX:SoftRefLRUPolicyMSPerMB=10000 -XX:ParallelGCThreads=10',
    '-Xmx3G -Xms3G -Xmn768m -XX:+DisableExplicitGC -XX:+UseConcMarkSweepGC' +
    ' -XX:+UseParNewGC -XX:+UseNUMA -XX:+CMSParallelRemarkEnabled -XX:MaxTenuringThreshold=15' +
    ' -XX:MaxGCPauseMillis=30 -XX:GCPauseIntervalMillis=150 -XX:+UseAdaptiveGCBoundary' +
    ' -XX:-UseGCOverheadLimit -XX:+UseBiasedLocking -XX:SurvivorRatio=8 -XX:TargetSurvivorRatio=90' +
    ' -XX:MaxTenuringThreshold=15 -Dfml.ignorePatchDiscrepancies=true -XX:+UseFastAccessorMethods' +
    ' -XX:+UseCompressedOops -XX:+OptimizeStringConcat -XX:+AggressiveOpts' +
    ' -XX:ReservedCodeCacheSize=2048m -XX:+UseCodeCacheFlushing -XX:SoftRefLRUPolicyMSPerMB=10000' +
    ' -XX:ParallelGCThreads=10',
    '-Xmx1G -Xms1G -Xmn128m -XX:+DisableExplicitGC -XX:+UseConcMarkSweepGC' +
    ' -XX:+UseParNewGC -XX:+UseNUMA -XX:+CMSParallelRemarkEnabled -XX:MaxTenuringThreshold=15' +
    ' -XX:MaxGCPauseMillis=30 -XX:GCPauseIntervalMillis=150 -XX:+UseAdaptiveGCBoundary' +
    ' -XX:-UseGCOverheadLimit -XX:+UseBiasedLocking -XX:SurvivorRatio=8 -XX:TargetSurvivorRatio=90' +
    ' -XX:MaxTenuringThreshold=15 -Dfml.ignorePatchDiscrepancies=true -XX:+UseFastAccessorMethods' +
    ' -XX:+UseCompressedOops -XX:+OptimizeStringConcat -XX:+AggressiveOpts' +
    ' -XX:ReservedCodeCacheSize=2048m -XX:+UseCodeCacheFlushing -XX:SoftRefLRUPolicyMSPerMB=2000' +
    ' -XX:ParallelGCThreads=10',
  ];

  questions = questions.concat([
    {
      type: 'input',
      name: 'MC_max-tick-time',
      message: 'Max tick time before auto-shutdown ?',
      default: '60000',
      filter: v => parseInt(v),
      prefix: pager(),
    },
    {
      type: 'input', name: 'MC_generator-settings', message: 'Generator config ?',
      prefix: pager(),
    },
    {
      type: 'confirm', name: 'MC_allow-nether', message: 'Allow Nether ?', default: 'y',
      prefix: pager(),
    },
    {
      type: 'confirm', name: 'MC_force-gamemode', message: 'Force Gamemode ?', default: 'y',
      prefix: pager(),
    },
    {
      type: 'list', name: 'MC_gamemode', message: 'Gamemode ?', default: 'survival', choices:GAMEMODES,
      filter: v => GAMEMODES.indexOf(v),
      prefix: pager(),
    },
    {
      type: 'confirm', name: 'MC_enable-query', message: 'Enable queries ?', default: false,
      prefix: pager(),
    },
    {
      type: 'input', name: 'MC_player-idle-timeout', message: 'Time before afk auto-kick ? (empty or 0 mean never)',
      default: '0',
      filter: v => parseInt(v) || 0,
      prefix: pager(),
    },
    {
      type: 'list', name: 'MC_difficulty', message: 'Difficulty ?', default: 'normal', choices:DIFFICULTY_LEVELS,
      filter: v => DIFFICULTY_LEVELS.indexOf(v),
      prefix: pager(),
    },
    {
      type: 'confirm', name: 'MC_spawn-monsters', message: 'Does monsters spawns ?',
      prefix: pager(),
    },
    {
      type: 'list', name: 'MC_op-permission-level', message: 'Op permission level ?', default: '4', choices:[1,2,3,4].map(v => v.toString()),
      filter: v => parseInt(v),
      prefix: pager(),
    },
    {
      type: 'confirm', name: 'MC_announceplayer-achievements', message: 'Announce players achievements ?', default: false,
      prefix: pager(),
    },
    {
      type: 'confirm', name: 'MC_pvp', message: 'PVP ?',
      prefix: pager(),
    },
    {
      type: 'confirm', name: 'MC_snooper-enabled', message: 'Mojang Snooper ?',
      prefix: pager(),
    },
    {
      type: 'input', name: 'MC_level-type', message: 'Level type ?', default: 'DEFAULT',
      prefix: pager(),
    },
    {
      type: 'confirm', name: 'MC_hardcore', message: 'Hardcore mode ?', default: false,
      prefix: pager(),
    },
    {
      type: 'confirm', name: 'MC_enable-command-block', message: 'Enable command blocks ?', default: false,
      prefix: pager(),
    },
    {
      type: 'input', name: 'MC_max-players', message: 'Max players ?', default: '12',
      filter: v => parseInt(v),
      prefix: pager(),
    },
    {
      type: 'input', name: 'MC_network-compression-threshold', message: 'Network compression threshold ?', default: '256',
      filter: v => parseInt(v),
      prefix: pager(),
    },
    {
      type: 'input', name: 'MC_resource-pack-sha1', message: 'Resource-pack sha1 ?',
      prefix: pager(),
    },
    {
      type: 'input', name: 'MC_max-world-size', message: 'Max world-size ? (0 or undefined for no limit)',
      filter: v => parseInt(v) || false,
      prefix: pager(),
    },
    {
      type: 'input', name: 'MC_server-port', message: 'Server port ?', default: '25565',
      filter: v => parseInt(v),
      prefix: pager(),
    },
    {
      type: 'input', name: 'MC_server-ip', message: 'Server IP ?',
      prefix: pager(),
    },
    {
      type: 'confirm', name: 'MC_spawn-npcs', message: 'Spawn NPCs ?',
      prefix: pager(),
    },
    {
      type: 'confirm', name: 'MC_allow-flight', message: 'Allow Flight ?', default: false,
      prefix: pager(),
    },
    {
      type: 'input', name: 'MC_level-name', message: 'World name ?', default: 'world',
      prefix: pager(),
    },
    {
      type: 'input', name: 'MC_view-distance', message: 'View distance ?', default: '12',
      filter: v => parseInt(v),
      prefix: pager(),
    },
    {
      type: 'input', name: 'MC_resource-pack', message: 'Resource pack .zip url ?',
      prefix: pager(),
    },
    {
      type: 'confirm', name: 'MC_spawn-animals', message: 'Spawn animals ?',
      prefix: pager(),
    },
    {
      type: 'confirm', name: 'MC_whitelist', message: 'Use a whitelist ?', default: false,
      prefix: pager(),
    },
    {
      type: 'confirm', name: 'MC_generate-structures', message: 'Generate structures (villages, mineshafts, etc.) ?',
      prefix: pager(),
    },
    {
      type: 'confirm', name: 'MC_online-mode', message: 'Online mode ?',
      prefix: pager(),
    },
    {
      type: 'input', name: 'MC_max-build-height', message: 'Maximum building height ?', default: '256',
      filter: v => parseInt(v),
      prefix: pager(),
    },
    {
      type: 'input', name: 'MC_level-seed', message: 'World seed', default: '',
      prefix: pager(),
    },
    {
      type: 'confirm', name: 'MC_prevent-proxy-connections', message: 'Prevent proxy connections ?', default: false,
      prefix: pager(),
    },
    {
      type: 'input', name: 'MC_motd', message: 'Default MOTD', default: '',
      prefix: pager(),
    },
    {
      type: 'confirm', name: 'MC_enable-rcon', message: 'Enable RCON ?', default: false,
      prefix: pager(),
    },
    {
      type: 'confirm', name: 'MC_use-native-transport', message: 'Use Native transport ? (default is auto-detected)',
      default: /^linux/.test(process.platform),
      prefix: pager(),
    },
    {
      type: 'list', name: 'JVM_args', message: 'Which JVM Args template do you prefer ?', choices: JVM_PARAMETERS_TEMPLATES,
      prefix: pager(),
    },
  ]);

  return questions;
}
