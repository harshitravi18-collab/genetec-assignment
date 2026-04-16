import { useQuery } from '@tanstack/react-query';
import { getEvents } from '../api/eventsApi';

export const EVENTS_QUERY_KEY = ['events'];

export const useEventsQuery = () => {
  return useQuery({
    queryKey: EVENTS_QUERY_KEY,
    queryFn: getEvents,
  });
};
