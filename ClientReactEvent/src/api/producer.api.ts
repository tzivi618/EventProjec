import axios from "axios";
import { Producer } from "../types/Producer";


const ProducerInstance = axios.create({
    baseURL: 'http://localhost:5000',
});

export const fetchActivities = async (): Promise<Producer[]> => {
    const response = await ProducerInstance.get<Producer[]>('/producer');
    return response.data;
}

export const addProducer = async (newProducer: Producer): Promise<Producer> => {
    const response = await ProducerInstance.post<Producer>('/producer', newProducer);
    return response.data;
}

export const ApiRequests = {
    fetchActivities,
    addProducer
} as const

type Keys = keyof typeof ApiRequests;
export type RequestMethod = typeof ApiRequests[Keys];