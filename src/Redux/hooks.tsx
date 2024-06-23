import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from './Store';

// פונקציה לחילוץ ערך של עוגייה לפי שם
export const Jwt = (cookieName: string): string | null => {
    // קבלת כל העוגיות כמחרוזת אחת
    const cookies = document.cookie;
    
    // פירוק המחרוזת למערך עוגיות
    const cookieArray = cookies.split(';');
    
    // חיפוש העוגייה הרצויה במערך
    for (let cookie of cookieArray) {
        // הסרת רווחים מיותרים
        cookie = cookie.trim();
        
        // בדיקת התאמת שם העוגייה
        if (cookie.startsWith(`${cookieName}=`)) {
            // חילוץ הערך של העוגייה והחזרתו
            return cookie.substring(cookieName.length + 1);
        }
    }
    
    // החזרת null אם לא נמצאה העוגייה
    return null;
}

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


