import { defineComponent, PropType, Ref, ref, watchEffect } from "vue";

export type ErrorType = "danger" | "warning" | "bad";

export type _FormDetailsType =
  | [any, any][]
  | {
      label?: any;
      details: [any, any][];
      errorType?: ErrorType;
      isError?: boolean;
    };

export const errorTypeClass = {
  danger: "border-danger-base",
  warning: "border-danger-warning",
  bad: "border-danger-bad",
};

export const _Details = defineComponent({
  props: {
    details: {
      type: Object as PropType<_FormDetailsType>,
      required: true,
    },
    label: {},
    isError: {
      type: Boolean,
    },
    class: {
      type: String,
    },
    endContent: {
      type: Object as PropType<JSX.Element>,
    },
  },
  setup: (props, context) => {
    let details: Ref<[any, any][]> = ref([]);
    let label = ref(props.label);
    let isError = ref<ErrorType>(props.isError);
    let errorType = ref();

    watchEffect(() => {
      if (Array.isArray(props.details)) {
        details.value = props.details;
      } else {
        details.value = props.details.details;
        label.value = props.details.label;
        isError.value = props.details.isError || false;
        errorType.value = props.details.errorType;
      }
    });

    return () => (
      <div class={["w-full relative", props.class]}>
        {!!label.value && (
          <div class="mb-[10px] pt-[1em] font-medium">{label.value}</div>
        )}
        {details.value.map(([key, value], index, arr) => (
          <div
            class={[
              `
              h-[49px] w-full flex justify-between items-center
              box-border bg-gray-base border-gray-input_outline border-l-[1px] border-b-[1px] border-r-[1px] border-solid`,
              index == 0 && `rounded-t border-t-[1px]`,
              index == arr.length - 1 && `rounded-b border-b-[1px]`,
              isError.value &&
                errorTypeClass[(errorType.value || "danger") as ErrorType],
            ]}
          >
            <div class="pl-[20px] text-left text-md text-white font-sans font-medium">
              {key}
            </div>
            <div
              class={[
                `flex flex-row justify-end mr-[14px] items-center pl-[20px] text-right text-md text-white font-medium`,
              ]}
            >
              {value}
              {/* <span class="mr-[4px] whitespace-nowrap"></span> */}
              {/* <img class="h-[18px]" src={props.toTokenImageUrl} alt="" /> */}
            </div>
          </div>
        ))}
        {context.slots.default?.()}
      </div>
    );
  },
});
