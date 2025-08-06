'use client';

import { useSession, signOut } from '@/lib/auth-client';

export default function UserInfo() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div className="text-center">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="text-center">
        <p className="mb-4">You are not signed in.</p>
        <a 
          href="/login" 
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sign In
        </a>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">User Profile</h2>
      
      <div className="space-y-3">
        <div>
          <strong>Name:</strong> {session.user.name || 'Not provided'}
        </div>
        <div>
          <strong>Email:</strong> {session.user.email}
        </div>
        <div>
          <strong>User ID:</strong> {session.user.id}
        </div>
      </div>

      <button
        onClick={handleSignOut}
        className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Sign Out
      </button>
    </div>
  );
}