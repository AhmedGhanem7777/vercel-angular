// Explore Rooms
export interface IFacility {
    _id: string;
    name: string;
}

export interface IRoom {
    _id: string;
    roomNumber: string;
    capacity: number;
    price: number;
    discount: number;
    isBooked?: boolean;
    facilities: IFacility[];
    images: string[];
    createdAt: string;
    updatedAt: string;
    createdBy: string;
}

export interface ICountRooms {
    rooms: IRoom[];
    totalCount: number;
}

export interface IRoomsResponse {
    data: ICountRooms;
    message: string;
    success: boolean;
}


// Rooms Favorites
export interface IResponseFav {
    data: any,
    message: string,
    success: boolean
}

export interface IFavoriteRooms extends IRoom {}
export interface IResponseRemoveFavoriteRooms extends IResponseFav {}


// Room Details
export interface IResponseRoomDetails {
    data: {
        room: IRoom
    },
    message: string,
    success: boolean
}