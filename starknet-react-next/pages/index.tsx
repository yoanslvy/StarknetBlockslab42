import {
  useStarknet,
  useStarknetCall,
  useStarknetInvoke,
} from "@starknet-react/core";
import type { NextPage } from "next";
import { useCallback, useMemo, useState } from "react";
import { toBN } from "starknet/dist/utils/number";
import { bnToUint256, uint256ToBN } from "starknet/dist/utils/uint256";
import { ConnectWallet } from "~/components/ConnectWallet";
import { TransactionList } from "~/components/TransactionList";
import { useNFTContract } from "~/hooks/erc721";
import styles from "../pages/nft.module.scss";

function UserBalance() {
  const { account } = useStarknet();
  const { contract } = useNFTContract();

  const { data, loading, error } = useStarknetCall({
    contract,
    method: "balanceOf",
    args: account ? [account] : undefined,
  });

  const content = useMemo(() => {
    if (loading || !data?.length) {
      return <div>Loading balance</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    const balance = uint256ToBN(data[0]);
    return <div>{balance.toString(10)}</div>;
  }, [data, loading, error]);

  return (
    <div style={{ color: "white", textAlign: "center" }}>
      <h2>Your balance: {content}</h2>
    </div>
  );
}

function MintNFT() {
  const { account } = useStarknet();
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState<string | undefined>();

  const { contract } = useNFTContract();

  const { loading, error, reset, invoke } = useStarknetInvoke({
    contract,
    method: "mint",
  });

  const onMint = useCallback(() => {
    reset();
    if (account && !amountError) {
      const message = `${amount.toString()} tokens to ${account}`;
      const amountBn = bnToUint256(amount);
      invoke({
        args: [],
        metadata: { method: "mint", message },
      });
    }
  }, [account, amount, amountError, invoke, reset]);

  const mintButtonDisabled = useMemo(() => {
    if (loading) return true;
    return !account || !!amountError;
  }, [loading, account, amountError]);

  return (
    <div style={{ color: "white", textAlign: "center" }}>
      <h2>Click below to mint your first Starknet NFT !</h2>

      <button
        className={styles.button}
        disabled={mintButtonDisabled}
        onClick={onMint}
      >
        {loading ? "Waiting for wallet" : "Mint"}
      </button>
      {error && <p>Error: {error}</p>}
    </div>
  );
}

const NFTPage: NextPage = () => {
  const { account } = useStarknet();

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage:
          "url(https://starkgate.starknet.io/static/media/stars.38edc9a7.png), url(./static/media/light-accent.1ec16f0c.png)",
        backgroundColor: "#8b8dc2",
      }}
    >
      {!!!account ? (
        <div className={styles.connect}>
          <p style={{ color: "white" }}>Connect Wallet</p>
          <ConnectWallet />
          <p className={styles.link}>https://www.blockslab42.io/</p>
        </div>
      ) : (
        <>
          <p style={{ textAlign: "center", color: "white" }}>
            Connected: {account}
          </p>
          <div className={styles.center}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="../assets/logoStarknet.png"
                width={300}
                alt="logoStarknet"
                style={{ marginRight: "16px" }}
              />
              <a
                href="https://www.blockslab42.io/"
                target="_blank"
                rel="noreferrer"
              >
                <img src="../assets/logoBlockslab.png" width={60} alt="logo" />
              </a>
            </div>

            <UserBalance />
            <MintNFT />
            <a
              href="https://www.blockslab42.io/"
              target="_blank"
              rel="noreferrer"
              style={{ textAlign: "center" }}
            >
              <p className={styles.link}>https://www.blockslab42.io/</p>
            </a>
            <TransactionList />
          </div>
        </>
      )}
    </div>
  );
};

export default NFTPage;
