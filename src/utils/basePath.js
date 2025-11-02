// ensure no double slashes
export const baseURL = (
  import.meta.env.VITE_BASE_URL.replace(/\/$/, '') + '/' + import.meta.env.VITE_BASE_URL.replace(/^\//, '')
) || '/';