import { useState } from 'react'
import { WalletApi } from 'lucid-cardano'

const useWalletConnector = () => {
  const [wallet, setWallet] = useState<WalletApi>()
  const [connecting, setConnecting] = useState<boolean>(false)

  const connectNami = async () => {
    try {
      setConnecting(true)
      const api = await window.cardano.nami.enable()
      setWallet(api)
      setConnecting(false)
    } catch (e) {
      setConnecting(false)
      alert('Wallet Connect :: Someting error occured')
    }
  }

  return { wallet, connectNami, connecting }
}

export default useWalletConnector
