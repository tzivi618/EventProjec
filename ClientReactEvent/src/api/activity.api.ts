import axios from "axios";
import { Events } from "../types/Events";

const EventsInstance = axios.create({
    baseURL: 'http://localhost:5000',
});

export const fetchActivities = async (): Promise<Events[]> => {
    const response = await EventsInstance.get<Events[]>('/event');
    return response.data;
}

export const addEvent = async (newEvent: Events): Promise<Events> => {
    const response = await EventsInstance.post<Events>('/event', newEvent);
    return response.data;
}

export const ApiRequests = {
    fetchActivities,
    addEvent
} as const

type Keys = keyof typeof ApiRequests;
export type RequestMethod = typeof ApiRequests[Keys];