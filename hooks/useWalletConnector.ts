import { useState } from 'react'
import { WalletApi } from 'lucid-cardano'

const useWalletConnector = () => {
  const [wallet, setWallet] = useState<WalletApi>()

  const connectNami = async () => {
    try {
      const api = await window.cardano.nami.enable()
      setWallet(api)
    } catch (e) {
      alert('Wallet Connect :: Someting error occured')
    }
  }

  return { wallet, connectNami }
}

export default useWalletConnector
