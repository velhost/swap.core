import { events } from './Events'
import room from './room'
import { storage } from './Storage'
import swapCollection, { SwapCollection } from './swapCollection'


class SwapApp {

  constructor({ me, ipfsConfig, web3 }) {
    this.storage = storage
    this.swapCollection = swapCollection

    room.setIpfsConfig(ipfsConfig)
    storage.me = me

    room.subscribe('ready', () => {
      events.dispatch('ready')
    })
  }

  /**
   *
   * @param {object} data
   * @param {string} data.id
   * @param {object} data.owner
   * @param {string} data.owner.peer
   * @param {number} data.owner.reputation
   * @param {object} data.owner.<currency>
   * @param {string} data.owner.<currency>.address
   * @param {string} data.owner.<currency>.publicKey
   * @param {string} data.buyCurrency
   * @param {string} data.sellCurrency
   * @param {number} data.buyAmount
   * @param {number} data.sellAmount
   */
  createSwap(data) {
    swapCollection.create(data)
  }

  getSwaps() {
    return swapCollection.items
  }

  getMySwaps() {
    return SwapCollection.getMySwaps()
  }

  on(eventName, handler) {
    events.subscribe(eventName, handler)
  }

  off(eventName, handler) {
    events.unsubscribe(eventName, handler)
  }
}


export default SwapApp