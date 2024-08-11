import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import indexE from './locales/en/index'
import indexH from './locales/he/index'

const resources = {
	en: {
		translation: indexE
	},
	he: {
		translation: indexH
	},
};
i18n.use(initReactI18next).init({
	resources,
	lng: 'en', // השפה ההתחלתית
	fallbackLng: 'en',
	interpolation: {
		escapeValue: false, // React כבר מבצע escaping לערכי הטקסט
	},
});
export default i18n;