# DOCX Unpacker Web Uygulaması

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Ready-000000?style=flat-square&logo=vercel)](https://vercel.com/)

> **Diğer dillerde oku:** [English](README.md) | [Português (Brasil)](README-pt-br.md) | [Español](README-es.md) | [Français](README-fr.md) | [Deutsch](README-de.md) | [日本語](README-ja.md) | [中文](README-zh.md) | [हिन्दी](README-hi.md) | [বাংলা](README-bn.md) | [తెలుగు](README-te.md) | [தமிழ்](README-ta.md) | [العربية](README-ar.md) | [العربية المصرية](README-arz.md) | **Türkçe**

DOCX dosyalarının içeriğini çıkarmak ve görüntülemek için modern bir web uygulaması. Next.js, TypeScript ve Tailwind CSS ile oluşturulmuş, çok dilli destek ve SEO optimizasyonu ile.

## 📋 Genel Bakış

DOCX Unpacker Web Uygulaması, kullanıcıların Microsoft Word belgelerini (.docx) yüklemelerine ve içeriklerini doğrudan web tarayıcısında görüntülemelerine olanak tanıyan bir web uygulamasıdır. Uygulama, belge içeriğini çıkarır ve düzenli, okunması kolay bir formatta görüntüler.

### ✨ Temel Özellikler

- 📄 **DOCX Dosya Yükleme**: Sürükle-bırak veya tıklayarak seç
- 🔍 **İçerik Çıkarma**: Belgelerden metin, resim ve tabloları çıkarma
- 🎨 **Duyarlı Tasarım**: Tüm cihazlar için optimize edilmiş görüntüleme
- 🌍 **Çok Dilli Destek**: 21 dil desteği
- ⚡ **Hızlı İşleme**: Verimli istemci tarafı dosya işleme
- 🔒 **Gizlilik Odaklı**: Dosyalar yerel olarak işlenir, sunucuya gönderilmez
- 🎯 **SEO Optimize**: Arama motorları için optimize edilmiş
- 📱 **PWA Hazır**: Progresif Web Uygulaması özellikleri

## 🛠️ Teknoloji Yığını

- **Framework**: Next.js 14 (App Router)
- **Dil**: TypeScript
- **Stil**: Tailwind CSS
- **UI Bileşenleri**: Radix UI
- **İkonlar**: Lucide React
- **Dosya İşleme**: JSZip, xml2js
- **Uluslararasılaştırma**: next-intl
- **Dağıtım**: Vercel
- **AI Entegrasyonu**: Google Genkit (isteğe bağlı)

## 🏗️ Mimari

```
Kullanıcı → Dosya Yükleme → İstemci Tarafı İşleme → İçerik Görüntüleme
    ↓
[Tarayıcı] → [JSZip] → [XML Ayrıştırma] → [React Render]
```

### Ana Bileşenler

1. **Dosya Yükleyici**: Sürükle-bırak arayüzü
2. **DOCX Ayrıştırıcı**: Dosya içeriği çıkarma ve analizi
3. **İçerik Görüntüleyici**: Yapılandırılmış içerik görüntüleme
4. **Çok Dilli Sistem**: Dinamik dil değiştirme
5. **SEO Bileşeni**: Meta veri ve site haritası oluşturma

## 📸 Ekran Görüntüleri

*Not: Ekran görüntüleri gelecekte eklenecek*

## 🚀 Başlangıç

### Ön Koşullar

- Node.js 18.0 veya daha yeni
- npm veya yarn veya pnpm veya bun

### Kurulum

1. Depoyu klonlayın:
```bash
git clone https://github.com/yourusername/docx-unpacker-webapp.git
cd docx-unpacker-webapp
```

2. Bağımlılıkları yükleyin:
```bash
npm install
# veya
yarn install
# veya
pnpm install
```

3. Geliştirme sunucusunu çalıştırın:
```bash
npm run dev
# veya
yarn dev
# veya
pnpm dev
```

4. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın

## 📖 Kullanım

### Temel Kullanım

1. **Dosya Yükle**: Bir DOCX dosyasını sürükleyip bırakın veya seçmek için tıklayın
2. **İşlemeyi Bekle**: Uygulama dosyayı otomatik olarak işler
3. **İçeriği Görüntüle**: Çıkarılan içerik yapılandırılmış formatta görüntülenir
4. **Dil Değiştir**: Dili değiştirmek için sağ üst köşedeki dil seçiciyi kullanın

### Desteklenen Dosya Formatları

- `.docx` - Microsoft Word belgeleri (2007 ve sonrası)

### Sınırlamalar

- Maksimum dosya boyutu: 10MB
- Karmaşık biçimlendirme basitleştirilebilir
- Makro veya VBA kodu desteklenmez

## 🌍 Uluslararasılaştırma (i18n)

Bu uygulama 21 dili destekler:

- 🇸🇦 العربية (ar)
- 🇪🇬 العربية المصرية (arz)
- 🇧🇩 বাংলা (bn)
- 🇩🇪 Deutsch (de)
- 🇺🇸 English (en)
- 🇪🇸 Español (es)
- 🇫🇷 Français (fr)
- 🇮🇳 हिन्दी (hi)
- 🇮🇩 Bahasa Indonesia (id)
- 🇯🇵 日本語 (ja)
- 🇳🇱 Nederlands (nl)
- 🇳🇬 Nigerian Pidgin (pcm)
- 🇧🇷 Português (pt)
- 🇷🇺 Русский (ru)
- 🇮🇳 தமிழ் (ta)
- 🇮🇳 తెలుగు (te)
- 🇹🇷 Türkçe (tr)
- 🇵🇰 اردو (ur)
- 🇻🇳 Tiếng Việt (vi)
- 🇭🇰 粵語 (yue)
- 🇨🇳 中文 (zh)

### Yeni Dil Ekleme

1. `messages/` klasöründe yeni bir dil dosyası oluşturun
2. `src/i18n/request.ts` dosyasında dili yapılandırın
3. İlgili README dosyasını oluşturun

## 🔍 SEO ve Site Haritası

- **Dinamik Meta Veriler**: Her dil için optimize edilmiş meta etiketler
- **Yapılandırılmış Veriler**: JSON-LD formatında Schema işaretlemesi
- **Otomatik Site Haritası**: Tüm diller ve sayfalarla
- **Open Graph**: Sosyal medya paylaşımı optimizasyonu
- **Twitter Cards**: Optimize edilmiş Twitter paylaşımı

## 📁 Proje Yapısı

```
docx-unpacker-webapp/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React bileşenleri
│   ├── lib/                 # Yardımcı fonksiyonlar
│   ├── i18n/               # Uluslararasılaştırma yapılandırması
│   └── ai/                 # AI entegrasyonu (isteğe bağlı)
├── messages/               # Çeviri dosyaları
├── public/                 # Statik varlıklar
├── README-*.md            # Dile özel README'ler
└── package.json           # Proje yapılandırması
```

## 🗺️ Yol Haritası

### Kısa Vadeli Hedefler
- [ ] Dosya işleme iyileştirmeleri
- [ ] Daha fazla dosya formatı desteği
- [ ] Performans optimizasyonları
- [ ] Erişilebilirlik iyileştirmeleri

### Orta Vadeli Hedefler
- [ ] Toplu dosya işleme
- [ ] Gelişmiş biçimlendirme desteği
- [ ] Dışa aktarma özellikleri
- [ ] Kullanıcı tercihleri

### Uzun Vadeli Hedefler
- [ ] Bulut depolama entegrasyonu
- [ ] İşbirliği özellikleri
- [ ] API geliştirme
- [ ] Mobil uygulama

## 🧪 Test ve Kalite

```bash
# Testleri çalıştır
npm run test

# Linter çalıştır
npm run lint

# Tip kontrolü
npm run type-check

# Derleme
npm run build
```

## 🤝 Katkıda Bulunma

Katkılar memnuniyetle karşılanır! Lütfen şu adımları izleyin:

1. Projeyi fork edin
2. Özellik dalı oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Dalınıza push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

Ayrıntılar için [CONTRIBUTING.md](CONTRIBUTING.md) dosyasına bakın.

## 📜 Davranış Kuralları

Bu proje [Contributor Covenant](CODE_OF_CONDUCT.md) Davranış Kurallarını benimser. Katılım göstererek bu kurallara uymayı kabul etmiş olursunuz.

## 🔒 Güvenlik

Bir güvenlik açığı keşfederseniz, lütfen [SECURITY.md](SECURITY.md) dosyasındaki yönergeleri izleyerek bildirin.

## 📄 Lisans

Bu proje [MIT License](LICENSE) altında lisanslanmıştır.

## 🔧 Bakım

- **Aktif Bakım**: Bu proje aktif olarak bakımı yapılmaktadır
- **Sorun Yanıtı**: Genellikle 24-48 saat içinde
- **Güncelleme Sıklığı**: Düzenli bağımlılık güncellemeleri ve güvenlik düzeltmeleri

## 🙏 Teşekkürler

- Next.js ekibi - Harika framework için
- Tailwind CSS ekibi - Güzel tasarım sistemi için
- Açık kaynak topluluğu - Sürekli destek için

## 📞 Destek ve SSS

### Sık Sorulan Sorular

**S: Hangi dosya formatları destekleniyor?**
C: Şu anda sadece .docx dosyaları (Microsoft Word 2007 ve sonrası) desteklenmektedir.

**S: Dosyalar sunucuya gönderiliyor mu?**
C: Hayır, tüm işlemler tarayıcıda gerçekleşir ve dosyalar sunucuya gönderilmez.

**S: Maksimum dosya boyutu nedir?**
C: Mevcut limit 10MB'dir.

### Destek Alma

- 🐛 Hata raporları: [GitHub Issues](https://github.com/yourusername/docx-unpacker-webapp/issues)
- 💡 Özellik istekleri: [GitHub Discussions](https://github.com/yourusername/docx-unpacker-webapp/discussions)
- 📧 Doğrudan iletişim: [your-email@example.com](mailto:your-email@example.com)

---

<div align="center">

**[⬆ Başa dön](#docx-unpacker-web-uygulaması)**

❤️ ile yapıldı [Your Name](https://github.com/yourusername) tarafından

</div>
## 📸 Screenshots

![Screenshot 1](docs/screen-shot-1.png)
![Screenshot 2](docs/screen-shot-2.png)
