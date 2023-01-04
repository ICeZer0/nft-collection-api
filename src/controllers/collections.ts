import { Request, Response } from 'express';
import { Network, Alchemy } from 'alchemy-sdk';
const sdk = require('api')('@opensea/v1.0#10fy4ug30l7qohm4q');
import * as util from '../utils/fakeResponse';

const apiKey = process.env.ALCHEMY_KEY;
const settings = {
  apiKey: apiKey,
  network: Network.ETH_MAINNET,
  url: `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`
};

interface Collection {
  ethWalletId: string;
  name: string;
  address: string;
  assetsHeld: number;
  totalSupply: number;
  imageUrl: string;
  openseaFloorPrice: number;
  openSeaDetails: {
    slug?: string;
    floorPrice?: number;
    totalVolume?: number;
    marketCap?: number;
    [key: string]: any;
  };
}

// fetch all collections for a ether wallet
const getCollectionsMetaData = async (request: Request, response: Response) => {
  const alchemy = new Alchemy(settings);

  try {
    const collectionGroup: Collection[] = [];

    const walletAddr = request.params.walletAddress;
    const collectionQueryAddress = <string>request.query.collectionAddress;

    const accountMeta = await alchemy.nft.getNftsForOwner(walletAddr);

    const promises = accountMeta?.ownedNfts.map(async (data: any) => {
      const nftCollectionData = {
        ethWalletId: request.params.walletAddress,
        name: data.contract.name,
        address: data.contract.address,
        assetsHeld: data.balance,
        totalSupply: data.contract.totalSupply,
        imageUrl: data.media[0].thumbnail,
        openseaFloorPrice: data.contract.openSea.floorPrice,
        openSeaDetails: {}
      };

      try {
        const openSeaDeails = await getOpenSeaDetails(data.contract.address, nftCollectionData);
        collectionGroup.push(openSeaDeails as Collection);
      } catch (err) {
        // Handle specific errors that might occur when calling getOpenSeaDetails
        console.log(err);
      }
    });

    Promise.all(promises).then(() => {
      const filteredCollection: Collection[] = [];

      if (collectionQueryAddress) {
        const addressList = collectionQueryAddress.split(',');
        addressList.forEach((addr) => {
          const res = collectionGroup.filter((obj) => obj.address === addr)[0];
          filteredCollection.push(res as Collection);
        });
      }
      const resp = filteredCollection.length > 0 ? filteredCollection : collectionGroup;

      return response.status(200).json({
        data: resp
      });
    });
  } catch (error) {
    // Handle specific errors that might occur when calling getNftsForOwner
    console.error(error);

    return response.status(400).json({
      data: null,
      error
    });
  }
};

/* 
This function filters down to the collectionAddresses before calling external APIs to supplement data
Asumption: mocking opensea api calls. Additional error handling may be required depending on api responses
*/
const getOpenSeaDetails = async (addr: string, collection: Collection) => {
  try {
    const data = await getOpenSeaContractData(addr);
    const openSeaResp = await getOpenSeaCollectionData(data?.collection.slug as string);

    collection['openSeaDetails'] = {
      slug: data?.collection.slug as string,
      floorPrice: openSeaResp?.collection.stats.floor_price,
      totalVolume: openSeaResp?.collection.stats.total_volume,
      marketCap: openSeaResp?.collection.stats.market_cap
      // transaction volume
    };

    return collection;
  } catch (err) {
    console.error(err);
  }
};

// validation error: missing api-key
const getOpenSeaContractData = async (contractAddress: string) => {
  try {
    // console.log('contractAddress===>', contractAddress);
    // sdk.retrievingASingleContract({ asset_contract_address: contractAddress ?? '0x2e35e63808b3fc6923a4097c22f3f14f983d78d7', 'x-api-key': 'demo' })
    //     .then((data: any) => console.log('RESPOOONNNSE-->', data))
    //     .catch((err: any) => console.error(err));

    const newClass = new util.fakeReponses.OpenSea();

    return newClass.ContractData();
  } catch (error) {
    console.log(error);
  }
};

// validation error: missing api-key
const getOpenSeaCollectionData = async (collectionSlug: string) => {
  try {
    // console.log('collectionSlug===>', collectionSlug);
    // sdk.retrievingASingleCollection({ collection_slug: collectionSlug ?? 'doodles-official' })
    //     .then((data: any) => console.log(data))
    //     .catch((err: any) => console.error(err));

    const newClass = new util.fakeReponses.OpenSea();

    return newClass.CollectionData();
  } catch (error) {
    console.log(error);
  }
};

export { getCollectionsMetaData };
