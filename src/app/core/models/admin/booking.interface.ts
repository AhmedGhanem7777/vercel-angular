export interface IBooking {
    createdAt: string,
    endDate: string,
    room: {
        _id: string,
        roomNumber: string
    },
    startDate: string,
    status: string,
    totalPrice: number,
    updatedAt: string,
    user: {
        _id: string,
        userName: string,
    },
    _id: string
}

export interface IResponseGetBooking {
    success: boolean,
    message: string,
    data: {
        totalCount: number,
        booking: IBooking[]
    }
}
export interface IResponseGetSpecificBooking {
    success: boolean,
    message: string,
    data: {
        booking: IBooking
    }
}

export interface IResponseDeleteBooking {
    success: boolean,
    message: string,
    data: {}
}