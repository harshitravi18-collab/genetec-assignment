import { createMockEvents } from '../utils/createMockEvents';
import type { DemoEvent } from '../types';

const STORAGE_KEY = 'genetec-demo-events';

const wait = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

const sortEvents = (items: DemoEvent[]) =>
  [...items].sort((a, b) => a.date.localeCompare(b.date));

const loadInitialEvents = (): DemoEvent[] => {
  if (typeof window === 'undefined') {
    return createMockEvents(120);
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEY);

  if (!storedValue) {
    const seededEvents = createMockEvents(120);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seededEvents));
    return seededEvents;
  }

  try {
    const parsed = JSON.parse(storedValue) as DemoEvent[];
    return sortEvents(parsed);
  } catch {
    const seededEvents = createMockEvents(120);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seededEvents));
    return seededEvents;
  }
};

const persistEvents = (items: DemoEvent[]) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
};

let events: DemoEvent[] = loadInitialEvents();

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

    events = sortEvents([...events, newEvent]);
    persistEvents(events);

    return newEvent;
  },

  async update(
    id: string,
    input: Partial<Omit<DemoEvent, 'id'>>,
  ): Promise<DemoEvent> {
    await wait();

    let updatedEvent: DemoEvent | null = null;

    events = events.map((event) => {
      if (event.id !== id) {
        return event;
      }

      updatedEvent = {
        ...event,
        ...input,
      };

      return updatedEvent;
    });

    if (!updatedEvent) {
      throw new Error('Event not found');
    }

    events = sortEvents(events);
    persistEvents(events);

    return updatedEvent;
  },

  reset(): void {
    events = createMockEvents(120);
    persistEvents(events);
  },
};
