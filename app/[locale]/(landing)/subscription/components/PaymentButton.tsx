"use client";
import { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import getEnv from "@/helpers/Env";
import { useSession } from "next-auth/react";

const URL = `${getEnv(
  "NEXT_PUBLIC_BACKEND_ENDPOINT"
)}/payments/paypal/get_subscription_by_id/`;

interface Props {
  type: string;
  plan: string;
  name: string;
}

const PaymentButton = ({ type, plan, name }: Props) => {
  const session = useSession();
  const [{ options }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        intent: "subscription",
      },
    });
  }, [type]);

  async function onApprove(data: any) {
    try {
      console.log(data);
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscription_id: data.subscriptionID,
          organization_id: session.data?.user.id,
          plan_name: name,
        }),
      });
      const orderData = await response.json();
      alert(
        `Transaction completed by ${orderData.status} ${orderData.message}`
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <PayPalButtons
      createSubscription={(data, actions) => {
        return actions.subscription
          .create({
            plan_id: plan,
          })
          .then((orderId) => {
            return orderId;
          });
      }}
      style={{
        label: "subscribe",
      }}
      onApprove={onApprove}
    />
  );
};

export default PaymentButton;
