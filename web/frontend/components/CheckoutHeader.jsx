import { useState } from "react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { Button } from "@shopify/polaris";

export function CheckoutHeader() {
  const fetch = useAuthenticatedFetch();

  const handleClick = async () => {
    const response = await fetch("/api/header/left");
    if (response.ok) {
      console.log("response ok");
    } else {
      console.log("error");
    }
  };

  return (
    <>
      <div>Header component</div>
      <Button onClick={handleClick}>Header Left</Button>
      <Button>Header Right</Button>
    </>
  );
}
