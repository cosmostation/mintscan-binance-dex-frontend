import React, {useMemo} from "react";
import HighchartsReact from "highcharts-react-official";
import highcharts from "highcharts";

import {_, get24Hours, getTime} from "src/lib/scripts";

import "./Chart.scss";

export default function({options, data}) {
	const refinedData = useMemo(() => _.map(data, v => [v[0], v[1]]), [data]);

	const graphOptions = useMemo(
		() => ({
			...defaultOptions,
			...options,
			series: [
				{
					...series,
					data: data,
				},
			],
			yAxis: {
				...yAxis,
				max: _.max(_.map(data, v => v[1])),
				min: _.min(_.map(data, v => v[1])),
				tickPixelInterval: 100,
			},
			xAxis: {
				...xAxis,
				max: _.max(_.map(data, v => v[0])),
				min: _.min(_.map(data, v => v[0])),
				tickPixelInterval: 70,
			},
		}),
		[options, data]
	);
	return <HighchartsReact highcharts={highcharts} options={graphOptions} />;
}

const xAxis = {
	visible: true,
	labels: {
		formatter: function() {
			return get24Hours(this.value);
		},
		overflow: "justify",
		align: "left",
	},
	gridLineColor: "#222222",
	tickPosition: "outside",
	tickColor: "transaprent",
};
const yAxis = {
	visible: true,
	opposite: true,
	labels: {
		enabled: true,
		align: "left",
		x: 0,
		style: {
			color: "#4b525d",
			fontSize: "11px",
		},
	},
	title: {
		text: "",
	},
	tickPosition: "inside",
};
const series = {
	color: "#ebba16",
	fillColor: {
		linearGradient: {
			x1: 0,
			y1: 0,
			x2: 0,
			y2: 1,
		},
		stops: [
			[
				0,
				highcharts
					.color("#ffda5e")
					.setOpacity(0.8)
					.get("rgba"),
			],
			[
				1,
				highcharts
					.color("#ffffff")
					.setOpacity(0.05)
					.get("rgba"),
			],
		],
	},
};
// 대시보드 그래프 옵션정리
const defaultOptions = {
	credits: {
		enabled: false,
	},
	title: {
		text: "",
	},
	legend: {
		enabled: false,
	},
	chart: {
		type: "areaspline",
		margin: [20, 20, 20, 20],
		height: 45,
		width: 120,
	},
	plotOptions: {
		series: [
			{
				marker: {
					enabled: false,
				},
				states: {
					hover: {
						enabled: true,
					},
				},
				allowPointSelect: true,
			},
		],
	},
	tooltip: {
		enabled: true,
		backgroundColor: "#ffffff",
		borderColor: "black",
		borderRadius: 10,
		borderWidth: 3,
		headerShape: "callout",
		className: "SpeechBubble",
		formatter: function() {
			return "<b>$" + this.y + "</b><br/>" + getTime(this.x);
		},
	},
};
