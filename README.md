# Auropay SDK

The Auropay SDK provides a streamlined integration for merchants to interact with Auropay's payment APIs. This SDK abstracts complex API interactions, enabling merchants to focus on building great user experiences. It includes support for creating payment links, refunds, querying payment status, and generating payment QR codes.

---

## Features

- **Create Payment Link**: Simplify generating payment links with extensive customization options.
- **Create Refund**: Enable seamless refund processing for orders.
- **Get Payment Status by Transaction ID or Reference ID**: Retrieve transaction details easily.
- **Generate Payment QR Code**: Support for dynamic QR code generation for payments.
- **Secure and User-friendly**: Built with security and ease of use in mind.
- **Comprehensive Documentation**: Includes detailed examples and configuration guides for easy onboarding.

---

## Getting Started

### Requirements

**API Keys**: Access your API access key and secret key from the Auropay merchant dashboard.

```properties
API_ACCESS_KEY 	: "FF************************E3A8"
API_SECRET_KEY 	: "wqr0i2O******************************ANtO1TA="
```

---

### Installation

1) Install the SDK in your Node.js project via npm:

	npm install auropay

2) Import the SDK into your project:

  const Auropay = require('auropay');

---

## Usage Examples

### 1. Initialize the SDK

```javascript


// Set the client API keys and environment
Auropay.clientAccessKey = 'API_ACCESS_KEY';
Auropay.clientSecretKey = 'API_SECRET_KEY';
Auropay.clientEnvironment = 'DEV';  // Set to 'DEV', 'UAT', or 'PROD'

```

---

### 2. Create Payment Link

**Method:** `createPaymentLink`

This method utilizes the settings provided in the `CreatePaymentRequest` to generate a payment link. The returned JSONObject contains details such as the payment link URL, expiration time, and other relevant metadata. Following methods can be utilized to create `CreatePaymentRequest` object and pass on to `createPaymentLink` method.

| **Methods**                        | **Data Types**             | **Details**                                                             |
| ---------------------------------- | -------------------------- | ----------------------------------------------------------------------- |
| `setExpireOn`                      | String                     | Time when the generated link will expire (e.g., "31-01-2025 23:59:59"). |
| `setAmount`                        | double                     | Transaction amount for the payment link.                                |
| `setCustomers`                     | Object<Customer>           | Requires Object of Customer details.                 |
| `setCallbackParameters`            | Object<CallbackParameters> | Requires callback object<br />;`                                        |
| `setShortDescription` (optional)   | String                     | Brief description of the payment.                                       |
| `setTitle`                         | String                     | Title for the payment link.                                             |
| `setSettings`                      | Object<Settings>           | Create a `Settings` object                                              |
| `setResponseType`                  | int                        | Desired response format (e.g., JSON).                                   |
| `setPaymentDescription` (optional) | String                     | Detailed description of the payment.                                    |

**Code Snippet:**

```javascript

const Customer = require('auropay/lib/requests/customer');
const CallbackParameters = require('auropay/lib/requests/callback-parameters');
const Settings = require('auropay/lib/requests/settings');
const CreatePaymentRequest = require('auropay/lib/requests/create-payment-request');

try {  
    // Initialize Customer details
    const customerDetails = new Customer("John", "Doe", "9999999999", "john.doe@auropay.com");

    // Initialize Callback Parameters
    const callbackParams = new CallbackParameters("https://www.example.com/callback", "payByTestData");

    // Initialize Settings
    const settings = new Settings(true); 

    const auropay = new Auropay();
    const createPaymentRequest = new CreatePaymentRequest();
    createPaymentRequest.setTitle("Test Payment");
    createPaymentRequest.setAmount(100);
    createPaymentRequest.setExpireOn("31-12-2025 23:59:59");
    createPaymentRequest.setShortDescription("Payment for product");
    createPaymentRequest.setPaymentDescription("Payment for the purchased product");
    createPaymentRequest.setEnablePartialPayment(true);
    createPaymentRequest.setEnableMultiplePayment(true);
    createPaymentRequest.setDisplayReceipt(false);
    createPaymentRequest.setCustomers(customerDetails);
    createPaymentRequest.setCallbackParameters(callbackParams);
    createPaymentRequest.setSettings(settings);

    auropay.createPaymentLink(createPaymentRequest)
      .then(result => {
        console.log(result);
        res.json(result);
      })
      .catch(error => {
        console.error('Error:', error);
        res.json(error);
      });
  } catch (error) {
    return res.json(error);
  }

```

### 3. Create Refund

**Method:** `createRefund`

| **Input Parameters** | **Data Types** | **Details**                                     |
| -------------------- | -------------- | ----------------------------------------------- |
| `setOrderId`         | String         | Unique identifier for the order to be refunded. |
| `setRefundAmount`    | decimal        | Amount to refund. Should be more then 1`        |
| `setRefundRemarks` (optional)  | String         | Reason for the refund.                          |

**Code Snippet:**

```javascript

const CreateRefundRequest = require('auropay/lib/requests/create-refund-request');

try {
  const auropay = new Auropay();
  createRefundRequest = new CreateRefundRequest()
  createRefundRequest.setOrderId("c1416654-XXXX-XXXX-XXXX-XXXXXXX1333");
  createRefundRequest.setRefundAmount(100);
  createRefundRequest.setRefundRemarks("Refund Reason");
  auropay.createRefund(createRefundRequest)
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      res.json(error);
    });
  } catch (error) {
    return res.json(error);
  }

```

---

### 4. Get Payment Status by Transaction ID

**Method:** `getPaymentStatusByTransactionId`

| **Input Parameters** | **Data Types** | **Details**                            |
| -------------------- | -------------- | -------------------------------------- |
| `transactionId`      | String         | Unique identifier for the transaction. |

**Code Snippet:**

```javascript

const transactionId = "c1416654-XXXX-XXXX-XXXX-XXXXXXX1333";

const auropay = new Auropay();
auropay.getPaymentStatusByTransactionId(transactionId)
  .then(result => {
    console.log('Payment Status by Transaction ID:', result);
  })
  .catch(error => {
    console.error('Error fetching payment status:', error);
  });

```

### 4. Get Payment Status by Reference ID

**Method:** `getPaymentStatusByReferenceId`

| **Input Parameters** | **Data Types** | **Details**                            |
| -------------------- | -------------- | -------------------------------------- |
| `referenceId`        | String         | Unique identifier for the transaction. |

**Code Snippet:**

```javascript

const referenceId = "c1416654-XXXX-XXXX-XXXX-XXXXXXX1333";

const auropay = new Auropay();
auropay.getPaymentStatusByReferenceId(referenceId)
  .then(result => {
    console.log('Payment Status by Reference ID:', result);
  })
  .catch(error => {
    console.error('Error fetching payment status:', error);
  });

```

---

### 5. Create Payment QR Code

**Method:** `createPaymentQRCode`

This method utilizes the settings provided in the `CreatePaymentRequest` to generate a payment link. The returned JSONObject contains details such as the payment link URL, expiration time, and other relevant metadata. Following methods can be utilized to create `CreatePaymentRequest` object and pass on to `createPaymentQRCode` method.

| **Methods**                        | **Data Types**             | **Details**                                                             |
| ---------------------------------- | -------------------------- | ----------------------------------------------------------------------- |
| `setExpireOn`                      | String                     | Time when the generated link will expire (e.g., "31-01-2025 23:59:59"). |
| `setAmount`                        | double                     | Transaction amount for the payment link.                                |
| `setCustomers`                     | Object<Customer>           | Requires Object of Customer details.                 |
| `setCallbackParameters`            | Object<CallbackParameters> | Requires callback object                                                |
| `setShortDescription` (optional)   | String                     | Brief description of the payment.                                       |
| `setTitle`                         | String                     | Title for the payment link.                                             |
| `setSettings`                      | Object<Settings>           | Create a `Settings` object                                              |
| `setResponseType`                  | int                        | Desired response format (e.g., JSON).                                   |
| `setPaymentDescription` (optional) | String                     | Detailed description of the payment.                                    |

**Code Snippet:**

```javascript

const Customer = require('auropay/lib/requests/customer');
const CallbackParameters = require('auropay/lib/requests/callback-parameters');
const Settings = require('auropay/lib/requests/settings');
const CreatePaymentRequest = require('auropay/lib/requests/create-payment-request');

try {  
    // Initialize Customer details
    const customerDetails = new Customer("John", "Doe", "9999999999", "john.doe@auropay.com");

    // Initialize Callback Parameters
    const callbackParams = new CallbackParameters("https://www.example.com/callback", "payByTestData");

    // Initialize Settings
    const settings = new Settings(true); 

    const auropay = new Auropay();
    const createQRCodeRequest = new CreatePaymentRequest();
    createQRCodeRequest.setTitle("Test Payment");
    createQRCodeRequest.setAmount(100);
    createQRCodeRequest.setExpireOn("31-12-2025 23:59:59");
    createQRCodeRequest.setShortDescription("Payment for product");
    createQRCodeRequest.setPaymentDescription("Payment for the purchased product");
    createQRCodeRequest.setEnablePartialPayment(true);
    createQRCodeRequest.setEnableMultiplePayment(true);
    createQRCodeRequest.setDisplayReceipt(false);
    createQRCodeRequest.setCustomers(customerDetails);
    createQRCodeRequest.setCallbackParameters(callbackParams);
    createQRCodeRequest.setSettings(settings);

    auropay.createPaymentQRCode(createQRCodeRequest)
      .then(result => {
        console.log(result);
        res.json(result);
      })
      .catch(error => {
        console.error('Error:', error);
        res.json(error);
      });
  } catch (error) {
    return res.json(error);
  }

```

---

## License

Distributed under the Unlicense License. See [LICENSE](https://github.com/Auropay/Auropay-Node-SDK/blob/main/LICENSE) for more information.

<br />
<br />
````
