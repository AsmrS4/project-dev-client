export interface IEventCard {
    id: string,
    images: ImageProps[],
    title: string,
    description: string,
    dateTime: []
}

export interface ImageProps {
    id: string,
    imageUrl: string
}