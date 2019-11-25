<template>
  <div class="login">
    <van-nav-bar title="登陆注册" left-arrow @click-left="$router.push('/')" />
    <van-cell-group>
      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        left-icon="contact"
        placeholder="请输入用户名"
      />

      <van-field
        left-icon="friends-o"
        clearable
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
    </van-cell-group>
    <!-- :disabled="!checkedGoods.length" -->
    <van-button class="button" type="warning" :disabled="!this.username.length">登陆</van-button>
    <a href="/zhuce" class="abq">手机快速注册</a>
    <div class="divider"><van-divider :style="{ color: '#999da0',borderColor: '#999da0', padding: '0 16px' }">其他登陆方式</van-divider></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<style lang="less">
.login {
  position: relative;
}
.button {
  display: block;
  width: 300px;
  margin: auto;
}
.abq {
  position: absolute;
  right: 28px;
  text-decoration: none;
  color: #999da0;
}
.divider {
  margin-top: 135px;
}
</style>
