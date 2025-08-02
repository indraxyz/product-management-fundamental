# Aplikasi Manajemen Produk

Aplikasi manajemen produk yang dibangun dengan React, TypeScript, dan Tailwind CSS. Aplikasi ini menawarkan UI modern dengan desain flat yang fokus pada pengalaman pengguna yang baik.

## 🚀 Fitur Utama

### 📊 Data Table dengan UI Modern
- Tabel produk dengan desain flat dan modern
- Kolom checkbox untuk multiple selection
- Kolom aksi sticky (detail, edit, delete)
- Tampilan gambar produk dengan fallback
- Status stok dengan indikator warna
- Tag produk dengan tampilan yang menarik

### 🔍 Pencarian dan Filter
- Pencarian berdasarkan nama produk, deskripsi, dan tag
- Filter berdasarkan kategori
- Sorting berdasarkan harga, nama, diskon, stok, dan tanggal
- Tampilan hasil pencarian yang informatif

### 📱 Load More Pagination
- Tombol "Muat Lebih Banyak" untuk 10 baris tambahan
- Indikator jumlah produk yang ditampilkan
- Loading state yang smooth

### 🎯 Multiple Actions
- Checkbox untuk memilih multiple produk
- Bulk delete untuk produk yang dipilih
- Indikator jumlah produk yang dipilih

### 📋 Detail Produk
- Modal detail produk yang lengkap
- Tampilan gambar produk
- Informasi lengkap produk termasuk varian
- Format harga dan tanggal yang sesuai

## 🛠️ Teknologi yang Digunakan

- **React 19** - Framework UI
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling modern
- **Vite** - Build tool yang cepat
- **@tailwindcss/vite** - Integrasi Tailwind dengan Vite

## 📦 Struktur Proyek

```
src/
├── components/
│   ├── ProductTable.tsx      # Tabel produk utama
│   ├── ProductFilters.tsx    # Filter dan pencarian
│   ├── LoadMoreButton.tsx    # Tombol load more
│   └── ProductDetail.tsx     # Modal detail produk
├── hooks/
│   └── useProductManager.ts  # Hook untuk state management
├── types/
│   └── Product.ts           # Type definitions
├── data/
│   └── mockProducts.ts      # Data mock 35 produk
└── styles/
    └── index.css           # Global styles
```

## 🎨 Desain UI/UX

### Prinsip Desain
- **Flat Design**: Menggunakan desain flat yang clean dan modern
- **Consistent Spacing**: Menggunakan sistem spacing yang konsisten
- **Color Hierarchy**: Penggunaan warna yang tepat untuk status dan aksi
- **Responsive**: Responsif untuk berbagai ukuran layar

### Komponen UI
- **Cards**: Untuk grouping informasi
- **Buttons**: Dengan hover states dan loading states
- **Modals**: Untuk detail produk
- **Tables**: Dengan sticky columns dan hover effects
- **Form Elements**: Input, select, dan checkbox yang konsisten

## 📊 Data Mock

Aplikasi dilengkapi dengan 35 data mock produk yang mencakup:
- **Electronics**: Smartphone, laptop, headphone, kamera, dll
- **Fashion**: Sepatu, pakaian, aksesoris, dll

Setiap produk memiliki:
- Gambar dari URL online
- Informasi lengkap sesuai interface Product
- Varian produk
- Tag dan kategori
- Harga dalam Rupiah

## 🚀 Cara Menjalankan

### Prerequisites
- Node.js 18+ 
- pnpm

### Installation
```bash
# Clone repository
git clone <repository-url>
cd products-management

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Build untuk Production
```bash
pnpm build
pnpm preview
```

## 🎯 Interface Product

```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  discount: number;
  tags: string[];
  category: string;
  createdAt: Date;
  updatedAt: Date;
  imagesUrl: string[];
  weight: number;
  varian: ProductVariant[];
}
```

## 🔧 Fitur yang Tersedia

### ✅ Sudah Diimplementasikan
- [x] Data table dengan 35 mock data
- [x] Search berdasarkan nama, deskripsi, tag
- [x] Filter berdasarkan kategori
- [x] Sorting berdasarkan price, name, discount, stock
- [x] Load more button (10 rows)
- [x] Checkbox untuk multiple selection
- [x] Actions sticky (detail, edit, delete)
- [x] Modal detail produk
- [x] Bulk delete untuk produk terpilih
- [x] UI modern dengan Tailwind CSS
- [x] Responsive design

### 🚧 Fitur yang Akan Dikembangkan
- [ ] Form tambah/edit produk
- [ ] Upload gambar produk
- [ ] Export data ke Excel/CSV
- [ ] Import data dari file
- [ ] Authentication dan authorization
- [ ] Backend API integration
- [ ] Real-time updates
- [ ] Advanced filtering
- [ ] Product analytics

## 🎨 Customization

### Mengubah Tema
File `src/styles/index.css` berisi custom styles yang bisa dimodifikasi.

### Menambah Data Mock
Edit file `src/data/mockProducts.ts` untuk menambah atau mengubah data produk.

### Mengubah Komponen
Semua komponen berada di folder `src/components/` dan bisa dimodifikasi sesuai kebutuhan.

## 📱 Responsive Design

Aplikasi didesain responsif untuk:
- **Desktop**: Layout penuh dengan semua fitur
- **Tablet**: Layout yang dioptimalkan untuk layar medium
- **Mobile**: Layout yang disesuaikan untuk layar kecil

## 🔍 Performance

- **Lazy Loading**: Komponen dimuat sesuai kebutuhan
- **Memoization**: Menggunakan useMemo dan useCallback untuk optimasi
- **Efficient Rendering**: React.memo untuk komponen yang tidak sering berubah
- **Optimized Images**: Fallback untuk gambar yang gagal dimuat

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Support

Jika ada pertanyaan atau masalah, silakan buat issue di repository ini.

---

**Dibuat dengan ❤️ menggunakan React, TypeScript, dan Tailwind CSS**
