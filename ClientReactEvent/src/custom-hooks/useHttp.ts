import { useCallback, useState } from "react";
import axios from "axios";

// יצירת מופע של axios עם baseURL
const EventsInstance = axios.create({
    baseURL: 'http://localhost:5000',
});

// סוגי המתודולוגיות הנתמכות
type HttpMethod = 'get' | 'post' | 'put' | 'delete';

// hook מותאם אישית - פונקציה שמתחילה ב-use
export function useHttp<T>(url: string, method: HttpMethod) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setIsError] = useState('');
    const [data, setData] = useState<T>();

    // שימוש ב-useCallback כדי למנוע יצירה מחדש של הפונקציה בכל רינדור
    const request = useCallback(async (...params: any[]) => {
        setIsLoading(true);
        setIsError('');
        try {
            let result;
            // שליחת הבקשה בהתאם למתודה
            switch (method) {
                case 'get':
                    result = await EventsInstance.get<T>(url);
                    break;
                case 'post':
                    result = await EventsInstance.post<T>(url, ...params);
                    break;
                case 'put':
                    result = await EventsInstance.put<T>(url, ...params);
                    break;
                case 'delete':
                    result = await EventsInstance.delete<T>(url, ...params);
                    break;
                default:
                    throw new Error('Unsupported method');
            }

            setIsLoading(false);
            setData(result.data);
        } catch (error) {
            setIsLoading(false);
            setIsError('error while fetching data');
        }
    }, [url, method]); // הוספת url ו-method כתלות כדי לעדכן את הפונקציה כשמשתנים

    return { isLoading, error, data, request }; // החזרת הנתונים והפונקציה
}
