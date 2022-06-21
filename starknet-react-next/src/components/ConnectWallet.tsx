import { useStarknet } from "@starknet-react/core";
import styles from "./ConnectWallet.module.scss";

export function ConnectWallet() {
  const { account, connect, disconnect, connectors } = useStarknet();

  if (account) {
    return (
      <div>
        <p>Account: {account}</p>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }

  return (
    <>
      {connectors.map((connector, idx) => (
        <button
          className={styles.button}
          key={idx}
          onClick={() => connect(connector)}
        >
          Connect
        </button>
      ))}
    </>
  );
}
