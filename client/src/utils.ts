export const ORDER_WEIGHT = 100000;
export const POSITION = { UP: -1, DOWN: 1, TOP: -2, BOTTOM: 2, INIT: 0 };
export const calcMedium = (a: number, b: number): number => (a + b) / 2;
export const splitTitleContent = (raw: string) => {
	let title, content, tmp;

	tmp = raw.split('\n');
	if (tmp.length <= 1) {
		title = tmp[0];
		content = '';
	} else {
		title = tmp[0];
		tmp.shift();
		content = tmp.reduce((prev, now) => (prev += now + '\n'), '');
		if (content.length >= 1) content = content.substring(0, content.length - 1);
	}

	return { title, content };
};
