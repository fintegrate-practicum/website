module.exports = {
	input: [
		'src/**/*.{js,jsx,ts,tsx}', // נתיבים לקבצים שבהם התרגומים ייסרקו
		'!src/**/*.spec.{js,jsx,ts,tsx}', // אי הכללת קבצי בדיקות
		'!**/node_modules/**',
	],
	output: './locales/$LOCALE/$NAMESPACE.json', // נתיב לפלט קבצי התרגום
	options: {
		debug: false,
		func: {
			list: ['i18next.t', 'i18n.t'],
			extensions: ['.js', '.jsx', '.ts', '.tsx'],
		},
		trans: {
			component: 'Trans',
			i18nKey: 'i18nKey',
			extensions: ['.js', '.jsx', '.ts', '.tsx'],
			fallbackKey(ns, value) {
				return value;
			},
		},
		lngs: ['en', 'he'], // שפות נתמכות
		ns: ['translation'],
		defaultLng: 'en',
		defaultNs: 'translation',
		resource: {
			loadPath: 'locales/{{lng}}/{{ns}}.json',
			savePath: 'locales/{{lng}}/{{ns}}.json',
			jsonIndent: 2,
			lineEnding: '\n',
		},
		keySeparator: false, // חיבור מפתחות לשמות קבצים או לא
		nsSeparator: false, // חיבור מפתחות לשמות קבצים או לא
	},
};