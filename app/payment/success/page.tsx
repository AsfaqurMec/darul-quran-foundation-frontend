export default function PaymentSuccessPage(): JSX.Element {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-xl w-full rounded-2xl border border-emerald-200 bg-white p-8 text-center shadow">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mb-2">আলহামদুলিল্লাহ!</h1>
        <p className="text-xl font-semibold mb-4">পেমেন্ট সফল হয়েছে</p>
        <p className="text-gray-600 mb-6">
          আপনার অনুদান সফলভাবে সম্পন্ন হয়েছে। জাযাকাল্লাহু খাইরান।
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          হোমে ফিরে যান
        </a>
      </div>
    </div>
  );
}


