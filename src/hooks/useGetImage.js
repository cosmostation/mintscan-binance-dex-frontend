import {useEffect, useState} from "react";
import {_, empty} from "src/lib/scripts";

const imageExists = (image_url, cb, cbErr, fallback_url) => {
	const img = new Image();
	img.onload = cb;
	img.onerror = cbErr;
	img.src = image_url;
};

export default function useGetImage(inputArr = [], fallback_img = "") {
	const [image, setImage] = useState(fallback_img);
	const [linkArr, setLinkArr] = useState(inputArr);
	useEffect(() => {
		if (!empty(linkArr) && image === fallback_img) getImage(linkArr, setImage);
		// eslint-disable-next-line
	}, [linkArr, inputArr]);

	return [image ? image : fallback_img, setLinkArr];
}

const getImage = (inputArr, setImage) => {
	const promiseList = [];
	_.each(inputArr, v =>
		promiseList.push(
			new Promise((resolve, reject) => {
				imageExists(
					v,
					() => resolve(v),
					() => resolve(null)
				);
			})
		)
	);
	Promise.all(promiseList).then(arr => {
		const compact = _.compact(arr);
		if (!empty(compact)) setImage(compact[0]);
	});
};
