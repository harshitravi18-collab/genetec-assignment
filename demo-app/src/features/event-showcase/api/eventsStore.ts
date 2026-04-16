import { createMockEvents } from '../utils/createMockEvents';
import type { DemoEvent } from '../types';

let events: DemoEvent[] = createMockEvents(120);

// simulate network delay
const wait = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const eventsStore = {
  async getAll(): Promise<DemoEvent[]> {
    await wait();
    return [...events];
  },

  async create(input: Omit<DemoEvent, 'id'>): Promise<DemoEvent> {
    await wait();

    const newEvent: DemoEvent = {
      ...input,
      id: `event-${Date.now()}`,
    };

    events = [...events, newEvent].sort((a, b) => a.date.localeCompare(b.date));

    return newEvent;
  },

  async update(
    id: string,
    input: Partial<Omit<DemoEvent, 'id'>>,
  ): Promise<DemoEvent> {
    await wait();

    let updatedEvent: DemoEvent | null = null;

    events = events.map((event) => {
      if (event.id !== id) return event;

      updatedEvent = {
        ...event,
        ...input,
      };

      return updatedEvent;
    });

    if (!updatedEvent) {
      throw new Error('Event not found');
    }

    events = [...events].sort((a, b) => a.date.localeCompare(b.date));

    return updatedEvent;
  },
};
