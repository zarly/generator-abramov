'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-abramov:app', () => {
	beforeAll(() => {
		return helpers
			.run(path.join(__dirname, '../generators/app'))
			.withPrompts({ name: 'name' });
	});

	it('creates files', () => {
		assert.file(['.editorconfig']);
	});
});
