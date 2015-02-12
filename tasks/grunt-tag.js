var shell = require('shelljs');
var BPromise = require('bluebird');

module.exports = function(grunt) {
    grunt.registerTask('tag', 'Create or move git tag and push it', function(type) {

        function ifEnabled(option, fn) {
            if (options[option]) {
                return fn;
            }
        }

        function run(cmd, msg) {
            var deferred = BPromise.defer();
            grunt.verbose.writeln('Running: ' + cmd);

            if (nowrite) {
                grunt.log.ok(msg || cmd);
                deferred.resolve();
            } else {
                var res = shell.exec(cmd, {
                    silent: true
                });

                var success = res.code === 0;
                if (success) {
                    grunt.log.ok(msg || cmd);
                    deferred.resolve();
                } else {
                    // fail and stop execution of further tasks
                    deferred.reject('Failed when executing: `' + cmd + '`\n' + res.output);
                }
            }
            return deferred.promise;
        }

        function tag() {
            return run('git tag -f ' + tagName + ' -m "' + tagMsg + '"', 'Create or move the git tag: ' + tagName);
        }

        function push() {
            return run('git push -f ' + options.remote + ' ' + tagName, 'Push the tag ' + tagName + ' to remote');
        }

        // Defaults
        var options = grunt.util._.extend({
            file: grunt.config('pkgFile') || 'package.json',
            tag: true,
            push: true,
            remote: 'origin'
        }, (grunt.config.data[this.name] ||  {}).options);

        // Read version
        var version = options.file && grunt.file.readJSON(options.file).version;

        // Build tag
        var tagFormat = grunt.config.getRaw(this.name + '.options.tagName') || '<%= version %>';
        var tagMsgFormat = grunt.config.getRaw(this.name + '.options.tagMessage') || 'Version <%= version %>';

        var templateOptions = {
            data: {
                version: version
            }
        };
        var tagName = grunt.template.process(tagFormat, templateOptions);
        var tagMsg = grunt.template.process(tagMsgFormat, templateOptions);

        var nowrite = grunt.option('no-write');
        var done = this.async();

        BPromise.resolve()
            .then(ifEnabled('tag', tag))
            .then(ifEnabled('push', push))
            .catch(function(msg) {
                grunt.fail.warn(msg || 'Tag failed');
            })
            .finally(done);
    });
};
