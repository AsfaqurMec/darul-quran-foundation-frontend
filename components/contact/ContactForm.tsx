import Button from '@/components/ui/button';

export default function ContactForm(): JSX.Element {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">আপনার নাম *</label>
        <input className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="লিখুন" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">আপনার ইমেইল *</label>
        <input className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="লিখুন" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">বিষয়</label>
        <input className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="লিখুন" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">বার্তা</label>
        <textarea rows={6} className="w-full rounded-lg border border-gray-300 px-3 py-2" placeholder="লিখুন" />
      </div>
      <Button type="submit">পাঠান</Button>
    </form>
  );
}


