import {useState} from "react";
import _ from "lodash";

export default function(init = {}) {
	const [state, setState] = useState(init);

	const handleState = updateObj => {
		if (updateObj.isReducer === true && _.isObject(updateObj.action)) {
			if (updateObj.action.type === undefined) throw new Error("action type is not defined");
			const updateObjCopy = {
				...updateObj,
				isReducer: undefined,
				action: undefined,
			};
			const {type} = updateObj.action;
			switch (type) {
				default:
					return setState(prev => ({...prev, ...updateObjCopy}));
				// do reducer things with updateObjCopy we're not bothered to and use it to set state.
			}
		}
		//TODO
		//	add logic that checks whether input object keys are predefined
		setState(prev => ({...prev, ...updateObj}));
		// console.log("state edit =>", state, updateObj);
	};

	return [state, handleState];
}
