'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getVersions = require('../getVersions');

var _getVersions2 = _interopRequireDefault(_getVersions);

var _choicesSeparator = require('choices-separator');

var _choicesSeparator2 = _interopRequireDefault(_choicesSeparator);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(conf) {
    var mcVersions, forgeVersions, pagecurrent, pager, questions, forgeVersionPage, GAMEMODES, DIFFICULTY_LEVELS, JVM_PARAMETERS_TEMPLATES;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getVersions2.default)(conf.JAR_version_url, 'minecraft');

          case 2:
            mcVersions = _context.sent;
            _context.next = 5;
            return (0, _getVersions2.default)(conf.JAR_forge_version_url, 'forge');

          case 5:
            forgeVersions = _context.sent;
            pagecurrent = 1;

            pager = function pager() {
              return pagecurrent++ + '/40 ';
            };

            questions = [{
              type: 'list',
              name: 'MCINTERNAL_version',
              message: 'Which version of Minecraft ?',
              choices: mcVersions.map(function (le) {
                return le.id;
              }).concat([new _choicesSeparator2.default()]),
              prefix: pager()
            }];
            forgeVersionPage = pager();

            (0, _lodash.forEach)((0, _lodash.groupBy)(forgeVersions, function (v) {
              return v.dep;
            }), function (le, k) {
              questions.push({
                when: function when(an) {
                  return an.MCINTERNAL_version === k;
                },
                type: 'list',
                name: 'FORGE_version',
                message: 'Which version of Forge ?',
                choices: [''].concat(le.map(function (info) {
                  return info.id;
                })).concat([new _choicesSeparator2.default()]),
                filter: function filter(v) {
                  return v || false;
                },
                prefix: forgeVersionPage
              });
            });

            GAMEMODES = ['survival', 'creative', 'adventure', 'spectator'];
            DIFFICULTY_LEVELS = ['peaceful', 'easy', 'normal', 'hard'];
            JVM_PARAMETERS_TEMPLATES = ['-Xmx10G -Xms10G -Xmn1280m -XX:+DisableExplicitGC' + ' -XX:+UseConcMarkSweepGC -XX:+UseParNewGC -XX:+UseNUMA -XX:+CMSParallelRemarkEnabled' + ' -XX:MaxTenuringThreshold=15 -XX:MaxGCPauseMillis=30 -XX:GCPauseIntervalMillis=150' + ' -XX:+UseAdaptiveGCBoundary -XX:-UseGCOverheadLimit -XX:+UseBiasedLocking' + ' -XX:SurvivorRatio=8 -XX:TargetSurvivorRatio=90 -XX:MaxTenuringThreshold=15' + ' -Dfml.ignorePatchDiscrepancies=true -XX:+UseFastAccessorMethods -XX:+UseCompressedOops' + ' -XX:+OptimizeStringConcat -XX:+AggressiveOpts -XX:ReservedCodeCacheSize=2048m' + ' -XX:+UseCodeCacheFlushing -XX:SoftRefLRUPolicyMSPerMB=10000 -XX:ParallelGCThreads=10', '-Xmx3G -Xms3G -Xmn768m -XX:+DisableExplicitGC -XX:+UseConcMarkSweepGC' + ' -XX:+UseParNewGC -XX:+UseNUMA -XX:+CMSParallelRemarkEnabled -XX:MaxTenuringThreshold=15' + ' -XX:MaxGCPauseMillis=30 -XX:GCPauseIntervalMillis=150 -XX:+UseAdaptiveGCBoundary' + ' -XX:-UseGCOverheadLimit -XX:+UseBiasedLocking -XX:SurvivorRatio=8 -XX:TargetSurvivorRatio=90' + ' -XX:MaxTenuringThreshold=15 -Dfml.ignorePatchDiscrepancies=true -XX:+UseFastAccessorMethods' + ' -XX:+UseCompressedOops -XX:+OptimizeStringConcat -XX:+AggressiveOpts' + ' -XX:ReservedCodeCacheSize=2048m -XX:+UseCodeCacheFlushing -XX:SoftRefLRUPolicyMSPerMB=10000' + ' -XX:ParallelGCThreads=10', '-Xmx1G -Xms1G -Xmn128m -XX:+DisableExplicitGC -XX:+UseConcMarkSweepGC' + ' -XX:+UseParNewGC -XX:+UseNUMA -XX:+CMSParallelRemarkEnabled -XX:MaxTenuringThreshold=15' + ' -XX:MaxGCPauseMillis=30 -XX:GCPauseIntervalMillis=150 -XX:+UseAdaptiveGCBoundary' + ' -XX:-UseGCOverheadLimit -XX:+UseBiasedLocking -XX:SurvivorRatio=8 -XX:TargetSurvivorRatio=90' + ' -XX:MaxTenuringThreshold=15 -Dfml.ignorePatchDiscrepancies=true -XX:+UseFastAccessorMethods' + ' -XX:+UseCompressedOops -XX:+OptimizeStringConcat -XX:+AggressiveOpts' + ' -XX:ReservedCodeCacheSize=2048m -XX:+UseCodeCacheFlushing -XX:SoftRefLRUPolicyMSPerMB=2000' + ' -XX:ParallelGCThreads=10'];


            questions = questions.concat([{
              type: 'input',
              name: 'MC_max-tick-time',
              message: 'Max tick time before auto-shutdown ?',
              default: '60000',
              filter: function filter(v) {
                return parseInt(v);
              },
              prefix: pager()
            }, {
              type: 'input', name: 'MC_generator-settings', message: 'Generator config ?',
              prefix: pager()
            }, {
              type: 'confirm', name: 'MC_allow-nether', message: 'Allow Nether ?', default: 'y',
              prefix: pager()
            }, {
              type: 'confirm', name: 'MC_force-gamemode', message: 'Force Gamemode ?', default: 'y',
              prefix: pager()
            }, {
              type: 'list', name: 'MC_gamemode', message: 'Gamemode ?', default: 'survival', choices: GAMEMODES,
              filter: function filter(v) {
                return GAMEMODES.indexOf(v);
              },
              prefix: pager()
            }, {
              type: 'confirm', name: 'MC_enable-query', message: 'Enable queries ?', default: false,
              prefix: pager()
            }, {
              type: 'input', name: 'MC_player-idle-timeout', message: 'Time before afk auto-kick ? (empty or 0 mean never)',
              default: '0',
              filter: function filter(v) {
                return parseInt(v) || 0;
              },
              prefix: pager()
            }, {
              type: 'list', name: 'MC_difficulty', message: 'Difficulty ?', default: 'normal', choices: DIFFICULTY_LEVELS,
              filter: function filter(v) {
                return DIFFICULTY_LEVELS.indexOf(v);
              },
              prefix: pager()
            }, {
              type: 'confirm', name: 'MC_spawn-monsters', message: 'Does monsters spawns ?',
              prefix: pager()
            }, {
              type: 'list', name: 'MC_op-permission-level', message: 'Op permission level ?', default: '4', choices: [1, 2, 3, 4].map(function (v) {
                return v.toString();
              }),
              filter: function filter(v) {
                return parseInt(v);
              },
              prefix: pager()
            }, {
              type: 'confirm', name: 'MC_announceplayer-achievements', message: 'Announce players achievements ?', default: false,
              prefix: pager()
            }, {
              type: 'confirm', name: 'MC_pvp', message: 'PVP ?',
              prefix: pager()
            }, {
              type: 'confirm', name: 'MC_snooper-enabled', message: 'Mojang Snooper ?',
              prefix: pager()
            }, {
              type: 'input', name: 'MC_level-type', message: 'Level type ?', default: 'DEFAULT',
              prefix: pager()
            }, {
              type: 'confirm', name: 'MC_hardcore', message: 'Hardcore mode ?', default: false,
              prefix: pager()
            }, {
              type: 'confirm', name: 'MC_enable-command-block', message: 'Enable command blocks ?', default: false,
              prefix: pager()
            }, {
              type: 'input', name: 'MC_max-players', message: 'Max players ?', default: '12',
              filter: function filter(v) {
                return parseInt(v);
              },
              prefix: pager()
            }, {
              type: 'input', name: 'MC_network-compression-threshold', message: 'Network compression threshold ?', default: '256',
              filter: function filter(v) {
                return parseInt(v);
              },
              prefix: pager()
            }, {
              type: 'input', name: 'MC_resource-pack-sha1', message: 'Resource-pack sha1 ?',
              prefix: pager()
            }, {
              type: 'input', name: 'MC_max-world-size', message: 'Max world-size ? (0 or undefined for no limit)',
              filter: function filter(v) {
                return parseInt(v) || false;
              },
              prefix: pager()
            }, {
              type: 'input', name: 'MC_server-port', message: 'Server port ?', default: '25565',
              filter: function filter(v) {
                return parseInt(v);
              },
              prefix: pager()
            }, {
              type: 'input', name: 'MC_server-ip', message: 'Server IP ?',
              prefix: pager()
            }, {
              type: 'confirm', name: 'MC_spawn-npcs', message: 'Spawn NPCs ?',
              prefix: pager()
            }, {
              type: 'confirm', name: 'MC_allow-flight', message: 'Allow Flight ?', default: false,
              prefix: pager()
            }, {
              type: 'input', name: 'MC_level-name', message: 'World name ?', default: 'world',
              prefix: pager()
            }, {
              type: 'input', name: 'MC_view-distance', message: 'View distance ?', default: '12',
              filter: function filter(v) {
                return parseInt(v);
              },
              prefix: pager()
            }, {
              type: 'input', name: 'MC_resource-pack', message: 'Resource pack .zip url ?',
              prefix: pager()
            }, {
              type: 'confirm', name: 'MC_spawn-animals', message: 'Spawn animals ?',
              prefix: pager()
            }, {
              type: 'confirm', name: 'MC_whitelist', message: 'Use a whitelist ?', default: false,
              prefix: pager()
            }, {
              type: 'confirm', name: 'MC_generate-structures', message: 'Generate structures (villages, mineshafts, etc.) ?',
              prefix: pager()
            }, {
              type: 'confirm', name: 'MC_online-mode', message: 'Online mode ?',
              prefix: pager()
            }, {
              type: 'input', name: 'MC_max-build-height', message: 'Maximum building height ?', default: '256',
              filter: function filter(v) {
                return parseInt(v);
              },
              prefix: pager()
            }, {
              type: 'input', name: 'MC_level-seed', message: 'World seed', default: '',
              prefix: pager()
            }, {
              type: 'confirm', name: 'MC_prevent-proxy-connections', message: 'Prevent proxy connections ?', default: false,
              prefix: pager()
            }, {
              type: 'input', name: 'MC_motd', message: 'Default MOTD', default: '',
              prefix: pager()
            }, {
              type: 'confirm', name: 'MC_enable-rcon', message: 'Enable RCON ?', default: false,
              prefix: pager()
            }, {
              type: 'confirm', name: 'MC_use-native-transport', message: 'Use Native transport ? (default is auto-detected)',
              default: /^linux/.test(process.platform),
              prefix: pager()
            }, {
              type: 'list', name: 'JVM_args', message: 'Which JVM Args template do you prefer ?', choices: JVM_PARAMETERS_TEMPLATES,
              prefix: pager()
            }]);

            return _context.abrupt('return', questions);

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();