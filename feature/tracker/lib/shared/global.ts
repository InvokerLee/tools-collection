interface Global {}

const isBrowserEnv = () => ![typeof window, typeof document].includes('undefined')

export function getGlobal() {
  if (isBrowserEnv()) return window as Global;
  return {}
}

const _global = getGlobal()

export { _global }