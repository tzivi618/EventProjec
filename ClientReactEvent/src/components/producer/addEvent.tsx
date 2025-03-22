import { useContext, useState } from "react";
import { ActivityContext } from "../../context/activity.context";
import { useHttp } from "../../custom-hooks/useHttp";

export const AddEventComponent = () => {
    const { refresh } = useContext(ActivityContext);
    const { isLoading, error, request } = useHttp('/event', 'post');
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');

    const handleSubmit = async (e:any) => {
        e.preventDefault(); // מונע רענון דף
        const eventData = { eventName, eventDescription };
        
        try {
            await request(eventData);
            refresh!(); // רענן את הקונטקסט אחרי הוספת האירוע
            setEventName(''); // נקה את השדות
            setEventDescription('');
        } catch (err) {
            console.error('Error adding event:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="eventName">שם האירוע</label>
            <input 
                type="text" 
                name="eventName" 
                value={eventName} 
                onChange={(e) => setEventName(e.target.value)} 
            />
            <label htmlFor="eventDescription">תיאור</label>
            <input 
                type="text" 
                name="eventDescription" 
                value={eventDescription} 
                onChange={(e) => setEventDescription(e.target.value)} 
            />
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'ממתין...' : 'הוסף אירוע'}
            </button>
            {error && <p>שגיאה: {error}</p>} {/* העברתי את זה ל-return */}
        </form>
    );
}
