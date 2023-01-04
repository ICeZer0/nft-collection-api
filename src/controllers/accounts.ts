import { Request, Response } from 'express';
import { Network, Alchemy } from 'alchemy-sdk';

const apiKey = process.env.ALCHEMY_KEY;
const settings = {
  apiKey: process.env.ALCHEMY_KEY,
  network: Network.ETH_MAINNET,
  url: `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`
};

// fetch all nfts owned by a wallet
const getOwnedNFTs = async (request: Request, response: Response) => {
  const alchemy = new Alchemy(settings);
  try {
    const walletAddr = request.params.walletAddress;
    const accountNFTs = await alchemy.nft.getNftsForOwner(walletAddr);

    return response.status(200).json({
      data: accountNFTs
    });
  } catch (error) {
    console.error(error);
    return response.status(400).json({
      data: null,
      error
    });
  }
};

export default { getOwnedNFTs };
