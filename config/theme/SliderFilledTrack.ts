import { createStyle } from '@gluestack-style/react';

export const SliderFilledTrack = createStyle({
	bg: '$primary100',
	_dark: {
		bg: '$primary400',
	},
	':focus': {
		bg: '$primary50',
		_dark: {
			bg: '$primary300',
		},
	},
	':active': {
		bg: '$primary50',
		_dark: {
			bg: '$primary300',
		},
	},
	':hover': {
		bg: '$primary50',
		_dark: {
			bg: '$primary300',
		},
	},
});
