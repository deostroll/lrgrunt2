module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	grunt.initConfig({
		//grunt-contrib-connect
		connect: {
			options: {
				port: 3000,
				hostname: 'localhost',
				livereload: 4582				
			},
			livereload: {
				options: {
					open: true,
					middleware: function(connect){
						connect.static = require('./node_modules/grunt-contrib-connect/node_modules/serve-static');
						return [
							connect().use('/bower_components', connect.static('./bower_components')),
							connect.static('./src')
						]
					}
				}
			}
		},
		//grunt-config-watch
		watch: {
			src: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files : ['src/**/*.{html,css,js}']
			},
			scripts: {				
				files: ['scripts/*.js'],
				tasks: ['jshint', 'concat']
			},
			bower: {
				files: 'bower.json',
				tasks: ['wiredep']
			}
		},
		//grunt-wiredep
		wiredep: {
			src: {
				src: 'src/index.html'
			}			
		},
		//grunt-contrib-jshint
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
			scripts: {
				files: {
					src: ['scripts/*.js']
				}
			}
		},
		//concat stuff
		concat: {
			scripts: {
				src:['scripts/main.js', 'scripts/run.js'],
				dest: 'src/js/main.js'
			}
		}
	});
	
	grunt.registerTask('default', ['wiredep', 'jshint', 'concat', 'connect', 'watch']);
}