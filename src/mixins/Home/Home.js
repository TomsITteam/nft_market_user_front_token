import Web3 from "web3";

export default {
  methods: {
    async getWeb3() {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          return web3
        } catch (error) {
          return error
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        return web3
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          "https://bsc-dataseed.binance.org"
        );
        const web3 = new Web3(provider);
        return web3;
      }

    },
    async test() {
      const web3 = await this.getWeb3();

      web3.eth.net.getNetworkType().then(async (netId) => {
        console.log(netId)
      });
    }
  },
  created() {
    document.title = this.$env.VUE_APP_NAME
  }
}
