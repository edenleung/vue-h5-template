<template>
  <div class="home">
    <h3>Vue.js</h3>
    <template v-if="!token">
      <button @click="login" v-if="!token">登录</button>
    </template>
    <template v-else>
      <div>
        <p>{{ token ? `已登录 Token: ${token}` : '未登录' }}</p>
        <button @click="logout">退出登录</button>
      </div>
    </template>
  </div>
</template>

<script>
// import { login } from '@/api/user'
export default {
  name: 'Home',
  mounted () {
  },
  computed: {
    token () {
      return this.$store.getters.token
    }
  },
  methods: {
    login () {
      this.$store.commit('login', 'xxx.xxx.xxx')
    },
    logout () {
      this.$store.commit('logout')
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  h3 {
    font-size: 24px;
  }
}
</style>
