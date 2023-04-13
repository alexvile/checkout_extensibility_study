import React from "react";
import {
  render,
  Banner,
  useSettings,
  TextBlock,
  useTotalAmount,
} from "@shopify/checkout-ui-extensions-react";

render("Checkout::Dynamic::Render", () => <App />);

interface ISettings {
  [key: string]: any;
  show_notification: boolean;
  sum_level_1: number;
  msg_level_1: string;
}

function App() {
  const { show_notification, sum_level_1, msg_level_1 } =
    useSettings<ISettings>();
  const { amount, currencyCode } = useTotalAmount();

  const msg1 = msg_level_1.replace(
    "[[difference]]",
    (sum_level_1 - amount).toFixed(2)
  );

  return (
    <Banner>
      {show_notification && amount < sum_level_1 && (
        <TextBlock>
          Notification:
          {msg1}
        </TextBlock>
      )}

      <TextBlock>Info</TextBlock>
      <TextBlock>Amount for 1 level : {sum_level_1} </TextBlock>
      <TextBlock>
        {amount}
        {currencyCode}
      </TextBlock>
    </Banner>
  );
}
// {show_notification && amount < sum_level_1 && (
//   <TextBlock>
//     Notification:
//     {/* {msg1} */}
//   </TextBlock>
// )}
