import {
  render,
  Banner,
  useSettings,
  TextBlock,
  useTotalAmount,
  useDiscountAllocations,
  View,
} from "@shopify/checkout-ui-extensions-react";

render("Checkout::Dynamic::Render", () => <App />);

interface ISettings {
  [key: string]: any;
  show_notification: boolean;
  sum_level_1: number;
  msg_level_1: string;
  sum_level_2: number;
  msg_level_2: string;
}

function App() {
  const {
    show_notification,
    sum_level_1,
    msg_level_1,
    sum_level_2,
    msg_level_2,
  } = useSettings<ISettings>();

  const { amount, currencyCode } = useTotalAmount();
  const [appliedDiscount] = useDiscountAllocations();

  let appliedDiscountValue = 0;
  let originalPrice = amount;

  if (appliedDiscount) {
    appliedDiscountValue = appliedDiscount.discountedAmount?.amount;
    originalPrice = amount + appliedDiscountValue;
  }

  const buildMessage = (baseMsg: string, sumLevel: number) => {
    return baseMsg?.replace(
      "[[difference]]",
      (sumLevel - originalPrice).toFixed(2)
    );
  };

  const msg1 = buildMessage(msg_level_1, sum_level_1);
  const msg2 = buildMessage(msg_level_2, sum_level_2);

  return (
    <Banner>
      {show_notification && (
        <View>
          {originalPrice < sum_level_1 && (
            <TextBlock>
              Notification:
              {msg1}
            </TextBlock>
          )}
          {sum_level_1 < originalPrice && originalPrice < sum_level_2 && (
            <TextBlock>
              Notification:
              {msg2}
            </TextBlock>
          )}
        </View>
      )}
      {/* <View>
  <TextBlock>All Info</TextBlock>
      <TextBlock>Amount for 1 level : {sum_level_1} </TextBlock>
      <TextBlock>Amount for 2 level : {sum_level_2} </TextBlock>
      <TextBlock>
        Original: {originalPrice} {currencyCode}
      </TextBlock>
      <TextBlock>Final: {amount}</TextBlock>
  </View> */}
    </Banner>
  );
}
