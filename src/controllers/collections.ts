import axios, { AxiosResponse } from 'axios';
import { Request, Response, NextFunction } from 'express';

interface Collection {
    "ethWalletId": string;
    "name": string;
    "assetsHeld": number;
    "supply": number;
    "image": string;
    "openseaFloorPrice": number;
}

// testing routes 
const sampleResp = [
    {
        "ethWalletId": "0001001",
        "name": "myCollectionName",
        "assetsHeld": 25,
        "supply": 1000,
        "image": "https://imageURL.com",
        "openseaFloorPrice": 10.00
    },
    {
        "ethWalletId": "0001001",
        "name": "myCollectionName",
        "assetsHeld": 25,
        "supply": 1000,
        "image": "https://imageURL.com",
        "openseaFloorPrice": 10.00
    },
]

// fetch all collections for a ether wallet
const getCollections = async (request: Request, response: Response, next: NextFunction) => {
    // let ethWalletId = request.params.ethWalletId
    // let resp: AxiosResponse = await axios.get('myURL/${ethWalletId}');
    const collections: Collection[] = sampleResp;
    return response.status(200).json({
        data: collections
    })
}

// const getCollectionById = async (request: Request, response: Response, next: NextFunction) => {
//     // let collectionId = request.params.collectionId
//     // let resp: AxiosResponse = await axios.get('myURL/${collectionId}');
//     let collections: Collection[] = sampleResp;
//     return response.status(200).json({
//         data: collections
//     })
// }

export default { getCollections };