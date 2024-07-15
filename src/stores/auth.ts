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
  user: IUser
  idToken: string
}
const defaultUserData: IUser = {
  email: '',
  name: '',
  birthDate: '',
  gender: '',
  idToken: '',
  localId: ''
}
export const useAuthStore = defineStore('auth', {
  state: (): IAuthState => ({
    user: defaultUserData,
    idToken: ''
  }),
  getters: {
    getUser: (state): IUser => state.user || localStorage.getItem('z-user'),
    getToken: (state): string | null => state.idToken || localStorage.getItem('z-idToken'),
    isLoggedIn: (state): boolean =>
      state.idToken?.length > 0 || (localStorage.getItem('z-idToken')?.length ?? 0) > 0
  },
  actions: {
    loginUser(data: IUser, storeToken = true): Promise<void> {
      return new Promise((resolve) => {
        console.log(' auth', data)
        if (storeToken) {
          localStorage.setItem('z-idToken', data.idToken)
          localStorage.setItem('z-user', JSON.stringify(data))
          this.user = data
          this.idToken = data.idToken
        }
        resolve()
      })
    },

    // easily reset state using `$reset`
    logoutUser(): Promise<void> {
      return new Promise((resolve) => {
        localStorage.removeItem('z-user')
        localStorage.removeItem('z-idToken')
        this.user = defaultUserData
        this.idToken = ''
        resolve()
      })
    }
  }
})
