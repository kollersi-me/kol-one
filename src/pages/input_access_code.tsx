import { useState } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import Head from 'next/head';
import apiConfig from '../../config/api.config';

export const runtime = 'experimental-edge';

export default function InputAccessCode() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [cookies, setCookie] = useCookies(['validated']);
  const router = useRouter();
  const { redirect } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    try {
      const response = await fetch(apiConfig.kollersiApi);
      const result = await response.json();

      if (result.success && code === result.data.trim()) { // Trim để loại bỏ khoảng trắng
        setCookie('validated', 'true', { path: '/', maxAge: 604800 });
        const redirectUrl = redirect ? decodeURIComponent(redirect as string) : '/';
        router.push(redirectUrl);
      } else {
        setError('Invalid code');
      }
    } catch (err) {
      console.error('Error validating code:', err);
      setError('Error validating code');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-900">
      <Head>
        <title>Enter Access Code</title>
      </Head>
      <img style={{ width: '300px' }} src="https://kollersi.com/logo.png" />
      <form onSubmit={handleSubmit}>
        <input
          style={{
            width: '300px',
            borderRadius: '5px',
            textAlign: 'center',
            border: '0px',
            backgroundColor: '#f5f5f5',
            fontSize: '18px',
            padding: '10px',
          }}
          type="text"
          placeholder="Enter the access code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button
          style={{
            marginBottom: '30px',
            marginTop: '30px',
            borderRadius: '5px',
            width: '100px',
            height: '40px',
            backgroundColor: 'black',
            color: 'white',
          }}
          type="submit"
        >
          Submit
        </button>
        <br />
        <label style={{ fontSize: '12px', marginTop: '20px', color: 'black' }}>
          Get access code <a target="_blank" href="https://kollersi.com">https://kollersi.com</a>
        </label>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}