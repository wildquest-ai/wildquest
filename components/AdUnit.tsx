import React, { useEffect } from 'react';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'fluid';
  responsive?: 'true' | 'false';
  className?: string;
}

/**
 * AdUnit component for Google AdSense.
 * Replace 'ca-pub-XXXXXXXXXXXXXXXX' with your actual Publisher ID.
 */
export const AdUnit: React.FC<AdUnitProps> = ({ 
  slot, 
  format = 'auto', 
  responsive = 'true',
  className = ''
}) => {
  useEffect(() => {
    try {
      // Push the ad to the global adsbygoogle array
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className={`my-8 flex justify-center overflow-hidden w-full max-w-4xl mx-auto ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minWidth: '250px', minHeight: '90px' }}
        data-ad-client="ca-pub-2198295473651484" // REPLACE WITH YOUR PUBLISHER ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
};
