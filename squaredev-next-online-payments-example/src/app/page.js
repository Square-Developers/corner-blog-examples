"use client";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { submitPayment } from "./actions/actions";

export default function Home() {
  // Replace with your application ID and location ID
  const appId = "sandbox-sq0idb-2PCGtqlNn89i-sHMmRY5HQ";
  const locationId = "LFJW4DZVPHVRR";

  return (
    <PaymentForm
      applicationId={appId}
      locationId={locationId}
      cardTokenizeResponseReceived={async (token) => {
        const result = await submitPayment(token.token);
        console.log(result);
      }}
    >
      <CreditCard />
    </PaymentForm>
  );
}
