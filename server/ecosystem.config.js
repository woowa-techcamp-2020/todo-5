module.exports = {
	apps: [
		{
			name: 'todo-service',
			script: 'node ./node_modules/ts-node/dist/bin.js ./src/main.ts',
			watch: false,
			out_file: './logs/out.log',
			error_file: './logs/error.log',
		},
	],
};
