<template>
    <div>
        <span>
            <router-link :to="'/transactions'" tag="a">Transactions</router-link>
            / {{ id }}
        </span>

        <br><br>
        <h4>
            Transaction Details
            &nbsp;
            <b-badge pill variant="success" v-if="!loading">{{ item.value || 'Unkonwn' }}</b-badge>

            <b-spinner :label="'Loading transaction' + id" small v-if="loading"
                       style="vertical-align: baseline" />
        </h4>
        <br><br>

        <HashLink :hash="id" target="_blank">
            &nbsp;
            <font-awesome-icon icon="external-link-alt" />
        </HashLink>

        <div v-if="!loading">
            <div class="titled-blocks">
                <div>
                    <span>From: </span>
                    <HashLink :hash="item.from" />
                </div>

                <div>
                    <span>To: </span>
                    <HashLink :hash="item.to" />
                </div>
            </div>

            <div class="titled-blocks">
                <div>
                    <span>Status:</span> 0x1
                </div>

                <div>
                    <span>Time:</span>
                    <FromNow :time="item.timestamp" />
                </div>
            </div>

            <br>
            <br>

            <div>
                <h5 v-on:click="state.transactionsDetailsExpanded = !state.transactionsDetailsExpanded" style="cursor: pointer;">
                    Additional Details
                    <span style="user-select: none">
                        &nbsp;{{ state.transactionsDetailsExpanded ? '▼' : '▲' }}
                    </span>
                </h5>

                <div v-if="state.transactionsDetailsExpanded">
                    <hr />

                    <div class="titled-blocks">
                        <div>
                            <span>Input Bytecode: </span>
                            <HashLink :hash="item.input" />
                        </div>

                        <div>
                            <span>Block: </span>
                            <HashLink :hash="item.blockNumber" />
                        </div>
                    </div>

                    <div class="titled-blocks">
                        <div>
                            <span>? Transaction Fee:</span> {{ item.gas }} Wei
                        </div>
                    </div>

                    <div class="titled-blocks">
                        <div><span>Position: </span>{{ item.transactionIndex }}</div>

                        <div><span>Nonce: </span> {{ item.nonce }}</div>
                    </div>

                    <div class="titled-blocks">
                        <div><span>? Gas Used: </span> {{ item.gas }} (?%)</div>

                        <div><span>Gas Price: </span> {{ item.gasPrice }} Wei</div>
                    </div>

                    <div class="titled-blocks">
                        <div><span>? Value: </span> {{ item.value }} ETH / {{ item.gas }} Wei</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import HashLink from './HashesTable/HashLink'
  import FromNow from './HashesTable/FromNow'
  import { transactionsViewModel } from './transactionsViewModel';
  import Component from 'vue-class-component';
  import { Vue, Watch } from 'vue-property-decorator'

  export default @Component({
    components: { HashLink, FromNow }
  })
  class TransactionsPage extends Vue {
    mounted() {
      this.state.loadTransaction(this.id)
    }

    data() {
      return { state: transactionsViewModel }
    }

    get id() {
      return this.$route.params.id
    }

    get loading() {
      return this.state.loadingTransaction
    }

    get item() {
      return this.state.selectedTransaction
    }

    @Watch('id')
    onIdChanged() {
      this.state.loadTransaction(this.id)
    }
  }
</script>

<style scoped>
    .titled-blocks {
        display: flex;
    }

    .titled-blocks > div {
        margin-right: 16px;
    }

    .titled-blocks div {
        font-weight: bold;
    }

    .titled-blocks div span {
        color: darkgrey;
        font-weight: normal;
    }
</style>