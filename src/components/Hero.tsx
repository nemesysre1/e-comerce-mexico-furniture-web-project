import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="beranda"
      className="pt-16 bg-gradient-to-br from-amber-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative overflow-hidden">
        {/* Large Decorative Blurs */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-amber-200 to-orange-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-amber-100 to-yellow-100 rounded-full opacity-15 blur-3xl"></div>

        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-1/4 w-32 h-32 border-2 border-amber-300 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-40 right-1/3 w-20 h-20 border-2 border-orange-300 rounded-full opacity-25"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-gradient-to-br from-amber-200 to-transparent rounded-lg opacity-30 rotate-45"></div>

        {/* Decorative Lines */}
        <div className="absolute top-1/3 left-0 w-40 h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-30"></div>
        <div className="absolute bottom-1/3 right-0 w-60 h-0.5 bg-gradient-to-l from-transparent via-orange-300 to-transparent opacity-25"></div>

        {/* Dot Patterns */}
        <div className="absolute top-40 right-1/3 grid grid-cols-4 gap-3 opacity-20">
          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
        </div>

        <div className="absolute bottom-60 left-1/4 grid grid-cols-3 gap-2 opacity-15">
          <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
          <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
        </div>

        {/* Elegant Curved Lines */}
        <svg
          className="absolute top-0 right-0 w-96 h-96 opacity-10"
          viewBox="0 0 200 200"
        >
          <path
            d="M 0 100 Q 50 50 100 100 T 200 100"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 0 120 Q 50 70 100 120 T 200 120"
            stroke="url(#gradient1)"
            strokeWidth="1.5"
            fill="none"
          />
          <defs>
            <linearGradient
              id="gradient1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                stopColor="#f59e0b"
                stopOpacity="0"
              />
              <stop
                offset="50%"
                stopColor="#f59e0b"
                stopOpacity="1"
              />
              <stop
                offset="100%"
                stopColor="#f59e0b"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>
        </svg>

        {/* Decorative Corners */}
        <div className="absolute top-10 left-10 w-24 h-24 border-t-2 border-l-2 border-amber-300 opacity-20 rounded-tl-3xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border-b-2 border-r-2 border-orange-300 opacity-15 rounded-br-3xl"></div>

        {/* Subtle Background Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #f59e0b 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        ></div>

        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full">Profesional & Terpercaya</div>
            <h1 className="text-gray-900">Reparasi & Tempahan Furniture Kustom Berkualitas</h1>
            <p className="text-gray-600">
              UD.Mexico adalah spesialis reparasi dan pembuatan furniture rumah tangga custom. Kami melayani pembuatan dan perbaikan Sofa, Kursi, SpringBed, dan berbagai furniture lainnya sesuai
              keinginan Anda dengan kualitas terbaik.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('produk')}
                className="bg-amber-600 text-white px-8 py-3 rounded-full hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
              >
                Lihat Produk
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollToSection('cabang')}
                className="border-2 border-amber-600 text-amber-600 px-8 py-3 rounded-full hover:bg-amber-50 transition-colors"
              >
                Lokasi Cabang
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div>
                <div className="text-amber-600">45+</div>
                <p className="text-gray-600">Tahun Pengalaman</p>
              </div>
              <div>
                <div className="text-amber-600">1000+</div>
                <p className="text-gray-600">Pelanggan Puas</p>
              </div>
              <div>
                <div className="text-amber-600">4</div>
                <p className="text-gray-600">Cabang</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1762803841091-c5327f7aed37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXJuaXR1cmUlMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NjQyMTc3MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Workshop UD.Mexico"
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-amber-600">✓</span>
                </div>
                <div>
                  <p className="text-gray-900">Garansi Kualitas</p>
                  <p className="text-gray-500">100% Terjamin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
