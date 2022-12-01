import Chart from 'chart.js/auto';

export const CHART_COLORS = {
	red: '#e91e63',
	orange: '#ff9800',
	yellow: '#ffeb3b',
	green: '#009688',
	blue: '#3f51b5',
	purple: '#9c27b0',
	grey: '#3D3D3F',
};

export function valueOrDefault(value, defaultValue) {
	return typeof value === 'undefined' ? defaultValue : value;
}

let _seed = Date.now();

export function srand(seed) {
	_seed = seed;
}

function rand(min, max) {
	min = valueOrDefault(min, 0);
	max = valueOrDefault(max, 0);
	_seed = (_seed * 9301 + 49297) % 233280;
	return min + (_seed / 233280) * (max - min);
}

export function numbers(config) {
	const cfg = config || {};
	const min = valueOrDefault(cfg.min, 0);
	const max = valueOrDefault(cfg.max, 100);
	const from = valueOrDefault(cfg.from, []);
	const count = valueOrDefault(cfg.count, 8);
	const decimals = valueOrDefault(cfg.decimals, 8);
	const continuity = valueOrDefault(cfg.continuity, 1);
	const dfactor = Math.pow(10, decimals) || 0;
	const data = [];
	let i, value;

	for (i = 0; i < count; ++i) {
		value = (from[i] || 0) + rand(min, max);
		if (rand() <= continuity) {
			data.push(Math.round(dfactor * value) / dfactor);
		} else {
			data.push(null);
		}
	}

	return data;
}

const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

export function months(config) {
	const cfg = config || {};
	const count = cfg.count || 12;
	const section = cfg.section;
	const values = [];
	let i, value;

	for (i = 0; i < count; ++i) {
		value = MONTHS[Math.ceil(i) % 12];
		values.push(value.substring(0, section));
	}

	return values;
}

export function dashCharts() {
	const dashboardCharts = {};

	const DATA_COUNT = 30;

	const labels = months({ count: DATA_COUNT });
	const data = {
		labels,
		datasets: [
			{
				label: 'DB',
				barPercentage: 0.5,
				barThickness: 16,
				maxBarThickness: 18,
				minBarLength: 2,
				data: numbers({ count: DATA_COUNT, min: 220, max: 320 }),
				backgroundColor: CHART_COLORS.green,
				stack: 'Stack 0',
			},
			{
				label: 'New',
				barPercentage: 0.5,
				barThickness: 16,
				maxBarThickness: 18,
				minBarLength: 2,
				data: numbers({ count: DATA_COUNT, min: 0, max: 100 }),
				backgroundColor: CHART_COLORS.blue,
				stack: 'Stack 0',
			},
			{
				label: 'Removed',
				barPercentage: 0.5,
				barThickness: 16,
				maxBarThickness: 18,
				minBarLength: 2,
				data: numbers({ count: DATA_COUNT, min: 0, max: -30 }),
				backgroundColor: CHART_COLORS.red,
				stack: 'Stack 0',
			},
		],
	};

	const config = {
		type: 'bar',
		data,
		options: {
			plugins: {
				title: {
					display: true,
					text: 'Product Catalog Chart - Stacked',
				},
			},
			responsive: true,
			interaction: {
				intersect: false,
			},
			scales: {
				x: {
					stacked: true,
				},
				y: {
					stacked: true,
				},
			},
		},
	};

	dashboardCharts.lineChart = new Chart(
		document.getElementById('timeline-chart'),
		config
	);
}

window.onload = dashCharts();
