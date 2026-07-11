export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  modules: number;
  image: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
}
