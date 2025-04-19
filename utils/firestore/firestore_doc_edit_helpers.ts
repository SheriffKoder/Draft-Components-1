// combines firestore_doc_edit_helpers.ts and getData.ts/setData.ts

import { getAuth } from 'firebase/auth';
import { 
  doc, 
  updateDoc, 
  collection, 
  getDoc, 
  addDoc, 
  serverTimestamp, 
  deleteDoc,
  query,
  where,
  getDocs,
  DocumentData,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/database/firebase';

/**
 * Firestore Document Operation Helpers
 * 
 * This module provides a comprehensive set of utilities for interacting with Firestore documents.
 * It implements CRUD operations with built-in error handling, authentication checks, and timestamp management.
 * 
 * Key features:
 * - Supports both direct document ID and query-based operations
 * - Handles nested subcollections
 * - Automatically adds userId and timestamps to documents
 * - Provides consistent error handling across all operations
 * - Type-safe interfaces for operation parameters
 */

// Updated Types
interface BaseParams {
  collectionName: string;
  docId?: string;
  subCollectionName?: string;
}

interface DocumentParams extends BaseParams {
  data: any;
}

interface QueryParams extends BaseParams {
  field: string;
  value: any;
}

/**
 * Generic error handler for Firestore operations
 * Wraps any Firestore operation in a try-catch block and provides consistent error handling
 * @param operation - Async function to execute
 * @returns Promise resolving to the operation result
 */
const handleFirestoreOperation = async <T>(operation: () => Promise<T>): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    console.error('Firestore operation failed:', error);
    throw error;
  }
};

/**
 * Retrieves information about the current authenticated user
 * @param field - Optional specific field to return ('id' for uid, 'email' for email)
 * @returns The requested field value, or the entire user object if field not specified
 * @throws Error if user is not authenticated
 */
const getCurrentUser = (field?: string) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');
  
  switch (field?.toLowerCase()) {
    case 'id':
      return user.uid;
    case 'email':
      return user.email;
    default:
      return user;
  }
};

/**
 * Enriches document data with standard fields
 * Adds userId, createdAt, and updatedAt timestamps to the document
 * @param data - Original document data
 * @param userId - Current user's ID
 * @returns Enriched document data with standard fields
 */
const addStandardFields = (data: any, userId: string) => ({
  ...data,
  userId,
  updatedAt: serverTimestamp(),
  createdAt: serverTimestamp()
});

/**
 * Creates a new document in Firestore
 * Can create documents in both top-level collections and subcollections
 * Automatically adds standard fields (userId, timestamps) and document ID
 * 
 * @param params.collectionName - Name of the collection
 * @param params.subCollectionName - Optional subcollection name
 * @param params.docId - Parent document ID for subcollection documents
 * @param params.data - Document data to store
 * @returns Promise resolving to the new document's ID
 */
export const createDocument = async ({ 
  collectionName, 
  subCollectionName, 
  docId, 
  data 
}: DocumentParams): Promise<string> => {
  return handleFirestoreOperation(async () => {
    const userId = getCurrentUser('id') as string;
    const enrichedData = addStandardFields(data, userId);
    
    let collectionRef;
    if (subCollectionName && docId) {
      collectionRef = collection(doc(db, collectionName, docId), subCollectionName);
    } else {
      collectionRef = collection(db, collectionName);
    }
    
    const docRef = await addDoc(collectionRef, enrichedData);
    await updateDoc(docRef, { id: docRef.id });
    
    return docRef.id;
  });
};

/**
 * Retrieves a document from Firestore
 * Supports both direct document ID lookup and field-based queries
 * Can retrieve from both top-level collections and subcollections
 * 
 * @param params.collectionName - Name of the collection
 * @param params.subCollectionName - Optional subcollection name
 * @param params.docId - Document ID for direct lookup
 * @param params.field - Field name for query-based lookup
 * @param params.value - Field value for query-based lookup
 * @returns Promise resolving to the document data or null if not found
 */
export const getDocument = async ({ 
  collectionName, 
  subCollectionName, 
  docId,
  field, 
  value 
}: QueryParams): Promise<DocumentData | null> => {
  return handleFirestoreOperation(async () => {
    let collectionRef;
    if (subCollectionName && docId) {
      collectionRef = collection(doc(db, collectionName, docId), subCollectionName);
    } else {
      collectionRef = collection(db, collectionName);
    }

    if (field && value) {
      const q = query(collectionRef, where(field, '==', value));
      const snapshot = await getDocs(q);
      return snapshot.empty ? null : snapshot.docs[0].data();
    } else if (docId) {
      const docRef = doc(collectionRef, docId);
      const snapshot = await getDoc(docRef);
      return snapshot.exists() ? snapshot.data() : null;
    }
    return null;
  });
};

/**
 * Updates an existing document in Firestore
 * Supports both direct document ID updates and field-based query updates
 * Automatically updates the updatedAt timestamp
 * 
 * @param params.collectionName - Name of the collection
 * @param params.subCollectionName - Optional subcollection name
 * @param params.docId - Document ID for direct updates
 * @param params.field - Field name for query-based updates
 * @param params.value - Field value for query-based updates
 * @param params.data - Updated document data
 * @throws Error if neither docId nor field/value pair is provided
 */
export const updateDocument = async ({ 
  collectionName, 
  subCollectionName, 
  docId,
  field, 
  value,
  data 
}: DocumentParams & Partial<QueryParams>): Promise<void> => {
  return handleFirestoreOperation(async () => {
    let collectionRef;
    if (subCollectionName && docId) {
      collectionRef = collection(doc(db, collectionName, docId), subCollectionName);
    } else {
      collectionRef = collection(db, collectionName);
    }

    if (field && value) {
      const q = query(collectionRef, where(field, '==', value));
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        const docRef = snapshot.docs[0].ref;
        await updateDoc(docRef, {
          ...data,
          updatedAt: serverTimestamp()
        });
      }
    } else if (docId) {
      const docRef = doc(collectionRef, docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } else {
      throw new Error('Either field/value pair or docId is required for updates');
    }
  });
};

/**
 * Deletes a document from Firestore
 * Supports both direct document ID deletion and field-based query deletion
 * 
 * @param params.collectionName - Name of the collection
 * @param params.subCollectionName - Optional subcollection name
 * @param params.docId - Document ID for direct deletion
 * @param params.field - Field name for query-based deletion
 * @param params.value - Field value for query-based deletion
 * @throws Error if neither docId nor field/value pair is provided
 */
export const deleteDocument = async ({ 
  collectionName, 
  subCollectionName, 
  docId,
  field,
  value 
}: BaseParams & Partial<QueryParams>): Promise<void> => {
  return handleFirestoreOperation(async () => {
    let collectionRef;
    if (subCollectionName && docId) {
      collectionRef = collection(doc(db, collectionName, docId), subCollectionName);
    } else {
      collectionRef = collection(db, collectionName);
    }

    if (field && value) {
      const q = query(collectionRef, where(field, '==', value));
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        await deleteDoc(snapshot.docs[0].ref);
      }
    } else if (docId) {
      const docRef = doc(collectionRef, docId);
      await deleteDoc(docRef);
    } else {
      throw new Error('Either field/value pair or docId is required for deletion');
    }
  });
};

/*
// How to use this file

//////////////////////////////
// Create
//////////////////////////////


// Create a document
await createDocument({
  collectionName: 'users',
  data: { name: 'John' }
});

// Create a document in a subcollection
await createDocument({
  collectionName: 'users',
  docId: 'userId',
  subCollectionName: 'reviews',
  data: { text: 'Great!' }
});

//////////////////////////////
// Get
//////////////////////////////

// Get a document by ID
await getDocument({
  collectionName: 'users',
  docId: 'userId'
});

// Get a document by query
await getDocument({
  collectionName: 'users',
  field: 'email',
  value: 'john@example.com'
});

//////////////////////////////
// Update
//////////////////////////////

// Update by field/value
await updateDocument({
  collectionName: 'users',
  field: 'email',
  value: 'john@example.com',
  data: { name: 'John Updated' }
});

// Still supports docId if needed
await updateDocument({
  collectionName: 'users',
  docId: 'userId',
  data: { name: 'John Updated' }
});

//////////////////////////////
// Delete
//////////////////////////////

// Delete by field/value
await deleteDocument({
  collectionName: 'users',
  field: 'email',
  value: 'john@example.com'
});




*/


// convert a timestamp to a date string with the format YYYY-MM-DD HH:MM
export function getStringDateFromTimeStamp(InputTimeStamp: Timestamp | null | undefined) {
  if (!InputTimeStamp) return 'Not available';
  
  try {
    const timestamp = InputTimeStamp.toDate();
    return `${timestamp.toISOString().split('T')[0]} ${timestamp.getHours().toString().padStart(2, '0')}:${timestamp.getMinutes().toString().padStart(2, '0')}`;
  } catch (error) {
    return 'Invalid date';
  }
}

//// create a timestamp for the updatedAt field
// updatedAt: Timestamp.now(),
//// convert the date string to a timestamp for the createdAt field
// createdAt: Timestamp.fromDate(new Date(formData.createdAt)),
//// convert the timestamp to a date string to be used in the date picker
// createdAt: initialData.createdAt.toDate().toISOString().split('T')[0],