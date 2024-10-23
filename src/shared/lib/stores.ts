import { LOCAL_STORAGE_THEME_KEY, LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '@/shared/constants'

export const themeStore = createStore(LOCAL_STORAGE_THEME_KEY)
export const accessTokenStore = createStore(LOCAL_STORAGE_ACCESS_TOKEN_KEY)

function createStore(key: string) {
  return {
    get: () => localStorage.getItem(key) ?? '',
    set: (value: string) => localStorage.setItem(key, value),
    remove: () => localStorage.removeItem(key),
  }
}
