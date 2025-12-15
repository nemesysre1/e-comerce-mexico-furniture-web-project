import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { galleryData } from "../data/gallery";

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const categories = ["Semua", "Sofa", "Kursi", "SpringBed", "Lainnya"];

  const filteredGallery =
    selectedCategory === "Semua"
      ? galleryData
      : galleryData.filter((item) => item.category === selectedCategory);

  return (
    <section id="galeri" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-gray-900 mb-4">Galeri Portofolio</h2>
          <p className="text-gray-600">
            Hasil karya kami yang telah dipercaya oleh ratusan klien di berbagai kota
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? "bg-amber-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group"
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-amber-600 text-white px-3 py-1 rounded-full text-sm">
                  {item.category}
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{item.client}</span>
                  <span>{item.completedDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGallery.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Tidak ada portfolio untuk kategori ini
          </div>
        )}
      </div>
    </section>
  );
}
