<script>
export default {
  created() {
    const { query } = this.$route
    const { ssoId } = query
    if (ssoId === undefined || ssoId === '' || ssoId === null) {
      this.$router.replace({ path: '/401', query: {
        message: '缺少认证参数'
      }})
      return
    }
    this.$store.dispatch('user/validCallback', {
      token: ssoId
    }).then((res) => {
      const { code, message } = res

      if (code === 0) {
        this.$router.replace({ path: '/' })
      } else {
        this.$router.replace({ path: '/401', query: {
          message: message
        }})
      }
    })
  },
  methods: {
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
