<template>
  <form @submit.prevent="handlePaymentMethodSubmission">
    <div v-if="loading">Loading...</div>
    <div id="card-container" />
    <button>Pay $1.00</button>
  </form>
  <div v-if="paymentStatus" id="payment-status-container">
    {{ paymentStatus }}
  </div>
</template>

<script setup>
const appId = "sandbox-sq0idb-H1cgz2Yv_r8bCaIKNp5IUg"; //TODO: don't commit these
const locationId = "LCSH27KYTC1TW";

let card;
let loading = ref(true);
let paymentStatus = ref("");

onMounted(async () => {
  loading.value = true;
  await initializePaymentForm();
  loading.value = false;
});

const initializePaymentForm = async () => {
  if (!Square) {
    throw new Error("Square.js failed to load properly");
  }
  const payments = Square.payments(appId, locationId);
  try {
    card = await payments.card();
    await card.attach("#card-container");
  } catch (e) {
    console.error("Initializing Card failed", e);
    return;
  }
};

const tokenize = async (paymentMethod) => {
  const tokenResult = await paymentMethod.tokenize();
  if (tokenResult.status === "OK") {
    return tokenResult.token;
  } else {
    let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
    if (tokenResult.errors) {
      errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`;
    }
    throw new Error(errorMessage);
  }
};

const handlePaymentMethodSubmission = async () => {
  paymentStatus.value = "";
  const token = await tokenize(card);
  const { data, error } = await useFetch("/api/pay", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: {
      locationId,
      sourceId: token,
    },
  });
  if (!error.value) {
    paymentStatus.value = "Payment completed";
  } else {
    paymentStatus.value = "Payment failed";
  }
};
</script>

<style scoped>
button {
  color: #ffffff;
  background-color: #006aff;
  border-radius: 6px;
  cursor: pointer;
  border-style: none;
  font-size: 16px;
  line-height: 24px;
  padding: 12px 16px;
  width: 100%;
}

button:hover {
  background-color: #005fe5;
}

button:active {
  background-color: #0055cc;
}

button:disabled {
  background-color: rgba(0, 0, 0, 0.05);
  color: rgba(0, 0, 0, 0.3);
}

#payment-status-container {
  width: fit-content;
  font-family: Arial, Helvetica, sans-serif;
  color: #ffffff;
  background: #1a1a1a;
  display: flex;
  padding: 12px;
  border-radius: 6px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1), 0px 0px 4px rgba(0, 0, 0, 0.1);
  margin: auto;
  margin-top: 36px;
}
</style>
