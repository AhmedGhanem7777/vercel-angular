export interface IAds {
    createdAt: string,
    createdBy: {
        userName: string,
        _id: string
    },
    isActive: boolean,
    room: {
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
    },
    updatedAt: string,
    _id: string,
}

export interface IFacility {
    _id: string;
    name: string;
}

export interface IResponseGetAds{
    success:boolean,
    data:{
        totalCount:number,
        ads:IAds[]
    }
}
export interface IResponseGetSpecificAds{
    success:boolean,
    data:{
        ads:IAds
    }
}
export interface IResponseAddAds extends IResponseGetSpecificAds{
    message:string
}
export interface IResponseEditAds extends IResponseAddAds{}
export interface IResponseDeleteAds extends IResponseAddAds{}
