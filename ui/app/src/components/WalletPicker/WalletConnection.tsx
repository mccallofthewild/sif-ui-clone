import { shortenHash } from "@/componentsLegacy/shared/utils";
import AssetIcon from "@/componentsLegacy/utilities/AssetIcon";
import { defineComponent, PropType, ref } from "vue";
import { WalletConnection } from "./constants";
import WalletConnectionDropdown from "./WalletConnectionDropdown";
import Tooltip, { TooltipInstance } from "@/components/Tooltip";

export default defineComponent({
  name: "WalletConnection",
  props: {
    connection: {
      type: Object as PropType<WalletConnection>,
      required: true,
    },
  },
  setup(props) {
    const stateRef = props.connection.useWalletState();
    const apiRef = props.connection.useWalletApi();
    const instanceRef = ref<TooltipInstance | null>(null);

    const handleClick = () => {
      if (stateRef.value.isConnected) return;
      apiRef.value.connect();
    };

    return () => (
      <div class="mt-[6px] first:mt-0">
        <Tooltip
          onShow={(instance: TooltipInstance) => {
            instanceRef.value = instance;
          }}
          onHide={() => {
            instanceRef.value = null;
          }}
          onMount={(instance: TooltipInstance) => {
            // Do not open if not connected...
            if (!stateRef.value.isConnected) instance.hide();
          }}
          placement="bottom-end"
          onClickOutside={() => instanceRef.value?.hide()}
          interactive
          trigger="click"
          theme="black"
          arrow={false}
          offset={[0, 0]}
          animation="scale"
          content={
            <WalletConnectionDropdown
              connection={props.connection}
              onAction={() => instanceRef.value?.hide()}
            />
          }
        >
          <button
            tab-index={-1}
            role="button"
            onClick={handleClick}
            class={[
              "h-[37px] flex items-center px-[10px] w-full border border-solid rounded cursor-pointer focus:bg-black hover:bg-black transition-all",
              stateRef.value.isConnected
                ? `border-connected-base`
                : `border-transparent`,
            ]}
          >
            <div class="flex-1 items-center flex">
              <img
                src={props.connection.iconSrc}
                class="w-[18px]"
                alt={props.connection.name}
              />
              <div class="ml-[13px]">
                <div class="text-xs font-bold leading-none">
                  {props.connection.name}
                </div>
                <div class="text-[8px] opacity-50 capitalize">
                  {props.connection.network}
                </div>
              </div>
            </div>
            <AssetIcon
              icon="interactive/link"
              class={[
                "w-[20px] max-w-[20px] h-[20px] transition-all",
                stateRef.value.isConnected && "text-connected-base",
              ]}
            />
            <div class="flex-1">
              <div class="cursor-pointer text-[11px] flex justify-end items-center w-full">
                {stateRef.value.isConnected
                  ? shortenHash(stateRef.value.address, 6, 4)
                  : "Connect"}
                <AssetIcon
                  icon="interactive/chevron-down"
                  class="ml-[10px] w-[15px] h-[15px] transition-all"
                  style={{
                    transform: !instanceRef.value
                      ? "rotate(-90deg)"
                      : "rotate(0deg)",
                  }}
                />
              </div>
            </div>
          </button>
        </Tooltip>
      </div>
    );
  },
});
