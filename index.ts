import { Signer as EthSigner, utils } from "ethers"
import { createToken } from "./token.js"

export { EthSigner }
export { createToken, Signer } from "./token.js"

async function sign(signer: EthSigner) {
  const sign = {
    signMessage: async (message: Uint8Array): Promise<Uint8Array> => {
      const sig = await signer.signMessage(message)
      return utils.arrayify(sig)
    },
  }
  const iat = ~~(Date.now() / 1000)
  const exp = iat + 60 * 60 * 10 // Default to ~10 hours

  // WARN: This is a non-standard JWT
  // Borrows ideas from: https://github.com/ethereum/EIPs/issues/1341
  const iss = await signer.getAddress()
  const network = await signer.provider?.getNetwork()
  const chain = network?.chainId ?? "unknown"
  let net = network?.name
  if (net?.startsWith("matic")) net = "poly"
  else net = "eth"
  const kid = `${net}:${chain}:${iss}`

  const token = await createToken(
        sign,
        { kid, alg: "ETH" },
        { iss, exp }
      )
  return token
}

export { sign }
