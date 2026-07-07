import { Instagram, Youtube, Facebook, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 text-sand-50 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          <div className="md:col-span-5 space-y-6">
            <h3 className="font-display text-2xl font-medium tracking-wide">Divine Magick.</h3>
            <p className="font-sans font-light text-sm text-sand-50/60 max-w-sm leading-relaxed">
              Empowering you to heal, grow, and become the best version of yourself through guided mindset coaching and hypnotherapy.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-sans font-semibold uppercase tracking-widest text-xs text-amethyst-400 mb-6">Navigation</h4>
            <ul className="space-y-4 font-sans text-sm font-light text-sand-50/70">
              <li><a href="#about" className="hover:text-amethyst-300 transition-colors">The Founder</a></li>
              <li><a href="#courses" className="hover:text-amethyst-300 transition-colors">Programs</a></li>
              <li><a href="#sanctuary" className="hover:text-amethyst-300 transition-colors">The Sanctuary</a></li>
              <li><a href="#testimonials" className="hover:text-amethyst-300 transition-colors">Client Stories</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-sans font-semibold uppercase tracking-widest text-xs text-amethyst-400 mb-6">Connect</h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/ekta_chimnani?igsh=dGg1Z2JvY2Vxczlr" target="_blank" rel="noopener noreferrer" className="p-3 bg-charcoal-800 rounded-full hover:bg-amethyst-500 hover:text-sand-50 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-3 bg-charcoal-800 rounded-full hover:bg-amethyst-500 hover:text-sand-50 transition-all">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="p-3 bg-charcoal-800 rounded-full hover:bg-amethyst-500 hover:text-sand-50 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-3 bg-charcoal-800 rounded-full hover:bg-amethyst-500 hover:text-sand-50 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-charcoal-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sand-50/40 font-sans text-xs font-light">
            © {new Date().getFullYear()} Divine Magick. All rights reserved.
          </p>
          <div className="flex gap-6 text-sand-50/40 font-sans text-xs font-light">
            <a href="#" className="hover:text-sand-50 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-sand-50 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
