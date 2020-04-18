<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-9-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<p align="right">
  <img width="100" src="https://user-images.githubusercontent.com/31615341/79631890-e5e09680-8196-11ea-9a26-e613b30bb968.png" alt="fellowship logo">
</p>

<p align="center">    
  <a href="https://www.cosmostation.io" target="_blank" rel="noopener noreferrer"><img width="400" src="https://user-images.githubusercontent.com/31615341/78533120-614f5900-7823-11ea-901a-b745880594cf.png" alt="Cosmostation logo"></a>    
</p>

<h2 align="center">    
  Mintscan Explorer's Frontend for Binance Chain     
</h2>

*:star: Developed / Developing by [Cosmostation](https://www.cosmostation.io/)*    
 ## Overview 
 This project is sponsored by [Binance X Fellowship Program](https://binancex.dev/fellowship.html). The program supports talented developers and researchers in creating free and open-source software that would enable new innovations and businesses in the crypto community.
    
This repository provides frontend code for [Mintscan Block Explorer for Binance Chain](https://binance.mintscan.io/).    
   
 **_Note that this repository is currently being developed meaning that most likely there will be many breaking changes._**    
 ## Prerequisite    
 - A working backend described [here](https://github.com/cosmostation/mintscan-binance-dex-backend/chain-exporter) - A general tolerance to read READMEs to the end and urge to not waste time by not doing so    
 ## Install 
 1. Git clone this repo to desired directory  
```shell    
git clone https://github.com/cosmostation/mintscan-binance-dex-frontend.git    
```    
2. yarn it (there is no reason not to use npm, but was not tested thus not recommended) ```shell    
yarn install    

3. access the [`config.js`](https://github.com/cosmostation/mintscan-binance-dex-frontend/blob/master/src/config.js) file directly under the `src/` directory and specify your backend dev and prod apis  
4. Create a `firebase.js` in `src/` with your firebase settings, or comment out the following line in `src/Root.js`
 ``` js
 import "./firebase"
```
5. dev it or build it  
```shell    
yarn dev  
yarn build:dev  
```    
currently as of writing this README, `yarn dev` and `yarn start` have no specific / intended differences other than hiding console.log messages, using different specified APIs and [CRA]([https://github.com/facebook/create-react-app](https://github.com/facebook/create-react-app)) dev / prod differences.  
    
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
    
[complete muck up](https://github.com/cosmostation/mintscan-binance-dex-frontend/blob/master/src/hooks/useIndexedPagination/useIndexedPagination.js)    
    
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
- [Android Wallet](https://bit.ly/2BWex9D) - [iOS Wallet](https://apple.co/2IAM3Xm) 
- [Telegram - International](https://t.me/cosmostation)    
 ## License    
 Released under the [Apache 2.0 License](https://github.com/cosmostation/mintscan-binance-dex-frontend/LICENSE).
## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/binance-exchange"><img src="https://avatars2.githubusercontent.com/u/32770468?v=4" width="100px;" alt=""/><br /><sub><b>binance-exchange</b></sub></a><br /><a href="#financial-binance-exchange" title="Financial">💵</a></td>
    <td align="center"><a href="http://dev.to/fly"><img src="https://avatars3.githubusercontent.com/u/31615341?v=4" width="100px;" alt=""/><br /><sub><b>fl-y</b></sub></a><br /><a href="https://github.com/Cosmostation/mintscan-binance-dex-frontend/commits?author=fl-y" title="Documentation">📖</a> <a href="https://github.com/Cosmostation/mintscan-binance-dex-frontend/issues?q=author%3Afl-y" title="Bug reports">🐛</a> <a href="https://github.com/Cosmostation/mintscan-binance-dex-frontend/commits?author=fl-y" title="Code">💻</a> <a href="#ideas-fl-y" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-fl-y" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://jaybdev.net"><img src="https://avatars1.githubusercontent.com/u/20435620?v=4" width="100px;" alt=""/><br /><sub><b>JayB</b></sub></a><br /><a href="https://github.com/Cosmostation/mintscan-binance-dex-frontend/commits?author=kogisin" title="Code">💻</a> <a href="#projectManagement-kogisin" title="Project Management">📆</a> <a href="#question-kogisin" title="Answering Questions">💬</a></td>
    <td align="center"><a href="https://github.com/hyeryeong-lim"><img src="https://avatars1.githubusercontent.com/u/63229379?v=4" width="100px;" alt=""/><br /><sub><b>hyeryeong-lim</b></sub></a><br /><a href="#design-hyeryeong-lim" title="Design">🎨</a> <a href="#question-hyeryeong-lim" title="Answering Questions">💬</a></td>
    <td align="center"><a href="https://www.wannabit.io"><img src="https://avatars0.githubusercontent.com/u/34641156?v=4" width="100px;" alt=""/><br /><sub><b>wannabit-dev</b></sub></a><br /><a href="#userTesting-wannabit-dev" title="User Testing">📓</a></td>
    <td align="center"><a href="https://www.cosmostation.io"><img src="https://avatars2.githubusercontent.com/u/43632038?v=4" width="100px;" alt=""/><br /><sub><b>David Park</b></sub></a><br /><a href="#business-thaidout" title="Business development">💼</a> <a href="#fundingFinding-thaidout" title="Funding Finding">🔍</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/cosmostation-tony"><img src="https://avatars0.githubusercontent.com/u/57337630?v=4" width="100px;" alt=""/><br /><sub><b>cosmostation-tony</b></sub></a><br /><a href="#ideas-cosmostation-tony" title="Ideas, Planning, & Feedback">🤔</a> <a href="#userTesting-cosmostation-tony" title="User Testing">📓</a></td>
    <td align="center"><a href="https://github.com/wannabit-mina"><img src="https://avatars0.githubusercontent.com/u/34847819?v=4" width="100px;" alt=""/><br /><sub><b>wannabit-mina</b></sub></a><br /><a href="https://github.com/Cosmostation/mintscan-binance-dex-frontend/commits?author=wannabit-mina" title="Code">💻</a></td>
    <td align="center"><a href="https://minami-choi.github.io/"><img src="https://avatars2.githubusercontent.com/u/28688788?v=4" width="100px;" alt=""/><br /><sub><b>Mina Choi</b></sub></a><br /><a href="https://github.com/Cosmostation/mintscan-binance-dex-frontend/commits?author=minami-choi" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!