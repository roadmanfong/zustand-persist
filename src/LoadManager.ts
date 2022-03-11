export class LoadManager {
  private onAllLoadedCallback: () => void
  private loadStatusRecord: Record<string, boolean>

  constructor() {
    this.onAllLoadedCallback = () => {}
    this.loadStatusRecord = {}
  }

  register(key: string) {
    this.loadStatusRecord[key] = false
  }

  isLoaded(key: string) {
    return this.loadStatusRecord[key]
  }

  onAllLoaded(callback: () => void) {
    this.onAllLoadedCallback = callback

    // Possible this could be called with a custom callback *after*
    // loading has finished. Which means setLoaded (below) has finished
    // being called and the custom callback would never be run.
    // If loading has finished, execute callback immediately.
    // https://github.com/roadmanfong/zustand-persist/issues/4
    // https://github.com/roadmanfong/zustand-persist/issues/9
    if (Object.values(this.loadStatusRecord).every(Boolean)) {
      this.onAllLoadedCallback()
    }
  }

  setLoaded(key: string) {
    this.loadStatusRecord[key] = true
    if (Object.values(this.loadStatusRecord).every(Boolean)) {
      this.onAllLoadedCallback()
    }
  }
}

let cachedLoadManager: LoadManager | undefined

export function getLoadManager() {
  if (!cachedLoadManager) {
    cachedLoadManager = new LoadManager()
  }
  return cachedLoadManager
}
