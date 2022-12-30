import axios, { AxiosResponse } from 'axios';
import { Request, Response, NextFunction } from 'express';
import { Network, Alchemy } from "alchemy-sdk";

const apiKey = process.env.ALCHEMY_KEY;
const settings = {
    apiKey: apiKey,
    network: Network.ETH_MAINNET,
    url: `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`
};

interface Collection {
    "ethWalletId": string;
    "name": string;
    "address": string;
    "assetsHeld": number;
    "totalSupply": number;
    "imageUrl": string;
    "openseaFloorPrice": number;
}

// fetch all collections for a ether wallet
const getMetaDataForCollections = async (request: Request, response: Response, next: NextFunction) => {
    const alchemy = new Alchemy(settings);

    try {
        const collectionGroup: Collection[] = [];

        const walletAddr = request.params.walletAddress
        const collectionQueryAddress = request.query.collectionAddress

        const acccountMeta = await alchemy.nft.getNftsForOwner(walletAddr)

        acccountMeta?.ownedNfts.map((data: any, idx: number) => {

            const nftCollectionData = {
                "ethWalletId": request.params.walletAddress,
                "name": data.contract.name,
                "address": data.contract.address,
                "assetsHeld": data.balance,
                "totalSupply": data.contract.totalSupply,
                "imageUrl": data.media[0].thumbnail,
                "openseaFloorPrice": data.contract.openSea.floorPrice
            }

            collectionGroup.push(nftCollectionData);
        })

        // filter results based on contract Address query param
        if (collectionQueryAddress) {
            const filteredObjects = collectionGroup.filter(obj => obj.address !== collectionQueryAddress);

            return response.status(200).json({
                data: filteredObjects
            });
        }

        return response.status(200).json({
            data: collectionGroup
        });

    } catch (error) {
        console.error(error);
        return response.status(400).json({
            data: null,
            error
        });

    }
}


export default { getMetaDataForCollections };