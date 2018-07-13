var assert = require('assert');

var findpair = require('../findpair');

var loggerText = '';


describe('main()', function() {
	it('should print error if no parameters passed in', function() {
		loggerText = '';
		findpair.main([],logger);
		assert.equal(loggerText, 'Please pass in two parameters: a filename and an amount without decimals');
	});
});
describe('main()', function() {
	it('should print error if file name is empty string', function() {
		loggerText = '';
		findpair.main(['', 1000],logger);
		assert.equal(loggerText, 'invalid file name');
	});
});
describe('main()', function() {
	it('should print error if file does not exist', function() {
		loggerText = '';
		findpair.main(['nonfile', 1000],logger);
		assert.equal(loggerText, 'File "nonfile" not found');
	});
});

describe('main()', function() {
	it('should print error if amount is not a number', function() {
		loggerText = '';
		findpair.main(['prices.txt', 'abc'],logger);
		assert.equal(loggerText, 'invalid amount provided');
	});
});
describe('main()', function() {
	it('should print error if amount is negative', function() {
		loggerText = '';
		findpair.main(['prices.txt', -1],logger);
		assert.equal(loggerText, 'please enter a positive amount');
	});
});


describe('main()', function() {
	it('should get "Not possible" when 100 passed in', function(done) {
		loggerText = '';
		findpair.main(['prices.txt', 100],logger, function() {
			assert.equal(loggerText, 'Not possible');
		});
		done();
	});
});
describe('main()', function() {
	it('should get "Candy Bar 500, Earmuffs 2000" when 2500 passed in', function(done) {
		loggerText = '';
		findpair.main(['prices.txt', 2500],logger, function() {
			assert.equal(loggerText, 'Candy Bar 500, Earmuffs 2000');
		});
		done();
	});
});
describe('main()', function() {
	it('should get "Paperback Book 700, Headphones 1400" when 2300 passed in', function(done) {
		loggerText = '';
		findpair.main(['prices.txt', 2300],logger, function() {
			assert.equal(loggerText, 'Paperback Book 700, Headphones 1400');
		});
		done();
	});
});
describe('main()', function() {
	it('should get "Earmuffs 2000, Bluetooth Stereo 6000" when 10000 passed in', function(done) {
		loggerText = '';
		findpair.main(['prices.txt', 10000],logger, function() {
			assert.equal(loggerText, 'Earmuffs 2000, Bluetooth Stereo 6000');
		});
		done();
	});
});

describe('main()', function() {
	it('should get "Not possible" when 1100 passed in', function(done) {
		loggerText = '';
		findpair.main(['prices.txt', 1100],logger, function() {
			assert.equal(loggerText, 'Not possible');
		});
		done();
	});
});



// puts all output in single string without linefeed
function logger(textToLog)
{
	loggerText = loggerText + textToLog;
}
