# Type Declarations

Folder ini berisi semua deklarasi tipe TypeScript untuk berbagai jenis file dan ekstensi yang digunakan dalam aplikasi.

## File Deklarasi Tipe

### 🖼️ **Media Files**

- **`svg.d.ts`** - File SVG (`.svg`)
- **`images.d.ts`** - File gambar (`.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.bmp`, `.ico`, `.avif`)
- **`audio.d.ts`** - File audio (`.mp3`, `.wav`, `.ogg`, `.m4a`, `.aac`, `.flac`)
- **`video.d.ts`** - File video (`.mp4`, `.webm`, `.avi`, `.mov`, `.mkv`, `.flv`, `.wmv`)

### 🎨 **Styling & Fonts**

- **`css.d.ts`** - File CSS dan preprocessor (`.css`, `.scss`, `.sass`, `.less`)
- **`fonts.d.ts`** - File font (`.woff`, `.woff2`, `.ttf`, `.otf`, `.eot`)

### 📊 **Data Files**

- **`data.d.ts`** - File data (`.json`, `.csv`, `.xml`, `.yaml`, `.yml`, `.toml`, `.ini`)

### 🌐 **Global & React Extensions**

- **`global.d.ts`** - Deklarasi tipe global dan utility types
- **`react.d.ts`** - Ekstensi tipe React dan HTML

### 📁 **Index**

- **`index.d.ts`** - Re-export semua deklarasi tipe

## Utility Types

### Object Manipulation

- `DeepPartial<T>` - Membuat semua properti opsional secara rekursif
- `Optional<T, K>` - Membuat properti tertentu opsional
- `RequiredFields<T, K>` - Membuat properti tertentu required

### Null & Undefined

- `Nullable<T>` - Tipe yang bisa null
- `Undefinable<T>` - Tipe yang bisa undefined
- `NonNullable<T>` - Tipe yang tidak bisa null/undefined

### Array & Function

- `ArrayElement<T>` - Ekstrak tipe elemen array
- `ArrayLength<T>` - Ekstrak panjang array
- `FunctionReturnType<T>` - Ekstrak tipe return function
- `FunctionParameters<T>` - Ekstrak tipe parameter function

### Object Utilities

- `KeysOfType<T, U>` - Kunci dengan tipe tertentu
- `ValuesOfType<T, U>` - Nilai dengan tipe tertentu

## Environment Variables

```typescript
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_DEBUG: string;
}
```

## Penggunaan

### Import Semua Types

```typescript
import * as Types from "../types";
```

### Import Utility Types Tertentu

```typescript
import type { DeepPartial, Optional } from "../types";
```

### Import Deklarasi Tipe Tertentu

```typescript
import "../types/css"; // Untuk CSS modules
import "../types/svg"; // Untuk SVG files
import "../types/images"; // Untuk image files
```

## Keuntungan

✅ **Type Safety** - Semua file dapat diimport dengan aman  
✅ **IntelliSense** - Autocomplete dan type checking yang lengkap  
✅ **No Runtime Errors** - Mencegah error import file yang tidak dikenali  
✅ **Maintainable** - Struktur yang terorganisir dan mudah dikelola  
✅ **Future-Proof** - Siap untuk berbagai jenis file yang mungkin diperlukan

## Menambahkan Deklarasi Tipe Baru

1. Buat file `.d.ts` baru di folder `types/`
2. Tambahkan deklarasi module yang diperlukan
3. Export file dari `index.d.ts`
4. Update dokumentasi ini jika diperlukan
