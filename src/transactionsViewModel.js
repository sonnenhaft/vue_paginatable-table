import {action, observable} from 'mobx'
import {create, persist} from 'mobx-persist'
import {Web3Wrapper} from './Web3Wrapper';

// import { Web3WrapperFake as Web3Wrapper } from './Web3Wrapper.fake';


class TransactionsViewModel {
    @observable loadingTransactions = false;
    @persist('map') @observable selectedTransaction = {};

    @persist @observable transactionsDetailsExpanded = false;
    @persist('list') @observable transactions = [];
    @persist('list') @observable allTransactions = [];

    @persist @observable page = null;
    @persist @observable limit = null;
    @persist @observable totalRows;

    @observable loadingTransaction = false;
    firstLoad = true;

    constructor() {
        this.web3Wrapper = new Web3Wrapper('rinkeby.infura.io')
    }

    @action.bound
    async loadTransactions({page = 1, limit = 10}) {
        /*
        commenting this check as user might want update it
        and all infinitive "reload" buttons - people don't need
        them and without webSockets (which are expensive)
        - it is nicest way as for me
        */

        if (this.page === page && this.limit === limit && !this.firstLoad) {
            return;
        }


        this.page = page;
        this.limit = limit;

        if (this.firstLoad) {
            this.firstLoad = false;
            this.loadingTransactions = true;
            this.allTransactions = await this.web3Wrapper.getTransactions(10);
            this.totalRows = this.allTransactions.length;
            this.loadingTransactions = false;
        }

        this.transactions = this.allTransactions
            .slice(
                (this.page - 1) * this.limit,
                Math.min(this.page * this.limit, this.totalRows)
            );
    }

    @action.bound
    async loadTransaction(hash) {
        if (this.selectedTransaction.hash !== hash) {
            this.selectedTransaction = this.transactions.find(({hash: _hash}) => _hash === hash);
            if (!this.selectedTransaction) {
                this.selectedTransaction = {};
                this.loadingTransaction = true;
                try {
                    this.selectedTransaction = await this.web3Wrapper.getTransaction(hash);
                } catch (e) {
                }

                this.loadingTransaction = false;
            }
        }
    }
}

export const transactionsViewModel = new TransactionsViewModel()

create()('transactionsViewModel', transactionsViewModel);