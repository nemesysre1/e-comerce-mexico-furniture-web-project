import kursi1 from '../assets/gallery/kursi1.jpg';
import kursi2 from '../assets/gallery/kursi2.jpg';
import kursi3 from '../assets/gallery/kursi3.jpg';
import kursi4 from '../assets/gallery/kursi4.jpg';
import kursi5 from '../assets/gallery/kursi5.jpg';
import kursi6 from '../assets/gallery/kursi6.jpg';
import kursi7 from '../assets/gallery/kursi7.jpg';
import kursi8 from '../assets/gallery/kursi8.jpg';
import sofa1 from '../assets/gallery/sofa1.jpg';
import sofa2 from '../assets/gallery/sofa2.jpg';
import sofa3 from '../assets/gallery/sofa3.jpg';
import sofa4 from '../assets/gallery/sofa4.jpg';
import sofa5 from '../assets/gallery/sofa5.jpg';
import sofa6 from '../assets/gallery/sofa6.jpg';
import sofa7 from '../assets/gallery/sofa7.jpg';
import sofa8 from '../assets/gallery/sofa8.jpg';
import springbed1 from '../assets/gallery/springbed1.jpg';
import springbed2 from '../assets/gallery/springbed2.jpg';
import springbed3 from '../assets/gallery/springbed3.jpg';
import springbed4 from '../assets/gallery/springbed4.jpg';
import springbed5 from '../assets/gallery/springbed5.jpg';
import springbed6 from '../assets/gallery/springbed6.jpg';
import springbed7 from '../assets/gallery/springbed7.jpg';
import springbed8 from '../assets/gallery/springbed8.jpg';
import tempahan1 from '../assets/gallery/tempahan1.jpg';
import tempahan2 from '../assets/gallery/tempahan2.jpg';
import tempahan3 from '../assets/gallery/tempahan3.jpg';
import tempahan4 from '../assets/gallery/tempahan4.jpg';
import tempahan5 from '../assets/gallery/tempahan5.jpg';
import tempahan6 from '../assets/gallery/tempahan6.jpg';
import tempahan7 from '../assets/gallery/tempahan7.jpg';
import tempahan8 from '../assets/gallery/tempahan8.jpg';

export interface GalleryItem {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  completedDate: string;
  client: string;
}

export const galleryData: GalleryItem[] = [
  // Sofa - 8 items
  {
    id: 's1',
    category: 'Sofa',
    title: 'Sofa Modern Ruang Tamu',
    description: 'Pembuatan sofa modern dengan desain minimalis untuk ruang tamu',
    image: sofa1,
    completedDate: 'November 2024',
    client: 'Bapak Hombing - Medan',
  },
  {
    id: 's2',
    category: 'Sofa',
    title: 'Restorasi Sofa Klasik',
    description: 'Restorasi dan perbaikan sofa klasik dengan hasil seperti baru',
    image: sofa2,
    completedDate: 'Oktober 2024',
    client: 'Bapak Kendi - Batam',
  },
  {
    id: 's3',
    category: 'Sofa',
    title: 'Sofa Kulit Premium',
    description: 'Sofa kulit asli dengan desain mewah dan nyaman',
    image: sofa3,
    completedDate: 'September 2024',
    client: 'Ibu Putri - Samosir',
  },
  {
    id: 's4',
    category: 'Sofa',
    title: 'Sofa Fabric Premium',
    description: 'Sofa Fabric Premium dengan warna custom',
    image: sofa4,
    completedDate: 'Agustus 2024',
    client: 'Bapak Ramot - Balige',
  },
  {
    id: 's5',
    category: 'Sofa',
    title: 'Sofa Kulit Premium',
    description: 'Sofa Kulit Premium dengan desain elegan',
    image: sofa5,
    completedDate: 'Juli 2024',
    client: 'Bapak Hombing - Medan',
  },
  {
    id: 's6',
    category: 'Sofa',
    title: 'Sofa sudut kulit asli',
    description: 'Reparasi sofa kulit asli dengan ganti busa',
    image: sofa6,
    completedDate: 'Juni 2024',
    client: 'Ibu Monica - Batam',
  },
  {
    id: 's7',
    category: 'Sofa',
    title: 'Sofa Sudut L-Shape',
    description: 'Sofa Sudut L-Shape dengan bahan fabric berkualitas',
    image: sofa7,
    completedDate: 'Mei 2024',
    client: 'Bapak Ramot - Balige',
  },
  {
    id: 's8',
    category: 'Sofa',
    title: 'Sofa Baldu',
    description: 'Sofa Baldu dengan warna custom',
    image: sofa8,
    completedDate: 'April 2024',
    client: 'Ibu Maria - Samosir',
  },

  // Kursi - 8 items
  {
    id: 'k1',
    category: 'Kursi',
    title: 'Set Kursi Jati',
    description: 'Set kursi jati 7 pcs dengan finishing melamine',
    image: kursi1,
    completedDate: 'November 2024',
    client: 'Bapak Hombing - Medan',
  },
  {
    id: 'k2',
    category: 'Kursi',
    title: 'Kursi Jati ukir',
    description: 'Kursi jati ukir tangan dengan finishing natural',
    image: kursi2,
    completedDate: 'Oktober 2024',
    client: 'Ibu Monic - Batam',
  },
  {
    id: 'k3',
    category: 'Kursi',
    title: 'Kursi Teras Modern',
    description: 'Set kursi teras dengan cushion custom',
    image: kursi3,
    completedDate: 'September 2024',
    client: 'Bapak Ramot - Balige',
  },
  {
    id: 'k4',
    category: 'Kursi',
    title: 'Kursi Bar Stool',
    description: 'Set kursi bar dengan footrest',
    image: kursi4,
    completedDate: 'Agustus 2024',
    client: 'Ibu Putri - Samosir',
  },
  {
    id: 'k5',
    category: 'Kursi',
    title: 'Reparasi Kursi Antik',
    description: 'Restorasi kursi kayu antik dengan finishing ulang',
    image: kursi5,
    completedDate: 'Juli 2024',
    client: 'Bapak Hombing - Medan',
  },
  {
    id: 'k6',
    category: 'Kursi',
    title: 'Kursi Bed',
    description: 'Kursi bed kayu jati dengan bantalan empuk',
    image: kursi6,
    completedDate: 'Juni 2024',
    client: 'Bapak Kendi - Batam',
  },
  {
    id: 'k7',
    category: 'Kursi',
    title: 'Kursi Santai Rotan',
    description: 'Kursi santai rotan sintetis outdoor',
    image: kursi7,
    completedDate: 'Mei 2024',
    client: 'Bapak Adi - Balige',
  },
  {
    id: 'k8',
    category: 'Kursi',
    title: 'Set Kursi Cafe',
    description: 'Set 12 kursi untuk cafe modern',
    image: kursi8,
    completedDate: 'April 2024',
    client: 'Ibu Wulan - Samosir',
  },

  // SpringBed - 8 items
  {
    id: 'sb1',
    category: 'SpringBed',
    title: 'SpringBed King Orthopedic',
    description: 'Kasur ortopedi king size dengan divan storage',
    image: springbed1,
    completedDate: 'November 2024',
    client: 'Bapak Joko - Medan',
  },
  {
    id: 'sb2',
    category: 'SpringBed',
    title: 'SpringBed Queen Luxury',
    description: 'Kasur queen dengan pillow top layer',
    image: springbed2,
    completedDate: 'Oktober 2024',
    client: 'Ibu Fitri - Batam',
  },
  {
    id: 'sb3',
    category: 'SpringBed',
    title: 'Reparasi SpringBed Hotel',
    description: 'Reparasi 10 unit springbed untuk hotel',
    image: springbed3,
    completedDate: 'September 2024',
    client: 'Hotel Grand - Balige',
  },
  {
    id: 'sb4',
    category: 'SpringBed',
    title: 'SpringBed Single Anak',
    description: 'Set 2 kasur single untuk kamar anak',
    image: springbed4,
    completedDate: 'Agustus 2024',
    client: 'Bapak Irwan - Samosir',
  },
  {
    id: 'sb5',
    category: 'SpringBed',
    title: 'SpringBed Memory Foam',
    description: 'Kasur dengan teknologi memory foam premium',
    image: springbed5,
    completedDate: 'Juli 2024',
    client: 'Ibu Rini - Medan',
  },
  {
    id: 'sb6',
    category: 'SpringBed',
    title: 'SpringBed Pocket Spring',
    description: 'Kasur dengan 2000 pocket spring coils',
    image: springbed6,
    completedDate: 'Juni 2024',
    client: 'Bapak Dedi - Batam',
  },
  {
    id: 'sb7',
    category: 'SpringBed',
    title: 'SpringBed dengan Headboard',
    description: 'Set springbed queen dengan headboard ukir',
    image: springbed7,
    completedDate: 'Mei 2024',
    client: 'Ibu Ani - Balige',
  },
  {
    id: 'sb8',
    category: 'SpringBed',
    title: 'Reparasi SpringBed Classic',
    description: 'Reparasi springbed classic dengan ganti per',
    image: springbed8,
    completedDate: 'April 2024',
    client: 'Bapak Heru - Samosir',
  },

  // Lainnya - 8 items
  {
    id: 'l1',
    category: 'Lainnya',
    title: 'Lemari Pakaian Sliding',
    description: 'Lemari 3 pintu sliding dengan cermin',
    image:
      'https://images.unsplash.com/photo-1685881495881-25c035670d82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBjYWJpbmV0fGVufDF8fHx8MTc2NDIxODc3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    completedDate: 'November 2024',
    client: 'Bapak Rudi - Medan',
  },
  {
    id: 'l2',
    category: 'Lainnya',
    title: 'Meja TV Minimalis',
    description: 'Meja TV modern dengan storage maksimal',
    image:
      'https://images.unsplash.com/photo-1715582888585-f357318c0a1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBmdXJuaXR1cmV8ZW58MXx8fHwxNzY0MTYzNzI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    completedDate: 'Oktober 2024',
    client: 'Ibu Mega - Batam',
  },
  {
    id: 'l3',
    category: 'Lainnya',
    title: 'Meja Makan Set',
    description: 'Set meja makan 6 kursi kayu jati',
    image:
      'https://images.unsplash.com/photo-1685881495881-25c035670d82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBjYWJpbmV0fGVufDF8fHx8MTc2NDIxODc3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    completedDate: 'September 2024',
    client: 'Bapak Anton - Balige',
  },
  {
    id: 'l4',
    category: 'Lainnya',
    title: 'Rak Buku Custom',
    description: 'Rak buku dinding custom untuk perpustakaan',
    image:
      'https://images.unsplash.com/photo-1715582888585-f357318c0a1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBmdXJuaXR1cmV8ZW58MXx8fHwxNzY0MTYzNzI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    completedDate: 'Agustus 2024',
    client: 'Ibu Diana - Samosir',
  },
  {
    id: 'l5',
    category: 'Lainnya',
    title: 'Kitchen Set',
    description: 'Kitchen set lengkap dengan island counter',
    image:
      'https://images.unsplash.com/photo-1685881495881-25c035670d82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBjYWJpbmV0fGVufDF8fHx8MTc2NDIxODc3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    completedDate: 'Juli 2024',
    client: 'Bapak Eko - Medan',
  },
  {
    id: 'l6',
    category: 'Lainnya',
    title: 'Nakas Minimalis',
    description: 'Set 2 nakas minimalis untuk kamar tidur',
    image:
      'https://images.unsplash.com/photo-1715582888585-f357318c0a1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBmdXJuaXR1cmV8ZW58MXx8fHwxNzY0MTYzNzI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    completedDate: 'Juni 2024',
    client: 'Ibu Yuni - Batam',
  },
  {
    id: 'l7',
    category: 'Lainnya',
    title: 'Meja Kerja Custom',
    description: 'Meja kerja L-shape dengan storage',
    image:
      'https://images.unsplash.com/photo-1685881495881-25c035670d82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBjYWJpbmV0fGVufDF8fHx8MTc2NDIxODc3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    completedDate: 'Mei 2024',
    client: 'Bapak Budi - Balige',
  },
  {
    id: 'l8',
    category: 'Lainnya',
    title: 'Partisi Ruangan',
    description: 'Partisi ruangan custom dengan storage',
    image:
      'https://images.unsplash.com/photo-1715582888585-f357318c0a1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBmdXJuaXR1cmV8ZW58MXx8fHwxNzY0MTYzNzI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    completedDate: 'April 2024',
    client: 'Ibu Sari - Samosir',
  },
];
