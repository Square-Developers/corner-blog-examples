"use client";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { submitPayment } from "./actions/actions";

export default function Home() {
  // Replace with your application ID and location ID
  const appId = "YOUR_APP_ID";
  const locationId = "YOUR_LOCATION_ID";

  // Below we have provided both the Route Handler and Server Actions implementations
  // Remove the implementation that you are not using
  return (
    <PaymentForm
      applicationId={appId}
      locationId={locationId}
      // This is the Route Handler implementation
      cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
        const response = await fetch("/api/pay", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            sourceId: token.token,
          }),
        });
        console.log(await response.json());
      }}
      // This is the Server Actions implementation
      cardTokenizeResponseReceived={async (token) => {
        const result = await submitPayment(token.token);
        console.log(result);
      }}
    >
      <CreditCard />
    </PaymentForm>
  );
}
