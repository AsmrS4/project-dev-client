export interface IEventCard {
    id: string,
    images: ImageProps[],
    title: string,
    description: string,
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