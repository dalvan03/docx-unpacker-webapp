# تطبيق DOCX Unpacker الويب

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Ready-000000?style=flat-square&logo=vercel)](https://vercel.com/)

> **اقرأ بلغات أخرى:** [English](README.md) | [Português (Brasil)](README-pt-br.md) | [Español](README-es.md) | [Français](README-fr.md) | [Deutsch](README-de.md) | [日本語](README-ja.md) | [中文](README-zh.md) | [हिन्दी](README-hi.md) | [বাংলা](README-bn.md) | [తెలుగు](README-te.md) | [தமிழ்](README-ta.md) | **العربية**

تطبيق ويب حديث لاستخراج وعرض محتوى ملفات DOCX. مبني باستخدام Next.js و TypeScript و Tailwind CSS، مع دعم متعدد اللغات وتحسين SEO.

## 📋 نظرة عامة

تطبيق DOCX Unpacker الويب هو تطبيق ويب يسمح للمستخدمين برفع مستندات Microsoft Word (.docx) وعرض محتواها مباشرة في متصفح الويب. يقوم التطبيق باستخراج محتوى المستند وعرضه في تنسيق منظم وقابل للقراءة.

### ✨ الميزات الرئيسية

- 📄 **رفع ملفات DOCX**: السحب والإفلات أو النقر لتحديد الملف
- 🔍 **استخراج المحتوى**: استخراج النصوص والصور والجداول من المستندات
- 🎨 **تصميم متجاوب**: عرض محسن لجميع الأجهزة
- 🌍 **دعم متعدد اللغات**: دعم 21 لغة
- ⚡ **معالجة سريعة**: معالجة فعالة للملفات من جانب العميل
- 🔒 **محوري الخصوصية**: الملفات تتم معالجتها محلياً ولا ترسل للخادم
- 🎯 **محسن لـ SEO**: محسن لمحركات البحث
- 📱 **جاهز لـ PWA**: ميزات تطبيق الويب التقدمي

## 🛠️ المكدس التقني

- **الإطار**: Next.js 14 (App Router)
- **اللغة**: TypeScript
- **التصميم**: Tailwind CSS
- **مكونات UI**: Radix UI
- **الأيقونات**: Lucide React
- **معالجة الملفات**: JSZip, xml2js
- **التدويل**: next-intl
- **النشر**: Vercel
- **تكامل AI**: Google Genkit (اختياري)

## 🏗️ البنية المعمارية

```
المستخدم → رفع الملف → معالجة من جانب العميل → عرض المحتوى
    ↓
[المتصفح] → [JSZip] → [تحليل XML] → [عرض React]
```

### المكونات الرئيسية

1. **رافع الملفات**: واجهة السحب والإفلات
2. **محلل DOCX**: استخراج وتحليل محتوى الملف
3. **عارض المحتوى**: عرض المحتوى المنظم
4. **نظام متعدد اللغات**: تبديل اللغة الديناميكي
5. **مكون SEO**: إنشاء البيانات الوصفية وخريطة الموقع

## 📸 لقطات الشاشة

*ملاحظة: سيتم إضافة لقطات الشاشة في المستقبل*

## 🚀 البدء

### المتطلبات المسبقة

- Node.js 18.0 أو أحدث
- npm أو yarn أو pnpm أو bun

### التثبيت

1. استنساخ المستودع:
```bash
git clone https://github.com/yourusername/docx-unpacker-webapp.git
cd docx-unpacker-webapp
```

2. تثبيت التبعيات:
```bash
npm install
# أو
yarn install
# أو
pnpm install
```

3. تشغيل خادم التطوير:
```bash
npm run dev
# أو
yarn dev
# أو
pnpm dev
```

4. افتح [http://localhost:3000](http://localhost:3000) في متصفحك

## 📖 الاستخدام

### الاستخدام الأساسي

1. **رفع الملف**: اسحب وأفلت ملف DOCX أو انقر لتحديده
2. **انتظار المعالجة**: التطبيق يعالج الملف تلقائياً
3. **عرض المحتوى**: المحتوى المستخرج يظهر في تنسيق منظم
4. **تغيير اللغة**: استخدم منتقي اللغة في الزاوية العلوية اليمنى لتغيير اللغة

### تنسيقات الملفات المدعومة

- `.docx` - مستندات Microsoft Word (2007 والإصدارات الأحدث)

### القيود

- الحد الأقصى لحجم الملف: 10MB
- التنسيق المعقد قد يتم تبسيطه
- الماكرو أو كود VBA غير مدعوم

## 🌍 التدويل (i18n)

يدعم هذا التطبيق 21 لغة التالية:

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

### إضافة لغة جديدة

1. إنشاء ملف لغة جديد في مجلد `messages/`
2. تكوين اللغة في `src/i18n/request.ts`
3. إنشاء ملف README المقابل

## 🔍 SEO وخريطة الموقع

- **بيانات وصفية ديناميكية**: علامات وصفية محسنة لكل لغة
- **بيانات منظمة**: ترميز Schema في تنسيق JSON-LD
- **خريطة موقع تلقائية**: مع جميع اللغات والصفحات
- **Open Graph**: تحسين مشاركة وسائل التواصل الاجتماعي
- **Twitter Cards**: مشاركة Twitter محسنة

## 📁 هيكل المشروع

```
docx-unpacker-webapp/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # مكونات React
│   ├── lib/                 # وظائف المساعدة
│   ├── i18n/               # تكوين التدويل
│   └── ai/                 # تكامل AI (اختياري)
├── messages/               # ملفات الترجمة
├── public/                 # الأصول الثابتة
├── README-*.md            # README خاص باللغة
└── package.json           # تكوين المشروع
```

## 🗺️ خارطة الطريق

### أهداف قصيرة المدى
- [ ] تحسين معالجة الملفات
- [ ] دعم المزيد من تنسيقات الملفات
- [ ] تحسينات الأداء
- [ ] تحسينات إمكانية الوصول

### أهداف متوسطة المدى
- [ ] معالجة الملفات المجمعة
- [ ] دعم تنسيق متقدم
- [ ] ميزات التصدير
- [ ] تفضيلات المستخدم

### أهداف طويلة المدى
- [ ] تكامل التخزين السحابي
- [ ] ميزات التعاون
- [ ] تطوير API
- [ ] تطبيق الهاتف المحمول

## 🧪 الاختبار والجودة

```bash
# تشغيل الاختبارات
npm run test

# تشغيل linter
npm run lint

# فحص الأنواع
npm run type-check

# البناء
npm run build
```

## 🤝 المساهمة

المساهمات مرحب بها! يرجى اتباع هذه الخطوات:

1. فورك المشروع
2. إنشاء فرع الميزة (`git checkout -b feature/amazing-feature`)
3. كوميت التغييرات (`git commit -m 'Add amazing feature'`)
4. دفع إلى الفرع (`git push origin feature/amazing-feature`)
5. فتح Pull Request

راجع [CONTRIBUTING.md](CONTRIBUTING.md) للتفاصيل.

## 📜 مدونة قواعد السلوك

يتبنى هذا المشروع [Contributor Covenant](CODE_OF_CONDUCT.md) مدونة قواعد السلوك. بالمشاركة، أنت توافق على الالتزام بهذه المدونة.

## 🔒 الأمان

إذا اكتشفت ثغرة أمنية، يرجى الإبلاغ عنها باتباع الإرشادات في [SECURITY.md](SECURITY.md).

## 📄 الترخيص

هذا المشروع مرخص تحت [MIT License](LICENSE).

## 🔧 الصيانة

- **صيانة نشطة**: هذا المشروع يتم صيانته بنشاط
- **استجابة القضايا**: عادة خلال 24-48 ساعة
- **تكرار التحديثات**: تحديثات التبعيات المنتظمة وإصلاحات الأمان

## 🙏 الشكر والتقدير

- فريق Next.js - للإطار الرائع
- فريق Tailwind CSS - لنظام التصميم الجميل
- مجتمع المصدر المفتوح - للدعم المستمر

## 📞 الدعم والأسئلة الشائعة

### الأسئلة الشائعة

**س: ما هي تنسيقات الملفات المدعومة؟**
ج: حالياً، فقط ملفات .docx (Microsoft Word 2007 والإصدارات الأحدث) مدعومة.

**س: هل يتم إرسال الملفات إلى الخادم؟**
ج: لا، جميع المعالجات تحدث في المتصفح ولا يتم إرسال الملفات إلى الخادم.

**س: ما هو الحد الأقصى لحجم الملف؟**
ج: الحد الحالي هو 10MB.

### الحصول على الدعم

- 🐛 تقارير الأخطاء: [GitHub Issues](https://github.com/yourusername/docx-unpacker-webapp/issues)
- 💡 طلبات الميزات: [GitHub Discussions](https://github.com/yourusername/docx-unpacker-webapp/discussions)
- 📧 اتصال مباشر: [your-email@example.com](mailto:your-email@example.com)

---

<div align="center">

**[⬆ العودة إلى الأعلى](#تطبيق-docx-unpacker-الويب)**

صنع بـ ❤️ بواسطة [Your Name](https://github.com/yourusername)

</div>
## 📸 Screenshots

![Screenshot 1](docs/screen-shot-1.png)
![Screenshot 2](docs/screen-shot-2.png)
