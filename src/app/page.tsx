import { redirect } from 'next/navigation';

// This page only redirects to the preferred locale.
export default function RootPage() {
  redirect('/en');
}
