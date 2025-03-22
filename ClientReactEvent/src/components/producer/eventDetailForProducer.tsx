import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ActivityContext } from "../../context/activity.context";
import { useHttp } from "../../custom-hooks/useHttp";
import { Events } from "../../types/Events";
import { EditableField } from "./EditableField";

export const EventDetailForProducerComponent = () => {
    const { id } = useParams(); // קבלת ה-id מה-URL
    const { activities, refresh } = useContext(ActivityContext); // שימוש בהקשר לפעילויות
    const [activity, setActivity] = useState<Events | undefined>(); // מצב לפעילות הנוכחית
    const [newActivity, setNewActivity] = useState<Events | undefined>(); // מצב לפעילות החדשה
    const { data, error, isLoading, request } = useHttp('/event', 'put'); // שימוש ב-hook מותאם אישית

    useEffect(() => {
        const currentActivity = activities?.find(a => a.eventId === id); // חיפוש פעילות לפי ה-id
        setActivity(currentActivity); // עדכון מצב הפעילות הנוכחית
        setNewActivity(currentActivity); // עדכון מצב הפעילות החדשה

    }, [id, activities]); // תלות ב-id ובפעילויות

    const updateField = (field: keyof Events, value: any) => {
        setNewActivity(prevActivity => {
            const currentActivity = prevActivity || {
                eventId: undefined,
                eventName: '',
                eventDescription: '',
                producerId: undefined
            }; // הגדרה ברירת מחדל

            return {
                ...currentActivity, // הפזר את השדות הקיימים
                [field]: value // עדכון השדה המתאים
            };
        });
    }


    const updateEvent = async () => {
        if (newActivity) { // בדיקה אם יש פעילות חדשה
            await request(newActivity); // שליחת הבקשה לעדכון
            refresh!(); // רענון הפעילויות
        }
    }

    return (
        <>
            {/* שדה לעריכת שם האירוע */}
            <EditableField
                value={activity ? activity.eventName : ''} // אם activity קיים, השתמש בשם האירוע, אחרת ריק
                setValue={(val: string) => updateField('eventName', val)} // עדכון שם האירוע
            />
            {/* שדה לעריכת תיאור האירוע */}
            <EditableField
                value={activity ? activity.eventDescription : ''} // אם activity קיים, השתמש בתיאור האירוע, אחרת ריק
                setValue={(val: string) => updateField('eventDescription', val)} // עדכון תיאור האירוע
            />
            {/* כפתור לשמירת השינויים */}
            <button onClick={updateEvent}>שמור שינויים</button>
        </>
    );
}
