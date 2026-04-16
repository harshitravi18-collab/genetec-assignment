import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEvent } from '../api/eventsApi';
import { EVENTS_QUERY_KEY } from './useEventShowcase';

export const useCreateEventMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEvent,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: EVENTS_QUERY_KEY,
      });
    },
  });
};
