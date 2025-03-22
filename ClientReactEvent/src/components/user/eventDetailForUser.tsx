import { useState } from "react";
import { useParams } from "react-router-dom"
import { Events } from "../../types/Events";

export const EventDetailForUserComponent=()=>{
 const {id} = useParams();
 const [event,setEvent] = useState<Events|undefined>();

    
    
    return<>
    <h1></h1>
    </>
}