'use client'

import { useEffect } from 'react'
import Script from 'next/script'

declare global {
  interface Window {
    grecaptcha: any;
    onRecaptchaLoad: () => void;
  }
}

interface ReCaptchaProps {
  onVerify: (token: string) => void;
}

export function ReCaptcha({ onVerify }: ReCaptchaProps) {
  useEffect(() => {
    window.onRecaptchaLoad = () => {
      window.grecaptcha.ready(() => {
        window.grecaptcha.render('recaptcha-container', {
          sitekey: 'YOUR_RECAPTCHA_SITE_KEY', // Replace with your actual site key
          callback: onVerify,
        });
      });
    };
  }, [onVerify]);

  return (
    <>
      <Script
        src="https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit"
        async
        defer
      />
      <div id="recaptcha-container" className="mt-4"></div>
    </>
  );
}

