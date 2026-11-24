/* Trust Brand - demo catalog data.
   Prices are illustrative demo prices in Egyptian Pounds (EGP), not real offers. */
const TB_CATEGORIES = [
  { id: 'diagnostics', en: 'Diagnostics & Devices', ar: 'أجهزة التشخيص', icon: '🩺' },
  { id: 'ppe',         en: 'Gloves & Masks',        ar: 'قفازات وكمامات', icon: '🧤' },
  { id: 'first-aid',   en: 'First Aid',             ar: 'إسعافات أولية', icon: '🩹' },
  { id: 'home-care',   en: 'Home Care',             ar: 'العناية المنزلية', icon: '🏠' },
  { id: 'supports',    en: 'Braces & Supports',     ar: 'دعامات وجبائر', icon: '🦵' }
];

const TB_PRODUCTS = [
  {
    id: 'thermometer', sku: 'TB-1001', cat: 'diagnostics',
    en: 'FlexTip Digital Thermometer', ar: 'ترمومتر ديجيتال برأس مرن',
    price: 240, old: null, rating: 4.6, reviews: 128, stock: 42,
    img: 'thermometer.jpg', featured: true,
    desc_en: 'Fast 10-second reading with a flexible tip for comfort. Beeper signal, last-reading memory and automatic shut-off. Suitable for oral, underarm or rectal use.',
    desc_ar: 'قياس سريع خلال 10 ثوانٍ مع رأس مرن لمزيد من الراحة. إشارة صوتية عند انتهاء القياس، ذاكرة لآخر قراءة، وإيقاف تلقائي. مناسب للاستخدام عن طريق الفم أو الإبط.',
    specs: { en: ['10-second read', 'Flexible tip', '°C / °F switchable', 'Water resistant'], ar: ['قراءة خلال 10 ثوانٍ', 'رأس مرن', 'تبديل بين مئوية وفهرنهايت', 'مقاوم للماء'] }
  },
  {
    id: 'bp-monitor', sku: 'TB-1002', cat: 'diagnostics',
    en: 'Automatic Blood Pressure Monitor', ar: 'جهاز قياس ضغط الدم الأوتوماتيكي',
    price: 1450, old: 1750, rating: 4.8, reviews: 342, stock: 18,
    img: 'bp-monitor.jpg', featured: true,
    desc_en: 'Fully automatic upper-arm monitor with a large backlit display, irregular heartbeat detection and memory for two users (120 readings each). Cuff fits 22-42 cm arms.',
    desc_ar: 'جهاز أوتوماتيكي بالكامل للذراع العلوي مع شاشة كبيرة مضيئة، وكشف عدم انتظام ضربات القلب، وذاكرة لمستخدمين اثنين (120 قراءة لكل مستخدم). سوار يناسب أذرع 22-42 سم.',
    specs: { en: ['One-touch measurement', '2 users x 120 memories', 'Irregular heartbeat indicator', 'Includes cuff, batteries and pouch'], ar: ['قياس بلمسة واحدة', 'مستخدمان × 120 قراءة', 'مؤشر عدم انتظام النبض', 'يأتي مع السوار والبطاريات وحقيبة'] }
  },
  {
    id: 'glucose-meter', sku: 'TB-1003', cat: 'diagnostics',
    en: 'Glucose Meter Starter Kit', ar: 'عدة جهاز قياس سكر الدم',
    price: 950, old: null, rating: 4.5, reviews: 210, stock: 25,
    img: 'glucose-meter.jpg',
    desc_en: 'Complete starter kit: meter, lancing device, 25 test strips and travel case. 5-second result from a tiny 0.5 µL blood sample, with 500-test memory and averages.',
    desc_ar: 'عدة كاملة للمبتدئين: الجهاز، قلم الوخز، 25 شريط اختبار وحقيبة للحمل. نتيجة خلال 5 ثوانٍ من عينة دم صغيرة 0.5 ميكرولتر، مع ذاكرة تسع 500 قراءة ومتوسطات.',
    specs: { en: ['5-second result', '0.5 µL sample', '500-reading memory', 'Kit includes 25 strips'], ar: ['نتيجة خلال 5 ثوانٍ', 'عينة 0.5 ميكرولتر', 'ذاكرة 500 قراءة', 'العدة تشمل 25 شريطًا'] }
  },
  {
    id: 'stethoscope', sku: 'TB-1004', cat: 'diagnostics',
    en: 'Classic Dual-Head Stethoscope', ar: 'سماعة طبية كلاسيكية برأسين',
    price: 620, old: null, rating: 4.7, reviews: 96, stock: 30,
    img: 'stethoscope.jpg', featured: true,
    desc_en: 'Lightweight dual-head stethoscope for students and professionals. Stainless-steel chest piece, soft sealing ear tips and non-chill rim. Ideal for nursing and clinical rounds.',
    desc_ar: 'سماعة خفيفة برأسين لطلاب كليات التمريض والطب والممارسين. قطعة صدر من الستانلس ستيل، سماعات أذن ناعمة محكمة، وحلقة لا تبرد على الجلد.',
    specs: { en: ['Dual-head chest piece', 'Stainless steel', 'Soft-seal ear tips', 'Spare ear tips included'], ar: ['رأس مزدوج', 'ستانلس ستيل', 'سدادات أذن ناعمة', 'سدادات إضافية مرفقة'] }
  },
  {
    id: 'oximeter', sku: 'TB-1005', cat: 'diagnostics',
    en: 'Fingertip Pulse Oximeter', ar: 'جهاز قياس الأكسجين بالإصبع',
    price: 480, old: 600, rating: 4.4, reviews: 187, stock: 55,
    img: 'oximeter.jpg',
    desc_en: 'Measures SpO2 and pulse rate in seconds with a bright rotating OLED display. Auto shut-off, lanyard included, runs on two AAA batteries.',
    desc_ar: 'يقيس نسبة الأكسجين في الدم (SpO2) ومعدل النبض خلال ثوانٍ مع شاشة OLED ساطعة دوّارة. إيقاف تلقائي، حبل تعليق مرفق، ويعمل ببطاريتين AAA.',
    specs: { en: ['SpO2 + pulse rate', 'OLED display', 'Auto shut-off', '2x AAA included'], ar: ['أكسجين الدم + النبض', 'شاشة OLED', 'إيقاف تلقائي', 'بطاريتان AAA مرفقتان'] }
  },
  {
    id: 'gloves', sku: 'TB-1006', cat: 'ppe',
    en: 'Nitrile Examination Gloves - Box of 100', ar: 'قفازات نيتريل للفحص - علبة 100 قطعة',
    price: 320, old: null, rating: 4.6, reviews: 420, stock: 120,
    img: 'gloves.jpg', featured: true,
    desc_en: 'Powder-free, latex-free nitrile gloves with textured fingertips for a secure grip. Ambidextrous, single use. Sizes S, M, L and XL.',
    desc_ar: 'قفازات نيتريل خالية من البودرة واللاتكس بأطراف أصابع محببة لثبات أفضل. تناسب اليدين، للاستخدام مرة واحدة. متوفرة بمقاسات S وM وL وXL.',
    specs: { en: ['Powder & latex free', 'Textured fingertips', 'Box of 100', 'Sizes S-XL'], ar: ['بدون بودرة أو لاتكس', 'أطراف محببة', 'علبة 100 قطعة', 'مقاسات S-XL'] }
  },
  {
    id: 'masks', sku: 'TB-1007', cat: 'ppe',
    en: '3-Ply Surgical Face Masks - Box of 50', ar: 'كمامات جراحية 3 طبقات - علبة 50 قطعة',
    price: 150, old: null, rating: 4.5, reviews: 510, stock: 200,
    img: 'masks.jpg',
    desc_en: 'Three-layer disposable masks with a melt-blown filter layer, adjustable nose wire and soft ear loops. Breathable and comfortable for daily wear.',
    desc_ar: 'كمامات للاستخدام مرة واحدة من ثلاث طبقات مع طبقة فلتر، ومشبك أنف قابل للتعديل، وحلقات أذن ناعمة. مريحة وقابلة للتنفس للاستخدام اليومي.',
    specs: { en: ['3-ply with filter layer', 'Adjustable nose wire', 'Box of 50', 'Single use'], ar: ['3 طبقات مع فلتر', 'مشبك أنف قابل للتعديل', 'علبة 50 قطعة', 'استخدام مرة واحدة'] }
  },
  {
    id: 'face-shield', sku: 'TB-1008', cat: 'ppe',
    en: 'Reusable Anti-Fog Face Shield', ar: 'واقي وجه قابل لإعادة الاستخدام مضاد للضباب',
    price: 90, old: null, rating: 4.2, reviews: 74, stock: 80,
    img: 'face-shield.jpg',
    desc_en: 'Full-face clear shield with anti-fog coating and a soft foam forehead band. Lightweight, reusable and easy to disinfect.',
    desc_ar: 'واقٍ شفاف يغطي الوجه بالكامل بطبقة مضادة للضباب وشريط إسفنجي مريح للجبهة. خفيف الوزن وقابل لإعادة الاستخدام وسهل التعقيم.',
    specs: { en: ['Anti-fog coating', 'Foam forehead band', 'Reusable', 'One size'], ar: ['طبقة مضادة للضباب', 'شريط إسفنجي مريح', 'قابل لإعادة الاستخدام', 'مقاس واحد'] }
  },
  {
    id: 'first-aid-kit', sku: 'TB-1009', cat: 'first-aid',
    en: 'Family First Aid Kit (120 Pieces)', ar: 'حقيبة إسعافات أولية منزلية (120 قطعة)',
    price: 540, old: 650, rating: 4.7, reviews: 265, stock: 36,
    img: 'first-aid-kit.jpg', featured: true,
    desc_en: 'A 120-piece kit in a durable zippered case: bandages, gauze, antiseptic wipes, scissors, tweezers, instant cold pack, gloves and a first-aid guide. For home, car and travel.',
    desc_ar: 'حقيبة من 120 قطعة في علبة متينة بسحّاب: ضمادات، شاش، مناديل مطهرة، مقص، ملقاط، كيس ثلج فوري، قفازات ودليل إسعافات أولية. مناسبة للمنزل والسيارة والسفر.',
    specs: { en: ['120 pieces', 'Zippered hard case', 'Includes guide booklet', 'Home, car & travel'], ar: ['120 قطعة', 'علبة صلبة بسحّاب', 'تشمل دليلًا إرشاديًا', 'للمنزل والسيارة والسفر'] }
  },
  {
    id: 'gauze', sku: 'TB-1010', cat: 'first-aid',
    en: 'Sterile Gauze Bandage Roll 10cm x 4.5m', ar: 'لفة شاش معقم 10 سم × 4.5 م',
    price: 45, old: null, rating: 4.3, reviews: 58, stock: 300,
    img: 'gauze.jpg',
    desc_en: 'Soft, absorbent sterile gauze roll for wound dressing and securing pads. Individually wrapped, 10 cm wide, 4.5 m long.',
    desc_ar: 'لفة شاش معقمة ناعمة عالية الامتصاص لتضميد الجروح وتثبيت الضمادات. مغلفة منفردة، بعرض 10 سم وطول 4.5 متر.',
    specs: { en: ['Sterile, single wrapped', '10 cm x 4.5 m', 'Highly absorbent', 'Latex free'], ar: ['معقمة ومغلفة منفردة', '10 سم × 4.5 م', 'امتصاص عالٍ', 'خالية من اللاتكس'] }
  },
  {
    id: 'antiseptic', sku: 'TB-1011', cat: 'first-aid',
    en: 'Antiseptic Spray 100 ml', ar: 'بخاخ مطهر للجروح 100 مل',
    price: 85, old: null, rating: 4.4, reviews: 143, stock: 90,
    img: 'antiseptic.jpg',
    desc_en: 'No-sting antiseptic spray for minor cuts, scrapes and burns. Gentle on skin, suitable for children, no need to touch the wound.',
    desc_ar: 'بخاخ مطهر لا يسبب لسعة للجروح والخدوش والحروق البسيطة. لطيف على البشرة ومناسب للأطفال، دون الحاجة للمس الجرح.',
    specs: { en: ['No-sting formula', '100 ml spray', 'For minor wounds', 'Child friendly'], ar: ['تركيبة بدون لسعة', 'بخاخ 100 مل', 'للجروح البسيطة', 'مناسب للأطفال'] }
  },
  {
    id: 'gel-pack', sku: 'TB-1012', cat: 'home-care',
    en: 'Reusable Hot & Cold Gel Pack', ar: 'وسادة جل ساخنة وباردة قابلة لإعادة الاستخدام',
    price: 130, old: null, rating: 4.5, reviews: 89, stock: 65,
    img: 'gel-pack.jpg',
    desc_en: 'Microwave for heat or freeze for cold therapy. Flexible even when frozen, with a soft fabric sleeve. Helps soothe muscle aches, swelling and sports injuries.',
    desc_ar: 'تُسخَّن في الميكروويف أو تُجمَّد للعلاج بالبرودة. تبقى مرنة حتى وهي مجمدة، مع غلاف قماشي ناعم. تساعد على تهدئة آلام العضلات والتورم وإصابات الرياضة.',
    specs: { en: ['Hot or cold therapy', 'Stays flexible frozen', 'Fabric sleeve included', 'Reusable'], ar: ['علاج حراري أو بارد', 'مرنة حتى بعد التجميد', 'غلاف قماشي مرفق', 'قابلة لإعادة الاستخدام'] }
  },
  {
    id: 'pill-organizer', sku: 'TB-1013', cat: 'home-care',
    en: 'Weekly Pill Organizer - 4 Times a Day', ar: 'منظم أدوية أسبوعي - 4 جرعات يوميًا',
    price: 95, old: null, rating: 4.6, reviews: 176, stock: 110,
    img: 'pill-organizer.jpg',
    desc_en: 'Seven detachable daily boxes, each with morning, noon, evening and bedtime compartments. Large easy-open lids with clear day labels in Arabic and English.',
    desc_ar: 'سبع علب يومية قابلة للفصل، كل منها بأقسام للصباح والظهر والمساء وقبل النوم. أغطية كبيرة سهلة الفتح مع أيام واضحة بالعربية والإنجليزية.',
    specs: { en: ['7 days x 4 doses', 'Detachable day boxes', 'Easy-open lids', 'BPA free'], ar: ['7 أيام × 4 جرعات', 'علب يومية قابلة للفصل', 'أغطية سهلة الفتح', 'خالٍ من BPA'] }
  },
  {
    id: 'scale', sku: 'TB-1014', cat: 'home-care',
    en: 'Digital Body Scale 180 kg', ar: 'ميزان وزن ديجيتال حتى 180 كجم',
    price: 480, old: null, rating: 4.3, reviews: 132, stock: 28,
    img: 'scale.jpg',
    desc_en: 'Tempered-glass bathroom scale with a backlit display, step-on activation and auto-calibration. Measures up to 180 kg in 100 g steps.',
    desc_ar: 'ميزان زجاجي مقوّى بشاشة مضيئة، يعمل بمجرد الوقوف عليه ويعاير نفسه تلقائيًا. يقيس حتى 180 كجم بدقة 100 جرام.',
    specs: { en: ['180 kg capacity', '100 g precision', 'Backlit LCD', 'Tempered glass'], ar: ['سعة 180 كجم', 'دقة 100 جرام', 'شاشة LCD مضيئة', 'زجاج مقوّى'] }
  },
  {
    id: 'wrist-brace', sku: 'TB-1015', cat: 'supports',
    en: 'Adjustable Wrist Brace', ar: 'دعامة معصم قابلة للتعديل',
    price: 210, old: null, rating: 4.4, reviews: 67, stock: 40,
    img: 'wrist-brace.jpg',
    desc_en: 'Breathable wrist support with a removable metal splint and three adjustable straps. For sprains, strain and carpal tunnel comfort. Left or right hand, sizes S-L.',
    desc_ar: 'دعامة معصم قابلة للتنفس مع جبيرة معدنية قابلة للإزالة وثلاثة أحزمة قابلة للتعديل. للالتواءات والشد وراحة متلازمة النفق الرسغي. لليد اليمنى أو اليسرى، مقاسات S-L.',
    specs: { en: ['Removable splint', '3 adjustable straps', 'Breathable fabric', 'Left or right'], ar: ['جبيرة قابلة للإزالة', '3 أحزمة قابلة للتعديل', 'قماش قابل للتنفس', 'يمين أو يسار'] }
  },
  {
    id: 'knee-sleeve', sku: 'TB-1016', cat: 'supports',
    en: 'Compression Knee Support Sleeve', ar: 'رابطة ركبة مرنة بالضغط',
    price: 180, old: 230, rating: 4.5, reviews: 154, stock: 48,
    img: 'knee-sleeve.jpg',
    desc_en: 'Elastic compression sleeve that supports the knee during walking, sport and recovery. Anti-slip silicone bands keep it in place. Sizes M-XXL.',
    desc_ar: 'رابطة ضغط مرنة تدعم الركبة أثناء المشي والرياضة والتأهيل. أشرطة سيليكون مانعة للانزلاق تثبتها في مكانها. مقاسات M-XXL.',
    specs: { en: ['Compression knit', 'Anti-slip silicone', 'For sport & recovery', 'Sizes M-XXL'], ar: ['نسيج ضاغط', 'سيليكون مانع للانزلاق', 'للرياضة والتأهيل', 'مقاسات M-XXL'] }
  }
];

const TB_SHIPPING = { flat: 60, freeOver: 1000 };
