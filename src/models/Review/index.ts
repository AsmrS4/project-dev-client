export interface IReview {
    authorId: string;
    eventId: string;
    content: string;
    rating: number;
    fullName:string;
    imageUrl: string | null
    createTime: any
}