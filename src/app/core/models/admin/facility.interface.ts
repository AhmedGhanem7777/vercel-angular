export interface IFacility {
    createdAt: string,
    createdBy: {
        userName: string, _id: string
    },
    name: string
    updatedAt: string
    _id: string
}

export interface IResponseGetFacilities {
    success: boolean,
    data: {
        totalCount: number,
        facilities: IFacility[]
    }
}
export interface IResponseSpecificFacility {
    success: boolean,
    data: {
        facility: IFacility
    }
}
export interface IResponseAddFacility extends IResponseSpecificFacility {
    message: string
}
export interface IResponseDeleteFacility extends IResponseSpecificFacility {
    message: string
}
export interface IResponseEditFacility {
    message: string,
    success: boolean,
    data: {}
}