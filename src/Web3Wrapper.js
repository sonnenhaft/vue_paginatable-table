import Web3 from 'web3';

export class Web3Wrapper {
  constructor(server = 'ws-nd-339-602-400.int.chainstack.com') {
    this.web3 = new Web3(new Web3.providers.WebsocketProvider(`wss://${ server }/ws`))
  }

  async getTransactions(blocksCount = 10) {
    const web3 = this.web3;

    const lastBlockIdx = await web3.eth.getBlockNumber()
    const blocksCountList = [];
    const promises = [];

    for (let i = 0; i < blocksCount; i++) {
      promises.push(web3.eth.getBlock(lastBlockIdx - i).then(block => {
        blocksCountList.push(block);
      }))
    }

    await Promise.all(promises);

    const transactions = [];
    const transactionPromises = [];
    blocksCountList.forEach(block => {
      block.transactionsData = [];
      block.transactions.forEach(transactionHash => {
        transactionPromises.push(web3.eth.getTransaction(transactionHash).then(transaction => {
          transaction.timestamp = block.timestamp;
          block.transactionsData.push(transaction);
          transactions.push(transaction);
        }));
      });
    });

    await Promise.all(transactionPromises);

    return transactions;
  }

  async getTransaction(hash) {
    const web3 = this.web3;

    const transaction = await web3.eth.getTransaction(hash);
    const { timestamp } = await web3.eth.getBlock(transaction.blockNumber);
    transaction.timestamp = timestamp;

    return transaction
  }
}