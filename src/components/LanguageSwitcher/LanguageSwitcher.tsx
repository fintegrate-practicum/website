import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonGroup, Box } from '@mui/material';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  // פונקציה לשינוי שפה וכיוון
  const changeLanguage = (lng: string) => {
    if (i18n && typeof i18n.changeLanguage === 'function') {
      i18n.changeLanguage(lng);

      // קביעת הכיוון בהתאם לשפה
      const newDirection = lng === 'he' ? 'rtl' : 'ltr';
      document.body.style.direction = newDirection; // עדכון סגנון הכיוון של הגוף
      document.documentElement.lang = lng; // הגדרת שפת האתר

    } else {
      console.error('i18n or changeLanguage is not available');
    }
  };

  // קביעת כיוון הכפתורים והמיקום לפי השפה הנוכחית
  const currentDirection = i18n.language === 'he' ? 'rtl' : 'ltr';

  return (
    <Box
      position='fixed'
      top={16}
      zIndex='tooltip'
      bgcolor='background.paper'
      borderRadius='4px'
      boxShadow={3}
      p={1}
      display='flex'
      justifyContent='center'
      alignItems='center'
      sx={{
        direction: currentDirection, // שינוי הכיוון של הכפתורים בהתאם לשפה הנוכחית
      }}
    >
      <ButtonGroup variant='contained' color='primary'>
        <Button onClick={() => changeLanguage('en')}>English</Button>
        <Button onClick={() => changeLanguage('he')}>עברית</Button>
      </ButtonGroup>
    </Box>
  );
};

export default LanguageSwitcher;
