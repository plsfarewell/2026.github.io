export interface Photo {
  id: string;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: 'farewell-day',
    name: 'Farewell Day',
    description: 'The day we said goodbye, but not forever'
  },
  {
    id: 'classroom-moments',
    name: 'Classroom Moments',
    description: 'Where we laughed, learned, and grew together'
  },
  {
    id: 'events',
    name: 'Events & Celebrations',
    description: 'Every celebration that brought us closer'
  },
  {
    id: 'friends',
    name: 'Friends Forever',
    description: 'The bonds that time cannot break'
  }
];

// Placeholder photos using picsum for demonstration
// Replace with actual photos in production
export const photos: Photo[] = [
  // Farewell Day
  { id: '1', src: 'https://picsum.photos/seed/farewell1/800/1200', alt: 'Group photo at farewell', category: 'farewell-day', width: 800, height: 1200 },
  { id: '2', src: 'https://picsum.photos/seed/farewell2/1200/800', alt: 'Stage performance', category: 'farewell-day', width: 1200, height: 800 },
  { id: '3', src: 'https://picsum.photos/seed/farewell3/800/800', alt: 'Farewell decorations', category: 'farewell-day', width: 800, height: 800 },
  { id: '4', src: 'https://picsum.photos/seed/farewell4/1000/1400', alt: 'Students celebrating', category: 'farewell-day', width: 1000, height: 1400 },
  { id: '5', src: 'https://picsum.photos/seed/farewell5/1200/900', alt: 'Award ceremony', category: 'farewell-day', width: 1200, height: 900 },
  { id: '6', src: 'https://picsum.photos/seed/farewell6/900/1200', alt: 'Emotional moments', category: 'farewell-day', width: 900, height: 1200 },
  
  // Classroom Moments
  { id: '7', src: 'https://picsum.photos/seed/class1/1200/800', alt: 'Classroom discussion', category: 'classroom-moments', width: 1200, height: 800 },
  { id: '8', src: 'https://picsum.photos/seed/class2/800/1000', alt: 'Study group', category: 'classroom-moments', width: 800, height: 1000 },
  { id: '9', src: 'https://picsum.photos/seed/class3/1000/800', alt: 'Lab experiment', category: 'classroom-moments', width: 1000, height: 800 },
  { id: '10', src: 'https://picsum.photos/seed/class4/900/1200', alt: 'Reading session', category: 'classroom-moments', width: 900, height: 1200 },
  { id: '11', src: 'https://picsum.photos/seed/class5/1200/1000', alt: 'Project presentation', category: 'classroom-moments', width: 1200, height: 1000 },
  { id: '12', src: 'https://picsum.photos/seed/class6/800/900', alt: 'Teacher with students', category: 'classroom-moments', width: 800, height: 900 },
  
  // Events & Celebrations
  { id: '13', src: 'https://picsum.photos/seed/event1/1200/800', alt: 'Annual day performance', category: 'events', width: 1200, height: 800 },
  { id: '14', src: 'https://picsum.photos/seed/event2/900/1300', alt: 'Sports day', category: 'events', width: 900, height: 1300 },
  { id: '15', src: 'https://picsum.photos/seed/event3/1100/800', alt: 'Cultural fest', category: 'events', width: 1100, height: 800 },
  { id: '16', src: 'https://picsum.photos/seed/event4/800/1100', alt: 'Prize distribution', category: 'events', width: 800, height: 1100 },
  { id: '17', src: 'https://picsum.photos/seed/event5/1200/900', alt: 'School trip', category: 'events', width: 1200, height: 900 },
  { id: '18', src: 'https://picsum.photos/seed/event6/1000/1000', alt: 'Festival celebration', category: 'events', width: 1000, height: 1000 },
  
  // Friends Forever
  { id: '19', src: 'https://picsum.photos/seed/friends1/800/1200', alt: 'Best friends together', category: 'friends', width: 800, height: 1200 },
  { id: '20', src: 'https://picsum.photos/seed/friends2/1200/800', alt: 'Lunch break memories', category: 'friends', width: 1200, height: 800 },
  { id: '21', src: 'https://picsum.photos/seed/friends3/900/900', alt: 'Group selfie', category: 'friends', width: 900, height: 900 },
  { id: '22', src: 'https://picsum.photos/seed/friends4/1000/1400', alt: 'Candid moment', category: 'friends', width: 1000, height: 1400 },
  { id: '23', src: 'https://picsum.photos/seed/friends5/1100/800', alt: 'Playground fun', category: 'friends', width: 1100, height: 800 },
  { id: '24', src: 'https://picsum.photos/seed/friends6/850/1150', alt: 'Library study session', category: 'friends', width: 850, height: 1150 },
];

export const heroImages = [
  'https://picsum.photos/seed/hero1/1920/1080',
  'https://picsum.photos/seed/hero2/1920/1080',
  'https://picsum.photos/seed/hero3/1920/1080',
  'https://picsum.photos/seed/hero4/1920/1080',
  'https://picsum.photos/seed/hero5/1920/1080',
];

export function getPhotosByCategory(categoryId: string): Photo[] {
  return photos.filter(photo => photo.category === categoryId);
}
