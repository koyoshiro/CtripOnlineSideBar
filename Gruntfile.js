/**
 * Created by jl.gu on 2015/4/15.
 */
var requirejs = require('requirejs');
module.exports = function (grunt) {

    var isDebug = grunt.option('debug');

    grunt.registerTask('default', function () {
        grunt.log.writeln('Running sidebar打包任务');
        var done = this.async();
        var compressOpts = {
            drop_console: true
        };
//        var taskCfg = grunt.file.readJSON('gruntCfg.json');

        var rjsOptions = {
            baseUrl: 'SideBarSrc',
            dir: 'dest',
            optimize: isDebug ? 'none' : 'uglify2',
            paths: {
                "main": "main",
                "require2": "third-party/require2",
                "customConsole": "third-party/console",
                "mt": "third-party/mootools",
                "store": "third-party/store",
                "defaultCfg": "configuration/defaultConfig",
                "barContent": "content/barContent",
                "communication": "helper/communication",
                "region": "helper/region",
                "cookie": "helper/cookie",
                'webConsole': "helper/webConsole",
                'expansion': "helper/expansion",
                'verification': "helper/verification",

                'jsHelper': "helper/jsHelper",
                'route': "helper/route",
                'sideBar': "original/sideBar",
                'animate': "original/animate",
                'definition': "original/definition",
                'access': "original/access",
                'engine': "original/engine",
                'myImplementTool': "tool/myImplementTool",
                'myHistoryTool': "tool/myHistoryTool",
                'myFavoriteTool': "tool/myFavoriteTool",
                'scanTool': "tool/scanTool",
                'feedbackTool': "tool/feedbackTool",
                'liveChatTool': "tool/liveChatTool",
                'returnTopTool': "tool/returnTopTool",
                'adTool': "tool/adTool",
                'loggingTool': "tool/loggingTool",
                'myCtripTool': "tool/myCtripTool"
            },
            uglify2: {
                mangle: {

                },
                compress: compressOpts
            },
            skipModuleInsertion: false,
            modules: [
                {
                    name: "onlineSideBar",
                    create: true,
                    include: [
                        "main",
                        "require2",
                        "customConsole",
                        "mt",
                        "region",
                        "store",
                        "defaultCfg",
                        "barContent",
                        "communication",
                        "cookie",
                        "jsHelper",
                        "route",
                        "sideBar",
                        "animate",
                        "definition",
                        "access",
                        "engine",
                        "myImplementTool",
                        "myHistoryTool",
                        "myFavoriteTool",
                        "scanTool",
                        "feedbackTool",
                        "liveChatTool",
                        "returnTopTool",
                        "adTool",
                        "loggingTool",
                        "myCtripTool"
                    ]
                }
            ],
            removeCombined: true,
            optimizeCss: false
        };

        requirejs.optimize(rjsOptions, function (buildResponse) {
            done();
        }, function (err) {
            grunt.fatal(err);
        });
    });
};