import React from "react";
import _ from "lodash";

export {_};

export const omitProperty = (arr, valueArray) => _.map(arr, v => _.omit(v, valueArray));

export const nilCheck = arr => !_.every(arr, el => !_.isNil(el));

//  version 1 - it was quite shite
// export const recursiveExpand = (x, result) => {
// 	if (_.isObject(x) && !_.isArray(x)) return _.map(x, val => `${result} ${recursiveExpand(val, result)}`);
// 	else if (_.isArray(x)) return _.reduce(x, (res, val) => `${recursiveExpand(val, result)} ${res}`, result);
// 	else return `${result} ${x}`;
// };

//  version 2 - not bad, but can it be better?
export const recursiveExpand = (x, result) => {
	if (_.isObject(x) && !_.isArray(x)) return _.map(x, (val, key) => [`<${key}>`, recursiveExpand(val, result), `</${key}>`]);
	else if (_.isArray(x)) return _.reduce(x, (res, val) => `${recursiveExpand(val, result)} ${res}`, result);
	else return `${result} ${x}`;
};
//  ok it's 24:00 I'm gonna call it a night trying out useless stuff
