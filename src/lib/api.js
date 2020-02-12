import axios from "axios";

import consts from "src/constants/consts";

export const getMaxHeight = cancelToken => {
	return axios.get(`${consts.API_BASE}${consts.API.BLOCKLIST}?limit=0`, {cancelToken});
};
