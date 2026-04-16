import { http, HttpResponse } from 'msw';
import { eventsStore } from '../features/event-showcase/api/eventsStore';

export const handlers = [
  http.get('/api/events', async () => {
    const events = await eventsStore.getAll();

    return HttpResponse.json({
      data: events,
    });
  }),

  http.post('/api/events', async ({ request }) => {
    const body = (await request.json()) as {
      title: string;
      date: string;
      description?: string;
      location?: string;
      category:
        | 'meeting'
        | 'workshop'
        | 'deadline'
        | 'presentation'
        | 'training';
    };

    const event = await eventsStore.create(body);

    return HttpResponse.json(
      {
        data: event,
      },
      { status: 201 },
    );
  }),
];
