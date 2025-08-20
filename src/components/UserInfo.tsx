'use client';

import { useSession, signOut } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface DeleteUserResponse {
  success: boolean;
  message: string;
}

export default function UserInfo() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [invalidEmail, setInvalidEmail] = useState(false);

  useEffect(() => {
    const deleteInvalidUser = async (): Promise<void> => {
      if (session && session.user.email.split('@')[1] !== 'aucklanduni.ac.nz') {
        setInvalidEmail(true);
        try {
          const response = await fetch('/api/delete-user', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: session.user.id,
              userEmail: session.user.email
            }),
          });

          const result: DeleteUserResponse = await response.json();
          
          if (result.success) {
            await signOut();
          } else {
            console.error('Failed to delete user:', result.message);
          }
          
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      }
    };

    deleteInvalidUser();
  }, [session, router]);

  if (isPending) {
    return <div className="text-center">Loading...</div>;
  }

  const handleSignOut = async () => {
    await signOut();  
  };

  if (session && session.user.email.split('@')[1] === 'aucklanduni.ac.nz') {
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
  } else {
    return (
      <div className="text-center">
        <p className="mb-4">You are not signed in.</p>
        {invalidEmail && (
          <p className="text-center text-red-700 mb-4">
           Only Auckland University email addresses are allowed. Please try again using your University email.
          </p>
        )}
        <Link 
          href="/login" 
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sign In
        </Link>
    </div>
    );
  }
}