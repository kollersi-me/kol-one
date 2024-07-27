import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import siteConfig from '../../config/site.config';
import Navbar from '../components/Navbar';
import FileListing from '../components/FileListing';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import SwitchLayout from '../components/SwitchLayout';

export default function Folders() {
  const router = useRouter();
  const { query } = router;
  const [cookies, setCookie] = useCookies(['validated']);

  useEffect(() => {
    if (!cookies.validated) {
      const redirectUrl = encodeURIComponent(router.asPath);
      router.push(`/input_access_code?redirect=${redirectUrl}`);
    }
  }, [cookies, router]);

  if (!cookies.validated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-900">
        <Head>
          <title>Loading...</title>
        </Head>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-900">
      <Head>
        <title>Folders - {siteConfig.title}</title>
      </Head>
      <main className="flex w-full flex-1 flex-col bg-gray-50 dark:bg-gray-800">
        <Navbar />
        <div className="mx-auto w-full max-w-5xl py-4 sm:p-4">
          <nav className="mb-4 flex items-center justify-between space-x-3 px-4 sm:px-0 sm:pl-1">
            <SwitchLayout />
          </nav>
          <FileListing query={query} />
        </div>
      </main>
      <Footer />
    </div>
  );
}