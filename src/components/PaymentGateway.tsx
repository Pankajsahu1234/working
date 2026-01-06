// import { useLocation, useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import { ChevronRight, Banknote, Loader } from 'lucide-react';

// interface Product {
//   image: string;
//   title: string;
//   price: number;
// }

// interface LocationState {
//   product: Product;
//   quantity: number;
//   totalAmount: number;
// }

// export default function PaymentGateway() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { product, quantity, totalAmount } = location.state as LocationState;

//   const MERCHANT_NAME = 'Mahaseth Mobile All Solution';
//   const TERMINAL_ID = '2222610015419744';
//   const MERCHANT_ADDRESS = 'Kshireshwarnath MC';

//   const [isProcessing, setIsProcessing] = useState(false);
//   const [selectedMethod, setSelectedMethod] = useState<string>('');

//   const generateKhaltiDeepLink = (): string => {
//     const amountInPaisa = Math.floor(totalAmount * 100);
//     return `khalti://pay?amount=${amountInPaisa}&transaction_uuid=${Date.now()}&product_name=${encodeURIComponent(product.title)}&merchant_name=${encodeURIComponent(MERCHANT_NAME)}`;
//   };

//   const generateESewaDeepLink = (): string => {
//     return `esewa://pay?amount=${totalAmount}&ref_id=${Date.now()}&product_name=${encodeURIComponent(product.title)}&merchant=${encodeURIComponent(MERCHANT_NAME)}`;
//   };

//   const generateFonePayDeepLink = (): string => {
//     return `fonepay://pay?amount=${totalAmount}&transaction_id=${Date.now()}&terminal_id=${TERMINAL_ID}&product_name=${encodeURIComponent(product.title)}&merchant=${encodeURIComponent(MERCHANT_NAME)}`;
//   };

//   const initiatePayment = (method: string, deepLink: string) => {
//     setSelectedMethod(method);
//     setIsProcessing(true);

//     try {
//       window.location.href = deepLink;
//       setTimeout(() => {
//         setIsProcessing(false);
//       }, 2000);
//     } catch (err) {
//       console.error('Payment error:', err);
//       setIsProcessing(false);
//     }
//   };

//   const handleKhalti = () => {
//     initiatePayment('Khalti by IME', generateKhaltiDeepLink());
//   };

//   const handleESewa = () => {
//     initiatePayment('eSewa', generateESewaDeepLink());
//   };

//   const handleFonePay = () => {
//     initiatePayment('FonePay', generateFonePayDeepLink());
//   };

//   const handleCOD = () => {
//     alert('Order placed successfully with Cash on Delivery!');
//     navigate('/');
//   };

//   const paymentMethods = [
//     {
//       id: 'khalti',
//       name: 'Khalti by IME',
//       subtitle: 'Opens Khalti app ',
//       icon: 'https://khalti.s3.amazonaws.com/image/KHT.png',
//       action: handleKhalti,
//     },
//     {
//       id: 'esewa',
//       name: 'eSewa Mobile Wallet',
//       subtitle: 'Opens eSewa app ',
//       icon: 'https://esewa.com.np/assets/esewa_og.png',
//       action: handleESewa,
//     },
//     {
//       id: 'fonepay',
//       name: 'FonePay',
//       subtitle: ' FonePay',
//       icon: 'https://www.fonepay.com/assets/img/logo.png',
//       action: handleFonePay,
//     },
//     {
//       id: 'cod',
//       name: 'Cash on Delivery',
//       subtitle: 'Pay when product arrives',
//       icon: null,
//       action: handleCOD,
//     },
//   ];

//   if (isProcessing) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//         <div className="max-w-md w-full bg-white rounded-lg shadow p-8 text-center">
//           <div className="flex justify-center mb-6">
//             <Loader className="w-12 h-12 text-orange-600 animate-spin" />
//           </div>
//           <h2 className="text-2xl font-bold mb-2">Opening {selectedMethod}</h2>
//           <p className="text-gray-600 mb-6">Please complete the payment in the payment app.</p>

//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 space-y-2">
//             <div className="flex justify-between">
//               <span className="text-gray-600">Amount:</span>
//               <span className="font-semibold">Rs. {totalAmount}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600">Terminal:</span>
//               <span className="font-semibold text-sm">{TERMINAL_ID}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600">Merchant:</span>
//               <span className="font-semibold text-sm">{MERCHANT_NAME}</span>
//             </div>
//           </div>

//           <button
//             onClick={() => setIsProcessing(false)}
//             className="w-full bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
//           >
//             Back to Payment Methods
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-3xl mx-auto bg-white rounded-lg shadow">
//         <div className="border-b px-6 py-4">
//           <h1 className="text-2xl font-bold">Select Payment Method</h1>
//           <p className="text-sm text-gray-600 mt-1">All payments credited to: {MERCHANT_NAME}</p>
//         </div>

//         <div className="divide-y">
//           {paymentMethods.map((method) => (
//             <button
//               key={method.id}
//               onClick={method.action}
//               className="w-full flex items-center justify-between px-6 py-5 hover:bg-gray-100 transition"
//             >
//               <div className="flex items-center gap-4">
//                 <div className="w-14 h-14 bg-gray-100 rounded flex items-center justify-center">
//                   {method.icon ? (
//                     <img src={method.icon} alt={method.name} className="w-10 h-10 object-contain" />
//                   ) : (
//                     <Banknote className="w-8 h-8 text-gray-600" />
//                   )}
//                 </div>

//                 <div className="text-left">
//                   <h3 className="text-lg font-semibold">{method.name}</h3>
//                   <p className="text-sm text-gray-500">{method.subtitle}</p>
//                 </div>
//               </div>

//               <ChevronRight className="text-gray-400" />
//             </button>
//           ))}
//         </div>

//         <div className="p-6 border-t">
//           <h2 className="font-semibold mb-4">Order Summary</h2>
//           <div className="flex gap-4">
//             <img src={product.image} alt={product.title} className="w-24 h-24 object-cover rounded border" />
//             <div>
//               <p className="font-medium line-clamp-2">{product.title}</p>
//               <p className="text-sm text-gray-600">Quantity: {quantity}</p>
//               <p className="text-sm text-gray-600">Price: Rs. {product.price}</p>
//             </div>
//           </div>
//         </div>

//         <div className="px-6 py-4 border-t bg-gray-50 flex justify-between text-lg font-bold">
//           <span>Total Amount</span>
//           <span className="text-orange-600">Rs. {totalAmount}</span>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ChevronRight, Banknote, Loader, ExternalLink } from 'lucide-react';

interface Product {
  image: string;
  title: string;
  price: number;
}

interface LocationState {
  product: Product;
  quantity: number;
  totalAmount: number;
}

export default function PaymentGateway() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, quantity, totalAmount } = location.state as LocationState;

  const MERCHANT_NAME = 'Mahaseth Mobile All Solution';
  const TERMINAL_ID = '2222610015419744';
  const MERCHANT_ADDRESS = 'Kshireshwarnath MC';

  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  // Generate unique transaction ID
  const generateTransactionId = () => {
    return `TXN${Date.now()}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  };

  // FonePay Web Payment URL - this is the main payment gateway
  const generateFonePayWebUrl = (): string => {
    const transactionId = generateTransactionId();
    const params = new URLSearchParams({
      PID: TERMINAL_ID,
      AMT: totalAmount.toString(),
      PRN: transactionId,
      BID: 'fonepay',
      MD: 'P',
      DT: new Date().toISOString().split('T')[0].replace(/-/g, ''),
      R1: encodeURIComponent(product.title),
      R2: encodeURIComponent(MERCHANT_NAME),
      RU: window.location.origin + '/payment-success',
    });
    return `https://fonepay.com/api/merchantRequest?${params.toString()}`;
  };

  // Khalti Web Checkout URL
  const generateKhaltiWebUrl = (): string => {
    const transactionId = generateTransactionId();
    const amountInPaisa = Math.floor(totalAmount * 100);
    // Khalti web checkout - opens payment page
    const params = new URLSearchParams({
      amount: amountInPaisa.toString(),
      product_identity: transactionId,
      product_name: product.title,
      merchant_name: MERCHANT_NAME,
      return_url: window.location.origin + '/payment-success',
    });
    return `https://pay.khalti.com/?${params.toString()}`;
  };

  // eSewa Web Payment URL
  const generateESewaWebUrl = (): string => {
    const transactionId = generateTransactionId();
    const params = new URLSearchParams({
      amt: totalAmount.toString(),
      psc: '0',
      pdc: '0',
      txAmt: '0',
      tAmt: totalAmount.toString(),
      pid: transactionId,
      scd: TERMINAL_ID,
      su: window.location.origin + '/payment-success',
      fu: window.location.origin + '/payment-failed',
    });
    return `https://esewa.com.np/epay/main?${params.toString()}`;
  };

  // Detect if user is on mobile
  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);

  // Try deep link first on mobile, fallback to web
  const initiatePayment = (method: string, webUrl: string, deepLink?: string) => {
    setSelectedMethod(method);
    setIsProcessing(true);

    if (isMobile && deepLink) {
      // On mobile, try deep link first
      const startTime = Date.now();
      
      // Create hidden iframe to try deep link
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = deepLink;
      document.body.appendChild(iframe);

      // If deep link doesn't work within 1.5s, open web URL
      setTimeout(() => {
        document.body.removeChild(iframe);
        // Check if we're still on this page (deep link didn't work)
        if (Date.now() - startTime < 2000) {
          window.open(webUrl, '_blank');
        }
        setIsProcessing(false);
      }, 1500);
    } else {
      // On desktop or if no deep link, open web URL directly
      window.open(webUrl, '_blank');
      setTimeout(() => setIsProcessing(false), 1000);
    }
  };

  const handleKhalti = () => {
    const deepLink = `khalti://pay?amount=${Math.floor(totalAmount * 100)}&transaction_uuid=${Date.now()}&product_name=${encodeURIComponent(product.title)}&merchant_name=${encodeURIComponent(MERCHANT_NAME)}`;
    initiatePayment('Khalti', generateKhaltiWebUrl(), deepLink);
  };

  const handleESewa = () => {
    const deepLink = `esewa://pay?amount=${totalAmount}&ref_id=${Date.now()}&product_name=${encodeURIComponent(product.title)}&merchant=${encodeURIComponent(MERCHANT_NAME)}`;
    initiatePayment('eSewa', generateESewaWebUrl(), deepLink);
  };

  const handleFonePay = () => {
    initiatePayment('FonePay', generateFonePayWebUrl());
  };

  const handleCOD = () => {
    alert('Order placed successfully with Cash on Delivery!');
    navigate('/');
  };

  const paymentMethods = [
    {
      id: 'fonepay',
      name: 'FonePay',
      subtitle: 'Pay with any bank or wallet via FonePay',
      icon: 'https://www.fonepay.com/assets/img/logo.png',
      action: handleFonePay,
      recommended: true,
    },
    {
      id: 'khalti',
      name: 'Khalti',
      subtitle: isMobile ? 'Opens Khalti app' : 'Pay via Khalti web checkout',
      icon: 'https://khalti.s3.amazonaws.com/image/KHT.png',
      action: handleKhalti,
    },
    {
      id: 'esewa',
      name: 'eSewa',
      subtitle: isMobile ? 'Opens eSewa app' : 'Pay via eSewa web checkout',
      icon: 'https://esewa.com.np/assets/esewa_og.png',
      action: handleESewa,
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      subtitle: 'Pay when product arrives',
      icon: null,
      action: handleCOD,
    },
  ];

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-lg shadow p-8 text-center">
          <div className="flex justify-center mb-6">
            <Loader className="w-12 h-12 text-orange-600 animate-spin" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Opening {selectedMethod}</h2>
          <p className="text-gray-600 mb-4">
            {isMobile 
              ? 'Complete the payment in the app or browser tab.' 
              : 'A new tab will open. Complete the payment there.'}
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-semibold">Rs. {totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Merchant:</span>
              <span className="font-semibold text-sm">{MERCHANT_NAME}</span>
            </div>
          </div>

          <button
            onClick={() => setIsProcessing(false)}
            className="w-full bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
          >
            Back to Payment Methods
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow">
        <div className="border-b px-6 py-4">
          <h1 className="text-2xl font-bold">Select Payment Method</h1>
          <p className="text-sm text-gray-600 mt-1">All payments credited to: {MERCHANT_NAME}</p>
        </div>

        <div className="divide-y">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={method.action}
              className={`w-full flex items-center justify-between px-6 py-5 hover:bg-gray-100 transition ${
                method.recommended ? 'bg-green-50 hover:bg-green-100' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-100 rounded flex items-center justify-center">
                  {method.icon ? (
                    <img src={method.icon} alt={method.name} className="w-10 h-10 object-contain" />
                  ) : (
                    <Banknote className="w-8 h-8 text-gray-600" />
                  )}
                </div>

                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{method.name}</h3>
                    {method.recommended && (
                      <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded">Recommended</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    {method.subtitle}
                    {method.id !== 'cod' && <ExternalLink className="w-3 h-3" />}
                  </p>
                </div>
              </div>

              <ChevronRight className="text-gray-400" />
            </button>
          ))}
        </div>

        <div className="p-6 border-t">
          <h2 className="font-semibold mb-4">Order Summary</h2>
          <div className="flex gap-4">
            <img src={product.image} alt={product.title} className="w-24 h-24 object-cover rounded border" />
            <div>
              <p className="font-medium line-clamp-2">{product.title}</p>
              <p className="text-sm text-gray-600">Quantity: {quantity}</p>
              <p className="text-sm text-gray-600">Price: Rs. {product.price}</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t bg-gray-50 flex justify-between text-lg font-bold">
          <span>Total Amount</span>
          <span className="text-orange-600">Rs. {totalAmount}</span>
        </div>
      </div>
    </div>
  );
}
