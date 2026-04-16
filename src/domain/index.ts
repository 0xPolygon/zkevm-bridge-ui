import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { BigNumber } from "ethers";
import { ComponentType } from "react";

export type ChainKey = "ethereum" | "polygon-zkevm";

export type CommonChain = {
  Icon: ComponentType<{ className?: string }>;
  bridgeContractAddress: string;
  chainId: number;
  explorerUrl: string;
  key: ChainKey;
  name: string;
  nativeCurrency: {
    decimals: number;
    name: string;
    symbol: string;
    wrapped: {
      address: string;
      chainId: number;
    };
  };
  networkId: number;
  provider: JsonRpcProvider;
};

export type GptChain = CommonChain & {
  key: "gpt";
};

export type LumiaChain = CommonChain & {
  key: "lumia";
};

export type EthereumChain = CommonChain & {
  key: "ethereum";
  poeContractAddress: string;
  rollupManagerAddress: string;
};

export type ZkEVMChain = CommonChain & {
  key: "polygon-zkevm";
};

export type Chain = EthereumChain | ZkEVMChain;

export type ConnectedProvider = {
  account: string;
  chainId: number;
  provider: Web3Provider;
};

export type Token = {
  address: string;
  balance?: AsyncTask<BigNumber, string>;
  chainId: number;
  decimals: number;
  logoURI: string;
  name: string;
  symbol: string;
  wrappedToken?: {
    address: string;
    chainId: number;
  };
};

export type ReportFormEnvDisabled = {
  isEnabled: false;
};

export type ReportFormEnvEnabled = {
  entries: {
    error: string;
    platform: string;
    url: string;
  };
  isEnabled: true;
  url: string;
};

export type Env = {
  brandComponents: boolean;
  bridgeApiUrl: string;
  chains: [EthereumChain, ZkEVMChain];
  faviconPath?: string;
  fiatExchangeRates:
    | {
        areEnabled: false;
      }
    | {
        apiKey: string;
        apiUrl: string;
        areEnabled: true;
        usdcToken: Token;
      };
  forceUpdateGlobalExitRootForL1: boolean;
  frontendType: string;
  isDepositWarningEnabled: boolean;
  logoPath?: string;
  networkName?: string;
  networkSymbol?: string;
  outdatedNetworkModal:
    | {
        isEnabled: false;
      }
    | {
        isEnabled: true;
        messageParagraph1?: string;
        messageParagraph2?: string;
        title?: string;
        url?: string;
      };
  reportForm: ReportFormEnvEnabled | ReportFormEnvDisabled;
  showBackgroundImage: boolean;
};

export type RouterState = {
  redirectUrl: string;
};

export enum EthereumChainId {
  MAINNET = 1,
  GOERLI = 5,
  SEPOLIA = 11155111,
}

export enum WalletName {
  METAMASK = "MetaMask",
  WALLET_CONNECT = "WalletConnect",
}

export enum EthereumEvent {
  ACCOUNTS_CHANGED = "accountsChanged",
  CHAIN_CHANGED = "chainChanged",
  DISCONNECT = "disconnect",
}

export enum TxStatus {
  REVERTED = 0,
  SUCCESSFUL = 1,
}

export enum Currency {
  CNY = "CNY",
  EUR = "EUR",
  GBP = "GBP",
  JPY = "JPY",
  USD = "USD",
}

export type FiatExchangeRates = Partial<Record<keyof typeof Currency, number>>;

export type Message =
  | {
      text: string;
      type: "success-msg" | "error-msg";
    }
  | {
      parsed: string;
      text?: string;
      type: "error";
    };

type BridgeCommonFields = {
  amount: BigNumber;
  blockNumber: number;
  depositCount: number;
  depositTxHash: string;
  destinationAddress: string;
  fiatAmount: BigNumber | undefined;
  from: Chain;
  globalIndex: string;
  id: string;
  to: Chain;
  token: Token;
  tokenOriginNetwork: number;
};

export type PendingBridge = Pick<
  BridgeCommonFields,
  "depositTxHash" | "destinationAddress" | "from" | "to" | "token" | "amount" | "fiatAmount"
> & {
  claimTxHash?: string;
  status: "pending";
};

export type InitiatedBridge = BridgeCommonFields & {
  status: "initiated";
};

export type OnHoldBridge = BridgeCommonFields & {
  status: "on-hold";
};

export type CompletedBridge = BridgeCommonFields & {
  claimTxHash: NonNullable<PendingBridge["claimTxHash"]>;
  status: "completed";
};

export type Bridge = PendingBridge | InitiatedBridge | OnHoldBridge | CompletedBridge;

export type Deposit = {
  amount: BigNumber;
  blockNumber: number;
  claim:
    | {
        status: "pending";
      }
    | {
        status: "ready";
      }
    | {
        status: "claimed";
        txHash: string;
      };
  depositCount: number;
  depositTxHash: string;
  destinationAddress: string;
  fiatAmount: BigNumber | undefined;
  from: Chain;
  globalIndex: string;
  to: Chain;
  token: Token;
  tokenOriginNetwork: number;
};

export type MerkleProof = {
  mainExitRoot: string;
  merkleProof: string[];
  rollupExitRoot: string;
  rollupMerkleProof: string[];
};

export type FormData = {
  amount: BigNumber;
  from: Chain;
  to: Chain;
  token: Token;
};

export enum PolicyCheck {
  Checked = "checked",
  Unchecked = "unchecked",
}

export type EIP1559GasType = "eip-1559";

export type LegacyGasType = "legacy";

export type Gas =
  | {
      data: {
        gasLimit: BigNumber;
        maxFeePerGas: BigNumber;
        maxPriorityFeePerGas: BigNumber;
      };
      type: EIP1559GasType;
    }
  | {
      data: {
        gasLimit: BigNumber;
        gasPrice: BigNumber;
      };
      type: LegacyGasType;
    };

export type TokenSpendPermission =
  | {
      type: "none";
    }
  | {
      type: "approval";
    }
  | {
      permit: Permit;
      type: "permit";
    };

export enum Permit {
  DAI = "DAI",
  EIP_2612 = "EIP_2612",
  UNISWAP = "UNISWAP",
}

export enum ProviderError {
  Ethereum = "ethereum",
  PolygonZkEVM = "polygon-zkevm",
}

export type MetaMaskUserRejectedRequestError = {
  code: 4001 | "ACTION_REJECTED";
  message: string;
};

export type MetaMaskResourceUnavailableError = {
  code: -32002;
  message: string;
};

export type EthersInsufficientFundsError = {
  code: "INSUFFICIENT_FUNDS";
  reason: string;
};

export type MetaMaskUnknownChainError = {
  code: 4902;
  message: string;
};

export type PendingAsyncTask = {
  status: "pending";
};

export type LoadingAsyncTask = {
  status: "loading";
};

export type FailedAsyncTask<E> = {
  error: E;
  status: "failed";
};

export type SuccessfulAsyncTask<D> = {
  data: D;
  status: "successful";
};

export type ReloadingAsyncTask<D> = {
  data: D;
  status: "reloading";
};

export type LoadingMoreItemsAsyncTask<D> = {
  data: D;
  status: "loading-more-items";
};

export type AsyncTask<D, E, P = false> = P extends true
  ?
      | PendingAsyncTask
      | LoadingAsyncTask
      | SuccessfulAsyncTask<D>
      | ReloadingAsyncTask<D>
      | LoadingMoreItemsAsyncTask<D>
      | FailedAsyncTask<E>
  :
      | PendingAsyncTask
      | LoadingAsyncTask
      | SuccessfulAsyncTask<D>
      | ReloadingAsyncTask<D>
      | FailedAsyncTask<E>;

type OpenModal<D> = {
  data: D;
  status: "open";
};

type ClosedModal = {
  status: "closed";
};

export type ModalState<D> = OpenModal<D> | ClosedModal;

export type Exact<T, U> = [T, U] extends [U, T] ? true : false;
