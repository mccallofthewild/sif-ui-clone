import { Button } from "@/components/Button/Button";
import { Form } from "@/components/Form";
import Modal from "@/components/Modal";
import { TokenIcon } from "@/components/TokenIcon";
import { formatAssetAmount } from "@/componentsLegacy/shared/utils";
import AssetIcon from "@/componentsLegacy/utilities/AssetIcon";
import { defineComponent } from "vue";
import { format } from "../../../../../core/src";
import { useSwapPageData } from "../useSwapPageData";

export const ConfirmSwap = defineComponent({
  setup() {
    const data = useSwapPageData();
    return () => {
      return (
        <Modal
          heading="Confirm Swap"
          icon="navigation/swap"
          onClose={data.requestTransactionModalClose}
          showClose
        >
          <Form.FieldSet>
            <div class="w-full px-[4px]">
              <div class="w-full flex flex-row justify-between">
                <div class="flex flex-row items-center">
                  {data.toAsset.value && (
                    <TokenIcon asset={data.fromAsset} size={22}></TokenIcon>
                  )}
                  <span class="ml-[10px] font-medium text-[16px]">
                    {data.fromAsset?.value?.displaySymbol?.toUpperCase()}
                  </span>
                </div>
                <div class="font-mono">
                  {data.fromFieldAmount.value &&
                    formatAssetAmount(data.fromFieldAmount.value)}
                </div>
              </div>
              <div class="w-full my-[10px] flex justify-center">
                <AssetIcon
                  class="text-accent-base"
                  icon="interactive/chevron-down"
                  size={20}
                ></AssetIcon>
              </div>
              <div class="w-full flex flex-row justify-between">
                <div class="flex items-center">
                  {data.toAsset.value && (
                    <TokenIcon asset={data.toAsset} size={22}></TokenIcon>
                  )}
                  <span class="ml-[10px] font-medium text-[16px]">
                    {data.toAsset?.value?.displaySymbol?.toUpperCase()}
                  </span>
                </div>
                <div class="font-mono">
                  {data.toFieldAmount.value &&
                    formatAssetAmount(data.toFieldAmount.value)}
                </div>
              </div>
            </div>
          </Form.FieldSet>
          <Form.FieldSet class="mt-[10px]">
            <Form.Label>Output is estimated</Form.Label>
            <Form.Details
              details={[
                [
                  <div class="flex items-center">
                    Price
                    <Button.InlineHelp>your help</Button.InlineHelp>
                  </div>,
                  <div>{data.priceMessage.value}</div>,
                ],
                [
                  <div class="h-full flex-row items-center">
                    {"Minimum Received"}
                    <Button.InlineHelp>
                      <div class="w-[200px]">
                        This is the minimum amount of the to token you will
                        receive, taking into consideration the acceptable
                        slippage percentage you are willing to take on. This
                        amount also already takes into consideration liquidity
                        provider fees as well.
                      </div>
                    </Button.InlineHelp>
                  </div>,
                  <div>{data.minimumReceived.value}</div>,
                ],
                [
                  <div class="flex items-center">
                    Price Impact
                    <Button.InlineHelp>Your help</Button.InlineHelp>
                  </div>,
                  <div class="lfex items-center">{data.priceImpact.value}</div>,
                ],
                [
                  <div class="flex items-center">
                    Liquidity Provider Fee
                    <Button.InlineHelp>your help</Button.InlineHelp>
                  </div>,
                  <div>{data.providerFee.value}</div>,
                ],
              ]}
            ></Form.Details>
          </Form.FieldSet>
          <div class="text-center w-full font-medium mt-[10px]">
            Confirm this transaction in your wallet.
          </div>
          {/* <Button.CallToAction
              class="mt-[10px]"
              onClick={() => data.handleAskConfirmClicked()}
            >
              Confirm
            </Button.CallToAction> */}
        </Modal>
      );
    };
  },
});