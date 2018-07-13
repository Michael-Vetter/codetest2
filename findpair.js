#!/usr/bin/env node
const LineByLineReader = require('line-by-line');
const fs = require('fs');
var exports = module.exports = { main };



main(process.argv.slice(2), logger);



function main(inputArgs, logger, optionalCallback) {
	
	if(inputArgs.length < 2) {
		logger('Please pass in two parameters: a filename and an amount without decimals');
		return;
	}
	
	var filename = inputArgs[0];
	var amount = parseInt(inputArgs[1]);
	
	if(!validateParameters(filename, amount, logger))
	   return;
	
	loadFileIntoObject(filename, amount, logger, optionalCallback);

	
}


function loadFileIntoObject(filename, maximumAmount, logger, callback) {
	
	var items = {
		Descs: [],
		Amounts: []
	};
	
	var lr = new LineByLineReader(filename);	
	var lineIndex = 0;
	
	lr.on('error', function (err) {
		logger('error: ' + err);
	});

	lr.on('line', function (line) {	
		
		parsedLine = line.split(',');
		var description = parsedLine[0];
		var itemAmount = parseInt(parsedLine[1]);
		
		if (itemAmount < maximumAmount) {
			items.Descs[lineIndex] = description;
			items.Amounts[lineIndex] = itemAmount;
			lineIndex++;
		}
		else {
			//stop processing the file as soon as we find an item over the max amount
			lr.close();
		}
		
	});

	lr.on('end', function () {	
		pairSearch(items, maximumAmount, logger);
		
		if(typeof(callback) == 'function')
			callback();
	});
	
}

function pairSearch(items, maxAmount, logger)
{
	//not possible if we don't have at least 2 items
	if (items.Amounts.length <= 1) {
		logger('Not possible');
		return;
	}
	
	//not possible if the first two items cost more than the amount
	var twoLowestItems = items.Amounts[0] + items.Amounts[1];
	if(twoLowestItems > maxAmount){
		logger('Not possible');
		return;
	}
	
	var item1index = 0;
	var item2index = 0;
	var diff = parseInt(maxAmount);
	var currentDiff = 0;
	var i,j;
	
	for(i = 0; i < items.Amounts.length - 1; i++) {
		for(j = i+1; j < items.Amounts.length; j++) {
			
			currentDiff = maxAmount - items.Amounts[i] - items.Amounts[j];
			
			if (currentDiff < 0)
				break;
			
			if (currentDiff < diff) {
				//keep track of the two items with the lowest difference
				item1index = i;
				item2index = j;
				diff = currentDiff
			}			
		}
		
		// if we find two items that exactly match the max amount, stop processing.
		if (diff == 0) 
			break;
	}
	
	result = items.Descs[item1index] + ' ' + items.Amounts[item1index] + ', ' + items.Descs[item2index] + ' ' + items.Amounts[item2index]
	
	logger(result); 
	
	return;
}

function validateParameters(filename, amount, logger) {
	
	if(filename.length == 0) {
		logger('invalid file name');
		return false;
	}
	
	if(!isFileSync(filename)) {
		logger('File "' + filename + '" not found');
		return false;
	}
	
	if(isNaN(amount)) {
		logger('invalid amount provided');
		return false;
	}
	
	if(amount < 0) {
		logger('please enter a positive amount');
		return false;
	}
	
	
	return true;
}

function isFileSync(filename) {
  try {
    return fs.statSync(filename).isFile();
  } 
  catch (e) {
    return false;
  }
}

function logger(textToLog)
{
	console.log(textToLog);
}







