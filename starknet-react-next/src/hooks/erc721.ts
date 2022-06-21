import { useContract } from "@starknet-react/core";
import { Abi } from "starknet";

import NFTAbi from "~/abi/ERC721.json";

export function useNFTContract() {
  return useContract({
    abi: NFTAbi as Abi,
    address:
      "0x06b87dc9b4d6f4572238681cf037533d5283f8e4b4122c5ae43fbd32cb510fc0",
  });
}
