// Pinia Store

import { defineStore } from 'pinia'

export interface IUser {
  email: string
  name: string
  birthDate: string
  gender: string
  idToken: string
  localId: string
}

interface IAuthState {
  user: IUser | null
  idToken: string
}

export const useAuthStore = defineStore('auth', {
  state: (): IAuthState => ({
    user: null,
    idToken: ''
  }),
  getters: {
    getUser: (state): IUser | null => {
      if (state.user?.localId) return state.user
      const userData = localStorage.getItem('z-user')
      return userData ? (JSON.parse(userData) as IUser) : null
    },
    getToken: (state): string | null => state.idToken || localStorage.getItem('z-idToken'),
    isLoggedIn: (state): boolean =>
      state.idToken?.length > 0 || (localStorage.getItem('z-idToken')?.length ?? 0) > 0
  },
  actions: {
    storeUser(data: IUser, storeToken = false): Promise<void> {
      return new Promise((resolve) => {
        localStorage.setItem('z-user', JSON.stringify(data))
        this.user = data
        if (storeToken) {
          this.storeToken(data.idToken).then(() => resolve())
        }
        resolve()
      })
    },
    storeToken(idToken: string): Promise<void> {
      return new Promise((resolve) => {
        localStorage.setItem('z-idToken', idToken)

        this.idToken = idToken

        resolve()
      })
    },

    // easily reset state using `$reset`
    logoutUser(): Promise<void> {
      return new Promise((resolve) => {
        localStorage.removeItem('z-user')
        localStorage.removeItem('z-idToken')
        this.user = null
        this.idToken = ''
        window.location.href = '/login'
        resolve()
      })
    }
  }
})
