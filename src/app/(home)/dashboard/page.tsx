import UserInfo from "@/components/UserInfo";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mb-8 text-center text-3xl font-bold">Dashboard</h1>
        <UserInfo />
      </div>
    </div>
  );
}
