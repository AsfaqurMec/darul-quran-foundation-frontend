import Button from '@/components/ui/button';

export default function AdminProfile(): JSX.Element {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Profile info */}
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-3">Profile Information</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input className="w-full rounded-lg border px-3 py-2" placeholder="Admin Name" defaultValue="Admin" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" className="w-full rounded-lg border px-3 py-2" placeholder="admin@example.com" defaultValue="admin@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input className="w-full rounded-lg border px-3 py-2" placeholder="01xxxxxxxxx" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Avatar URL</label>
            <input className="w-full rounded-lg border px-3 py-2" placeholder="https://..." />
          </div>
          <div className="md:col-span-2 flex justify-end gap-2 mt-2">
            <Button variant="secondary" type="reset">Reset</Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>

      {/* Password update */}
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-3">Update Password</h2>
        <form className="grid grid-cols-1 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Current Password</label>
            <input type="password" className="w-full rounded-lg border px-3 py-2" placeholder="••••••••" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input type="password" className="w-full rounded-lg border px-3 py-2" placeholder="••••••••" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
            <input type="password" className="w-full rounded-lg border px-3 py-2" placeholder="••••••••" />
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="secondary" type="reset">Reset</Button>
            <Button type="submit">Update Password</Button>
          </div>
        </form>
      </div>
    </div>
  );
}


