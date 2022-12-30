# nft-collection-api
REST API for on/off chain nft collection data  

### Built With
* [TS Node](https://github.com/TypeStrong/ts-node)
* [Axios](https://github.com/axios/axios)
* [Nodemon](https://github.com/remy/nodemon)
* [TS Linter](https://github.com/typescript-eslint/typescript-eslint)
* [Husky](https://github.com/typicode/husky)

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
GET /api/collections
```

### REST API
---
##### Request
`GET /api/collections`

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




### Resources
[TS Config Docs](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
