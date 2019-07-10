<template>
    <div>
        <h1>
            Transactions

            <b-spinner label="Loading table" v-if="loading" style="vertical-align: baseline" />
        </h1>

        <div class="pagination-header" v-if="totalRows">
            <span>Showing {{ totalRows }} transactions</span>

            <div style="display: flex; align-items: flex-end;">
                <b v-if="totalRows">
                    Rows per page:

                    <b-form-select v-model="limit" class="mb-3">
                        <option :value="item" :key="item" v-for="item in [10, 20, 50, 100, 500, 1000]">
                            {{ item }}
                        </option>
                    </b-form-select>

                    <span class="from-to-count">
                        {{(limit * (page - 1)) + 1 }}-{{ Math.min(limit * page, totalRows) }}
                        &nbsp;of&nbsp;
                        {{ totalRows }}
                    </span>
                </b>

                <b-pagination
                        v-model="page"
                        :total-rows="totalRows"
                        :per-page="limit"
                        :limit="3"
                ></b-pagination>
            </div>
        </div>

        <HashesTable :items="transactions" :style="{opacity: loading ? 0.8 : 1}" />
    </div>
</template>

<script>
  import { HashesTable } from './HashesTable';
  import { transactionsViewModel } from './transactionsViewModel';
  import Component from 'vue-class-component';
  import { Vue, Watch } from 'vue-property-decorator'

  export default @Component({ components: { HashesTable } })
  class TransactionsPage extends Vue {
    created() {
      const { page = 1, limit = 10 } = this.$route.query || {};

      this.page = page;
      this.limit = limit;
      this.state.loadTransactions({ page, limit })
    }

    data() {
      return {
        state: transactionsViewModel,
        page: 1,
        limit: 10
      }
    }

    get loading() {
      return this.state.loadingTransactions;
    }

    get transactions() {
      return this.state.transactions.$mobx.values;
    }

    get totalRows() {
      return this.state.totalRows
    }

    rememberPage() {
      const query = { page: this.page, limit: this.limit };
      this.state.loadTransactions(query)
      this.$router.replace({ query });
    }

    @Watch('page')
    onPageChanged() {
      if (`${ this.page }` !== this.$route.page) {
        this.rememberPage();
      }
    }

    @Watch('limit')
    onLimitChanged() {
      if (`${ this.limit }` !== this.$route.limit) {
        this.page = 1;
        this.rememberPage();
      }
    }
  }
</script>

<style>
    .b-pagination > li > span,
    .b-pagination > li > a {
        border: none;
        font-size: 44px;
        padding: 0 8px;
        line-height: 1;
    }

    .page-link[role=menuitemradio] {
        display: none;
    }
</style>

<style scoped>
    select {
        width: 76px;
        display: inline-block;
        height: 32px;
        margin-right: 10px;
        vertical-align: sub;
    }

    .from-to-count {
        width: 140px;
        text-align: center;
        display: inline-block
    }

    .pagination-header {
        display: flex;
        justify-content: space-between
    }
</style>
