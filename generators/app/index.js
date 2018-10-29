'use strict';

const _ = require('lodash');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
	async prompting() {
		// Have Yeoman greet the user.
		this.log(
			yosay(
				`Welcome to the funkadelic ${chalk.green('generator-abramov')} generator!`
			)
		);

		const prompts = [
			{
				type: 'input',
				name: 'name',
				message: 'Имя проекта:'
			}
		];

		return this.prompt(prompts).then(props => {
			// To access props later use this.props.someAnswer;
			this.props = props;
		});
	}

	async writing() {
		const files = [
			'.editorconfig',
			'.gitignore',
			'.eslintrc.json',
		];
		files.forEach(fileName => {
			this.fs.copy(this.templatePath(fileName), this.destinationPath(fileName));
		});

		const {name} = this.props;
		const templates = [
			'package.json.tmp',
		];
		const params = {
			nameCamelCase: _.camelCase(name),
			nameKebabCase: _.kebabCase(name),
			nameSneakCase: _.snakeCase(name),
			nameOriginal: name
		};
		templates.forEach(input => {
			const output = input.replace(/\.tmp$/, '');
			this.fs.copyTpl(this.templatePath(input), this.destinationPath(output), params);
		});
	}
};
