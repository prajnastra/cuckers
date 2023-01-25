//  @ts-ignore
import { CardanoDApp } from 'cardano-dapp-js'

import { validate, validated } from '../nft-toolkit/utils'

var cardanoDApp: any

export function initializeCardanoDApp(containerId: any) {
  validate(
    !cardanoDApp,
    'Illegal state, attempting to initialize cardano DApp twice'
  )
  cardanoDApp = new CardanoDApp(containerId)
}

export function getCardanoDAppInstance() {
  return validated(
    cardanoDApp,
    'Illegal state, initialize CardanoDApp before retrieval'
  )
}
