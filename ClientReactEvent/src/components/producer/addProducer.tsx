import { useHttp } from "../../custom-hooks/useHttp";
import { useContext, useState } from "react";
import { ProducerContext } from "../../context/producer.context"; // ייבוא הקונטקסט

export const AddProducerComponent = () => {
    const { request, isLoading, error, data } = useHttp<{ producerName: string }>(`/producer`, 'post');
    const { refresh } = useContext(ProducerContext); // קבלת פונקציית רענון מהקונטקסט
    const [submitError, setSubmitError] = useState<string>('');

    const submitNewProducer = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // מניעת רענון הדף
        const formData = new FormData(event.currentTarget); // קבלת נתוני הטופס
        const producerData = {
            producerName: formData.get("producerName"),
            producerPhone: formData.get("producerPhone"),
            producerEmail: formData.get("producerEmail"),
            producerDescription: formData.get("producerDescription"),
        };

        // בדיקה אם אחד מהשדות ריק
        if (!producerData.producerName || !producerData.producerPhone || !producerData.producerEmail || !producerData.producerDescription) {
            setSubmitError('כל השדות חייבים להיות מלאים.'); // הודעת שגיאה עבור שדות ריקים
            return; // לא להמשיך לשלוח את הבקשה
        }

        try {
            await request(producerData); // קריאה לפונקציה של בקשת HTTP
            // await refresh(); // רענון הנתונים לאחר הוספת המפיק
            setSubmitError(''); 
            // ננקה את השגיאה
        
        } catch (err) {
            setSubmitError('שגיאה בהוספת המפיק.'); // הודעת שגיאה כללית
        }
    }

    return (
        <>
            <form onSubmit={submitNewProducer}>
                <label htmlFor="">הכנסי שם</label>
                <input type="text" name="producerName" /><br />
                <label htmlFor="">הכנסי מספר טלפון</label>
                <input type="tel" name="producerPhone" /><br />
                <label htmlFor="">מייל</label>
                <input type="text" name="producerEmail" /><br />
                <label htmlFor="">תאור</label>
                <input type="text" name="producerDescription" />
                <button disabled={isLoading}>הוספה</button> {/* הכפתור יהיה מושבת בזמן טעינה */}
            </form>
            {submitError && <p>שגיאה: {submitError}</p>} {/* הצגת שגיאה אם קיימת */}
            {data && <p>המפיק נוסף: {data.producerName}</p>} {/* הצגת הודעה אם המפיק נוסף */}
        </>
    );
}
