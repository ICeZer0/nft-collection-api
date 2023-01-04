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
const getMetaDataForCollections = async (request: Request, response: Response) => {
  const alchemy = new Alchemy(settings);

  try {
    const collectionGroup: Collection[] = [];

    const walletAddr = request.params.walletAddress;
    const collectionQueryAddress = <string>request.query.collectionAddress;

    const acccountMeta = await alchemy.nft.getNftsForOwner(walletAddr);

    acccountMeta?.ownedNfts.map((data: any) => {
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

      collectionGroup.push(nftCollectionData);
    });

    // filter results based on contract Address query param
    // assumption: collectionAddress is required for openSea API call
    if (collectionQueryAddress) {
      const filteredObjects: object[] = [];
      const addressList = collectionQueryAddress.split(',');

      const promises = addressList.map(async (addr) => {
        // assume a single address per collection
        try {
          const data = await getFilteredValues(addr, collectionGroup);
          filteredObjects.push(data as object);
        } catch (err) {
          console.log(err);
        }
      });

      Promise.all(promises).then(() => {
        return response.status(200).json({
          data: filteredObjects
        });
      });
    } else {
      return response.status(200).json({
        data: collectionGroup
      });
    }
  } catch (error) {
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
const getFilteredValues = async (addr: string, collections: Collection[]) => {
  const filteredValue = collections.filter((obj) => obj.address === addr)[0];

  try {
    const data = await getOpenSeaContractData(addr);
    const openSeaResp = await getOpenSeaCollectionData(data?.collection.slug as string);

    filteredValue['openSeaDetails'] = {
      slug: data?.collection.slug as string,
      floorPrice: openSeaResp?.collection.stats.floor_price,
      totalVolume: openSeaResp?.collection.stats.total_volume,
      marketCap: openSeaResp?.collection.stats.market_cap
      // transaction volume
    };

    return filteredValue;
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

export default { getMetaDataForCollections };
