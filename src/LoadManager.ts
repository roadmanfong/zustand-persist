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
  }

  setLoaded(key: string) {
    this.loadStatusRecord[key] = true
    if (Object.values(this.loadStatusRecord).every(Boolean)) {
      this.onAllLoadedCallback()
    }
  }
}

let cachedLoadManager: LoadManager | undefined

export function createLoadManager() {
  cachedLoadManager = new LoadManager()
  return cachedLoadManager
}

export function getLoadManager() {
  if (!cachedLoadManager) {
    throw Error('LoadManager class not created')
  }
  return cachedLoadManager
}
