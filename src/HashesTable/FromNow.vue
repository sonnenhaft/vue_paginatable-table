<script>
  import moment from 'moment';

  export default {
    props: ['time'],
    template: `<span>{{ time | moment }}</span>`,
    filters: { moment: time => moment(time).fromNow() }
  }
</script>