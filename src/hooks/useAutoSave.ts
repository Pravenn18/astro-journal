import { useRef, useCallback } from 'react';

interface UseAutoSaveOptions {
  delay?: number;
  onSave: () => void;
  enabled?: boolean;
}

export const useAutoSave = ({ 
  delay = 2000, 
  onSave, 
  enabled = true 
}: UseAutoSaveOptions) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerAutoSave = useCallback(() => {
    if (!enabled) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onSave();
    }, delay);
  }, [delay, onSave, enabled]);

  const clearAutoSave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const forceSave = useCallback(() => {
    clearAutoSave();
    onSave();
  }, [clearAutoSave, onSave]);

  return {
    triggerAutoSave,
    clearAutoSave,
    forceSave,
  };
};
