import Chance from 'chance';

const chance = new Chance();

export const getTransaction = (hash) => ({
  type: 'Contact Creation',
  // '0x3627d7fbb8ce5541dda0d3cfd04d2ec2dff5154f8b54eaa36b0c3d251752ca32'
  hash: hash || chance.hash({ length: 25 }),
  // '0xD3Eb6a4A259Cb46984573221856a8eb51420AB9f'
  from: chance.hash({ length: 25 }),
  // '0x8F4868d49D30f965F0337097a438D975Ab9BeEaE' | null
  to: chance.hash({ length: 25 }),
  // '0'
  value: `${ chance.floating({ min: -10, max: 10 }) }`,
  // 664
  nonce: `${ chance.integer({ min: 1, max: 1000 }) }`,
  // 10000000000
  gasPrice: `${ chance.integer({ min: 1000, max: 10000000000 }) }`,
  // 6721975
  gas: `${ chance.integer({ min: 1000, max: 6721975 }) }`,
  // 8
  transactionIndex: `${ chance.integer({ min: 0, max: 10 }) }`,
  // '6101000a900460'
  input: chance.hash({ length: 250 }),
  // 4707811
  blockNumber: `${ chance.integer({ min: 0, max: 4707811 }) }`,
  // 1562747732
  timestamp: Date.now()
});

const delay = (t = 1000) => new Promise(resolve => setTimeout(resolve, t));

const TOTAL_TRANSACTIONS = 103;

export class Web3WrapperFake {
  async getTransactions() {
    await delay(500);

    return Array
        .from(Array(TOTAL_TRANSACTIONS).keys())
        .map(getTransaction);
  }

  async getTransaction() {
    await delay(1000);
    return getTransaction();
  }
}