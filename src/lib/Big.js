import _ from "lodash";
import B from "big.js";
import consts from "src/constants/consts";

B.NE = -10;
B.PE = 100;

//  necessary for decimal precision due to javascript being javascript.
//  ofc.

export const big = input => {
	const ret = new B(input);
	return ret ? ret : new B("0");
};

export const fixed = (input = "0", places = consts.NUM.DEFAULT_DECIMALS) => {
	return new B(input).toFixed(places);
};

export const add = (input1 = "0", input2 = "0", places = consts.NUM.DEFAULT_DECIMALS) => {
	return new B(input1).plus(input2).toFixed(places);
};

export const sumArray = (inputArray = [], places = consts.NUM.DEFAULT_DECIMALS) => {
	let sum = 0;
	_.each(inputArray, v => {
		sum = add(sum, v);
	});
	return sum;
};

export const minus = (input1 = "0", input2 = "0", places = consts.NUM.DEFAULT_DECIMALS) => {
	return new B(input1).minus(input2).toFixed(places);
};

export const multiply = (input1 = "0", input2 = "0", places = consts.NUM.DEFAULT_DECIMALS) => {
	return new B(input1).times(input2).toFixed(places);
};

export const divide = (input1 = "0", input2 = "0.1", places = consts.NUM.DEFAULT_DECIMALS) => {
	if (isZero(input2)) return "NaN";
	else if (!_.isFinite(Number(input2)) || !_.isFinite(Number(input1))) return "NaN";
	return new B(input1).div(input2).toFixed(places);
};

const isZero = v => Number(v) === 0;
