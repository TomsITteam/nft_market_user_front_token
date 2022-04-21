import API from '@/api'
import Wallet from '@/wallet'
import i18n from '@/locales'
import wallets from '@/wallets'

let base = {
  async contractExec(net,address,value,encodeFunctionData){
    let tx_hash = false;
    if(Wallet.getWallet().checkChainID(net) == false){
      return false
    }

    let walletNet = null
    if (wallets.isMultiWallet()){
      walletNet = wallets.multiWalletNet();
    }else {
      walletNet = wallets.singleWalletNet();
    }

    if (walletNet.toUpperCase() != net.toUpperCase() || walletNet == null){
      alert('네트워크가 서로 다릅니다.')
      return false
    }

    let result = await API.encodeFunction({
      data : encodeFunctionData
    })

    if(result.payload == undefined){
      alert(i18n.t('alert.alert2'))
      return false
    }

    let payload =  result['payload']

    if (this.is_klip()){
      tx_hash = await Wallet.getWallet().contractExec(address,value ,payload.data, encodeFunctionData)
    }else {
      tx_hash = await Wallet.getWallet().contractExec(address,value ,payload.data)
    }

    if(tx_hash == false){
      alert(i18n.t('alert.alert3'))
      return false
    }

    return tx_hash
  },

  is_klip(){
    if(Wallet.getWallet().walletname == "KLIP" || wallets.getWalletName() == "KLIP"){
      return true;
    }

    return false;
  }
}

let singleNFT = {
  async contractExec(net,value,encodeFunctionData){
    let contractAddress = window.front_env['VUE_APP_' + net + '_SINGLENFT_CONTRACT_ADDRESS']

    return base.contractExec(net,contractAddress,value,encodeFunctionData)
  },
  async updatePrice(net,tokenId,price){
    let encodeFunctionData = {
      method : 'updatePrice',
      parameter_type : ['uint256','uint256'],
      parameter_data : [tokenId,price]
    }

    return await this.contractExec(net,0,encodeFunctionData)
  },
  async updateListingStatus(net,tokenId,listed){
    let encodeFunctionData = {
      method : 'updateListingStatus',
      parameter_type : ['uint256','bool'],
      parameter_data : [tokenId,listed]
    }

    return await this.contractExec(net,0,encodeFunctionData)
  },
  async bid(net,tokenId,price){
    let encodeFunctionData = {
      method : 'bid',
      parameter_type : ['uint256'],
      parameter_data : [tokenId]
    }

    return await this.contractExec(net,price,encodeFunctionData)
  },
  async mint(net,nftId,price){
    let encodeFunctionData = {
      method : 'mint',
      parameter_type : ['string','address','uint256'],
      parameter_data : [nftId,await Wallet.getWallet().getAccount(),"0x" + price.toString(16)]
    }

    return await this.contractExec(net,0,encodeFunctionData)
  },
  async auctionMint(net,nftId,startBidPrice,endAuctionTime){
    let   encodeFunctionData = {
      method : 'auctionMint',
      parameter_type : ['string','address','uint256','uint256'],
      parameter_data : [nftId,Wallet.getWallet().getAccount(),"0x" + startBidPrice.toString(16),endAuctionTime]
    }

    return await this.contractExec(net,0,encodeFunctionData)
  },
  async updateSale(net,tokenId,price){

    let encodeFunctionData = {
      method : 'updateSale',
      parameter_type : ['uint256','uint256'],
      parameter_data : [tokenId,'0x' + price.toString(16)]
    }

    return await this.contractExec(net,0,encodeFunctionData)
  },
  async createAuction(net,tokenId,startBidPrice,endAuctionTime){
    let encodeFunctionData = {
      method : 'createAuction',
      parameter_type : ['uint256','uint256','uint256'],
      parameter_data : [tokenId,'0x' + startBidPrice.toString(16),endAuctionTime]
    }

    return await this.contractExec(net,0,encodeFunctionData)
  },
  async endAuction(net,tokenId){
    let encodeFunctionData = {
      method : 'endAuction',
      parameter_type : ['uint256'],
      parameter_data : [tokenId]
    }

    return await this.contractExec(net,0,encodeFunctionData)
  },
  async cancelAuction(net,tokenId){
    let encodeFunctionData = {
      method : 'cancelAuction',
      parameter_type : ['uint256'],
      parameter_data : [tokenId]
    }

    return await this.contractExec(net,0,encodeFunctionData)
  },
  async cancelBid(net,tokenId){
    let encodeFunctionData = {
      method : 'cancelBid',
      parameter_type : ['uint256'],
      parameter_data : [tokenId]
    }

    return await this.contractExec(net,0,encodeFunctionData)
  },
  async buy(net,tokenId,price){
    let encodeFunctionData = {
      method : 'buy',
      parameter_type : ['uint256'],
      parameter_data : [tokenId]
    }

    return await this.contractExec(net,price,encodeFunctionData)
  },
  async transferFrom(net,from,to,tokenId){
    let encodeFunctionData = {
      method : 'transferFrom',
      parameter_type : ['address','address','uint256'],
      parameter_data : [from,to,tokenId]
    }

    return await this.contractExec(net,0,encodeFunctionData)
  }
}

let multiNFT = {
  async contractExec(net,value,encodeFunctionData){
    let contractAddress = window.front_env['VUE_APP_' + net + '_MULTINFT_CONTRACT_ADDRESS']

    return base.contractExec(net,contractAddress,value,encodeFunctionData)
  },
  async saleMint(net,tokenURI,amount,price){
    let encodeFunctionData = {
      method : 'saleMint',
      parameter_type : ['string','uint256','uint256'],
      parameter_data : [tokenURI,amount,'0x' + price.toString(16)]
    }

    return await this.contractExec(net,0,encodeFunctionData)
  },
  async buy(net,tokenId,sellerAddress,amount,value){
    let encodeFunctionData = {
      method : 'buy',
      parameter_type : ['uint256','address','uint256'],
      parameter_data : [tokenId,sellerAddress,amount]
    }

    return await this.contractExec(net,value,encodeFunctionData)
  },
  async updateSale(net,tokenId,isForSale,amount,price){
    let encodeFunctionData = {
      method : 'updateSale',
      parameter_type : ['uint256','bool','uint256','uint256'],
      parameter_data : [tokenId,isForSale,amount,price]
    }

    return await this.contractExec(net,0,encodeFunctionData)
  },
  async safeTransferFrom(net,fromAddress,toAddress,tokenId,amount,data){
    let encodeFunctionData = {
      method : 'safeTransferFrom',
      parameter_type : ['address','address','uint256','uint256','bytes'],
      parameter_data : [fromAddress,toAddress,tokenId,amount,data]
    }

    return await this.contractExec(net,0,encodeFunctionData)
  },
}

//////////////////ERC721 토큰 결제/////////////////////////
singleNFT.mint = async function(net,tokenAddress,nftId,price){
  let encodeFunctionData = {
    method : 'mint',
    parameter_type : ['address','string','address','uint256'],
    parameter_data : [tokenAddress,nftId,Wallet.getWallet().getAccount(),"0x" + price.toString(16)]
  }

  return await this.contractExec(net,0,encodeFunctionData)
}

singleNFT.auctionMint = async function(net,tokenAddress,nftId,startBidPrice,endAuctionTime){
  let   encodeFunctionData = {
    method : 'auctionMint',
    parameter_type : ['address','string','address','uint256','uint256'],
    parameter_data : [tokenAddress,nftId,Wallet.getWallet().getAccount(),"0x" + startBidPrice.toString(16),endAuctionTime]
  }

  return await this.contractExec(net,0,encodeFunctionData)
}

singleNFT.updateSale = async function(net,tokenAddress,tokenId,price){

  let encodeFunctionData = {
    method : 'updateSale',
    parameter_type : ['address','uint256','uint256'],
    parameter_data : [tokenAddress,tokenId,'0x' + price.toString(16)]
  }

  return await this.contractExec(net,0,encodeFunctionData)
}

singleNFT.createAuction = async function (net,tokenAddress,tokenId,startBidPrice,endAuctionTime){
  let encodeFunctionData = {
    method : 'createAuction',
    parameter_type : ['address','uint256','uint256','uint256'],
    parameter_data : [tokenAddress,tokenId,'0x' + startBidPrice.toString(16),endAuctionTime]
  }

  return await this.contractExec(net,0,encodeFunctionData)
}
//////////////////ERC721 토큰 결제/////////////////////////




//////////////////ERC1155 토큰 결제/////////////////////////
multiNFT.saleMint = async function(net,tokenAddress,tokenURI,amount,price){
  let encodeFunctionData = {
    method : 'saleMint',
    parameter_type : ['address','string','uint256','uint256'],
    parameter_data : [tokenAddress,tokenURI,amount,'0x' + price.toString(16)]
  }

  return await this.contractExec(net,0,encodeFunctionData)
}
multiNFT.updateSale = async function (net,tokenAddress,tokenId,isForSale,amount,price){

  let encodeFunctionData = {
    method : 'updateSale',
    parameter_type : ['address','uint256','bool','uint256','uint256'],
    parameter_data : [tokenAddress,tokenId,isForSale,amount,'0x' + price.toString(16)]
  }
  return await this.contractExec(net,0,encodeFunctionData)
}
singleNFT.tokenAccepted = async function (net,tokenAddress){

  let encodeFunctionData = {
    method : 'tokenAccepted',
    parameter_type : ['address'],
    parameter_data : [tokenAddress]
  }

  return await this.contractExec(net,0,encodeFunctionData)
}
multiNFT.tokenAccepted = async function (net,tokenAddress){

  let encodeFunctionData = {
    method : 'tokenAccepted',
    parameter_type : ['address'],
    parameter_data : [tokenAddress]
  }

  return await this.contractExec(net,0,encodeFunctionData)
}

let erc20 = {
  async contractExec(net,tokenAddress,value,encodeFunctionData){
    return base.contractExec(net,tokenAddress,value,encodeFunctionData)
  },
  async approve(net,tokenAddress,spenderAddress){
    let encodeFunctionData = {
      method : 'approve',
      parameter_type : ['address','uint256'],
      parameter_data : [spenderAddress,'0xffffffffffffffffffff']
    }

    await this.contractExec(net,tokenAddress,0,encodeFunctionData)

    location.reload()
  }
}
//////////////////ERC1155 토큰 결제/////////////////////////
export default {
  ...base,
  singleNFT,
  multiNFT
}
