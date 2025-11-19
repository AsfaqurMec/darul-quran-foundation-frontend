export default function PaymentUnsuccessfulPage(): JSX.Element {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-xl w-full rounded-2xl border border-red-200 bg-white p-8 text-center shadow">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-red-600 mb-2">দুঃখিত!</h1>
        <p className="text-xl font-semibold mb-4">অনুদান বাতিল হয়েছে</p>
        <p className="text-gray-600 mb-6">
          আপনার অনুদানের লেনদেনটি সফল হয়নি। দয়া করে তথ্য যাচাই করে আবার চেষ্টা করুন। সমস্যা চলতে থাকলে আমাদের সাথে যোগাযোগ করুন।
        </p>
        <div className="flex flex-col gap-3">
          <a
            href="/donation"
            className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            পুনরায় চেষ্টা করুন
          </a>
          <div className="text-left border-t pt-4 mt-2">
            <h3 className="font-semibold mb-2">যোগাযোগ</h3>
            <p className="text-gray-700">
              হটলাইন: <a className="underline" href="tel:+8809610001089">+880-9610001089</a>
              <br />
              ইমেইল: <a className="underline" href="mailto:contact@assunnahfoundation.org">contact@assunnahfoundation.org</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


