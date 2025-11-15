export interface IRooms {
    capacity:number,
    createdAt:string,
    createdBy:{
        userName:string,
        _id:string
    },
    discount:number,
    facilities:[{}],
    images:[string],
    price:number,
    roomNumber:string,
    updatedAt:string,
    _id:string,
}