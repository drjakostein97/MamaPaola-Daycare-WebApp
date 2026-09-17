import { describe, it, expect, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useAsyncForm } from './useAsyncForm';
import type { ApiResult } from '../services/types';

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((res) => {
    resolve = res;
  });
  return { promise, resolve };
}

describe('useAsyncForm', () => {
  it('starts idle with no error', () => {
    const { result } = renderHook(() => useAsyncForm(vi.fn()));

    expect(result.current.status).toBe('idle');
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('transitions to loading before the submit promise resolves', async () => {
    const { promise, resolve } = deferred<ApiResult<null>>();
    const submitFn = vi.fn().mockReturnValue(promise);
    const { result } = renderHook(() => useAsyncForm(submitFn));

    act(() => {
      void result.current.submit(null);
    });

    await waitFor(() => expect(result.current.status).toBe('loading'));
    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      resolve({ success: true, data: null });
      await promise;
    });
  });

  it('sets status to success when submitFn resolves successfully', async () => {
    const submitFn = vi.fn().mockResolvedValue({ success: true, data: null } as ApiResult<null>);
    const { result } = renderHook(() => useAsyncForm(submitFn));

    await act(async () => {
      await result.current.submit(null);
    });

    expect(result.current.status).toBe('success');
    expect(result.current.error).toBeNull();
  });

  it('sets status to error and shows the explicit error message on failure', async () => {
    const submitFn = vi.fn().mockResolvedValue({ success: false, error: 'Bad request' } as ApiResult<null>);
    const { result } = renderHook(() => useAsyncForm(submitFn));

    await act(async () => {
      await result.current.submit(null);
    });

    expect(result.current.status).toBe('error');
    expect(result.current.error).toBe('Bad request');
  });

  it('falls back to a generic error message when none is provided', async () => {
    const submitFn = vi.fn().mockResolvedValue({ success: false } as ApiResult<null>);
    const { result } = renderHook(() => useAsyncForm(submitFn));

    await act(async () => {
      await result.current.submit(null);
    });

    expect(result.current.status).toBe('error');
    expect(result.current.error).toBe('Something went wrong. Please try again.');
  });

  it('reset() returns to idle and clears the error', async () => {
    const submitFn = vi.fn().mockResolvedValue({ success: false, error: 'Bad request' } as ApiResult<null>);
    const { result } = renderHook(() => useAsyncForm(submitFn));

    await act(async () => {
      await result.current.submit(null);
    });
    expect(result.current.status).toBe('error');

    act(() => {
      result.current.reset();
    });

    expect(result.current.status).toBe('idle');
    expect(result.current.error).toBeNull();
  });
});
