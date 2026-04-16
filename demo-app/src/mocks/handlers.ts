import { http, HttpResponse } from 'msw';
import { eventsStore } from '../features/event-showcase/api/eventsStore';

export const handlers = [
  http.get('/api/events', async () => {
    const events = await eventsStore.getAll();

    return HttpResponse.json({
      data: events,
    });
  }),
];
