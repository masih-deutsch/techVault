"use client";

import { Suspense, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import LibList from './LibList';


export default function ToastWrapper({ libPromise }) {

  const hasToasted = useRef(false);

  useEffect(() => {
    if (!hasToasted.current) {
      toast.promise(libPromise, {
        loading: "Fetching libraries data...",
        success: (data) => {
          return {
            message: `Successfully retrieved ${data.length} libraries`,
            description: 'The library list has been updated.',
          };
        },
        error: 'Failed to connect to the server',
      });

      hasToasted.current = true;
    }
  }, [libPromise]);



  return (

    <Suspense fallback={<div className="animate-pulse text-cyan-500">Loading ... ⏳</div>}>
      <LibList libPromise={libPromise} />
    </Suspense>

  );
}