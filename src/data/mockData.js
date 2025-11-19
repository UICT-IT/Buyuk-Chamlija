export const festivals = [
  {
    id: '1',
    name: 'Kermus Festival 2025',
    theme: 'Celebration of Culture',
    isActive: true,
    startDate: '2025-11-20',
    endDate: '2025-11-22',
    location: 'Central Park',
    operatingHours: '10:00 AM - 10:00 PM',
    entranceFeeAdult: '$15',
    entranceFeeChild: '$5',
  },
  {
    id: '2',
    name: 'Spring Fling 2026',
    theme: 'Blooming Together',
    isActive: false,
    startDate: '2026-04-15',
    endDate: '2026-04-17',
    location: 'City Gardens',
    operatingHours: '09:00 AM - 06:00 PM',
    entranceFeeAdult: '$10',
    entranceFeeChild: 'Free',
  },
];

export const activities = [
  {
    id: 'a1',
    festivalId: '1',
    name: 'Opening Parade',
    startTime: '10:30 AM',
    location: 'Main Street',
    category: 'General',
  },
  {
    id: 'a2',
    festivalId: '1',
    name: 'Live Band: The Groovers',
    startTime: '02:00 PM',
    location: 'Main Stage',
    category: 'Music',
  },
  {
    id: 'a3',
    festivalId: '1',
    name: 'Kids Magic Show',
    startTime: '04:00 PM',
    location: 'Kids Corner',
    category: 'Kids',
  },
  {
    id: 'a4',
    festivalId: '1',
    name: 'Face Painting',
    startTime: '11:00 AM',
    location: 'Kids Corner',
    category: 'Kids',
  },
];

export const faqs = [
  {
    id: 'f1',
    question: 'Where can I park?',
    answer: 'Parking is available at the north entrance lot.',
    type: 'global',
  },
  {
    id: 'f2',
    question: 'Are pets allowed?',
    answer: 'Yes, leashed pets are welcome in outdoor areas.',
    type: 'global',
  },
  {
    id: 'f3',
    question: 'Is there an ATM?',
    answer: 'Yes, ATMs are located near the food court.',
    type: 'global',
  },
  {
    id: 'f4',
    question: 'What time does the parade start?',
    answer: 'The parade starts promptly at 10:30 AM on Main Street.',
    type: 'specific',
    festivalId: '1',
  },
  {
    id: 'f5',
    question: 'Is the magic show free?',
    answer: 'Yes, the magic show is included with your entry ticket.',
    type: 'specific',
    festivalId: '1',
  },
  {
    id: 'f6',
    question: 'Can I bring my own food?',
    answer: 'Outside food is not permitted, but baby food is allowed.',
    type: 'specific',
    festivalId: '1',
  },
];
