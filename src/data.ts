import { Course, Testimonial } from './types';

export const courses: Course[] = [
  {
    id: 'handling-relationships',
    title: 'Handling Relationships',
    description: 'Master the art of connection, communication, and maintaining healthy boundaries in all your relationships.',
    price: 600,
    modules: 4,
    image: 'https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&w=800&q=80',
    icon: 'HeartHandshake'
  },
  {
    id: 'hypnotherapy',
    title: 'Hypnotherapy',
    description: 'Dive deep into the subconscious mind to heal past traumas and unlock your true potential.',
    price: 5000,
    modules: 7,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    icon: 'BrainCircuit'
  },
  {
    id: 'negative-energies',
    title: 'How to get rid of negative energies',
    description: 'Learn powerful techniques to cleanse your aura, protect your space, and vibrate at a higher frequency.',
    price: 1200,
    originalPrice: 1500,
    modules: 1,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    icon: 'ShieldAlert'
  },
  {
    id: 'stress-free',
    title: 'How to be stress free',
    description: 'Discover actionable strategies and mindfulness practices to cultivate lasting peace and tranquility.',
    price: 1200,
    modules: 1,
    image: 'https://images.unsplash.com/photo-1474418397713-7de216b92a8c?auto=format&fit=crop&w=800&q=80',
    icon: 'Leaf'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Neha M.',
    role: 'Healing Journey Participant',
    content: '"Working with Ekta completely shifted my perspective. I learned to release deeply held negative energy and finally found peace in my daily life. Her guidance is truly magical."',
    rating: 5
  },
  {
    id: 't2',
    name: 'Rohan K.',
    role: 'Hypnotherapy Client',
    content: '"The hypnotherapy sessions were profound. I was able to access parts of my subconscious I didn\'t know existed and heal traumas that had been holding me back for years."',
    rating: 5
  },
  {
    id: 't3',
    name: 'Priya R.',
    role: 'Relationship Coaching',
    content: '"Ekta helped me rebuild my self-worth. Her approach to relationship coaching isn\'t just about others—it starts with you. I am forever grateful for her wisdom and patience."',
    rating: 5
  }
];
