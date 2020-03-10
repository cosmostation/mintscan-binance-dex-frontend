<p align="center">
  <a href="https://www.cosmostation.io" target="_blank" rel="noopener noreferrer"><img width="100" src="https://user-images.githubusercontent.com/20435620/55696624-d7df2e00-59f8-11e9-9126-edf9a40b11a8.png" alt="Cosmostation logo"></a>
</p>

<h2 align="center">
    Mintscan Explorer's Frontend for Binance Chain 
</h2>

*:star: Developed / Developing by [Cosmostation](https://www.cosmostation.io/)*

## Overview
This project is sponsored by [Binance X Fellowship Program](https://binancex.dev/fellowship.html).

This repository provides frontend code for [Mintscan Block Explorer for Binance Chain](https://binance.mintscan.io/).

- [chain-exporter](https://github.com/cosmostation/mintscan-binance-dex-backend/chain-exporter) watches a full node of Binance Chain and export data into PostgreSQL database.

- [mintscan](https://github.com/cosmostation/mintscan-binance-dex-backend/mintscan) is where all custom APIs are located.

**_Note that this repository is currently being developed meaning that most likely there will be many breaking changes._**

## Prerequisite

- A working backend described [here](https://github.com/cosmostation/mintscan-binance-dex-backend/chain-exporter)
- A general tolerance to read READMEs to the end and urge to not waste time by not doing so

## Install
Git clone this repo to desired directory
```shell
git clone https://github.com/cosmostation/mintscan-binance-dex-frontend.git
```
yarn it (there is no reason not to use npm, but was not tested thus not recommended)
```shell
yarn install
```
dev it or build it
```shell
yarn dev
yarn build:dev
```
currently as of writing this README, `yarn dev` and `yarn start` have no specific / intended differences other than hiding console.log messages and [CRA]([https://github.com/facebook/create-react-app](https://github.com/facebook/create-react-app)) dev / prod differences. This will change to target different backend APIs in the not-so-far future.

## Contributing

We encourage and support an active, healthy community of contributors — any contribution, improvements, and suggestions are always welcome! Details are in the [contribution guide](https://github.com/cosmostation/mintscan-binance-dex-frontend/docs/CONTRIBUTING.md)

### Note before I'm bothered to actually write the guide
```
I'm very conscious of how much more work could be done to make this project
- a very general term - but just better.
A lot of the code (with great reluctance) are even in my possibly abysmal standards
'not up to par', I still have nightmares of the fact that I didn't adhere
to the 'rule of hooks' in many occasions.
(I beg of you to put down your pitchforks after reading the myriads of warning messages
spewing out of this
```

[complete muck up](https://github.com/cosmostation/mintscan-binance-dex-frontend/blob/master/src/hooks/useIndexedPagination/useIndexedPagination.js](https://github.com/cosmostation/mintscan-binance-dex-frontend/blob/master/src/hooks/useIndexedPagination/useIndexedPagination.js))

###### _Ironically that single monstrosity of a file took up about 30% of the total time that I worked on this project_
```
Please feel free to help clear up this displeasant stream of code
before it becomes the hopeless mess it is most certainly destined to become
without your most awaited upon help.

yours sincerely, with a grain of salt *wink*
```

## Our Services and Community 

- [Official Website](https://www.cosmostation.io)
- [Mintscan Explorer](https://www.mintscan.io)
- [Web Wallet](https://wallet.cosmostation.io)
- [Android Wallet](https://bit.ly/2BWex9D)
- [iOS Wallet](https://apple.co/2IAM3Xm)
- [Telegram - International](https://t.me/cosmostation)

## License

Released under the [Apache 2.0 License](https://github.com/cosmostation/mintscan-binance-dex-frontend/LICENSE).