import UserInfo from '@/components/UserInfo';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>
        <UserInfo />
      </div>
    </div>
  );
}