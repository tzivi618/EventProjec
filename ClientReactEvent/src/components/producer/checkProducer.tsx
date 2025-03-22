import { useState } from "react";
import { useHttp } from "../../custom-hooks/useHttp";
import { NavLink } from "react-router-dom";

export const CheckProducerComponent = () => {
    const [inputValue, setInputValue] = useState('');
    const { request, isLoading, error, data } = useHttp<{ producerName: string }>(`/producer/${encodeURIComponent(inputValue)}`, 'get');

    const checkEmailOfProducer = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            try {
                await request();
                 // קריאה לפונקציה של בקשת HTTP
                // console.log(response);
                
                 if (data?.producerName) {
                    alert(`המפיק קיים: ${data.producerName}`);

                } else {
                    alert("לא נימצא כזה משתמש");
                }
            } catch (err) {
                alert("שגיאה בבקשה");
                console.error(err);
            }
        }
    }

    return (
        <>
            <label htmlFor="">הכנסי כתובת מייל</label><br />
            <input 
                type="email" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                onKeyDown={checkEmailOfProducer} 
            />
            {isLoading && <p>טוען...</p>}
            {error && <p>שגיאה: {error}</p>}
        </>
    );
}
