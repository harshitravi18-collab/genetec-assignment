import dayjs from 'dayjs';
import type { DemoEvent, DemoEventCategory } from '../types';

const eventTitlesByCategory: Record<DemoEventCategory, string[]> = {
  meeting: [
    'Team Sync',
    'Stakeholder Check-in',
    'Project Planning',
    'Design Review',
    'Sprint Kickoff',
  ],
  workshop: [
    'Accessibility Workshop',
    'Frontend Architecture Workshop',
    'Discovery Session',
    'UX Alignment Workshop',
    'Process Improvement Workshop',
  ],
  deadline: [
    'Release Deadline',
    'Content Freeze',
    'QA Sign-off',
    'Deployment Cutoff',
    'Submission Deadline',
  ],
  presentation: [
    'Sprint Demo',
    'Client Presentation',
    'Roadmap Review',
    'Progress Update',
    'Quarterly Showcase',
  ],
  training: [
    'React Training',
    'TypeScript Deep Dive',
    'Testing Session',
    'Onboarding Session',
    'Design System Training',
  ],
};

const locations = [
  'Copenhagen Office',
  'Aarhus Office',
  'Remote',
  'Meeting Room Atlas',
  'Meeting Room Nord',
  'Online - Teams',
  'Online - Meet',
];

const descriptions = [
  'Review progress, blockers, and next steps.',
  'Align stakeholders on scope and delivery expectations.',
  'Discuss implementation details and open questions.',
  'Walk through updates and gather feedback.',
  'Prepare for the next milestone and confirm ownership.',
  'Coordinate cross-functional work and dependencies.',
];

const categories: DemoEventCategory[] = [
  'meeting',
  'workshop',
  'deadline',
  'presentation',
  'training',
];

const getCategoryForIndex = (index: number): DemoEventCategory =>
  categories[index % categories.length];

const getTitle = (category: DemoEventCategory, index: number) => {
  const titles = eventTitlesByCategory[category];
  return titles[index % titles.length];
};

const getLocation = (index: number) => locations[index % locations.length];

const getDescription = (index: number) =>
  descriptions[index % descriptions.length];

export const createMockEvents = (count = 120): DemoEvent[] => {
  const startDate = dayjs().startOf('day').subtract(18, 'day');

  return Array.from({ length: count }, (_, index) => {
    const category = getCategoryForIndex(index);
    const dayOffset = Math.floor(index / 4);
    const hour = 9 + (index % 4) * 2;
    const minute = index % 2 === 0 ? 0 : 30;

    const date = startDate
      .add(dayOffset, 'day')
      .hour(hour)
      .minute(minute)
      .second(0)
      .millisecond(0);

    return {
      id: `event-${index + 1}`,
      title: `${getTitle(category, index)} ${index + 1}`,
      date: date.toISOString(),
      description: getDescription(index),
      location: getLocation(index),
      category,
    };
  }).sort((left, right) => left.date.localeCompare(right.date));
};
