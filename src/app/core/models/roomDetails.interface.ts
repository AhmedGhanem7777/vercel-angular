export interface IRoom {
    _id: string;
    roomNumber: string;
}

export interface IUser {
    _id: string;
    userName: string;
    profileImage: string;
}

export interface IRoomReview {
    _id: string;
    room: IRoom;
    user: IUser;
    rating: number;
    review: string;
    createdAt: string;
    updatedAt: string;
}

export interface IResponseRoomReviews {
    success: boolean;
    message: string;
    data: {
        roomReviews: IRoomReview[];
        totalCount: number;
    };
}