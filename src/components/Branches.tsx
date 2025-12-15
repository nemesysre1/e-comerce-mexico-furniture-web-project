import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { useBranches } from "../contexts/BranchContext";

export function Branches() {
  const { branches } = useBranches();

  const handleContact = (phone: string) => {
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}`, '_blank');
  };

  return (
    <section id="cabang" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-gray-900 mb-4">Cabang Kami</h2>
          <p className="text-gray-600">
            UD.Mexico hadir di berbagai kota untuk melayani kebutuhan furniture Anda
          </p>
        </div>

        {/* Branches Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {branches.map((branch, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Map */}
              <div className="h-64 bg-gray-100">
                <iframe
                  src={branch.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map ${branch.city}`}
                ></iframe>
              </div>

              {/* Branch Info */}
              <div className="p-6">
                <h3 className="text-gray-900 mb-4">{branch.city}</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <a href={`tel:${branch.phone}`} className="hover:text-amber-600">
                      {branch.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <a href={`mailto:${branch.email}`} className="hover:text-amber-600">
                      {branch.email}
                    </a>
                  </div>
                  
                  <div className="flex items-start gap-3 text-gray-600">
                    <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>{branch.hours}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleContact(branch.phone)}
                    className="flex-1 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Hubungi via WhatsApp
                  </button>
                  <a
                    href={branch.mapUrl.replace('embed?', 'search/?api=1&query=')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border-2 border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors flex items-center justify-center"
                  >
                    <MapPin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}