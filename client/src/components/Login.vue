<template>
  <v-layout row style="padding-top: 35px;">
    <v-flex xs12 offset-xs0 sm10 offset-sm1 md8 offset-md2 lg6 offset-lg3 xl4 offset-xl4>
      <h1>Login</h1>
      <v-text-field
        label="Username"
        v-model="username">
      </v-text-field>
      <v-text-field
          label="Password"
          type="password"
          v-model="password">
      </v-text-field>
      <v-btn
        class="accent"
        @click="login">
        Login
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          username: this.username,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)

        var hiMessage = (response.data.user.isAdmin) ?
        'Hi, ' + response.data.user.username + ' (You are an admin by the way)' :
        'Hi again, ' + response.data.user.username

        this.$store.dispatch('setSnack', {
          snack: hiMessage,
          snackColor: 'success'
        })
        this.$router.push({
          name: 'Videos'
        })
      } catch (error) {
        // this.error = error.response.data.error
        this.$store.dispatch('setSnack', {
          snack: error.response.data.error
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
