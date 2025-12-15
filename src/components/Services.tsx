import { Wrench, Sparkles, Clock, Award } from "lucide-react";

export function Services() {
  const services = [
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Reparasi Furniture",
      description: "Perbaikan sofa, kursi, springbed, dan furniture lainnya dengan hasil sempurna seperti baru",
      features: [
        "Ganti busa & kain",
        "Perbaikan rangka",
        "Finishing ulang"
      ]
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Tempahan Kustom",
      description: "Pembuatan furniture sesuai desain dan ukuran yang Anda inginkan dengan material berkualitas",
      features: [
        "Desain sesuai keinginan",
        "Pilihan material lengkap",
        "Konsultasi gratis"
      ]
    }
  ];

  const benefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Pengerjaan Cepat",
      description: "Proses pengerjaan efisien dengan hasil maksimal"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Kualitas Terjamin",
      description: "Material premium dan craftsmanship terbaik"
    }
  ];

  return (
    <section id="layanan" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-gray-900 mb-4">Layanan Kami</h2>
          <p className="text-gray-600">
            Kami menyediakan layanan reparasi dan pembuatan furniture custom dengan standar kualitas tinggi
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl border border-amber-100 hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-amber-600 text-white rounded-xl flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl"
            >
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                {benefit.icon}
              </div>
              <div>
                <h4 className="text-gray-900 mb-1">{benefit.title}</h4>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
