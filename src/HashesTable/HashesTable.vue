<template>
    <b-table striped hover :items="items" :fields="fields">
        <template slot="type" slot-scope="item">
            <h4>
                <b-badge  pill variant="success">{{ item.value || 'Unknown' }}</b-badge>
            </h4>
        </template>

        <template slot="hash" slot-scope="item">
            <HashLink :hash="item.value" />
        </template>

        <template slot="from" slot-scope="item" style="width: 50px">
            <HashLink :hash="item.value" />
        </template>

        <template slot="arrow-empty-td">
            <font-awesome-icon icon="arrow-right" />
            &nbsp;
            <font-awesome-icon icon="file" />
        </template>

        <template slot="to" slot-scope="item">
            <HashLink :hash="item.value" />
        </template>

        <template slot="timestamp" slot-scope="item">
            <FromNow :time="Date(item.value)" />
        </template>
    </b-table>
</template>

<script>
  import HashLink from './HashLink.vue';
  import FromNow from './FromNow.vue';

  export default {
    components: { HashLink, FromNow },
    props: ['items'],
    data() {
      return {
        fields: [
          { key: 'type', sortable: true },
          { key: 'hash', width: 50, sortable: true, label: 'Hash', tdClass: 'hashes-table__hash' },
          { key: 'from', sortable: true, tdClass: 'hashes-table__hash' },
          { key: 'arrow-empty-td', sortable: false, label: '', tdClass: 'hashes-table__icons' },
          { key: 'to', sortable: true, tdClass: 'hashes-table__hash' },
          { key: 'value', sortable: true, formatter: num => `${ Number(num).toFixed(2) } ETH`, tdClass: 'hashes-table__value' },
          { key: 'timestamp', label: 'Time', sortable: true }
        ]
      }
    }
  }
</script>

<style>
    .hashes-table__hash {
        width: 50px
    }

    .hashes-table__icons {
        text-align: center;
        white-space: nowrap;
        width: 50px;
    }

    .hashes-table__value {
        white-space: nowrap;
        width: 40px;
        text-align: right;
    }
</style>