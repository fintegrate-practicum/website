import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonGroup, Box } from '@mui/material';
const LanguageSwitcher: React.FC = () => {
	const { i18n } = useTranslation();
	const changeLanguage = (lng: string) => {
		if (i18n && typeof i18n.changeLanguage === 'function') {
			i18n.changeLanguage(lng);
		} else {
			console.error('i18n or changeLanguage is not available');
		}
	};
	return (
		<Box
			position='fixed'
			top={16}
			left={16}
			zIndex='tooltip'
			bgcolor='background.paper'
			borderRadius='4px'
			boxShadow={3}
			p={1}
		>
			<ButtonGroup variant='contained' color='primary'>
				<Button onClick={() => changeLanguage('en')}>English</Button>
				<Button onClick={() => changeLanguage('he')}>עברית</Button>
			</ButtonGroup>
		</Box>
	);
};
export default LanguageSwitcher;