// import { useState } from "react";

// export const EditableField = (props: {value: any, setValue: Function}) => {
    
//     const [edit, setEdit] = useState(false);

//     const onBlur = (event: any) => {
//         setEdit(false);
//         props.setValue(event.target.value);
//     }

//     return <>
//         { !edit && <h3 onClick={() => setEdit(true)}> {props.value} </h3> }
//         { edit && <input type="text" defaultValue={props.value} onBlur={onBlur} />}
//     </>

// }


import { useState } from "react";

export const EditableField = (props: { value: string; setValue: (value: string) => void }) => {
    const [edit, setEdit] = useState(false);
    const [inputValue, setInputValue] = useState(props.value); // ניהול ערך ה-input

    const onBlur = () => {
        setEdit(false);
        props.setValue(inputValue); // שלח את הערך המעודכן
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onBlur(); // שמירה בלחיצת Enter
        }
    }

    const handleEditClick = () => {
        setEdit(true);
        setInputValue(props.value); // עדכן את inputValue כאשר מתחילים לערוך
    }

    return (
        <>
            { !edit ? (
                <h3 onClick={handleEditClick}> {props.value} </h3>
            ) : (
                <input
                    type="text"
                    value={inputValue} // השתמש ב-value
                    onBlur={onBlur}
                    onChange={(e) => setInputValue(e.target.value)} // עדכון ערך ה-input
                    onKeyDown={handleKeyDown} // טיפול בלחיצות מקלדת
                />
            )}
        </>
    );
}
