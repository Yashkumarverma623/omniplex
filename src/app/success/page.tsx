export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Payment Successful! ✅
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase of the Pro Plan.
        </p>
        <a 
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
}