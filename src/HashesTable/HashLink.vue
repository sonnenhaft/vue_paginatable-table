<script>
  export default {
    props: ['hash'],
    template: `<router-link :to="link" tag="a" :title="hash" >{{ hash | shortHash }}<slot/></router-link>`,
    computed: {
      link() {
        return `/transactions/${ this.hash }`
      }
    },
    filters: { shortHash: (hash = '') => hash.length > 10 ? `${ hash.slice(0, 5) }...${ hash.slice(-5) }` : hash }
  }
</script>