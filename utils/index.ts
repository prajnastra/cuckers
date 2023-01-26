import {
  toHex,
  fromHex,
  C as LCore,
  Lucid,
  WalletApi,
  Assets,
} from 'lucid-cardano'
import swal from 'sweetalert'

import {
  NftPolicy,
  CIP0025_VERSION,
  METADATA_KEY,
} from '../nft-toolkit/nft-policy'
import { RebateCalculator } from '../nft-toolkit/rebate-calculator'
import { validate, validated } from '../nft-toolkit/utils'

import {
  getBlockfrostParams,
  getLucidInstance,
} from '../third-party/lucid-inst'

import { cip0025MetadataType } from './types'

const FILENAME_ID = 'local-file-name'
const FILETYPE_ID = 'local-file-mimetype'
const IMAGE_FIELD = 'image'
const IMAGE_MIME_PREFIX = 'image/'
const INPUT_TYPE = 'INPUT'
const IPFS_LINK_ID = 'ipfs-io-link'
const KEY_SUFFIX = 'name'
const LOVELACE = 'lovelace'
const MAX_BURN_ATTEMPTS = 10
const METADATA_SPLITTER = new RegExp(
  `(.{1,${NftPolicy.MAX_METADATA_LEN}})`,
  'g'
)
const MINT_COMPLETION_WAIT_INTERVAL = 60000
const SINGLE_NFT = 1
const SPAN_TYPE = 'SPAN'
const VALUE_SUFFIX = 'value'
const MAX_QUANTITY = 0

const getTextEncoder = () => {
  return new TextEncoder()
}

const wrapMetadataFor = (
  policyID: string,
  innerMetadata: {
    [x: string]: cip0025MetadataType
  }
) => {
  return { [policyID]: innerMetadata, version: CIP0025_VERSION }
}

export const generatePolicyScriptAndKey = (): string => {
  const privateKey = NftPolicy.privateKeyToCbor(
    LCore.PrivateKey.generate_ed25519()
  )
  return privateKey

  // datetimeLocal.addEventListener('change', (e) =>
  //   NftPolicy.NftPolicy.updateDatetimeSlotSpan(
  //     e,
  //     blockfrostDom,
  //     `#${datetimeId}`,
  //     `#${slotId}`
  //   )
  // )

  // alert(
  //   'REMEMBER: YOU MUST COPY DOWN THE PRIVATE KEY AND CARDANO SLOT YOU GENERATE!'
  // )
}
// traitsPrefix = nft-trait
function generateCip0025MetadataFor(
  nftName: string,
  ipfsLink: string,
  ipfsHash: string
) {
  // TODO: Support multiple file uploads simultaneously in this array
  const cip0025Metadata: cip0025MetadataType = {
    name: nftName,
    image: ['ipfs://', ipfsHash],
    mediaType: 'image/*',
    files: [
      {
        name: nftName,
        mediaType: 'image/*',
        src: ['ipfs://', ipfsHash],
      },
    ],
  }

  return { [nftName]: cip0025Metadata }
}

export function getIpfsLink(hash: string | null) {
  if (hash) {
    return `ipfs://${hash}`
  } else {
    return null
  }
}

export async function performMintTxn(
  blockfrostKey: string,
  walletApi: WalletApi,
  nftName: string,
  ipfsLink: string,
  ipfsHash: string,
  privateKey: string,
  recipient: string | undefined
) {
  try {
    const scriptSKey = NftPolicy.privateKeyFromCbor(privateKey)
    const nftMetadata = generateCip0025MetadataFor(nftName, ipfsLink, ipfsHash)

    const policyExpirationSlot = await NftPolicy.updateDatetimeSlotSpan(
      blockfrostKey,
      '',
      0
    )

    const lucid = await getLucidInstance(blockfrostKey)

    validate(
      lucid,
      'Your blockfrost key does not match the network of your wallet.'
    )

    const useAllScripts = null

    const policyKeyHash = toHex(scriptSKey.to_public().hash().to_bytes())

    const nftPolicy = new NftPolicy(
      policyExpirationSlot,
      scriptSKey,
      policyKeyHash,
      useAllScripts
    )

    const mintingPolicy = nftPolicy.getMintingPolicy()
    const numMints = 1

    const chainMetadata = wrapMetadataFor(mintingPolicy.policyID, nftMetadata)
    const assetName = `${mintingPolicy.policyID}${toHex(
      getTextEncoder().encode(nftName)
    )}`
    const mintAssets: Assets = { [assetName]: BigInt(numMints) }

    const rebate = RebateCalculator.calculateRebate(
      RebateCalculator.SINGLE_POLICY,
      numMints,
      assetName.length
    )
    const mintVend: Assets = {
      [LOVELACE]: rebate,
      [assetName]: BigInt(numMints),
    }
    const update =
      numMints == SINGLE_NFT && (await existsOnChain(assetName, blockfrostKey))
    if (
      update &&
      !confirm(
        'The NFT you are trying to create already exists, would you like to perform an update (requires two transactions and signatures)?'
      )
    ) {
      return
    }

    lucid.selectWallet(walletApi)

    // const isAuthorized = null
    // if (lucid.network === 'Mainnet' && !isAuthorized) {
    //   alert(
    //     `Thanks for checking out this software! Testnet use is free, but to mint on mainnet, you must purchase at least 1 WildTangz - no need to refresh the page!`
    //   )
    //   return
    // }

    const address =
      recipient === undefined ? await lucid.wallet.address() : recipient

    console.log(`Wallet: ${address}`)
    var txBuilder = lucid
      .newTx()
      .attachMintingPolicy(mintingPolicy)
      .attachMetadata(METADATA_KEY, chainMetadata)
      .mintAssets(mintAssets)
      .payToAddress(address, mintVend)
    if (policyExpirationSlot) {
      txBuilder = txBuilder.validTo(
        lucid.utils.slotToUnixTime(policyExpirationSlot)
      )
    }
    const txComplete = await txBuilder.complete()
    const txSigned = await txComplete
      .signWithPrivateKey(scriptSKey.to_bech32())
      .sign()
      .complete()
    const txSubmit = await txSigned.submit()
    // alert here
    console.log(`Successfully sent minting tx: ${txSubmit}!`)

    swal('Transaction submitted', txSubmit, 'success')
    // if (update) {
    //   longToast(
    //     'Will ask you to burn the NFT when mint is complete, please wait...'
    //   )
    //   setTimeout(
    //     (async () =>
    //       attemptBurn(
    //         assetName,
    //         mintingPolicy,
    //         scriptSKey,
    //         policyExpirationSlot,
    //         address,
    //         lucid,
    //         1
    //       )).bind(this),
    //     MINT_COMPLETION_WAIT_INTERVAL
    //   )
    // }
  } catch (err) {
    // alert here
    console.log(err)
  }
}

const existsOnChain = async (assetName: string, blockfrostKey: string) => {
  const blockfrostSettings = await getBlockfrostParams(blockfrostKey)
  let result = await fetch(`${blockfrostSettings.api}/assets/${assetName}`, {
    headers: { project_id: blockfrostKey },
  }).then((res) => res.json())
  if (result && result.error) {
    return false
  }
  return true
}
