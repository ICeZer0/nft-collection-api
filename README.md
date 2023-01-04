# nft-collection-api
REST API for on/off chain nft collection data  

### Built With
* [TS Node](https://github.com/TypeStrong/ts-node)
* [Axios](https://github.com/axios/axios)
* [Nodemon](https://github.com/remy/nodemon)
* [TS Linter](https://github.com/typescript-eslint/typescript-eslint)
* [Husky](https://github.com/typicode/husky)
* [Prettier](https://github.com/prettier/prettier)
##### Data Sources
* [Alchemy API](https://docs.alchemy.com/)
* [OpenSea API](https://docs.opensea.io/)

# Setup

### Running the project
```shell
npm run dev
```

Go to http://localhost:3030

### Commands
`npm run dev` - run the dev server.
`npm run build` - build project
`npm run lint` - run the linter.

### Testing Steps
Using a REST Client such as Postman or Insomnia, enter the localhost URL on Port 3030 (http://localhost:3030) and send a request using one of the routes below

### Routes

```
GET /api/v1/collections/metadata/
```
```
GET /api/v1/accounts/
```

### REST API
---
#### Get Collection data

##### Request
`GET /api/v1/collections/{WalletAddr}?collectionAddress="1,2,3"`

##### Response
```
{
    "data": [
        {
            "ethWalletId": "0001001",
            "name": "myCollectionName",
            "assetsHeld": 25,
            "supply": 1000,
            "image": "https://imageURL.com",
            "openseaFloorPrice": 10
        },
        ...
    ]
}
```

#### Get Account data

##### Request
`GET /api/v1/accounts/`

##### Response
```
{
    "data": {
        "ownedNfts": [
            {
                "contract": {
                    "address": "0x001",
                    "name": "",
                    "symbol": "OPENSTORE",
                    "tokenType": "ERC1155",
                    "openSea": {
                        "floorPrice": 0,
                        "collectionName": "",
                        "safelistRequestStatus": "n",
                        "description": "",
                        "lastIngestedAt": "2023-01-03T18:07:37.000Z"
                    }
                },
                "tokenId": "0011",
                "tokenType": "ERC1155",
                "title": "",
                "description": "",
                "timeLastUpdated": "2022-12-14T01:54:17.832Z",
                "rawMetadata": {
                    "name": "",
                    "image": "https://i.seadn.io/image11"
                },
                "tokenUri": {
                    "raw": "https://api.opensea.io/api/v1/",
                    "gateway": "https://api.opensea.io/api/v1/metadata/0x495f94727674"
                },
                "media": [
                    {
                        "raw": "https://i.seadn.io/gae/nEi65lmLiBPS5xp5pOwIH28dXXoWrHJw_MCPeCv",
                        "gateway": "https://nft-cdn.alchemy.com/eth-mainnet/dd1a5c11f7dd54968881ae38a9c0977f",
                        "thumbnail": "https://res.cloudinary.com/1ae38a9c0977f",
                        "format": "png",
                        "bytes": 67715
                    }
                ],
                "balance": 1
            }
        ],
        "totalCount": 1
    }
}
```



### Resources
[TS Config Docs](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
