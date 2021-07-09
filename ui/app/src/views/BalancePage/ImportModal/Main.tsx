import { defineComponent, ref, computed, watch, reactive } from "vue";
import { useRoute } from "vue-router";
import { effect } from "@vue/reactivity";
import cx from "clsx";
import Modal from "@/components/Modal";
import AssetIcon, { IconName } from "@/componentsLegacy/utilities/AssetIcon";
import { IAsset, Network } from "@sifchain/sdk";
import { useCore } from "@/hooks/useCore";
import { useTokenList, TokenListItem } from "@/hooks/useTokenList";
import { useTokenIconUrl } from "@/hooks/useTokenIconUrl";
import { useSelectClasses } from "@/hooks/elements/useSelectClasses";
import { useWalletButton } from "@/componentsLegacy/WithWallet/useWalletButton";
import router from "@/router";

export type ImportParams = {
  amount?: string;
  network?: string;
  symbol?: string;
};

export default defineComponent({
  name: "ImportMainModal",
  props: {},
  setup(props) {
    const selectClasses = useSelectClasses();
    const route = useRoute();

    const importParams = reactive<ImportParams>(route.query);

    const { store } = useCore();

    const tokenListRef = useTokenList();
    const tokenRef = computed<TokenListItem>(() => {
      return tokenListRef.value.find(
        (token) => token.asset.symbol === importParams.symbol,
      ) as TokenListItem;
    });

    const symbolIconRef = computed(
      () =>
        useTokenIconUrl({
          symbol: ref(importParams.symbol || ""),
        })?.value,
    );

    const networkListRef = computed<Network[]>(() => {
      const networks = new Set<Network>();
      tokenListRef.value.forEach((token) => {
        networks.add(token.asset.network);
      });
      return [...networks];
    });

    const pickableTokensRef = computed(() => {
      return tokenListRef.value.filter((token) => {
        return token.asset.network === importParams.network;
      });
    });

    effect(() => {
      if (
        tokenRef.value &&
        tokenRef.value.asset.network !== importParams.network
      ) {
        importParams.symbol = "";
      }
    });
    effect(() => {
      if (!tokenListRef.value.length) return;
      if (!importParams.symbol)
        importParams.symbol = tokenListRef.value[0].asset.symbol;
      if (!importParams.network)
        importParams.network = tokenListRef.value[0].asset.network;
    });

    const buttonRef = computed(() => {
      return [
        {
          condition: false && !store.wallet.sif.isConnected,
          name: "Connect Sifchain Wallet",
          icon: "interactive/arrows-in" as IconName,
          props: {
            onClick: () => window.alert("Open Wallet Window Sif"),
          },
        },
        {
          condition:
            false &&
            importParams.network === Network.ETHEREUM &&
            !store.wallet.eth.isConnected,
          name: "Connect Ethereum Wallet",
          icon: "interactive/arrows-in" as IconName,
          props: {
            onClick: () => window.alert("Open Wallet Window Eth"),
          },
        },
        {
          condition: true,
          name: "Import",
          icon: null,
          props: {
            onClick: () => {
              router.replace({
                name: "ImportConfirm",
                query: importParams,
              });
            },
          },
        },
      ].find((item) => item.condition);
    });

    return () => (
      <Modal
        showClose
        icon="interactive/arrow-down"
        heading="Import"
        onClose={() => {
          router.replace({
            name: "Balances",
          });
        }}
      >
        <section class="bg-gray-base p-4 rounded">
          <div class="flex">
            <label class={cx(selectClasses.label, "flex-1")}>
              Network
              <div class={selectClasses.container}>
                <span class="capitalize">{importParams.network}</span>
                <AssetIcon icon="interactive/chevron-down" class="w-5 h-5" />
                <select
                  class={selectClasses.select}
                  value={importParams.network}
                  onChange={(e) => {
                    const select = e.target as HTMLSelectElement;
                    importParams.network = select.value as Network;
                  }}
                >
                  {networkListRef.value.map((network: string) => (
                    <option value={network}>
                      {network[0].toUpperCase() +
                        network.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            <label class={cx(selectClasses.label, "flex-1 ml-[10px]")}>
              Token
              <div class={selectClasses.container}>
                <img src={symbolIconRef.value} class="w-[38px] h-[38px]" />
                <div class="flex items-center">
                  <div class="mr-2 uppercase">{importParams.symbol}</div>
                  <AssetIcon icon="interactive/chevron-down" class="w-5 h-5" />
                </div>
                <select
                  class={selectClasses.select}
                  value={importParams.symbol}
                  onChange={(e) =>
                    (importParams.symbol = (e.target as HTMLSelectElement)?.value)
                  }
                >
                  {pickableTokensRef.value.map((token) => (
                    <option value={token.asset.symbol}>
                      {token.asset.symbol.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </label>
          </div>

          <div class="h-[40px] flex items-end justify-end">
            {!!tokenRef.value && (
              <span
                class="text-sm opacity-50 hover:text-accent-base cursor-pointer"
                onClick={() => {
                  importParams.amount = String(
                    tokenRef.value.amount.amount.toBigInt().valueOf(),
                  );
                }}
              >
                Balance: {tokenRef.value.amount.amount.toString()}
              </span>
            )}
          </div>

          <div class="relative flex items-center h-[54px] px-3 rounded bg-gray-input border-solid border-gray-input_outline border">
            {!!tokenRef.value && (
              <button
                class="z-10 box-content text-[10px] p-[1px] font-semibold bg-accent-gradient rounded-full font-sans"
                onClick={() =>
                  (importParams.amount = String(
                    tokenRef.value.amount.amount.toBigInt().valueOf(),
                  ))
                }
              >
                <div class="flex items-center px-[9px] h-[18px] bg-gray-input rounded-full text-accent-base">
                  <span style="letter-spacing: -1%; line-height: 10px;">
                    MAX
                  </span>
                </div>
              </button>
            )}
            <input
              type="number"
              min="0"
              style={{
                textAlign: "right",
              }}
              onInput={(e) => {
                const value = (e.target as HTMLInputElement).value;
                if (isNaN(parseFloat(value))) {
                  importParams.amount = "";
                } else {
                  importParams.amount = value;
                }
              }}
              value={importParams.amount}
              class="box-border w-full absolute top-0 bottom-0 left-0 right-0 pr-[16px] pl-[68px] h-full bg-transparent outline-none text-[20px] text-white font-sans font-medium"
            />
          </div>
        </section>

        <section class="bg-gray-base p-4 rounded mt-[10px]">
          <div class="text-white">Sifchain Recipient Address</div>
          <div class="relative border h-[54px] border-solid border-white bg-gray-input">
            <input
              readonly
              value={store.wallet.sif.address}
              class="absolute top-0 left-0 w-full h-full bg-transparent p-[16px] font-mono outline-none"
              onClick={(e) => {
                (e.target as HTMLInputElement).setSelectionRange(0, 99999999);
              }}
            />
          </div>
        </section>

        {!!buttonRef.value &&
          (() => {
            return (
              <button
                class="mt-[10px] w-full h-[62px] rounded-[4px] bg-accent-gradient flex items-center justify-center font-sans text-[18px] font-semibold text-white"
                {...buttonRef.value.props}
              >
                {!!buttonRef.value.icon && (
                  <AssetIcon
                    icon={buttonRef.value.icon}
                    class="w-[20px] h-[20px] mr-[4px]"
                  />
                )}{" "}
                {buttonRef.value.name}
              </button>
            );
          })()}
      </Modal>
    );
  },
});