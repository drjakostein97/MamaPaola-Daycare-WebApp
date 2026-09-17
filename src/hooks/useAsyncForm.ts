import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { ApiResult } from '../services/types';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function useAsyncForm<TPayload, TData>(
  submitFn: (payload: TPayload) => Promise<ApiResult<TData>>,
) {
  const { t } = useTranslation();
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
        setError(result.error ?? t('forms.shared.genericError'));
      }
      return result;
    },
    [submitFn, t],
  );

  const reset = useCallback(() => {
    setStatus('idle');
    setError(null);
  }, []);

  return { status, error, submit, reset, isLoading: status === 'loading' };
}
