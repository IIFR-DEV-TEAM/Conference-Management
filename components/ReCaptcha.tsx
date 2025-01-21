'use-client'

import { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface Props {
  onVerify: (token: string | null) => void;
}

const ReCaptcha = ({onVerify}:Props) =>{
  const captchaRef = useRef<ReCAPTCHA>(null);

  const handleChange = (token: string | null) => {
    onVerify(token);
  };
  return (
    <div className="my-4">
      <ReCAPTCHA
        ref={captchaRef}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        onChange={handleChange}
      />
    </div>
  );
}
export {ReCaptcha}