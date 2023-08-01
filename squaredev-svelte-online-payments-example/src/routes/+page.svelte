<script>
  const appId = 'your-app-id';
  const locationId = 'your-location-id';

  let card;
  let paymentStatus = '';

  async function initializePaymentForm() {
    if (!Square) {
      throw new Error('Square.js failed to load properly');
    }
    const payments = Square.payments(appId, locationId);
    try {
      card = await payments.card();
      await card.attach('#card-container');
    } catch (e) {
      console.error('Initializing Card failed', e);
      return;
    }
  }

  async function tokenize(paymentMethod) {
    const tokenResult = await paymentMethod.tokenize();
    if (tokenResult.status === 'OK') {
      return tokenResult.token;
    } else {
      let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
      if (tokenResult.errors) {
        errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`;
      }
      throw new Error(errorMessage);
    }
  }

  async function handlePaymentMethodSubmission() {
    try {
      paymentStatus = '';
      const token = await tokenize(card);
      const paymentResponse = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          locationId,
          sourceId: token
        })
      });

      if (paymentResponse.ok) {
        paymentStatus = 'Payment completed';
      } else {
        const errorBody = await paymentResponse.text();
        throw new Error(errorBody);
      }
    } catch (e) {
      paymentStatus = 'Payment failed';
      console.error(e.message);
    }
  }
</script>

<form on:submit|preventDefault={handlePaymentMethodSubmission}>
  {#await initializePaymentForm()}
    <p>Loading...</p>
  {:catch error}
    <p>{error}</p>
  {/await}
  <div id="card-container" />
  <button>Pay $1.00</button>
</form>
{#if paymentStatus}
  <div id="payment-status-container">{paymentStatus}</div>
{/if}

<style>
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
