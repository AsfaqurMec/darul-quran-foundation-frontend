import Sidebar from '../../components/admin/Sidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import ConfirmDialogProvider from '../../components/common/ConfirmDialogProvider';
import { getCurrentUser } from '../../services/AuthService/server';
import { redirect } from 'next/navigation';

// Force dynamic rendering since we use cookies for authentication
export const dynamic = 'force-dynamic';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const identifier =
    (typeof user.identifier === 'string' && user.identifier) ||
    (typeof user.email === 'string' && user.email) ||
    'User';

  const role = typeof user.role === 'string' ? user.role : 'user';

  return (
    <div className="min-h-screen grid grid-cols-[auto_1fr]">
      <Sidebar />
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <AdminHeader user={{ identifier, role }} />
        <ConfirmDialogProvider>
          <main className="p-4 md:p-6 flex-1">
            {children}
          </main>
        </ConfirmDialogProvider>
      </div>
    </div>
  );
}

