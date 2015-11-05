var config = require('../config')
var compact = require('lodash/array/compact')

// Grouped by what can run in parallel
var assetTasks = ['fonts', 'iconFont', 'images', 'svgSprite']
var codeTasks = ['html', 'css', 'js']

module.exports = function (env) {
	var jsTasks = {
		watch:       'webpack:watch',
		development: 'webpack:development',
		production:  'webpack:production'
	}

	var matchFilter = function (task) {
		if (config.tasks[task]) {
			if (task === 'js') {
				task = jsTasks[env] || jsTask.watch
			}
			return task
		}
	}

	var tasks = {
		assetTasks: compact(assetTasks.map(matchFilter)),
		codeTasks:  compact(codeTasks.map(matchFilter))
	}

	Object.keys(tasks).map(function (type) {
		if(tasks[type].length == 0) {
			tasks[type] = 'noop'
		}
	})

	return tasks
}
