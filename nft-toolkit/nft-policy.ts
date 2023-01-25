import {
  toHex,
  fromHex,
  C as LCore,
  MintingPolicy,
  NativeScript,
} from 'lucid-cardano'

import * as LucidInst from '../third-party/lucid-inst'

import { validated } from './utils'

export const METADATA_KEY = 721
export const CIP0025_VERSION = '1.0'

const INPUT_TYPE = 'INPUT'
const SPAN_TYPE = 'SPAN'

interface MintingPolicyExtended extends MintingPolicy {
  policyID: string
  scriptObj: any
}

export class NftPolicy2 {}

export class NftPolicy {
  static MAX_METADATA_LEN = 64

  public policyID: string
  public mintingPolicy: MintingPolicyExtended

  static updateDatetimeSlotSpan(
    blockfrostKey: string,
    datetimeStr?: string,
    slotNum?: number
  ) {
    const lucidPromise = validated(
      LucidInst.getLucidInstance(blockfrostKey),
      'Please connect wallet to generate slot value'
    )

    return lucidPromise.then((lucid) => {
      if (lucid === undefined) {
        throw 'Mismatch between blockfrost key and wallet network'
      }

      if (slotNum) return slotNum

      if (datetimeStr) {
        const unixTimestamp = Date.parse(datetimeStr)
        const policyExpirationSlot = lucid.utils.unixTimeToSlot(unixTimestamp)
        return policyExpirationSlot
      }

      return 0
    })
  }

  static getKeyFromInputOrSpan(inputOrSpanDom: any) {
    var inputOrSpanEl = document.querySelector(inputOrSpanDom)
    if (inputOrSpanEl.nodeName === SPAN_TYPE) {
      return inputOrSpanEl.textContent
    } else if (inputOrSpanEl.nodeName === INPUT_TYPE) {
      return inputOrSpanEl.value
    }
    console.log('Illegal state exception, contact developer!')
  }

  static privateKeyToCbor(privateKey: any) {
    return toHex(privateKey.to_bytes())
  }

  static privateKeyFromCbor(privateKeyCbor: string) {
    return LCore.PrivateKey.from_bytes(fromHex(privateKeyCbor))
  }

  /**
   * Constructor
   * @param slot - Policy expiration slot
   * @param key - Policy privet key
   * @param pubKeyHash - Policy public key hash
   * @param useAllScripts - scripts
   */
  constructor(
    public slot: number,
    public key: any,
    public pubKeyHash: string,
    public useAllScripts: any
  ) {
    this.mintingPolicy = this.#constructMintingPolicy()
    this.policyID = this.mintingPolicy.policyID
  }

  #constructMintingPolicy() {
    if (this.slot) {
      return this.#getSigNativeTimelockPolicy()
    } else if (this.useAllScripts) {
      return this.#getSigNativeWithAllScripts()
    }
    return this.#getSigNativeScript()
  }

  getMintingPolicy() {
    return this.mintingPolicy
  }

  #getSigNativeScript(): MintingPolicyExtended {
    const scriptPubkey = LCore.Ed25519KeyHash.from_hex(this.pubKeyHash)
    const sigMatches = LCore.ScriptPubkey.new(scriptPubkey)
    const sigNativeScript = LCore.NativeScript.new_script_pubkey(sigMatches)

    return {
      type: 'Native',
      policyID: toHex(sigNativeScript.hash(0).to_bytes()),
      script: toHex(sigNativeScript.to_bytes()),
      scriptObj: sigNativeScript,
    }
  }

  #getSigNativeWithAllScripts(): MintingPolicyExtended {
    const policyNativeScripts = LCore.NativeScripts.new()

    policyNativeScripts.add(this.#getSigNativeScript().scriptObj)

    const policyAllScripts = LCore.ScriptAll.new(policyNativeScripts)
    const policyScript = LCore.NativeScript.new_script_all(policyAllScripts)

    return {
      type: 'Native',
      policyID: toHex(policyScript.hash(0).to_bytes()),
      script: toHex(policyScript.to_bytes()),
      scriptObj: policyScript,
    }
  }

  #getSigNativeTimelockPolicy(): MintingPolicyExtended {
    const policyNativeScripts = LCore.NativeScripts.new()
    const beforeTimelockSlot = LCore.BigNum.from_str(this.slot.toString())
    const beforeTimelock = LCore.TimelockExpiry.new(beforeTimelockSlot)
    const beforeNativeScript =
      LCore.NativeScript.new_timelock_expiry(beforeTimelock)

    policyNativeScripts.add(beforeNativeScript)
    policyNativeScripts.add(this.#getSigNativeScript().scriptObj)

    const policyAllScripts = LCore.ScriptAll.new(policyNativeScripts)
    const policyScript = LCore.NativeScript.new_script_all(policyAllScripts)

    return {
      type: 'Native',
      policyID: toHex(policyScript.hash(0).to_bytes()),
      script: toHex(policyScript.to_bytes()),
      scriptObj: policyScript,
    }
  }
}
