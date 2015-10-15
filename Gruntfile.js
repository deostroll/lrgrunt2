module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		//grunt-contrib-connect
		connect: {
			options: {
				port: 3000,
				hostname: 'localhost',
				livereload: 4582				
			},
			lr:{
				base: ['src'],
				open: true,
				middleware: function(connect) {
					var app = connect();
					var serveStatic = require('./node_modules/grunt-contrib-connect/node_modules/serve-static');
					return [
						app.use('/bower_components', serveStatic('bower_components'))
					]
				},
				debug: true
			}
		},
		//grunt-config-watch
		watch: {
			www: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files : ['src/**/*.{html|css}']
			},
			js: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: ['src/**/*.js'],
				tasks: ['jshint']
			}
		},
		//grunt-wiredep
		wiredep: {
			src: {
				src: 'src/index.html'
			},
			bower: {
				src: 'bower.json',
				tasks: ['wiredep']
			}
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true,
					Kinetic: true
				},
			},
			alljs: {
				files: {
					src: ['src/**/*.js', '!src/js/vendor/*.js']
				}
			}
		}
	});
	
	grunt.registerTask('default', ['wiredep', 'jshint', 'connect', 'watch']);
}