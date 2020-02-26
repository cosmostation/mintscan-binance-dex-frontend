import _ from "lodash";
import B from "big.js";

B.NE = -10;
B.PE = 100;

const DEFAULT_DECIMALS = 6;

export const big = input => {
	const ret = new B(input);
	return ret ? ret : new B("0");
};

export const fixed = (input = "0", places = DEFAULT_DECIMALS) => {
	return new B(input).toFixed(places);
};

export const add = (input1 = "0", input2 = "0", places = DEFAULT_DECIMALS) => {
	return new B(input1).plus(input2).toFixed(places);
};

export const minus = (input1 = "0", input2 = "0", places = DEFAULT_DECIMALS) => {
	return new B(input1).minus(input2).toFixed(places);
};

export const multiply = (input1 = "0", input2 = "0", places = DEFAULT_DECIMALS) => {
	return new B(input1).times(input2).toFixed(places);
};

export const divide = (input1 = "0", input2 = "0.1", places = DEFAULT_DECIMALS) => {
	if (!_.isFinite(input2) || input2 === "0") return "NaN";
	return new B(input1).div(input2).toFixed(places);
};
