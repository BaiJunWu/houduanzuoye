<template>
  <div class="login">
    <h1>登陆</h1>
    <div>用户名：<input v-model="username" type="text" /></div>
    <div>密码：<input v-model="password" type="text" /></div>
    <div><button @click="login">登陆</button></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$http.post('/access_token', {
        username: this.username,
        password: this.password
      }).then(res => {
        if (res.data.ok === 1) {
          sessionStorage.setItem('token', res.data.data.token)
          sessionStorage.setItem('username', this.username)
          sessionStorage.setItem('integral', res.data.data.integral)
          this.$router.push('/')
        } else {
          alert(res.data.error)
        }
      })
    }
  }
}
</script>
