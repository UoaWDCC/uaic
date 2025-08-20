// app/api/delete-user/route.ts
import { client } from '@/lib/auth';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

interface DeleteUserRequest {
  userId: string;
  userEmail: string;
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId, userEmail }: DeleteUserRequest = await request.json();
    
    // Validate the email domain
    if (userEmail.split('@')[1] !== 'aucklanduni.ac.nz') {
      const db = client.db(); // Uses default database
      
      // Delete user from the user collection
      const result = await db.collection('user').deleteOne({ 
        _id: new ObjectId(userId)
      });
      
      return NextResponse.json({ 
        success: true, 
        message: 'User deleted successfully',
        deletedCount: result.deletedCount 
      });
    }
    
    return NextResponse.json({ 
      success: false, 
      message: 'User has valid email domain' 
    });
    
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to delete user',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}