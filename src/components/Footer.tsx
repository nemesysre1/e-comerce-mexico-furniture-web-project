import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="kontak"
      className="bg-gray-900 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-amber-500 mb-4">UD.Mexico</h3>
            <p className="text-gray-400 mb-4">Spesialis reparasi dan pembuatan furniture custom berkualitas tinggi sejak 1980-an.</p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4">Link Cepat</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('beranda')}
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('layanan')}
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Layanan
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('produk')}
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Produk
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('galeri')}
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Galeri
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('cabang')}
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Cabang
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white mb-4">Layanan</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Reparasi Sofa</li>
              <li>Reparasi Kursi</li>
              <li>Reparasi SpringBed</li>
              <li>Custom Furniture</li>
              <li>Konsultasi Desain</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white mb-4">Kontak</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>Medan, Batam, Balige, Samosir</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <a
                  href="tel:+6281362283542"
                  className="hover:text-amber-500"
                >
                  +62 813-6228-3542
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <a
                  href="mailto:info@udmexico.com"
                  className="hover:text-amber-500"
                >
                  info@udmexico.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 UD.Mexico. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
