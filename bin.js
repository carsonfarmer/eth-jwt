#!/usr/bin/env node

import { Wallet } from "ethers"
import * as signer from "./index.js"

// Makes strong assumptions about the args provided, no checks!
const [,,privateKey] = process.argv
if (privateKey == null) {
  console.error("missing private key string")
} else {
  try {
    const wallet = new Wallet(privateKey)
    signer.sign(wallet).then(console.log)
  } catch(err) {
    console.error(err.message)
  }
}