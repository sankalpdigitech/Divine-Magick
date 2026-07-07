import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Journey from './components/Journey';
import Courses from './components/Courses';
import Sanctuary from './components/Sanctuary';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import BackgroundDots from './components/BackgroundDots';
import EnrollerPage from './components/EnrollerPage';
import { Course } from './types';

export default function App() {
  const [enrollingCourse, setEnrollingCourse] = useState<Course | null>(null);

  const handleEnroll = (course: Course) => {
    setEnrollingCourse(course);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setEnrollingCourse(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-sand-50 min-h-screen text-charcoal-900 selection:bg-champagne-400/30 selection:text-charcoal-900 relative">
      <BackgroundDots />
      <Navbar />
      
      {enrollingCourse ? (
        <EnrollerPage course={enrollingCourse} onBack={handleBackToHome} />
      ) : (
        <main className="relative z-10">
          <Hero />
          <About />
          <Journey />
          <Courses onEnroll={handleEnroll} />
          <Sanctuary />
          <Testimonials />
        </main>
      )}
      
      <Footer />
    </div>
  );
}
