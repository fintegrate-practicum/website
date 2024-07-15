import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from '../../../Redux/store';


export const useJwtFromCookie = (cookieName: string): string | null => {
    
    const cookies = document.cookie;
    const cookieArray = cookies.split(';');

    for (let cookie of cookieArray) {
        cookie = cookie.trim();
        if (cookie.startsWith(`${cookieName}=`)) {     
            return cookie.substring(cookieName.length + 1);
        }
    }  
    return null;
}

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
