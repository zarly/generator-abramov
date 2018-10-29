'use strict';

const fs = require('fs');
const _ = require('lodash');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
	async prompting() {
		const prompts = [
			{
				type: 'input',
				name: 'name',
				message: 'Имя проекта:'
			}
		];

		this.props = await this.prompt(prompts);
	}

	async writing() {
		const isTemplateRegExp = /\.tmp$/;
		const files = fs.readdirSync(this.templatePath());
		
		const {name} = this.props;
		const params = {
			nameCamelCase: _.camelCase(name),
			nameKebabCase: _.kebabCase(name),
			nameSneakCase: _.snakeCase(name),
			nameOriginal: name
		};

		files.forEach(input => {
			const output = input.replace(isTemplateRegExp, '');
			if (isTemplateRegExp.test(input)) {
				this.fs.copyTpl(this.templatePath(input), this.destinationPath(output), params);
			} else {
				this.fs.copy(this.templatePath(input), this.destinationPath(output));
			}
		});
	}
};
