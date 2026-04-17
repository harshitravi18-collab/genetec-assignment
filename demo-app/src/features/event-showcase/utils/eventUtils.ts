export const getEventColor = (
  category: string,
): 'blue' | 'red' | 'green' | 'gray' => {
  switch (category) {
    case 'meeting':
      return 'blue';
    case 'workshop':
      return 'green';
    case 'deadline':
      return 'red';
    case 'presentation':
      return 'gray';
    case 'training':
      return 'blue';
    default:
      return 'gray';
  }
};
