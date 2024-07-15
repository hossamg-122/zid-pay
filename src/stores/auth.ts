// Pinia Store

import { defineStore } from 'pinia'

interface IUser {
  name?: string
  email?: string
}

interface IAuthState {
  user: IUser
  token: string
}

export const useAuthStore = defineStore('auth', {
  state: (): IAuthState => ({
    user: {},
    token: ''
  }),
  getters: {
    getUser: (state): IUser => state.user || localStorage.getItem('z-user'),
    getToken: (state): string | null => state.token || localStorage.getItem('z-token'),
    isLoggedIn: (state): boolean =>
      state.token?.length > 0 || (localStorage.getItem('z-token')?.length ?? 0) > 0
  },
  actions: {
    loginUser({ data, token }: { data: IUser; token: string }, storeToken = true): Promise<void> {
      return new Promise((resolve) => {
        if (storeToken) {
          localStorage.setItem('z-token', token)
          localStorage.setItem('z-user', JSON.stringify(data))
          this.user = data
          this.token = token
        }
        resolve()
      })
    },

    // easily reset state using `$reset`
    logoutUser(): Promise<void> {
      return new Promise((resolve) => {
        localStorage.removeItem('z-user')
        localStorage.removeItem('z-token')
        this.user = {}
        this.token = ''
        resolve()
      })
    }
  }
})
