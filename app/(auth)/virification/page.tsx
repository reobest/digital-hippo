// app/(auth)/verification/page.tsx
import { Suspense } from 'react';
import Verification from '@/components/Verification';// Adjust the import path as needed

export default function VerificationPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Verification />
    </Suspense>
  );
}



