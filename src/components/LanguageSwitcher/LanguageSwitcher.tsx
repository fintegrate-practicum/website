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
      document.body.setAttribute('dir', newDirection); // שינוי הכיוון של הדף כולו
      document.body.style.direction = newDirection; // עדכון סגנון הכיוון של הגוף
      document.documentElement.lang = lng; // הגדרת שפת האתר
    } else {
      console.error('i18n or changeLanguage is not available');
    }
  };

  // קביעת כיוון הכפתורים והמיקום לפי השפה הנוכחית
  const currentDirection = i18n.language === 'he' ? 'rtl' : 'ltr';
  const isRTL = currentDirection === 'rtl';

  return (
    <Box
      position="fixed"
      top={16}
      left={isRTL ? 'auto' : 16} // מיקום בצד שמאל עבור אנגלית
      right={isRTL ? 16 : 'auto'} // מיקום בצד ימין עבור עברית
      zIndex="tooltip"
      bgcolor="background.paper"
      borderRadius="4px"
      boxShadow={3}
      p={1}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <ButtonGroup
        variant="contained"
        color="primary"
        sx={{
          direction: 'ltr', // שמירת כיוון הכפתורים ב-LTR
          '& button': {
            borderRadius: '8px', // שמירה על פינות עגולות עבור כל כפתור
          },
          '&:first-of-type': {
            borderTopLeftRadius: '8px', // עיגול פינות בצד שמאל
            borderBottomLeftRadius: '8px',
          },
          '&:last-of-type': {
            borderTopRightRadius: '8px', // עיגול פינות בצד ימין
            borderBottomRightRadius: '8px',
          },
        }}
      >
        <Button onClick={() => changeLanguage('en')}>English</Button>
        <Button onClick={() => changeLanguage('he')}>עברית</Button>
      </ButtonGroup>
    </Box>
  );
};

export default LanguageSwitcher;
