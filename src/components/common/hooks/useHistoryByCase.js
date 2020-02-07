import {useHistory} from "react-router-dom";

export default function(use) {
	const history = useHistory();
	return use ? history : null;
}
