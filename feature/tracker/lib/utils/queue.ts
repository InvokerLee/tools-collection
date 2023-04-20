
export class Queue {
  private collection: Function[] = []
  private flushing = false
  
  constructor() {}
  addFn(fn: () => void): void {
    if (typeof fn !== 'function') return
    if (!('Promise' in window)) {
      fn()
      return
    }
    this.collection.push(fn)
    if (!this.flushing) {
      this.flushing = true
      Promise.resolve().then(() => this.flush())
    }
  }
  clear() {
    this.collection = []
  }
  flush(): void {
    const temp = this.collection.slice(0)
    this.collection.length = 0
    this.flushing = false
    for (let i = 0; i < temp.length; i++) {
      temp[i]()
    }
  }
}
