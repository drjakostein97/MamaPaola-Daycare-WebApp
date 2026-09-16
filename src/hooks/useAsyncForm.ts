import { useState, useCallback } from 'react';
import type { ApiResult } from '../services/types';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function useAsyncForm<TPayload, TData>(
  submitFn: (payload: TPayload) => Promise<ApiResult<TData>>,
) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (payload: TPayload) => {
      setStatus('loading');
      setError(null);
      const result = await submitFn(payload);
      if (result.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setError(result.error ?? 'Something went wrong. Please try again.');
      }
      return result;
    },
    [submitFn],
  );

  const reset = useCallback(() => {
    setStatus('idle');
    setError(null);
  }, []);

  return { status, error, submit, reset, isLoading: status === 'loading' };
}
