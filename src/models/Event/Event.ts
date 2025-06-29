export interface IEventCard {
    id: string,
    images: ImageProps[],
    title: string,
    description: string,
    status?: string,
    dateTime: []
}

export interface ImageProps {
    id: string | number,
    imageUrl: string,
    eventId: string| number
}

export interface IEvent {
    id: string,
    images: ImageProps[],
    title: string,
    description: string,
    dateTime: [],
    createTime: [],
    address: string,
    status: string
}

export interface EventCreate {
    title: string;
    description: string;
    dateTime: any;
    address: string;
    images: any[];
}