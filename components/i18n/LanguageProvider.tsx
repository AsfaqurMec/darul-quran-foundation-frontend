'use client';

import * as React from 'react';

export type Lang = 'bn' | 'en' | 'ar';
type TranslateFunction = (key: keyof typeof DICT, overrideLang?: Lang) => string;

type Dictionary = Record<string, Record<Lang, string>>;

const DICT: Dictionary = {
  // Navigation
  donate: { bn: 'দান করুন', en: 'Donate', ar: 'تبرع' },
  login: { bn: 'লগইন', en: 'Login', ar: 'تسجيل الدخول' },
  home: { bn: 'হোম', en: 'Home', ar: 'الرئيسية' },
  about: { bn: 'আমাদের সম্পর্কে', en: 'About Us', ar: 'من نحن' },
  programs: { bn: 'কর্মসূচিসমূহ', en: 'Programs', ar: 'البرامج' },
  programsArchive: { bn: 'প্রোগ্রাম আর্কাইভ', en: 'Program Archive', ar: 'أرشيف البرامج' },
  activityDetails: { bn: 'কার্যক্রমের বিবরণ', en: 'Activity Details', ar: 'تفاصيل النشاط' },
  galleryImages: { bn: 'ছবিসমূহ', en: 'Images', ar: 'الصور' },
  projectGoalsObjectives: { bn: 'প্রকল্পের লক্ষ্য-উদ্দেশ্য', en: 'Project Goals-Objectives', ar: 'أهداف ومقاصد المشروع' },
  beneficiaries: { bn: 'উপকারভোগী', en: 'Beneficiaries', ar: 'المستفيدون' },
  expenditureCategories: { bn: 'ব্যয়ের খাত', en: 'Expenditure Categories', ar: 'فئات المصروفات' },
  projectArea: { bn: 'প্রকল্পের এলাকা', en: 'Project Area', ar: 'منطقة المشروع' },
  projectDuration: { bn: 'মেয়াদ', en: 'Duration', ar: 'المدة' },
  activities: { bn: 'কর্মসূচিসমূহ', en: 'Programs', ar: 'الأنشطة' },
  gallery: { bn: 'গ্যালারি', en: 'Gallery', ar: 'المعرض' },
  galleryCategories: { bn: 'বিভাগসমূহ', en: 'Categories', ar: 'الفئات' },
  all: { bn: 'সব', en: 'All', ar: 'الكل' },
  // Gallery Categories
  categoryIftar: { bn: 'ইফতার', en: 'Iftar', ar: 'إفطار' },
  categoryFoodDistribution: { bn: 'খাদ্য বিতরণ', en: 'Food Distribution', ar: 'توزيع الطعام' },
  categoryQurbani: { bn: 'কুরবানি', en: 'Qurbani', ar: 'الأضحية' },
  categorySelfReliance: { bn: 'স্বাবলম্বিতা', en: 'Self Reliance', ar: 'الاكتفاء الذاتي' },
  categoryFlood: { bn: 'বন্যা', en: 'Flood', ar: 'فيضان' },
  categoryWinterRelief: { bn: 'শীত ত্রাণ', en: 'Winter Relief', ar: 'إغاثة الشتاء' },
  join: { bn: 'আমাদের সাথে যুক্ত হন', en: 'Get Involved', ar: 'انضم إلينا' },
  blog: { bn: 'কার্যক্রমসমূহ', en: 'Activities', ar: 'الأنشطة' },
  blogArchive: { bn: 'ব্লগসমূহ', en: 'Blogs', ar: 'المدونات' },
  notice: { bn: 'নোটিশ', en: 'Notice', ar: 'الإعلانات' },
  noticeBoard: { bn: 'নোটিশ বোর্ড', en: 'Notice Board', ar: 'لوحة الإعلانات' },
  contact: { bn: 'যোগাযোগ', en: 'Contact', ar: 'اتصل بنا' },
  
  // Foundation name
  foundationName: { bn: 'দারুল কুরআন ফাউন্ডেশন', en: 'Darul Quran Foundation', ar: 'مؤسسة دار القرآن' },
  foundationNameShort: { bn: 'দারুল কুরআন', en: 'DarulQuran', ar: 'دار القرآن' },
  
  // Auth / Login
  loginPageTitle: { bn: 'আপনার অ্যাকাউন্টে সাইন ইন করুন', en: 'Sign in to your account', ar: 'سجّل الدخول إلى حسابك' },
  loginPageSubtitle: { bn: 'দারুল কুরআন ফাউন্ডেশনের সেবাগুলো উপভোগ করতে লগইন করুন', en: 'Log in to continue supporting Darul Quran Foundation', ar: 'قم بتسجيل الدخول للمتابعة مع مؤسسة دار القرآن' },
  loginIdentifierLabel: { bn: 'ইমেইল বা মোবাইল', en: 'Email or phone', ar: 'البريد الإلكتروني أو الجوال' },
  loginIdentifierPlaceholder: { bn: 'ইমেইল বা ফোন নম্বর লিখুন', en: 'Enter email or phone number', ar: 'أدخل البريد الإلكتروني أو رقم الجوال' },
  loginPasswordLabel: { bn: 'পাসওয়ার্ড', en: 'Password', ar: 'كلمة المرور' },
  loginPasswordPlaceholder: { bn: 'আপনার পাসওয়ার্ড লিখুন', en: 'Enter your password', ar: 'أدخل كلمة المرور' },
  loginForgotPassword: { bn: 'পাসওয়ার্ড ভুলে গেছেন?', en: 'Forgot password?', ar: 'هل نسيت كلمة المرور؟' },
  loginSubmit: { bn: 'সাইন ইন করুন', en: 'Sign In', ar: 'تسجيل الدخول' },
  loginProcessing: { bn: 'প্রসেস করা হচ্ছে...', en: 'Processing...', ar: '...جاري المعالجة' },
  loginShowPassword: { bn: 'পাসওয়ার্ড দেখান', en: 'Show password', ar: 'إظهار كلمة المرور' },
  loginHidePassword: { bn: 'পাসওয়ার্ড লুকান', en: 'Hide password', ar: 'إخفاء كلمة المرور' },
  
  // Hero section
  heroTitle: { bn: 'দারুল কুরআন ফাউন্ডেশন', en: 'Darul Quran Foundation', ar: 'مؤسسة دار القرآن' },
  heroSubtitle: { bn: 'একটি অরাজনৈতিক, অলাভজনক শিক্ষা, দাওয়াহ ও পূর্ণ মানবকল্যাণে নিবেদিত সেবামূলক বেসরকারি-নিবন্ধিত প্রতিষ্ঠান', en: 'A non-political, non-profit educational, da\'wah and full human welfare dedicated service-oriented private-registered organization', ar: 'منظمة خدمية خاصة مسجلة غير سياسية وغير ربحية مكرسة للتعليم والدعوة والرفاهية الإنسانية الكاملة' },
  regNo: { bn: 'এস-১৩১১১/২০১৯', en: 'S-13111/2019', ar: 'S-13111/2019' },
  regNoLabel: { bn: 'নিবন্ধন নম্বর', en: 'Registration No', ar: 'رقم التسجيل' },
  learnMore: { bn: 'আরও জানুন', en: 'Learn More', ar: 'اعرف المزيد' },

  // Impact Video section
  impactVideoBadge: { bn: 'ভিডিও', en: 'Video', ar: 'فيديو' },
  impactVideoTitle: { bn: 'আমাদের কার্যক্রম সম্পর্কে ভিডিও', en: 'A Video About Our Activities', ar: 'فيديو عن أنشطتنا' },
  impactVideoSubtitle: {
    bn: 'দারুল কুরআন ফাউন্ডেশনের মাঠপর্যায়ের কাজগুলো এই সংক্ষিপ্ত ভিডিওতে দেখুন। আপনার অনুদানের প্রভাব সম্পর্কে জানুন আরও কাছ থেকে।',
    en: 'Discover Darul Quran Foundation’s on-ground efforts in this short video and see the impact of your contributions up close.',
    ar: 'تعرّف على جهود مؤسسة دار القرآن الميدانية في هذا الفيديو القصير، وشاهد أثر مساهماتك عن قرب.'
  },
  impactVideoHighlight: {
    bn: 'দারুল কুরআন ফাউন্ডেশনের যে কার্যক্রম সম্পর্কে আপনি হয়তো জানেন না',
    en: 'Darul Quran Foundation initiatives you may not know about',
    ar: 'مبادرات مؤسسة دار القرآن التي قد لا تعرفها'
  },
  impactVideoCTA: { bn: 'ভিডিও দেখুন', en: 'Watch Video', ar: 'شاهد الفيديو' },
  impactVideoCloseLabel: { bn: 'ভিডিও বন্ধ করুন', en: 'Close video', ar: 'أغلق الفيديو' },
  
  // Donation form
  makeDonation: { bn: 'আপনার অনুদান প্রদান করুন', en: 'Make Your Donation', ar: 'قدم تبرعك' },
  selectFund: { bn: 'তহবিল', en: 'Fund', ar: 'الصندوق' },
  selectFundPlaceholder: { bn: 'নির্বাচন করুন', en: 'Select', ar: 'اختر' },
  selectFundError: { bn: 'তহবিল নির্বাচন করুন', en: 'Please select a fund', ar: 'يرجى اختيار صندوق' },
  contactLabel: { bn: 'মোবাইল / ইমেইল', en: 'Mobile / Email', ar: 'الجوال / البريد الإلكتروني' },
  contactPlaceholder: { bn: 'মোবাইল নম্বর / ইমেইল লিখুন', en: 'Enter mobile number / email', ar: 'أدخل رقم الجوال / البريد الإلكتروني' },
  contactError: { bn: 'মোবাইল অথবা ইমেইল দিন', en: 'Please enter mobile or email', ar: 'يرجى إدخال الجوال أو البريد الإلكتروني' },
  contactNumberLengthError: { bn: 'যোগাযোগ নম্বর অবশ্যই ৭-১৪ সংখ্যক হতে হবে', en: 'Contact number must be between 7-14 digits', ar: 'يجب أن يكون رقم الاتصال بين 7-14 رقم' },
  contactInvalidFormatError: { bn: 'একটি বৈধ ইমেইল ঠিকানা বা ফোন নম্বর (৭-১৪ সংখ্যা) দিন', en: 'Please enter a valid email address or phone number (7-14 digits)', ar: 'يرجى إدخال عنوان بريد إلكتروني صالح أو رقم هاتف (7-14 رقم)' },
  amount: { bn: 'পরিমাণ', en: 'Amount', ar: 'المبلغ' },
  amountPlaceholder: { bn: '৳ সংখ্যা লিখুন', en: 'Enter amount', ar: 'أدخل المبلغ' },
  amountError: { bn: 'সংখ্যা লিখুন', en: 'Please enter amount', ar: 'يرجى إدخال المبلغ' },
  donationSuccess: { bn: 'ধন্যবাদ! আপনার অনুদানের তথ্য গৃহীত হয়েছে।', en: 'Thank you! Your donation information has been received.', ar: 'شكراً لك! تم استلام معلومات تبرعك.' },
  donationNote: { bn: 'দারুল কুরআন ফাউন্ডেশনে দান করতে করেই আপনি', en: 'You are donating to Darul Quran Foundation', ar: 'أنت تتبرع لمؤسسة دار القرآن' },
  clickForDetails: { bn: 'বিস্তারিত জানতে ক্লিক করুন', en: 'Click for details', ar: 'انقر للتفاصيل' },
  
  // Donation purposes
  orphanResponsibility: { bn: 'এতিমদের দায়িত্ব গ্রহণ', en: 'Orphan Responsibility', ar: 'رعاية الأيتام' },
  deprivedStudents: { bn: 'সুবিধাবঞ্চিত ছাত্রদের দায়িত্ব গ্রহণ', en: 'Deprived Students Support', ar: 'دعم الطلاب المحرومين' },
  widowResponsibility: { bn: 'বিধবা নারীর দায়িত্ব গ্রহণ', en: 'Widow Support', ar: 'رعاية الأرامل' },
  rehabilitationPoorFamily: { bn: 'দরিদ্র পরিবারের পুনর্বাসন', en: 'Poor Family Rehabilitation', ar: 'إعادة تأهيل الأسر الفقيرة' },
  tubeWellInstall: { bn: 'নলকূপ খনন', en: 'Tube Well Installation', ar: 'حفر الآبار' },
  wuduPlaceInstall: { bn: 'ওযুখানা স্থাপন', en: 'Ablution Place Installation', ar: 'إنشاء أماكن الوضوء' },
  dowryResponsibility: { bn: 'দায়গ্রস্ত কন্যার বিবাহ', en: 'Dowry Support', ar: 'دعم المهور' },
  skillDevelopment: { bn: 'স্কিল ডেভেলপমেন্ট', en: 'Skill Development', ar: 'تنمية المهارات' },
  winterClothes: { bn: 'শীত বস্ত্র বিতরণ', en: 'Winter Clothes Distribution', ar: 'توزيع الملابس الشتوية' },
  mosqueConstruction: { bn: 'মসজিদ নির্মাণ', en: 'Mosque Construction', ar: 'بناء المساجد' },
  orphanageConstruction: { bn: 'এতিমখানা নির্মাণ', en: 'Orphanage Construction', ar: 'بناء دار الأيتام' },
  zakatFund: { bn: 'যাকাত তহবিল', en: 'Zakat Fund', ar: 'صندوق الزكاة' },
  generalFund: { bn: 'সাধারণ তহবিল', en: 'General Fund', ar: 'الصندوق العام' },
  iftarProgram: { bn: 'ইফতার প্রোগ্রাম', en: 'Iftar Program', ar: 'برنامج الإفطار' },
  qurbaniProgram: { bn: 'কুরবানী প্রোগ্রাম', en: 'Qurbani Program', ar: 'برنامج الأضحية' },
  emergencyRelief: { bn: 'দুর্যোগে জরুরি ত্রাণ', en: 'Emergency Relief', ar: 'الإغاثة الطارئة' },
  shelterlessHousing: { bn: 'গৃহহীনদের গৃহ নির্মাণ', en: 'Housing for Homeless', ar: 'بناء مساكن للمشردين' },
  
  // About section
  aboutIntro1: { bn: 'দারুল কুরআন ফাউন্ডেশন শিক্ষা, দাওয়াহ ও পূর্ণ মানবকল্যাণে নিবেদিত একটি অরাজনৈতিক ও অলাভজনক সেবামূলক প্রতিষ্ঠান। নিবন্ধন নম্বর: এস-১৩১১১/২০১৯। ২০১৯ সালে শায়খ আহমাদুল্লাহ (হাফিযাহুল্লাহ) এই প্রতিষ্ঠানটি প্রতিষ্ঠা করেন।', en: 'Darul Quran Foundation is a non-political and non-profit service organization dedicated to education, da\'wah and full human welfare. Registration No: S-13111/2019. Sheikh Ahmadullah (Hafizahullah) established this organization in 2019.', ar: 'مؤسسة دار القرآن هي منظمة خدمية غير سياسية وغير ربحية مكرسة للتعليم والدعوة والرفاهية الإنسانية الكاملة. رقم التسجيل: S-13111/2019. أسس الشيخ أحمد الله (حفظه الله) هذه المنظمة في عام 2019.' },
  aboutIntro2: { bn: 'এই প্রতিষ্ঠান মানবতার শিক্ষা, মানুষের মুক্তি ও শান্তির দাওয়াহ, মানবকল্যাণের আদর্শ, সামাজিক সেবা, মসজিদ-সংস্কার, অনাথ সহায়তা এবং দারিদ্র্য মোকাবিলাসহ নানাবিধ কল্যাণমূলক কাজ পরিচালনা করছে।', en: 'This organization is conducting various welfare activities including education for humanity, da\'wah for human liberation and peace, ideals of human welfare, social services, mosque renovation, orphan support and poverty alleviation.', ar: 'تقوم هذه المنظمة بأنشطة رفاهية متنوعة تشمل تعليم الإنسانية والدعوة لتحرير الإنسان والسلام ومثل الرفاهية الإنسانية والخدمات الاجتماعية وتجديد المساجد ودعم الأيتام ومكافحة الفقر.' },
  aboutIntro3: { bn: 'লক্ষ্য ও উদ্দেশ্য—সুন্নাহভিত্তিক জীবন ও সমাজ গঠন করা এবং বিভিন্ন ইসলামী প্রজেক্টের বিস্তারের মাধ্যমে মানবতার কল্যাণে কাজ করা।', en: 'Goal and Objective—To build a Sunnah-based life and society and work for the welfare of humanity through the expansion of various Islamic projects.', ar: 'الهدف والغاية—بناء حياة ومجتمع قائم على السنة والعمل لرفاهية الإنسانية من خلال توسيع المشاريع الإسلامية المختلفة.' },
  
  // Policy Tabs
  policyAndIdeals: { bn: 'নীতি ও আদর্শ', en: 'Policy & Ideals', ar: 'السياسة والمثل' },
  vision: { bn: 'ভিশন', en: 'Vision', ar: 'الرؤية' },
  faq: { bn: 'প্রশ্নোত্তর', en: 'FAQ', ar: 'الأسئلة الشائعة' },
  policy1: { bn: 'পবিত্র কুরআন ও রাসুলের সুন্নাহর আলোকে নীতি ও আদর্শ।', en: 'Policy and ideals based on the Holy Quran and the Sunnah of the Prophet.', ar: 'السياسة والمثل المستندة إلى القرآن الكريم وسنة الرسول.' },
  policy2: { bn: 'ইসলামের প্রাথমিক যুগের শ্রেষ্ঠ মুসলিমদের অনুসরণ।', en: 'Following the best Muslims of the early Islamic era.', ar: 'اتباع أفضل المسلمين في العصر الإسلامي المبكر.' },
  policy3: { bn: 'ঐক্য, সংহতি ও পারস্পরিক আন্তরিক নীতি মেনে চলা।', en: 'Adhering to unity, solidarity and mutual respect.', ar: 'الالتزام بالوحدة والتضامن والاحترام المتبادل.' },
  policy4: { bn: 'সমাজের জন্য সহায়তামূলক ও মানবিক চেতনায় কাজ।', en: 'Working with a supportive and humanitarian spirit for society.', ar: 'العمل بروح داعمة وإنسانية للمجتمع.' },
  policy5: { bn: 'দাওয়াহ, শিক্ষা ও কল্যাণমুখী কার্যক্রমে জোর দেয়া।', en: 'Emphasizing da\'wah, education and welfare activities.', ar: 'التركيز على الدعوة والتعليم وأنشطة الرفاهية.' },
  policy6: { bn: 'সব মানুষের জন্য সেবা – বর্ণ, ধর্ম বা গোত্র নির্বিশেষে।', en: 'Service for all people – regardless of color, religion or ethnicity.', ar: 'الخدمة لجميع الناس - بغض النظر عن اللون أو الدين أو العرق.' },
  vision1: { bn: 'সুন্নাহভিত্তিক জ্ঞানচর্চা ও কর্মের মাধ্যমে সত্যিকার ইসলামি জীবন গড়ে তোলা।', en: 'Building a true Islamic life through Sunnah-based knowledge and practice.', ar: 'بناء حياة إسلامية حقيقية من خلال المعرفة والعمل القائم على السنة.' },
  vision2: { bn: 'শিক্ষা, দাওয়াহ ও মানবকল্যাণকে প্রযুক্তি-সমর্থ আধুনিক পদ্ধতিতে এগিয়ে নেয়া।', en: 'Advancing education, da\'wah and human welfare through technology-supported modern methods.', ar: 'تطوير التعليم والدعوة والرفاهية الإنسانية من خلال الأساليب الحديثة المدعومة بالتكنولوجيا.' },
  faqQuestion: { bn: 'প্রশ্ন:', en: 'Question:', ar: 'سؤال:' },
  faqAnswer: { bn: 'উত্তর:', en: 'Answer:', ar: 'إجابة:' },
  faqQuestionText: { bn: 'কিভাবে যুক্ত হব?', en: 'How can I join?', ar: 'كيف يمكنني الانضمام؟' },
  faqAnswerText: { bn: 'নিয়মিত দাতা/সদস্য/স্বেচ্ছাসেবক/ক্যারিয়ার অপশন থেকে শুরু করতে পারেন।', en: 'You can start from the regular donor/member/volunteer/career options.', ar: 'يمكنك البدء من خيارات المتبرع العادي/العضو/المتطوع/الوظيفة.' },
  
  // Finance Policy
  financePolicyTitle: { bn: 'আয়-ব্যয়ের নীতিমালা', en: 'Income-Expense Policy', ar: 'سياسة الدخل والمصروفات' },
  incomeSources: { bn: 'আয়ের উৎস', en: 'Income Sources', ar: 'مصادر الدخل' },
  expenseAreas: { bn: 'ব্যয়মুখুল বর্ণ', en: 'Expense Areas', ar: 'مجالات المصروفات' },
  managementPolicy: { bn: 'ব্যবস্থাপনা নীতি', en: 'Management Policy', ar: 'سياسة الإدارة' },
  income1: { bn: 'বিভিন্ন ব্যক্তি ও প্রতিষ্ঠান থেকে প্রাপ্ত স্বেচ্ছা অনুদান ও অর্থসহায়তা।', en: 'Voluntary donations and financial support received from various individuals and organizations.', ar: 'التبرعات الطوعية والدعم المالي المستلم من أفراد ومنظمات مختلفة.' },
  income2: { bn: 'সদস্য, সমর্থক ও শুভাকাঙ্ক্ষীদের এককালীন ও নিয়মিত অনুদান।', en: 'One-time and regular donations from members, supporters and well-wishers.', ar: 'التبرعات لمرة واحدة والمنتظمة من الأعضاء والداعمين والمحسنين.' },
  income3: { bn: 'ফাউন্ডেশনের যে কোনো প্রকল্পের জন্য সংরক্ষিত অর্থ।', en: 'Funds reserved for any project of the foundation.', ar: 'الأموال المحفوظة لأي مشروع من مؤسسة.' },
  income4: { bn: 'সৎ মুসলিমদের প্রেরণা যাকাত।', en: 'Zakat from sincere Muslims.', ar: 'الزكاة من المسلمين المخلصين.' },
  income5: { bn: 'ইফতার ও কুরবানিসহ বিশেষ প্রকল্প খাতে উৎসর্গকৃত অর্থ।', en: 'Funds dedicated to special project accounts including Iftar and Qurbani.', ar: 'الأموال المخصصة لحسابات المشاريع الخاصة بما في ذلك الإفطار والأضحية.' },
  income6: { bn: 'ফাউন্ডেশনের বিভিন্ন আয়োজনে প্রাপ্ত অর্থ।', en: 'Funds received from various foundation events.', ar: 'الأموال المستلمة من فعاليات المؤسسة المختلفة.' },
  expense1: { bn: 'শিক্ষা, দাওয়াহ, সেবা—আলোর পথে মানবকল্যাণমূলক খাতে ব্যয়।', en: 'Expenditure in educational, da\'wah, service—human welfare sectors on the path of light.', ar: 'المصروفات في القطاعات التعليمية والدعوية والخدمية - الرفاهية الإنسانية على طريق النور.' },
  expense2: { bn: 'প্রকল্প অনুযায়ী নির্ধারিত খাতে ব্যয়।', en: 'Expenditure in accounts determined according to projects.', ar: 'المصروفات في الحسابات المحددة وفقاً للمشاريع.' },
  expense3: { bn: 'গবেষণা, প্রকাশনা, ট্রেনিং, সচেতনতা কর্মসূচিতে ব্যয়।', en: 'Expenditure on research, publication, training, awareness programs.', ar: 'المصروفات على البحث والنشر والتدريب وبرامج التوعية.' },
  expense4: { bn: 'ফাউন্ডেশনের তত্ত্বাবধানে বিপর্যস্ত মানুষের সহায়তা।', en: 'Assistance to distressed people under the supervision of the foundation.', ar: 'المساعدة للأشخاص المنكوبين تحت إشراف المؤسسة.' },
  management1: { bn: 'হিসাবরক্ষণ ও অডিট নীতিমালা অনুযায়ী স্বচ্ছ ব্যবস্থাপনা।', en: 'Transparent management according to accounting and audit policies.', ar: 'إدارة شفافة وفقاً لسياسات المحاسبة والتدقيق.' },
  management2: { bn: 'বোর্ডের সিদ্ধান্ত ব্যতীত কোনো খাতে ব্যয় নয়।', en: 'No expenditure in any account without board decision.', ar: 'لا توجد مصروفات في أي حساب دون قرار المجلس.' },
  management3: { bn: 'প্রকল্পভিত্তিক তহবিলের অর্থ নির্দিষ্ট খাতে সংরক্ষণ ও ব্যয়।', en: 'Preservation and expenditure of project-based funds in designated accounts.', ar: 'الحفظ والمصروفات للأموال القائمة على المشاريع في حسابات محددة.' },
  management4: { bn: 'দাতাদের কাছে প্রয়োজনানুযায়ী রিপোর্টিং ও আপডেট প্রদান।', en: 'Providing reporting and updates to donors as needed.', ar: 'تقديم التقارير والتحديثات للمتبرعين حسب الحاجة.' },
  
  // Mission Triplet
  missionTitle: { bn: 'উন্নতির স্বার্থে, সুন্নাহর সাথে', en: 'For Progress, With Sunnah', ar: 'من أجل التقدم، مع السنة' },
  education: { bn: 'শিক্ষা', en: 'Education', ar: 'التعليم' },
  educationDesc: { bn: 'দ্বীনি ও সাধারণ শিক্ষার সমন্বিত সিলেবাসের মাদরাসা প্রতিষ্ঠা; স্কুল, কলেজ ও বিশ্ববিদ্যালয়সহ বিভিন্ন সাধারণ ও কারিগরি বিদ্যালয় প্রতিষ্ঠা; এ ছাড়াও আধুনিক শিক্ষার উদ্যোগ গ্রহণ', en: 'Establishing madrasas with integrated curriculum of religious and general education; establishing various general and technical schools including schools, colleges and universities; also taking initiatives for modern education', ar: 'إنشاء مدارس بمنهج متكامل للتعليم الديني والعام؛ إنشاء مدارس عامة وتقنية مختلفة بما في ذلك المدارس والكليات والجامعات؛ وأيضاً اتخاذ مبادرات للتعليم الحديث' },
  service: { bn: 'সেবা', en: 'Service', ar: 'الخدمة' },
  serviceDesc: { bn: 'দরিদ্রদের স্বাবলম্বীকরণ, বন্যাদের ত্রাণ ও পুনর্বাসন, নলকূপ ও পানি শোধনাগার স্থাপন, বৃক্ষরোপণ, শীতবস্ত্র বিতরণ, ইফতার বিতরণ, সবার জন্য কুরবানিসহ বিভিন্ন সেবামূলক কার্যক্রম', en: 'Self-reliance of the poor, relief and rehabilitation of flood victims, installation of tube wells and water treatment plants, tree planting, winter clothes distribution, iftar distribution, qurbani for all including various service activities', ar: 'اكتفاء الفقراء ذاتياً، إغاثة وإعادة تأهيل ضحايا الفيضانات، تركيب الآبار ومحطات معالجة المياه، زراعة الأشجار، توزيع الملابس الشتوية، توزيع الإفطار، الأضحية للجميع بما في ذلك أنشطة خدمية متنوعة' },
  dawah: { bn: 'দাওয়াহ', en: 'Dawah', ar: 'الدعوة' },
  dawahDesc: { bn: 'বই-পুস্তক রচনা ও প্রকাশনা, মসজিদ ও অডিওভিজ্যুয়ালভিত্তিক দ্বীনি হালাকাহ, দাওয়াহ বিষয়ক প্রশিক্ষণ ও কর্মশালাসহ অনলাইন-অফলাইনভিত্তিক বহুমুখী কার্যক্রম', en: 'Writing and publishing books, mosque and audiovisual-based religious circles, training and workshops on da\'wah including various online and offline activities', ar: 'كتابة ونشر الكتب، حلقات دينية قائمة على المساجد والصوتيات والمرئيات، التدريب وورش العمل حول الدعوة بما في ذلك أنشطة متنوعة عبر الإنترنت وخارجها' },
  
  // Join Us section
  joinUsTitle: { bn: 'আমাদের সাথে যুক্ত হোন', en: 'Join Us', ar: 'انضم إلينا' },
  joinUsSubtitle: { bn: 'নিচের যে কোনো পদ্ধতিতে যুক্ত হয়ে আত্মমানবতার সেবায় ভূমিকা রাখুন', en: 'Join in any of the following ways and contribute to the service of humanity', ar: 'انضم بأي من الطرق التالية وساهم في خدمة الإنسانية' },
  getInvolvedHeading: { bn: 'আমাদের সাথে যুক্ত হতে পারেন বিভিন্নভাবে', en: 'You can get involved with us in various ways', ar: 'يمكنك المشاركة معنا بطرق متنوعة' },
  regularDonor: { bn: 'নিয়মিত দাতা', en: 'Regular Donor', ar: 'متبرع منتظم' },
  lifetimeMember: { bn: 'আজীবন ও দাতা সদস্য', en: 'Lifetime & Donor Member', ar: 'عضو مدى الحياة ومتبرع' },
  volunteer: { bn: 'স্বেচ্ছাসেবক', en: 'Volunteer', ar: 'متطوع' },
  career: { bn: 'ক্যারিয়ার', en: 'Career', ar: 'الوظائف' },
  
  // Regular Donor Tab
  regularDonorNotice: { bn: 'নিয়মিত অনুদান সম্পর্কিত জিজ্ঞাসা বা কোনো সমস্যায় পড়লে, মেইল করুন', en: 'If you have any questions or issues regarding regular donations, please email', ar: 'إذا كان لديك أي أسئلة أو مشاكل بخصوص التبرعات المنتظمة، يرجى إرسال بريد إلكتروني' },
  regularDonorNoticeEmail: { bn: 'এ অথবা কল করুন', en: 'or call', ar: 'أو اتصل' },
  regularDonorVideoTitle: { bn: 'নিয়মিত দাতা হয়ে যান', en: 'Become a Regular Donor', ar: 'كن متبرعاً منتظماً' },
  regularDonorHadith: { bn: 'আল্লাহর কাছে সর্বাধিক প্রিয় আমল হলো, যা সদাসর্বদা নিয়মিত করা হয়, যদিও তা অল্প হয়। (সহিহ বুখারি, হাদিস ৬৪৬৪)', en: 'The most beloved deed to Allah is that which is done regularly, even if it is little. (Sahih al-Bukhari, Hadith 6464)', ar: 'أحب الأعمال إلى الله ما داوم عليه صاحبه وإن قل. (صحيح البخاري، حديث 6464)' },
  regularDonorDesc1: { bn: 'নিয়মিত অনুদান ফাউন্ডেশনকে টিকিয়ে রাখতে সবচেয়ে বেশি সাহায্য করে। নিয়মিত দানের অর্থেই মূলত সকল কল্যাণমুখী কার্যক্রম পরিচালিত হয়। নিয়মিত দানের জন্য কোনো অংক নির্দিষ্ট নেই, যে কোনো পরিমাণ দান করা যায়। আর যে কোনো ভালো কাজ অনিয়মিতভাবে বেশি করার চেয়ে নিয়মিতভাবে অল্প করা উত্তম।', en: 'Regular donations help the most in keeping the foundation running. All welfare activities are primarily conducted with regular donation funds. There is no specific amount required for regular donations; any amount can be donated. And it is better to do a small good deed regularly than to do a large one irregularly.', ar: 'التبرعات المنتظمة تساعد أكثر في الحفاظ على استمرارية المؤسسة. جميع أنشطة الرفاهية تُجرى بشكل أساسي بأموال التبرعات المنتظمة. لا يوجد مبلغ محدد مطلوب للتبرعات المنتظمة؛ يمكن التبرع بأي مبلغ. والأفضل أداء عمل خير صغير بانتظام من أداء عمل كبير بشكل غير منتظم.' },
  regularDonorDesc2: { bn: 'অনেকে নিয়মিত দান করতে চান, কিন্তু মনে থাকে না বলে দান করা হয়ে ওঠে না। এখন থেকে বিকাশ-নগদ এবং ভিসা-মাস্টারকার্ড ব্যবহারকারীরা দারুল কুরআন ফাউন্ডেশনের ওয়েবসাইট থেকে স্বয়ংক্রিয় পদ্ধতি চালু করে নিয়মিত দান করতে পারবেন। দৈনিক কিংবা মাসিক অপশন সিলেক্ট করে টাকার পরিমাণ সেট করে দিন। আপনি ভুলে গেলেও আপনার নির্ধারিত সময়ে নির্ধারিত পরিমাণ টাকা ফাউন্ডেশনের অ্যাকাউন্টে জমা হবে। চাইলে এই পদ্ধতিটি যেকোনো সময় বন্ধও করতে পারবেন।', en: 'Many people want to donate regularly, but forget, so they don\'t end up donating. From now on, bKash-Nagad and Visa-Mastercard users can activate the automatic system from AS-Sunnah Foundation\'s website to donate regularly. Select daily or monthly option and set the amount. Even if you forget, your predetermined amount will be deposited into the foundation\'s account at the scheduled time. You can also turn off this system anytime if you wish.', ar: 'كثير من الناس يريدون التبرع بانتظام، لكنهم ينسون، لذلك لا ينتهي بهم الأمر بالتبرع. من الآن فصاعداً، يمكن لمستخدمي bKash-Nagad و Visa-Mastercard تفعيل النظام التلقائي من موقع مؤسسة السنة للتبرع بانتظام. حدد خيار يومي أو شهري وقم بتعيين المبلغ. حتى إذا نسيت، سيتم إيداع مبلغك المحدد مسبقاً في حساب المؤسسة في الوقت المحدد. يمكنك أيضاً إيقاف هذا النظام في أي وقت إذا رغبت.' },
  regularDonorExpenseAreas: { bn: 'ব্যয়ের খাত', en: 'Expense Areas', ar: 'مجالات المصروفات' },
  regularDonorExpense1: { bn: 'দারুল কুরআন ফাউন্ডেশনের সকল সেবামূলক কার্যক্রম', en: 'All service activities of AS-Sunnah Foundation', ar: 'جميع الأنشطة الخدمية لمؤسسة السنة' },
  regularDonorExpense2: { bn: 'সকল নতুন কার্যক্রমের ব্যয় নির্বাহ', en: 'Expenditure for all new activities', ar: 'المصروفات لجميع الأنشطة الجديدة' },
  regularDonorExpense3: { bn: 'দাওয়াহ ও গবেষণা কার্যক্রম পরিচালনা', en: 'Management of da\'wah and research activities', ar: 'إدارة أنشطة الدعوة والبحث' },
  regularDonorExpense4: { bn: 'ফাউন্ডেশনের প্রশাসনিক ব্যয়', en: 'Administrative expenses of the foundation', ar: 'المصروفات الإدارية للمؤسسة' },
  regularDonorExpense5: { bn: 'ব্যবস্থাপনা ব্যয়', en: 'Management expenses', ar: 'مصروفات الإدارة' },
  regularDonorAutopayTitle: { bn: 'চালু করুন স্বয়ংক্রিয় পদ্ধতি', en: 'Activate Automatic System', ar: 'تفعيل النظام التلقائي' },
  regularDonorAutopayDesc: { bn: 'দৈনিক কিংবা মাসিক অপশন সিলেক্ট করে টাকার পরিমাণ সেট করে দিন। আপনি ভুলে গেলেও আপনার নির্ধারিত সময়ে নির্ধারিত পরিমাণ টাকা ফাউন্ডেশনের অ্যাকাউন্টে জমা হবে। চাইলে এই পদ্ধতিটি যেকোনো সময় বন্ধও করতে পারবেন।', en: 'Select daily or monthly option and set the amount. Even if you forget, your predetermined amount will be deposited into the foundation\'s account at the scheduled time. You can also turn off this system anytime if you wish.', ar: 'حدد خيار يومي أو شهري وقم بتعيين المبلغ. حتى إذا نسيت، سيتم إيداع مبلغك المحدد مسبقاً في حساب المؤسسة في الوقت المحدد. يمكنك أيضاً إيقاف هذا النظام في أي وقت إذا رغبت.' },
  
  // Lifetime Member Tab
  lifetimeMemberRulesTitle: { bn: 'আজীবন ও দাতা সদস্য হওয়ার নিয়ম', en: 'Rules for Becoming a Lifetime & Donor Member', ar: 'قواعد أن تصبح عضواً مدى الحياة ومتبرعاً' },
  lifetimeMemberDesc1: { bn: 'দারুল কুরআন ফাউন্ডেশনের মসজিদ কমপ্লেক্স-এর ৮ ও ৭ দাতা মোডেলে \'আজীবন সদস্য\' ও \'দাতা সদস্য\' সংযোজন করা হয়েছে।', en: 'Lifetime Member\' and \'Donor Member\' have been added to the 8 and 7 donor modes of AS-Sunnah Foundation\'s Mosque Complex.', ar: 'تمت إضافة \'عضو مدى الحياة\' و\'عضو متبرع\' إلى وضعي المتبرعين 8 و 7 من مجمع مسجد مؤسسة السنة.' },
  lifetimeMemberVideoTitle: { bn: 'সদস্য হওয়ার নিয়ম', en: 'Rules for Membership', ar: 'قواعد العضوية' },
  lifetimeMemberDesc2: { bn: 'আজীবন ও দাতা সদস্যরা ফাউন্ডেশনের দাওয়াহমুখী কল্যাণমূলক যে কোনো প্রকল্পে সম্পৃক্ত হতে পারবেন।', en: 'Lifetime and Donor Members can be involved in any of the foundation\'s da\'wah-oriented welfare projects.', ar: 'يمكن لأعضاء مدى الحياة والمتبرعين المشاركة في أي من مشاريع الرفاهية الموجهة للدعوة في المؤسسة.' },
  lifetimeMemberDesc3: { bn: 'কিস্তিতে পরিশোধের সুবিধাসহ সহজ শর্তে আজীবন/দাতা সদস্য হওয়ার সুযোগ রয়েছে। দারুল কুরআন ফাউন্ডেশন মসজিদ কমপ্লেক্স প্রকল্পের কাজ চলমান। এ প্রকল্পের প্রসারে আপনার এককালীন বা কিস্তিতে সহায়তা অব্যাহত থাকলে, আমরা দাওয়াহ, শিক্ষা, সেবাসহ আরও নানা কল্যাণমূলক কাজ করতে সক্ষম হব ইনশাআল্লাহ।', en: 'There is an opportunity to become a Lifetime/Donor Member on easy terms with installment payment facilities. AS-Sunnah Foundation Mosque Complex project work is ongoing. If your one-time or installment support continues for the expansion of this project, we will be able to do various welfare activities including da\'wah, education, and service, Insha\'Allah.', ar: 'هناك فرصة لتصبح عضواً مدى الحياة/متبرعاً بشروط سهلة مع مرافق دفع بالتقسيط. أعمال مشروع مجمع مسجد مؤسسة السنة مستمرة. إذا استمر دعمك لمرة واحدة أو بالتقسيط لتوسعة هذا المشروع، سنكون قادرين على القيام بأنشطة رفاهية متنوعة بما في ذلك الدعوة والتعليم والخدمة، إن شاء الله.' },
  lifetimeMemberMosqueTitle: { bn: 'দারুল কুরআন ফাউন্ডেশন মসজিদ কমপ্লেক্স ও ইসলামিক সেন্টার', en: 'AS-Sunnah Foundation Mosque Complex & Islamic Center', ar: 'مجمع مسجد مؤسسة السنة والمركز الإسلامي' },
  lifetimeMemberMosqueDesc1: { bn: 'রাসূলুল্লাহ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম)-এর মসজিদ সালাত আদায়ের পাশাপাশি বহুবিধ কল্যাণের কেন্দ্র ছিল। ঢাকা মসজিদের শহর হলেও বেশিরভাগ মসজিদে নামাযের জামায়াত এবং বড়জোর মকতবের মধ্যেই সীমাবদ্ধ। দারুল কুরআন ফাউন্ডেশন ঢাকায় একটি আদর্শ মসজিদ গড়ে তুলতে চায়, যা সালাত আদায় ছাড়াও বিভিন্ন কল্যাণমূলক কাজে মুখর থাকবে। এতে বিভিন্ন শ্রেণী-পেশা ও বয়সের মানুষের দীনি শিক্ষার নিয়মিত আয়োজন, প্রতি সপ্তাহের খুতবার সারসংক্ষেপ লিখিত আকারে মুসুল্লীদের মাঝে বিতরণ, প্রাজ্ঞ উলামায়ে কিরামের সাক্ষাৎ ও সান্নিধ্যলাভের সুযোগ, নারী ও শিশুদের জন্য বিশেষ কর্নার, দুস্থ রোগীদের বিনামূল্যে প্রাথমিক চিকিৎসা, পারিবারিক ও ব্যক্তিগত কলহ নিরসনকল্পে আলেমদের মাধ্যমে কাউন্সেলিংয়ের ব্যবস্থা ও গ্রাম থেকে বিভিন্ন সাময়িক প্রয়োজনে ঢাকায় আগত ব্যক্তিদের জন্য মুসাফিরখানাসহ বিভিন্ন কার্যক্রম থাকবে ইন-শা-আল্লাহ।', en: 'The Prophet\'s (peace be upon him) mosque was a center of multiple benefits alongside offering prayers. Although Dhaka is a city of mosques, most mosques are limited to congregational prayers and at most a madrasa. AS-Sunnah Foundation wants to build an ideal mosque in Dhaka that will be active in various welfare activities besides offering prayers. This will include regular arrangements for religious education for people of various classes, professions and ages, distribution of written summaries of weekly sermons among worshippers, opportunities to meet and be close to learned scholars, special corners for women and children, free primary treatment for poor patients, counseling arrangements through scholars for resolving family and personal disputes, and various programs including a guesthouse for people coming to Dhaka from villages for various temporary needs, Insha\'Allah.', ar: 'كان مسجد النبي (صلى الله عليه وسلم) مركزاً لفوائد متعددة إلى جانب أداء الصلاة. رغم أن دكا مدينة المساجد، فإن معظم المساجد تقتصر على الصلاة الجماعية وأكثرها مدرسة. تريد مؤسسة السنة بناء مسجد مثالي في دكا سيكون نشطاً في أنشطة رفاهية متنوعة إلى جانب أداء الصلاة. سيضمن هذا ترتيبات منتظمة للتعليم الديني لأشخاص من فئات ومهن وأعمار مختلفة، وتوزيع ملخصات مكتوبة لخطب أسبوعية بين المصلين، وفرص للقاء والتقرب من العلماء المتعلمين، وزوايا خاصة للنساء والأطفال، وعلاج مجاني أولي للمرضى الفقراء، وترتيبات استشارية من خلال العلماء لحل النزاعات العائلية والشخصية، وبرامج متنوعة تشمل نزلاً للأشخاص القادمين إلى دكا من القرى لاحتياجات مؤقتة متنوعة، إن شاء الله.' },
  lifetimeMemberMosqueDesc2: { bn: 'এছাড়াও মসজিদের পাশে দারুল কুরআন ফাউন্ডেশনের দেশব্যাপী পরিচালিত যাবতীয় কল্যাণমূলক কাজের প্রধান কার্যালয় থাকবে ইন-শা-আল্লাহ। যেখান থেকে ফাউন্ডেশনের দেশব্যআপী পরিচালিত মসজিদ, মাদরাসা ও বিভিন্ন সেবা ও জনকল্যাণমূলক কাজ পরিচালিত হবে।', en: 'Additionally, next to the mosque will be the main office of AS-Sunnah Foundation\'s nationwide welfare activities, Insha\'Allah. From there, the foundation\'s nationwide mosques, madrasas, and various service and public welfare activities will be managed.', ar: 'بالإضافة إلى ذلك، بجانب المسجد سيكون المكتب الرئيسي لأنشطة الرفاهية على مستوى البلاد لمؤسسة السنة، إن شاء الله. من هناك، سيتم إدارة مساجد ومدارس المؤسسة على مستوى البلاد، والأنشطة الخدمية والرفاهية العامة المتنوعة.' },
  lifetimeMemberFeaturesTitle: { bn: 'যা থাকবে দারুল কুরআন ফাউন্ডেশন মসজিদ কমপ্লেক্স ও ইসলামিক সেন্টারঃ', en: 'What will be in AS-Sunnah Foundation Mosque Complex & Islamic Center:', ar: 'ما سيكون في مجمع مسجد مؤسسة السنة والمركز الإسلامي:' },
  lifetimeMemberFeature1: { bn: 'আধুনিক জামে মসজিদ', en: 'Modern Jame\' Mosque', ar: 'مسجد جامع حديث' },
  lifetimeMemberFeature2: { bn: 'কেন্দ্রিক নীতি নির্ধারণ ও শিক্ষা দাওয়াহের অ্যাকাডেমিক (নারী/পুরুষ) সেকশন', en: 'Centralized policy-making and academic (male/female) section for education and da\'wah', ar: 'وضع السياسات المركزية والقسم الأكاديمي (ذكور/إناث) للتعليم والدعوة' },
  lifetimeMemberFeature3: { bn: 'দারুল কুরআন ফাউন্ডেশনের কল্যাণমূলক কার্যক্রম', en: 'AS-Sunnah Foundation\'s welfare activities', ar: 'أنشطة رفاهية مؤسسة السنة' },
  lifetimeMemberMoreInfo: { bn: 'আরও দেখুন', en: 'See More', ar: 'شاهد المزيد' },
  lifetimeMemberPolicyDesc: { bn: 'দারুল কুরআন ফাউন্ডেশনের নীতি ও আদর্শের সঙ্গে একমত এমন যে কেউ আজীবন সদস্য ও দাতা সদস্য হওয়ার জন্য আবেদন করতে পারবেন।', en: 'Anyone who agrees with the policies and ideals of AS-Sunnah Foundation can apply to become a Lifetime Member and Donor Member.', ar: 'يمكن لأي شخص يوافق على سياسات ومثل مؤسسة السنة التقدم ليكون عضواً مدى الحياة وعضواً متبرعاً.' },
  lifetimeMemberTypeTitle: { bn: 'আজীবন সদস্য', en: 'Lifetime Member', ar: 'عضو مدى الحياة' },
  lifetimeMemberTypeDesc: { bn: 'যারা ফাউন্ডেশনের কল্যাণার্থে এককালীন কমপক্ষে এক লক্ষ বা তদূর্ধ্ব টাকা ফাউন্ডেশনের তহবিলে দান করবেন, তারা ফাউন্ডেশনের আজীবন সদস্য হবেন।', en: 'Those who will donate a minimum of one lakh or more to the foundation\'s fund at once for the welfare of the foundation will become Lifetime Members of the foundation.', ar: 'أولئك الذين سيتبرعون بحد أدنى مائة ألف أو أكثر لصندوق المؤسسة دفعة واحدة لرفاهية المؤسسة سيصبحون أعضاء مدى الحياة في المؤسسة.' },
  donorMemberTypeTitle: { bn: 'দাতা সদস্য', en: 'Donor Member', ar: 'عضو متبرع' },
  donorMemberTypeDesc: { bn: 'যারা ফাউন্ডেশনের কল্যাণার্থে এককালীন কমপক্ষে পঞ্চাশ হাজার বা তদূর্ধ্ব টাকা ফাউন্ডেশনের তহবিলে দান করবেন, তারা ফাউন্ডেশনের দাতা সদস্য হবেন।', en: 'Those who will donate a minimum of fifty thousand or more to the foundation\'s fund at once for the welfare of the foundation will become Donor Members of the foundation.', ar: 'أولئك الذين سيتبرعون بحد أدنى خمسين ألفاً أو أكثر لصندوق المؤسسة دفعة واحدة لرفاهية المؤسسة سيصبحون أعضاء متبرعين في المؤسسة.' },
  memberApplicationTitle: { bn: 'সদস্য আবেদন', en: 'Member Application', ar: 'طلب العضوية' },
  memberApplicationSubtitle: { bn: 'আপনি যদি সদস্য হতে ইচ্ছুক হন, তাহলে নিচের তথ্যটি পূরণ করুন।', en: 'If you wish to become a member, please fill in the information below.', ar: 'إذا كنت ترغب في أن تصبح عضواً، يرجى ملء المعلومات أدناه.' },
  
  // Volunteer Tab
  volunteerJoinTitle: { bn: 'আমাদের সহযোগী হন', en: 'Become Our Partner', ar: 'كن شريكنا' },
  volunteerJoinDesc: { bn: 'দারুল কুরআন ফাউন্ডেশনের স্বেচ্ছাসেবক হয়ে সমাজ পরিবর্তনের সাথী হন। আল্লাহর সন্তুষ্টির উদ্দেশ্যে নিজেকে নিয়োজিত করুন মানবসেবায়।', en: 'Become a volunteer of AS-Sunnah Foundation and partner in social change. Devote yourself to serving humanity for the pleasure of Allah.', ar: 'كن متطوعاً في مؤسسة السنة وكن شريكاً في التغيير الاجتماعي. كرس نفسك لخدمة الإنسانية لإرضاء الله.' },
  volunteerDesc2: { bn: 'আসুন, আমরা মানুষের জন্য কিছু করি। আপনার সদিচ্ছা ও সময় বদলে দিতে পারে কোনো অসহায় মানুষের দিন। নিজেকে নির্দিষ্ট করুন দাওয়াহ, সেবামূলক ও মানবিক কাজে। এখনই যুক্ত হোন আমাদের স্বেচ্ছাসেবক টিমে!', en: 'Let\'s do something for people. Your goodwill and time can change the day of a helpless person. Dedicate yourself to da\'wah, service-oriented and humanitarian work. Join our volunteer team now!', ar: 'دعونا نفعل شيئاً للناس. حسن نيتك ووقتك يمكن أن يغير يوم شخص عاجز. كرس نفسك للدعوة والعمل الخدمي والإنساني. انضم إلى فريقنا التطوعي الآن!' },
  volunteerRulesTitle: { bn: 'স্বেচ্ছাসেবক হওয়ার নিয়ম ও শর্তাবলি:', en: 'Rules and Conditions for Becoming a Volunteer:', ar: 'القواعد والشروط لتصبح متطوعاً:' },
  volunteerRule1: { bn: 'দারুল কুরআন ফাউন্ডেশনের নীতি ও আদর্শের প্রতি একান্ত হতে হবে।', en: 'Must be committed to the policies and ideals of AS-Sunnah Foundation.', ar: 'يجب أن يكون ملتزماً بسياسات ومثل مؤسسة السنة.' },
  volunteerRule2: { bn: 'সেবামূলক কাজে আগ্রহী হতে হবে।', en: 'Must be interested in service-oriented work.', ar: 'يجب أن يكون مهتماً بالعمل الخدمي.' },
  volunteerRule3: { bn: 'কোনো রকম পার্থিব স্বার্থের প্রত্যাশা করা যাবে না।', en: 'No worldly benefits should be expected.', ar: 'لا ينبغي توقع أي فوائد دنيوية.' },
  volunteerRule4: { bn: 'প্রকৃত ব্যবস্থাপনার আমানতদারি বজায় রাখতে হবে।', en: 'Must maintain the integrity of genuine management.', ar: 'يجب الحفاظ على نزاهة الإدارة الحقيقية.' },
  volunteerQuote: { bn: 'মানুষের মধ্যে সর্বোত্তম সেই ব্যক্তি, যে মানুষের উপকার করে। (সহীহ আল-জামে আস-সগীর, ৩৬৯)', en: 'The best among people is he who benefits people. (Sahih al-Jami\' as-Saghir, 369)', ar: 'خير الناس من ينفع الناس. (صحيح الجامع الصغير، 369)' },
  volunteerApplicationTitle: { bn: 'স্বেচ্ছাসেবক আবেদন', en: 'Volunteer Application', ar: 'طلب المتطوع' },
  volunteerApplicationSubtitle: { bn: 'আপনি যদি দারুল কুরআন ফাউন্ডেশনের যেকোনো প্রকল্পের স্বেচ্ছাসেবক হিসেবে কাজ করতে চান, তাহলে নিচের আবেদন ফরমটি পূরণ করুন।', en: 'If you wish to work as a volunteer in any project of AS-Sunnah Foundation, please fill in the application form below.', ar: 'إذا كنت ترغب في العمل كمتطوع في أي مشروع من مشاريع مؤسسة السنة، يرجى ملء نموذج الطلب أدناه.' },
  volunteerReadMore: { bn: 'আরও পড়ুন', en: 'Read More', ar: 'اقرأ المزيد' },
  volunteerApplicationSubmitted: { bn: 'স্বেচ্ছাসেবক আবেদন সফলভাবে জমা দেওয়া হয়েছে', en: 'Volunteer application submitted successfully', ar: 'تم تقديم طلب المتطوع بنجاح' },
  volunteerApplicationError: { bn: 'আবেদন জমা দেওয়ার সময় একটি ত্রুটি হয়েছে', en: 'An error occurred while submitting the application', ar: 'حدث خطأ أثناء تقديم الطلب' },
  
  // Volunteer Form Sections and Labels
  volunteerFormOverseas: { bn: 'প্রবাসী হলে', en: 'If Overseas', ar: 'إذا كان بالخارج' },
  volunteerFormSocialMedia: { bn: 'সোশ্যাল মিডিয়া সংক্রান্ত তথ্য', en: 'Social Media Information', ar: 'معلومات وسائل التواصل الاجتماعي' },
  volunteerFormPreviousExperience: { bn: 'পূর্বে স্বেচ্ছাসেবক ছিলেন?', en: 'Previous Volunteer Experience?', ar: 'تجربة متطوع سابقة؟' },
  volunteerFormProfileImage: { bn: 'সাম্প্রতিক ছবি', en: 'Recent Photo', ar: 'صورة حديثة' },
  volunteerFormWasVolunteer: { bn: 'পূর্বে স্বেচ্ছাসেবক হিসেবে সম্পৃক্ত ছিলেন?', en: 'Were you previously involved as a volunteer?', ar: 'هل كنت مشاركاً سابقاً كمتطوع؟' },
  volunteerFormProjectDescription: { bn: 'আপনি যদি ইতিপূর্বে দারুল কুরআন ফাউন্ডেশনের কোনো প্রকল্পে স্বেচ্ছাসেবক হিসেবে সম্পৃক্ত হয়ে থাকেন, তাহলে প্রকল্প অনুযায়ী আপনার সেবা কার্যক্রম সম্পর্কে তথ্য দিন।', en: 'If you have previously been involved as a volunteer in any project of AS-Sunnah Foundation, please provide information about your service activities according to the project.', ar: 'إذا كنت قد شاركت سابقاً كمتطوع في أي مشروع من مشاريع مؤسسة السنة، يرجى تقديم معلومات حول أنشطة خدمتك وفقاً للمشروع.' },
  volunteerFormNotUsingFacebook: { bn: 'ব্যবহার করি না', en: 'Not using', ar: 'لا أستخدم' },
  volunteerFormRequiredNote: { bn: '* চিহ্নিত তথ্যগুলো পূরণ করা বাধ্যতামূলক, অনুপস্থিত তথ্য গ্রহণযোগ্য নয়।', en: '* Marked fields are mandatory, incomplete information will not be accepted.', ar: '* الحقول المميزة إلزامية، لن يتم قبول المعلومات غير المكتملة.' },
  volunteerFormSubmitting: { bn: 'জমা দেওয়া হচ্ছে...', en: 'Submitting...', ar: 'جاري الإرسال...' },
  volunteerFormSubmitButton: { bn: 'আবেদন করুন →', en: 'Submit Application →', ar: 'إرسال الطلب →' },
  volunteerFormUploadButton: { bn: 'আপলোড করুন', en: 'Upload', ar: 'رفع' },
  volunteerFormImageHelper: { bn: 'JPEG, JPG, PNG অথবা HEIC ফরম্যাটে ছবি (সর্বোচ্চ ৩ MB)', en: 'Image in JPEG, JPG, PNG or HEIC format (max 3 MB)', ar: 'صورة بتنسيق JPEG أو JPG أو PNG أو HEIC (الحد الأقصى 3 ميجابايت)' },
  volunteerFormImageSelected: { bn: 'ছবি সফলভাবে নির্বাচিত হয়েছে', en: 'Image successfully selected', ar: 'تم اختيار الصورة بنجاح' },
  volunteerFormImageSizeError: { bn: 'ছবির আকার সর্বোচ্চ ৩ MB হতে হবে।', en: 'Image size must be maximum 3 MB.', ar: 'يجب أن يكون حجم الصورة 3 ميجابايت كحد أقصى.' },
  volunteerFormImageFormatError: { bn: 'অনুগ্রহ করে JPEG, JPG, PNG অথবা HEIC ফরম্যাটে ছবি আপলোড করুন।', en: 'Please upload an image in JPEG, JPG, PNG or HEIC format.', ar: 'يرجى رفع صورة بتنسيق JPEG أو JPG أو PNG أو HEIC.' },
  mobileNumber: { bn: 'মোবাইল নম্বর', en: 'Mobile Number', ar: 'رقم الجوال' },
  linkPlaceholder: { bn: 'লিঙ্ক দিন', en: 'Enter link', ar: 'أدخل الرابط' },
  implementationLocation: { bn: 'বাস্তবায়নের স্থান', en: 'Implementation Location', ar: 'موقع التنفيذ' },
  howManyBeneficiaries: { bn: 'আপনার মাধ্যমে মোট কতজন উপকারভোগী হয়েছে', en: 'How many beneficiaries through you', ar: 'كم عدد المستفيدين من خلالك' },
  
  // Donation Widget
  donationWidgetTitle: { bn: 'অংশ নিন ফাউন্ডেশনের সকল কল্যাণমূলক কাজে', en: 'Join in all welfare activities of the foundation', ar: 'شارك في جميع الأنشطة الخيرية للمؤسسة' },
  donationWidgetDesc: { bn: 'এই খাতে দানের মাধ্যমে ফাউন্ডেশনের সকল কল্যাণমূলক কাজের অংশীদার হতে পারবেন।', en: 'By donating to this fund, you can become a partner in all welfare activities of the foundation.', ar: 'من خلال التبرع لهذا الصندوق، يمكنك أن تصبح شريكاً في جميع الأنشطة الخيرية للمؤسسة.' },
  ctaChangeTogether: { bn: 'চলুন একসাথে পরিবর্তন আনি', en: "Let's bring change together", ar: 'لنحقق التغيير معاً' },
  becomeVolunteer: { bn: 'স্বেচ্ছাসেবক হোন', en: 'Become a Volunteer', ar: 'كن متطوعاً' },
  daily: { bn: 'দৈনিক', en: 'Daily', ar: 'يومي' },
  monthly: { bn: 'মাসিক', en: 'Monthly', ar: 'شهري' },
  anyAmount: { bn: 'যে কোনো পরিমাণ', en: 'Any amount', ar: 'أي مبلغ' },
  donationAmount: { bn: 'পরিমাণ', en: 'Amount', ar: 'المبلغ' },
  yourName: { bn: 'আপনার নাম', en: 'Your name', ar: 'اسمك' },
  mobileOrEmail: { bn: 'মোবাইল / ইমেইল', en: 'Mobile / Email', ar: 'الجوال / البريد' },
  donateOnBehalf: { bn: 'অন্য কারো পক্ষ থেকে দান করলে তার নাম লিখুন', en: 'If donating on behalf of someone else, write their name', ar: 'إذا كنت تتبرع نيابة عن شخص آخر، اكتب اسمه' },
  paymentMethod: { bn: 'পেমেন্ট মেথড', en: 'Payment Method', ar: 'طريقة الدفع' },
  bkash: { bn: 'বিকাশ', en: 'bKash', ar: 'bKash' },
  nagad: { bn: 'নগদ', en: 'Nagad', ar: 'Nagad' },
  card: { bn: 'কার্ড', en: 'Card', ar: 'بطاقة' },
  nextStep: { bn: 'পরবর্তী ধাপ', en: 'Next Step', ar: 'الخطوة التالية' },
  donationReceived: { bn: 'ধন্যবাদ! আপনার অনুদান গ্রহণ করা হয়েছে।', en: 'Thank you! Your donation has been received.', ar: 'شكراً لك! تم استلام تبرعك.' },
  
  // Payment Fail/Unsuccessful Page
  paymentFailSorry: { bn: 'দুঃখিত!', en: 'Sorry!', ar: 'عذراً!' },
  paymentFailCancelled: { bn: 'অনুদান বাতিল হয়েছে', en: 'Donation cancelled', ar: 'تم إلغاء التبرع' },
  paymentFailMessage: { bn: 'আপনার অনুদানের লেনদেন প্রক্রিয়াটি বাতিল হয়েছে।', en: 'Your donation transaction has been cancelled.', ar: 'تم إلغاء معاملة التبرع الخاصة بك.' },
  paymentFailWhatToDo: { bn: 'আপনার করণীয়', en: 'What to do', ar: 'ما يجب عليك فعله' },
  paymentFailCheckCard: { bn: 'দয়া করে আপনার কার্ডের তথ্য আবার পরীক্ষা করুন।', en: 'Please check your card information again.', ar: 'يرجى التحقق من معلومات بطاقتك مرة أخرى.' },
  paymentFailCheckInternet: { bn: 'আপনার ইন্টারনেট সংযোগ চেক করুন।', en: 'Check your internet connection.', ar: 'تحقق من اتصالك بالإنترنت.' },
  paymentFailContactUs: { bn: 'যদি সমস্যাটি সমাধান না হয়, আমাদের সাথে যোগাযোগ করুন।', en: 'If the problem is not resolved, contact us.', ar: 'إذا لم يتم حل المشكلة، اتصل بنا.' },
  paymentFailContact: { bn: 'যোগাযোগ', en: 'Contact', ar: 'اتصل بنا' },
  paymentFailHotline: { bn: 'হটলাইন', en: 'Hotline', ar: 'الهاتف الساخن' },
  paymentFailEmail: { bn: 'ইমেইল', en: 'Email', ar: 'البريد الإلكتروني' },
  paymentFailOperatingHours: { bn: '(সকাল ৯ টা - সন্ধ্যা ৭ টা; শুক্রবার ব্যতীত)', en: '(9 AM - 7 PM; excluding Friday)', ar: '(9 صباحاً - 7 مساءً؛ باستثناء الجمعة)' },
  
  // Payment Success Page
  paymentSuccessProcessing: { bn: 'পেমেন্ট যাচাই করা হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...', en: 'Verifying payment, please wait...', ar: 'جاري التحقق من الدفع، يرجى الانتظار...' },
  paymentSuccessTitle: { bn: 'আলহামদুলিল্লাহ!', en: 'Alhamdulillah!', ar: 'الحمد لله!' },
  paymentSuccessSubtitle: { bn: 'পেমেন্ট সফল হয়েছে', en: 'Payment Successful', ar: 'تم الدفع بنجاح' },
  paymentSuccessMessage: { bn: 'আপনার অনুদান সফলভাবে সংরক্ষণ করা হয়েছে। জাযাকাল্লাহু খাইরান।', en: 'Your donation has been successfully saved. Jazakallahu Khairan.', ar: 'تم حفظ تبرعك بنجاح. جزاك الله خيراً.' },
  paymentSuccessDonationDetails: { bn: 'অনুদানের বিবরণ', en: 'Donation Details', ar: 'تفاصيل التبرع' },
  paymentSuccessPurpose: { bn: 'উদ্দেশ্য:', en: 'Purpose:', ar: 'الغرض:' },
  paymentSuccessGoHome: { bn: 'হোমে ফিরে যান', en: 'Go to Home', ar: 'الذهاب إلى الصفحة الرئيسية' },
  paymentSuccessDonateAgain: { bn: 'আরও অনুদান দিন', en: 'Donate Again', ar: 'تبرع مرة أخرى' },
  paymentSuccessErrorNoTransactionId: { bn: 'লেনদেন আইডি পাওয়া যায়নি। অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন।', en: 'Transaction ID not found. Please contact us.', ar: 'لم يتم العثور على معرف المعاملة. يرجى الاتصال بنا.' },
  paymentSuccessErrorVerificationFailed: { bn: 'পেমেন্ট যাচাই ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।', en: 'Payment verification failed. Please try again.', ar: 'فشل التحقق من الدفع. يرجى المحاولة مرة أخرى.' },
  paymentSuccessErrorNoPreviousInfo: { bn: 'অনুদানের পূর্ববর্তী তথ্য খুঁজে পাওয়া যায়নি। আবার অনুদান দেওয়ার চেষ্টা করুন।', en: 'Previous donation information not found. Please try donating again.', ar: 'لم يتم العثور على معلومات التبرع السابقة. يرجى المحاولة مرة أخرى.' },
  paymentSuccessErrorProcessing: { bn: 'পেমেন্ট প্রক্রিয়াকরণে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।', en: 'There was a problem processing the payment. Please try again.', ar: 'حدثت مشكلة في معالجة الدفع. يرجى المحاولة مرة أخرى.' },
  paymentSuccessErrorSaving: { bn: 'অনুদান সংরক্ষণ করা যায়নি।', en: 'Could not save donation.', ar: 'تعذر حفظ التبرع.' },
  tryAgain: { bn: 'আবার চেষ্টা করুন', en: 'Try Again', ar: 'حاول مرة أخرى' },
  getHelp: { bn: 'সহায়তা নিন', en: 'Get Help', ar: 'احصل على المساعدة' },
  
  // Member Application Form
  memberAppTitle: { bn: 'সদস্য আবেদন', en: 'Member Application', ar: 'طلب العضوية' },
  memberAppLifetimeAmount: { bn: 'মূল্যমান ১ লাখ বা তার অধিক যে কোনো পরিমাণ দিতে পারেন', en: 'You can donate any amount of 1 lakh or more', ar: 'يمكنك التبرع بأي مبلغ يساوي أو يزيد عن 100,000' },
  memberAppDonorAmount: { bn: 'মূল্যমান ৫০,০০০ বা তার অধিক যে কোনো পরিমাণ দিতে পারেন', en: 'You can donate any amount of 50,000 or more', ar: 'يمكنك التبرع بأي مبلغ يساوي أو يزيد عن 50,000' },
  iAmA: { bn: 'আমি একজন', en: 'I am a', ar: 'أنا' },
  profession: { bn: 'পেশা', en: 'Profession', ar: 'المهنة' },
  selectProfession: { bn: 'নির্বাচন করুন', en: 'Select', ar: 'اختر' },
  paymentMethodChoice: { bn: 'যে মাধ্যমে প্রদান করতে চান', en: 'Payment method you want to use', ar: 'طريقة الدفع التي تريد استخدامها' },
  onlinePayment: { bn: 'অনলাইন পেমেন্ট', en: 'Online Payment', ar: 'الدفع عبر الإنترنت' },
  bankTransfer: { bn: 'ব্যাংক ট্রান্সফার', en: 'Bank Transfer', ar: 'حوالة بنكية' },
  bankDeposit: { bn: 'ব্যাংক ডিপোজিট', en: 'Bank Deposit', ar: 'إيداع بنكي' },
  transactionReferenceId: { bn: 'লেনদেন রেফারেন্স আইডি', en: 'Transaction Reference ID', ar: 'معرف معاملة المرجع' },
  uploadPaymentDocument: { bn: 'পেমেন্টের ডকুমেন্ট আপলোড করুন (ইমেজ / পিডিএফ)', en: 'Upload payment document (Image / PDF)', ar: 'رفع مستند الدفع (صورة / PDF)' },
  uploadReceiptNote: { bn: 'পেমেন্টের রিসিট অথবা স্ক্রিনশট আপলোড করুন।', en: 'Upload payment receipt or screenshot.', ar: 'قم برفع إيصال الدفع أو لقطة الشاشة.' },
  uploadDepositNote: { bn: 'ডিপোজিট সম্পন্ন হওয়ার রিসিট অথবা স্ক্রিনশট আপলোড করুন।', en: 'Upload deposit receipt or screenshot.', ar: 'قم برفع إيصال الإيداع أو لقطة الشاشة.' },
  paymentGateway: { bn: 'পেমেন্ট গেটওয়ে', en: 'Payment Gateway', ar: 'بوابة الدفع' },
  openingPaymentPage: { bn: 'পেমেন্ট পেজ খোলা হচ্ছে...', en: 'Opening payment page...', ar: 'جاري فتح صفحة الدفع...' },
  submittingApplication: { bn: 'জমা দেওয়া হচ্ছে...', en: 'Submitting...', ar: 'جاري الإرسال...' },
  donateNow: { bn: 'দান করুন →', en: 'Donate Now →', ar: 'تبرع الآن →' },
  memberAppSuccess: { bn: 'আবেদন সফলভাবে জমা দেওয়া হয়েছে! ধন্যবাদ।', en: 'Application submitted successfully! Thank you.', ar: 'تم تقديم الطلب بنجاح! شكراً لك.' },
  memberAppError: { bn: 'আবেদন জমা দিতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।', en: 'There was a problem submitting the application. Please try again.', ar: 'حدثت مشكلة في تقديم الطلب. يرجى المحاولة مرة أخرى.' },
  paymentGatewayError: { bn: 'পেমেন্ট গেটওয়ে শুরু করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।', en: 'There was a problem initiating the payment gateway. Please try again.', ar: 'حدثت مشكلة في بدء بوابة الدفع. يرجى المحاولة مرة أخرى.' },
  paymentInitError: { bn: 'পেমেন্ট শুরু করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।', en: 'There was a problem starting the payment. Please try again.', ar: 'حدثت مشكلة في بدء الدفع. يرجى المحاولة مرة أخرى.' },
  pleaseProvideAmount: { bn: 'অনুগ্রহ করে পরিমাণ প্রদান করুন', en: 'Please provide amount', ar: 'يرجى تقديم المبلغ' },
  minimumAmountRequired: { bn: 'ন্যূনতম', en: 'Minimum', ar: 'الحد الأدنى' },
  takaRequired: { bn: 'টাকা প্রদান করতে হবে', en: 'taka required', ar: 'تاكا مطلوب' },
  fillThisField: { bn: 'এই ঘরটি পূরণ করুন', en: 'Fill this field', ar: 'املأ هذا الحقل' },
  emailRequiredForOverseas: { bn: 'প্রবাসী সদস্যদের জন্য ইমেইল প্রদান আবশ্যক', en: 'Email is required for overseas members', ar: 'البريد الإلكتروني مطلوب للأعضاء في الخارج' },
  mobileOverseasInvalid: { bn: 'মোবাইল নম্বর অবশ্যই ৭ থেকে ১৪ সংখ্যক হতে হবে', en: 'Mobile number must be 7 to 14 digits', ar: 'يجب أن يكون رقم الجوال من 7 إلى 14 رقم' },
  mobileBangladeshInvalid: { bn: 'মোবাইল নম্বর অবশ্যই ১১ সংখ্যক হতে হবে', en: 'Mobile number must be 11 digits', ar: 'يجب أن يكون رقم الجوال 11 رقم' },
  invalidEmail: { bn: 'অনুগ্রহ করে একটি বৈধ ইমেইল ঠিকানা দিন', en: 'Please enter a valid email address', ar: 'يرجى إدخال عنوان بريد إلكتروني صالح' },
  provideTransactionId: { bn: 'লেনদেন রেফারেন্স আইডি প্রদান করুন', en: 'Provide transaction reference ID', ar: 'قدم معرف معاملة المرجع' },
  documentUploadRequired: { bn: 'ডকুমেন্ট আপলোড বাধ্যতামূলক', en: 'Document upload is required', ar: 'رفع المستند إلزامي' },
  onlyPdfOrImage: { bn: 'শুধুমাত্র PDF অথবা ইমেজ ফাইল গ্রহণযোগ্য', en: 'Only PDF or image files are acceptable', ar: 'يتم قبول ملفات PDF أو الصور فقط' },
  memberAppNote: { bn: 'সদস্যদের তথ্যসমূহ গোপন রাখা হবে এবং আপনারা সম্মিলিতভাবে করতে পারবেন দাওয়াহ ও সেবামূলক কাজ। আবেদন জমা দেওয়ার পর প্রয়োজনবোধে আমাদের টিম আপনার সাথে যোগাযোগ করবে।', en: 'Member information will be kept confidential and you can collectively engage in da\'wah and service activities. After submitting the application, our team will contact you if necessary.', ar: 'سيتم الحفاظ على معلومات الأعضاء سرية ويمكنكم المشاركة الجماعية في أنشطة الدعوة والخدمة. بعد تقديم الطلب، سيتصل فريقنا بك إذا لزم الأمر.' },
  bank: { bn: 'ব্যাংক:', en: 'Bank:', ar: 'البنك:' },
  accountName: { bn: 'অ্যাকাউন্টের নাম:', en: 'Account Name:', ar: 'اسم الحساب:' },
  branch: { bn: 'শাখা:', en: 'Branch:', ar: 'الفرع:' },
  accountNumber: { bn: 'অ্যাকাউন্ট নম্বর:', en: 'Account Number:', ar: 'رقم الحساب:' },
  routingNumber: { bn: 'রাউটিং নম্বর:', en: 'Routing Number:', ar: 'رقم التوجيه:' },
  swiftCode: { bn: 'সুইফট কোড:', en: 'SWIFT Code:', ar: 'رمز SWIFT:' },
  
  // Footer
  newsletterTitle: {
    bn: 'নিয়মিত নিউজলেটার পেতে সাবস্ক্রাইব করুন',
    en: 'Subscribe to receive regular newsletters',
    ar: 'اشترك لتصلك النشرات الإخبارية بانتظام'
  },
  newsletterPlaceholder: {
    bn: 'ইমেইল লিখুন',
    en: 'Enter email address',
    ar: 'أدخل بريدك الإلكتروني'
  },
  newsletterButton: { bn: 'সাবস্ক্রাইব', en: 'Subscribe', ar: 'اشترك' },
  newsletterSuccess: {
    bn: 'ধন্যবাদ! শিগগিরই আপডেট পাবেন।',
    en: 'Thank you! You will hear from us soon.',
    ar: 'شكراً لك! سنوافيك بآخر الأخبار قريباً.'
  },
  footerDescription: { bn: 'এই প্রতিষ্ঠান মানবতার শিক্ষা, মানুষের মুক্তি ও শান্তির লক্ষ্য সাধনে নিবেদিত। মানবকল্যাণে আদর্শ প্রচার ও সেবামূলক কার্যক্রম চালিয়ে যাচ্ছে।', en: 'This organization is dedicated to the goal of education for humanity, human liberation and peace. It continues to promote ideals and service activities for human welfare.', ar: 'هذه المنظمة مكرسة لهدف تعليم الإنسانية وتحرير الإنسان والسلام. تواصل تعزيز المثل والأنشطة الخدمية لرفاهية الإنسان.' },
  menu: { bn: 'মেনু', en: 'Menu', ar: 'القائمة' },
  joinUs: { bn: 'যুক্ত হোন', en: 'Join Us', ar: 'انضم إلينا' },
  others: { bn: 'অন্যান্য', en: 'Others', ar: 'أخرى' },
  termsConditions: { bn: 'পরিবেশ ও শর্তাবলী', en: 'Terms & Conditions', ar: 'الشروط والأحكام' },
  termsPageTitle: { bn: 'ব্যবহারের শর্তাবলী', en: 'Terms & Conditions', ar: 'الشروط والأحكام' },
  termsIntroTitle: { bn: 'ব্যবহারের শর্তাবলী', en: 'Terms of Use', ar: 'شروط الاستخدام' },
  termsIntroBody1: { bn: 'আপনি যখন দারুল কুরআন ফাউন্ডেশনের ওয়েবসাইট পরিদর্শন করেন, তখন আমাদের ব্যবহারের শর্তাবলিতে সম্মতি প্রদান করেন।', en: 'When you visit the AS-Sunnah Foundation website, you agree to our terms of use.', ar: 'عند زيارتك لموقع مؤسسة السنة، فإنك توافق على شروط الاستخدام الخاصة بنا.' },
  termsIntroBody2: { bn: 'ওয়েবসাইটের যেকোনো অংশ ব্যবহারের আগে অনুগ্রহ করে এই শর্তাবলি সতর্কতার সাথে পর্যালোচনা করুন।', en: 'Please review these terms carefully before using any part of the site.', ar: 'يرجى مراجعة هذه الشروط بعناية قبل استخدام أي جزء من الموقع.' },
  termsTrademarkTitle: { bn: 'ট্রেডমার্ক', en: 'Trademarks', ar: 'العلامات التجارية' },
  termsTrademarkBody: { bn: 'দারুল কুরআন ফাউন্ডেশন এবং এই সাইটে উল্লেখিত অন্যান্য চিহ্নসমূহ শুধু দারুল কুরআন ফাউন্ডেশনের মালিকানাধীন ট্রেডমার্ক। অনুমোদন ব্যতীত এগুলো এমন কোনো পণ্য বা সেবার সঙ্গে ব্যবহার করা যাবে না যা ফাউন্ডেশনের নয়, কিংবা যা বিভ্রান্তি সৃষ্টি করে অথবা ফাউন্ডেশনের সুনাম ক্ষুণ্ণ করে।', en: 'AS-Sunnah Foundation and the other marks referenced on this site are trademarks owned solely by the foundation. They may not be used, without authorization, in connection with any product or service that is not the foundation’s or in any manner likely to cause confusion or harm its reputation.', ar: 'إن اسم مؤسسة السنة وسائر العلامات المذكورة في هذا الموقع هي علامات تجارية مملوكة حصراً للمؤسسة. لا يجوز استخدامها، دون إذن، مع أي منتج أو خدمة ليست تابعة للمؤسسة أو بطريقة قد تسبب اللبس أو تسيء إلى سمعتها.' },
  termsCopyrightTitle: { bn: 'কপিরাইট', en: 'Copyright', ar: 'حقوق النشر' },
  termsCopyrightBody: { bn: 'এই ওয়েবসাইটের সমস্ত উপাদান—যেমন টেক্সট, গ্রাফিক্স, লোগো, আইকন, ছবি, অডিও-ভিডিও ক্লিপ, ডিজিটাল ডাউনলোড ও সফটওয়্যার—একান্তই দারুল কুরআন ফাউন্ডেশনের সম্পত্তি এবং বাংলাদেশ ও আন্তর্জাতিক কপিরাইট আইনের আওতায় সুরক্ষিত। এসব উপাদানের অননুমোদিত ব্যবহার, অনুলিপি বা বিতরণের ক্ষেত্রে ফাউন্ডেশন প্রয়োজনীয় আইনি ব্যবস্থা গ্রহণের অধিকার রাখে।', en: 'All materials on this website—text, graphics, logos, icons, images, audio-video clips, digital downloads, software, and more—are the exclusive property of AS-Sunnah Foundation and are protected under Bangladesh and international copyright laws. Any unauthorized use, reproduction, or distribution empowers the foundation to take appropriate legal action.', ar: 'جميع المواد الموجودة على هذا الموقع، بما في ذلك النصوص والرسومات والشعارات والأيقونات والصور والمقاطع الصوتية والمرئية والتنزيلات الرقمية والبرمجيات، هي ملك حصري لمؤسسة السنة ومحميّة بموجب قوانين حقوق النشر في بنغلادش والقوانين الدولية. يحق للمؤسسة اتخاذ الإجراءات القانونية اللازمة ضد أي استخدام أو نسخ أو توزيع غير مصرح به.' },
  termsAccountSecurityTitle: { bn: 'অ্যাকাউন্টের সুরক্ষা', en: 'Account Security', ar: 'أمان الحساب' },
  termsAccountSecurityBody: { bn: 'ওয়েবসাইটের কিছু নির্দিষ্ট অংশে অ্যাকাউন্ট তৈরি করে ব্যবহারকারীর নাম ও পাসওয়ার্ড ব্যবহারের সুযোগ রয়েছে। নিজের অ্যাকাউন্ট তথ্যের নিরাপত্তা বজায় রাখার সম্পূর্ণ দায়িত্ব ব্যবহারকারীর, এবং তার অ্যাকাউন্টের মাধ্যমে সম্পাদিত সকল কার্যক্রমের জন্য ব্যবহারকারীকেই দায় বহন করতে হবে।', en: 'Certain areas of the website allow you to create an account with a username and password. You are solely responsible for maintaining the confidentiality of those credentials and for all activities that occur under your account.', ar: 'تسمح بعض أجزاء الموقع بإنشاء حساب باستخدام اسم مستخدم وكلمة مرور. أنت المسؤول وحدك عن الحفاظ على سرية بيانات الدخول وعن أي نشاط يتم عبر حسابك.' },
  termsLicenseTitle: { bn: 'লাইসেন্স ও সাইট ব্যবহারের অনুমতি', en: 'License & Site Use', ar: 'الترخيص واستخدام الموقع' },
  termsLicenseBody1: { bn: 'দারুল কুরআন ফাউন্ডেশন এই ওয়েবসাইট ব্যবহারের জন্য আপনাকে একটি সীমিত ও অ-হস্তান্তরযোগ্য লাইসেন্স প্রদান করছে। নিয়মিত পেজ ক্যাশিং ছাড়া ওয়েবসাইটের কোনো উপাদান ডাউনলোড বা পরিবর্তন করা ফাউন্ডেশনের পূর্বানুমতি ছাড়া বৈধ নয়।', en: 'AS-Sunnah Foundation grants you a limited, non-transferable license to use this website. Other than regular page caching, you may not download, modify, or alter any part of the site without prior permission from the foundation.', ar: 'تمنحك مؤسسة السنة ترخيصاً محدوداً وغير قابل للتحويل لاستخدام هذا الموقع. وباستثناء التخزين المؤقت الاعتيادي للصفحات، لا يجوز تنزيل أو تعديل أي جزء من الموقع دون إذن مسبق من المؤسسة.' },
  termsLicenseBody2: { bn: 'ওয়েবসাইটের কোনো অংশ পুনঃউৎপাদন, অনুলিপি, বিক্রয় বা বাণিজ্যিক উদ্দেশ্যে ব্যবহার সম্পূর্ণ নিষিদ্ধ। অনুমতি ছাড়া মেটা ট্যাগ বা লুকানো টেক্সটে ফাউন্ডেশনের নাম বা ট্রেডমার্ক ব্যবহার করা যাবে না, এবং যেকোনো অননুমোদিত ব্যবহার সঙ্গে সঙ্গে প্রদত্ত লাইসেন্স বাতিল করবে।', en: 'Reproducing, copying, selling, or exploiting any portion of the site for commercial purposes is strictly prohibited. Using the foundation’s name or trademarks in meta tags or hidden text without consent is forbidden, and any unauthorized use immediately terminates the granted license.', ar: 'يُحظر تماماً إعادة إنتاج أو نسخ أو بيع أو استغلال أي جزء من الموقع لأغراض تجارية. كما يُمنع استخدام اسم المؤسسة أو علاماتها التجارية في الوسوم الوصفية أو النصوص المخفية دون موافقة، وأي استخدام غير مصرح به يؤدي إلى إلغاء الترخيص الممنوح فوراً.' },
  termsUserContentTitle: { bn: 'ব্যবহারকারীর জমাকৃত কনটেন্ট', en: 'User-Submitted Content', ar: 'المحتوى المقدم من المستخدم' },
  termsUserContentBody1: { bn: 'আপনি যদি ওয়েবসাইটে কোনো মতামত, ফটোগ্রাফ বা অন্যান্য কনটেন্ট জমা দেন, তাহলে আপনি দারুল কুরআন ফাউন্ডেশন ও তার অনুমোদিত সহযোগীদের জন্য সেই কনটেন্ট ব্যবহারের উদ্দেশ্যে একটি অ-এক্সক্লুসিভ, রয়্যালটি-মুক্ত, স্থায়ী ও পরিবর্তন-অযোগ্য লাইসেন্স প্রদান করছেন।', en: 'If you submit opinions, photographs, or other content to the website, you grant AS-Sunnah Foundation and its authorized partners a non-exclusive, royalty-free, perpetual, and irrevocable license to use that content.', ar: 'إذا قمت بتقديم آراء أو صور أو أي محتوى آخر إلى الموقع، فإنك تمنح مؤسسة السنة وشركاءها المعتمدين ترخيصاً غير حصري ومجاني ودائماً وغير قابل للإلغاء لاستخدام ذلك المحتوى.' },
  termsUserContentBody2: { bn: 'কনটেন্টের মালিকানা আপনার কাছেই থাকবে, তবে তা যথাযথ ও আইনানুগ কিনা তা নিশ্চিত করার দায়িত্ব আপনার। প্রয়োজন মনে করলে ফাউন্ডেশন যেকোনো কনটেন্ট মুছে ফেলার অধিকার সংরক্ষণ করে।', en: 'You retain ownership of your submissions, but you are responsible for ensuring they are accurate and lawful. The foundation reserves the right to remove any content at its discretion.', ar: 'تظل ملكية المواد المقدمة لك، لكنك تتحمل مسؤولية التأكد من قانونيتها وصحتها. وتحتفظ المؤسسة بالحق في حذف أي محتوى إذا رأت ذلك ضرورياً.' },
  termsLiabilityTitle: { bn: 'দায় সীমাবদ্ধতা', en: 'Limitation of Liability', ar: 'تحديد المسؤولية' },
  termsLiabilityBody1: { bn: 'এই ওয়েবসাইটটি “যেমন আছে” ভিত্তিতে সরবরাহ করা হয় এবং এর কার্যকারিতা, নির্ভরযোগ্যতা বা কনটেন্টের সঠিকতা সম্পর্কে দারুল কুরআন ফাউন্ডেশন কোনো প্রত্যক্ষ বা পরোক্ষ নিশ্চয়তা প্রদান করে না। ওয়েবসাইট ব্যবহারের সম্পূর্ণ দায় আপনার নিজের।', en: 'This website is provided “as is,” and AS-Sunnah Foundation makes no express or implied warranties regarding its functionality, reliability, or content accuracy. You agree that you use the site entirely at your own risk.', ar: 'يُقدَّم هذا الموقع "كما هو"، ولا تقدم مؤسسة السنة أي ضمانات صريحة أو ضمنية بشأن أدائه أو موثوقيته أو دقة محتواه. باستخدامك للموقع فإنك تتحمل المسؤولية كاملة.' },
  termsLiabilityBody2: { bn: 'আমরা ওয়েবসাইট, সার্ভার বা ইমেইল যোগাযোগে ভাইরাস না থাকার নিশ্চয়তা দিই না এবং ওয়েবসাইট ব্যবহারের ফলে সৃষ্ট কোনো ক্ষতির জন্য দায়ী থাকব না।', en: 'We do not warrant that the website, servers, or email communications are free of viruses, and we are not liable for any damages arising from your use of the site.', ar: 'لا نضمن خلو الموقع أو الخوادم أو الرسائل الإلكترونية من الفيروسات، ولسنا مسؤولين عن أي أضرار قد تنتج عن استخدامك للموقع.' },
  termsRefundTitle: { bn: 'রিফান্ড নীতি', en: 'Refund Policy', ar: 'سياسة الاسترجاع' },
  termsRefundBody1: { bn: 'যদি কোনো দাতা অনুদান ফেরত নিতে চান, তবে অনুদানের তারিখ থেকে ১০ দিনের মধ্যে যথাযথ প্রমাণসহ আবেদন করতে হবে। নির্দিষ্ট প্রকল্পের জন্য প্রদত্ত অনুদান ওই সময়ের মধ্যেই ব্যয় হয়ে গেলে তা ফেরতযোগ্য নয়।', en: 'If a donor wishes to request a refund, they must apply with proper documentation within 10 days of the donation date. Contributions earmarked for a specific project are non-refundable if the funds have already been spent within that window.', ar: 'إذا رغب متبرع في استرداد تبرعه فعليه التقدم بطلب مرفق بالمستندات اللازمة خلال عشرة أيام من تاريخ التبرع. التبرعات المخصصة لمشروع معين لا تُسترد إذا تم صرفها خلال تلك الفترة.' },
  termsRefundBody2: { bn: 'সাধারণ অনুদানের ক্ষেত্রে, যদি তা এখনো কোনো প্রকল্পে ব্যয় না হয়ে থাকে, তাহলে নির্ধারিত সময়ের মধ্যে রিফান্ড অনুরোধ করা যাবে।', en: 'For general donations, a refund may be considered within the stipulated time if the amount has not yet been utilized in any project.', ar: 'بالنسبة للتبرعات العامة يمكن النظر في طلب الاسترجاع خلال المدة المحددة إذا لم تُستخدم الأموال في أي مشروع بعد.' },
  termsRefundBody3: { bn: 'কুরবানীর অনুদানের ক্ষেত্রে, কুরবানী অনুষ্ঠানের ৭ দিন পূর্ব পর্যন্ত রিফান্ড চাওয়া যাবে; অনুষ্ঠান শুরুর ৬ দিনের মধ্যে আর কোনো রিফান্ড অনুরোধ গ্রহণ করা হবে না।', en: 'For Qurbani donations, refund requests are accepted up to seven days before the ritual; no requests are honored within six days of the program.', ar: 'فيما يتعلق بتبرعات الأضحية، تُقبل طلبات الاسترجاع حتى سبعة أيام قبل بدء البرنامج، ولا تُقبل أي طلبات خلال الأيام الستة السابقة للفعالية.' },
  termsGoverningLawTitle: { bn: 'প্রযোজ্য আইন', en: 'Governing Law', ar: 'القانون الحاكم' },
  termsGoverningLawBody: { bn: 'ওয়েবসাইট ব্যবহার করার মাধ্যমে আপনি সম্মত হচ্ছেন যে এই শর্তাবলি এবং এ থেকে উদ্ভূত যেকোনো বিতর্ক বাংলাদেশের আইন অনুযায়ী নিষ্পত্তি হবে।', en: 'By using this website you agree that these terms, and any disputes arising from them, will be governed by the laws of Bangladesh.', ar: 'باستخدامك لهذا الموقع فإنك توافق على أن هذه الشروط وأي نزاعات تنشأ عنها تخضع لأحكام قوانين بنغلادش.' },
  termsChangesTitle: { bn: 'নীতিতে পরিবর্তন', en: 'Policy Changes', ar: 'تغييرات السياسة' },
  termsChangesBody: { bn: 'দারুল কুরআন ফাউন্ডেশন যে কোনো সময় এই শর্তাবলি ও নীতিমালায় পরিবর্তন, সংশোধন বা পরিমার্জন করার অধিকার সংরক্ষণ করে। পূর্ববর্তী শর্তাবলির আওতায় সংঘটিত লঙ্ঘনের ক্ষেত্রে এই পরিবর্তন প্রযোজ্য হবে না।', en: 'AS-Sunnah Foundation reserves the right to modify, amend, or update these terms at any time. Changes do not retroactively apply to violations that occurred under a previous version of the policy.', ar: 'تحتفظ مؤسسة السنة بالحق في تعديل هذه الشروط أو تحديثها في أي وقت، ولا تسري التغييرات بأثر رجعي على المخالفات التي حدثت بموجب النسخ السابقة من السياسة.' },
  privacyPolicy: { bn: 'গোপনীয়তা নীতি', en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
  copyright: { bn: 'স্বত্ব', en: 'Copyright', ar: 'حقوق النشر' },
  allRightsReserved: { bn: 'সর্বস্বত্ব সংরক্ষিত', en: 'All Rights Reserved', ar: 'جميع الحقوق محفوظة' },
  
  // Contact form
  contactForm: { bn: 'যোগাযোগ ফর্ম', en: 'Contact Form', ar: 'نموذج الاتصال' },
  ourAddress: { bn: 'আমাদের ঠিকানা', en: 'Our Address', ar: 'عنواننا' },
  contactAddress: { bn: 'রোড-৭০, ব্লক-সি, আফতাবনগর, ঢাকা', en: 'Road-70, Block-C, Aftabnagar, Dhaka', ar: 'الطريق 70، بلوك ج، أفتاب ناجار، دكا' },
  frequentlyAskedQuestions: { bn: 'সচরাচর জিজ্ঞাসিত প্রশ্ন', en: 'Frequently Asked Questions', ar: 'الأسئلة الشائعة' },
  yourEmail: { bn: 'আপনার ইমেইল', en: 'Your Email', ar: 'بريدك الإلكتروني' },
  subject: { bn: 'বিষয়', en: 'Subject', ar: 'الموضوع' },
  message: { bn: 'বার্তা', en: 'Message', ar: 'الرسالة' },
  write: { bn: 'লিখুন', en: 'Write', ar: 'اكتب' },
  send: { bn: 'পাঠান', en: 'Send', ar: 'إرسال' },
  
  // Contact FAQ Categories
  shaykhAhmadullah: { bn: 'শায়খ আহমাদুল্লাহ', en: 'Shaykh Ahmadullah', ar: 'الشيخ أحمد الله' },
  donationRelated: { bn: 'ডোনেশন সংক্রান্ত', en: 'Donation Related', ar: 'متعلق بالتبرع' },
  volunteerRelated: { bn: 'স্বেচ্ছাসেবক', en: 'Volunteer', ar: 'متطوع' },
  
  // Contact FAQ - Shaykh Questions
  shaykhQ1: { bn: 'শায়খ আহমাদুল্লাহর কাছ থেকে শরয়ী প্রশ্ন বা পরামর্শ জানতে চাই।', en: 'I want to ask a Sharia question or seek advice from Shaykh Ahmadullah.', ar: 'أريد طرح سؤال شرعي أو طلب نصيحة من الشيخ أحمد الله.' },
  shaykhA1: { bn: 'লাইভ অনুষ্ঠান "শরয়ী সমাধান" এবং অফিসিয়াল পেইজ/ইউটিউবে প্রশ্ন করতে পারেন। ফোন: +8809610-001089 (শুক্রবার ব্যতীত)।', en: 'You can ask questions on the live program "Sharia Solution" and on the official page/YouTube. Phone: +8809610-001089 (except Friday).', ar: 'يمكنك طرح الأسئلة في البرنامج المباشر "الحل الشرعي" والصفحة الرسمية/يوتيوب. الهاتف: +8809610-001089 (ما عدا الجمعة).' },
  shaykhQ2: { bn: 'শায়খ আহমাদুল্লাহর সাথে সাক্ষাৎ করতে চাই।', en: 'I want to meet with Shaykh Ahmadullah.', ar: 'أريد مقابلة الشيخ أحمد الله.' },
  shaykhA2: { bn: 'সময় নির্ধারণ করে সাক্ষাৎ করতে হবে; ইমেইল বা ফোনে যোগাযোগ করুন।', en: 'You need to schedule an appointment; contact via email or phone.', ar: 'تحتاج إلى تحديد موعد؛ اتصل عبر البريد الإلكتروني أو الهاتف.' },
  
  // Contact FAQ - Donation Questions
  donationQ1: { bn: 'কিভাবে দান করবো?', en: 'How can I donate?', ar: 'كيف يمكنني التبرع؟' },
  donationA1: { bn: 'গেট ইনভলভড পেইজ থেকে দান করুন বা ব্যাংক/মোবাইল ফাইন্যান্সিং ব্যবহার করুন।', en: 'Donate from the Get Involved page or use bank/mobile financing.', ar: 'تبرع من صفحة انضم إلينا أو استخدم التمويل المصرفي/الجوال.' },
  donationQ2: { bn: 'রসিদ কীভাবে পাব?', en: 'How will I receive the receipt?', ar: 'كيف سأحصل على الإيصال؟' },
  donationA2: { bn: 'ইমেইলে কনফার্মেশন ও রসিদ পাঠানো হবে।', en: 'Confirmation and receipt will be sent via email.', ar: 'سيتم إرسال التأكيد والإيصال عبر البريد الإلكتروني.' },
  
  // Contact FAQ - Volunteer Questions
  volunteerQ1: { bn: 'কীভাবে স্বেচ্ছাসেবক হব?', en: 'How can I become a volunteer?', ar: 'كيف يمكنني أن أصبح متطوعاً؟' },
  volunteerA1: { bn: 'স্বেচ্ছাসেবক ফর্ম পূরণ করে জমা দিন; নির্বাচিত হলে আপনাকে জানানো হবে।', en: 'Fill out and submit the volunteer form; you will be notified if selected.', ar: 'املأ نموذج المتطوع وأرسله؛ سيتم إعلامك إذا تم اختيارك.' },
  
  // Language names
  bengali: { bn: 'বাংলা', en: 'Bengali', ar: 'البنغالية' },
  english: { bn: 'English', en: 'English', ar: 'الإنجليزية' },
  arabic: { bn: 'العربية', en: 'Arabic', ar: 'العربية' },
  languageSwitchSuccess: { bn: 'এখন সবকিছু বাংলায় প্রদর্শিত হবে', en: 'Language switched to English', ar: 'تم التغيير إلى اللغة العربية' },
  
  // Common
  required: { bn: '*', en: '*', ar: '*' },
  
  // Dashboard
  dashboard: { bn: 'ড্যাশবোর্ড', en: 'Dashboard', ar: 'لوحة التحكم' },
  dashboardOverview: { bn: 'ড্যাশবোর্ড ওভারভিউ', en: 'Dashboard Overview', ar: 'نظرة عامة على لوحة التحكم' },
  overview: { bn: 'ওভারভিউ', en: 'Overview', ar: 'نظرة عامة' },
  overviewOfActivity: { bn: 'বর্তমান কার্যক্রমের ওভারভিউ', en: 'Overview of current activity', ar: 'نظرة عامة على النشاط الحالي' },
  logout: { bn: 'লগআউট', en: 'Logout', ar: 'تسجيل الخروج' },
  donationCategories: { bn: 'অনুদান বিভাগসমূহ', en: 'Donation Categories', ar: 'فئات التبرعات' },
  donationCategory: { bn: 'অনুদান ক্যাটাগরি', en: 'Donation Category', ar: 'فئة التبرع' },
  heroImages: { bn: 'হিরো ইমেজসমূহ', en: 'Hero Images', ar: 'صور البطل' },
  volunteerApplications: { bn: 'স্বেচ্ছাসেবক আবেদন', en: 'Volunteer Applications', ar: 'طلبات المتطوعين' },
  memberApplications: { bn: 'সদস্য আবেদনসমূহ', en: 'Member Applications', ar: 'طلبات العضوية' },
  memberApplicationsDescription: { bn: 'সমস্ত সদস্য আবেদন পরিচালনা করুন', en: 'Manage all member applications', ar: 'إدارة جميع طلبات العضوية' },
  createAdmin: { bn: 'অ্যাডমিন তৈরি করুন', en: 'Create Admin', ar: 'إنشاء مسؤول' },
  
  // Admin
  admin: { bn: 'অ্যাডমিন', en: 'Admin', ar: 'المسؤول' },
  adminDashboard: { bn: 'অ্যাডমিন ড্যাশবোর্ড', en: 'Admin Dashboard', ar: 'لوحة تحكم المسؤول' },
  updateProfile: { bn: 'প্রোফাইল আপডেট', en: 'Update profile', ar: 'تحديث الملف الشخصي' },
  
  // Stats
  usersOnline: { bn: 'অনলাইন ব্যবহারকারী', en: 'Users Online', ar: 'المستخدمون المتصلون' },
  lessonsToday: { bn: 'আজকের পাঠ', en: 'Lessons Today', ar: 'دروس اليوم' },
  messages: { bn: 'বার্তা', en: 'Messages', ar: 'الرسائل' },
  updatedLive: { bn: 'লাইভ আপডেট', en: 'updated live', ar: 'محدث مباشرة' },
  fromApi: { bn: 'API থেকে', en: 'from API', ar: 'من API' },
  incoming: { bn: 'আসছে', en: 'incoming', ar: 'واردة' },
  totalDonations: { bn: 'মোট অনুদান', en: 'Total Donations', ar: 'إجمالي التبرعات' },
  donations: { bn: 'অনুদানসমূহ', en: 'Donations', ar: 'التبرعات' },
  allDonations: { bn: 'সকল অনুদান', en: 'All Donations', ar: 'جميع التبرعات' },
  totalRaised: { bn: 'মোট সংগ্রহ', en: 'Total Raised', ar: 'إجمالي المبلغ المجموع' },
  activeDonors: { bn: 'সক্রিয় দাতা', en: 'Active Donors', ar: 'المتبرعون النشطون' },
  recurringDonors: { bn: 'নিয়মিত দাতা', en: 'Recurring Donors', ar: 'المتبرعون المتكررون' },
  filtered: { bn: 'ফিল্টার করা', en: 'Filtered', ar: 'مفلتر' },
  recentDonations: { bn: 'সাম্প্রতিক অনুদান', en: 'Recent Donations', ar: 'التبرعات الأخيرة' },
  mock: { bn: '(মক)', en: '(mock)', ar: '(وهمي)' },
  totalPrograms: { bn: 'মোট কর্মসূচি', en: 'Total Programs', ar: 'إجمالي البرامج' },
  activePrograms: { bn: 'সক্রিয় কর্মসূচি', en: 'Active Programs', ar: 'البرامج النشطة' },
  totalActivities: { bn: 'মোট কার্যক্রম', en: 'Total Activities', ar: 'إجمالي الأنشطة' },
  allActivities: { bn: 'সকল কার্যক্রম', en: 'All Activities', ar: 'جميع الأنشطة' },
  totalUsers: { bn: 'মোট ব্যবহারকারী', en: 'Total Users', ar: 'إجمالي المستخدمين' },
  registeredUsers: { bn: 'নিবন্ধিত ব্যবহারকারী', en: 'Registered Users', ar: 'المستخدمون المسجلون' },
  totalBlogs: { bn: 'মোট ব্লগ', en: 'Total Blogs', ar: 'إجمالي المدونات' },
  blogPosts: { bn: 'ব্লগ পোস্ট', en: 'Blog Posts', ar: 'منشورات المدونة' },
  totalGallery: { bn: 'মোট গ্যালারি', en: 'Total Gallery', ar: 'إجمالي المعرض' },
  mediaItems: { bn: 'মিডিয়া আইটেম', en: 'Media Items', ar: 'عناصر الوسائط' },
  totalNotices: { bn: 'মোট নোটিশ', en: 'Total Notices', ar: 'إجمالي الإعلانات' },
  announcements: { bn: 'ঘোষণা', en: 'Announcements', ar: 'الإعلانات' },
  quickLinks: { bn: 'দ্রুত লিংক', en: 'Quick Links', ar: 'روابط سريعة' },
  items: { bn: 'আইটেম', en: 'items', ar: 'عناصر' },
  recentActivity: { bn: 'সাম্প্রতিক কার্যক্রম', en: 'Recent Activity', ar: 'النشاط الأخير' },
  noRecentActivity: { bn: 'কোনো সাম্প্রতিক কার্যক্রম নেই', en: 'No recent activity', ar: 'لا يوجد نشاط حديث' },
  content: { bn: 'কন্টেন্ট', en: 'Content', ar: 'المحتوى' },
  failedToLoadDashboard: { bn: 'ড্যাশবোর্ড ডেটা লোড করতে ব্যর্থ', en: 'Failed to load dashboard data', ar: 'فشل تحميل بيانات لوحة التحكم' },
  profile: { bn: 'প্রোফাইল', en: 'Profile', ar: 'الملف الشخصي' },
  
  // Table
  date: { bn: 'তারিখ', en: 'Date', ar: 'التاريخ' },
  donor: { bn: 'দাতা', en: 'Donor', ar: 'المتبرع' },
  actions: { bn: 'কার্যক্রম', en: 'Actions', ar: 'الإجراءات' },
  edit: { bn: 'সম্পাদনা', en: 'Edit', ar: 'تعديل' },
  delete: { bn: 'মুছুন', en: 'Delete', ar: 'حذف' },
  new: { bn: 'নতুন', en: 'New', ar: 'جديد' },
  save: { bn: 'সংরক্ষণ', en: 'Save', ar: 'حفظ' },
  cancel: { bn: 'বাতিল', en: 'Cancel', ar: 'إلغاء' },
  title: { bn: 'শিরোনাম', en: 'Title', ar: 'العنوان' },
  tag: { bn: 'ট্যাগ', en: 'Tag', ar: 'العلامة' },
  imageUrl: { bn: 'ছবির URL', en: 'Image URL', ar: 'رابط الصورة' },
  uploadImage: { bn: 'ছবি আপলোড', en: 'Upload image', ar: 'رفع صورة' },
  
  // Filters
  preset: { bn: 'প্রিসেট', en: 'Preset', ar: 'الإعداد المسبق' },
  today: { bn: 'আজ', en: 'Today', ar: 'اليوم' },
  thisWeek: { bn: 'এই সপ্তাহ', en: 'This week', ar: 'هذا الأسبوع' },
  thisMonth: { bn: 'এই মাস', en: 'This month', ar: 'هذا الشهر' },
  thisYear: { bn: 'এই বছর', en: 'This year', ar: 'هذا العام' },
  customRange: { bn: 'কাস্টম রেঞ্জ', en: 'Custom range', ar: 'نطاق مخصص' },
  from: { bn: 'থেকে', en: 'From', ar: 'من' },
  to: { bn: 'পর্যন্ত', en: 'To', ar: 'إلى' },
  apply: { bn: 'প্রয়োগ', en: 'Apply', ar: 'تطبيق' },
  search: { bn: 'অনুসন্ধান', en: 'Search', ar: 'بحث' },
  hide: { bn: 'লুকান', en: 'Hide', ar: 'إخفاء' },
  expand: { bn: 'প্রসারিত করুন', en: 'Expand', ar: 'توسيع' },
  previous: { bn: 'পূর্ববর্তী', en: 'Previous', ar: 'السابق' },
  next: { bn: 'পরবর্তী', en: 'Next', ar: 'التالي' },
  yes: { bn: 'হ্যাঁ', en: 'Yes', ar: 'نعم' },
  no: { bn: 'না', en: 'No', ar: 'لا' },
  showing: { bn: 'দেখানো হচ্ছে', en: 'Showing', ar: 'عرض' },
  of: { bn: 'এর মধ্যে', en: 'of', ar: 'من' },
  
  // User Management
  createAdminUser: { bn: 'অ্যাডমিন ব্যবহারকারী তৈরি', en: 'Create Admin User', ar: 'إنشاء مستخدم مسؤول' },
  name: { bn: 'নাম', en: 'Name', ar: 'الاسم' },
  fullName: { bn: 'পূর্ণ নাম', en: 'Full name', ar: 'الاسم الكامل' },
  email: { bn: 'ইমেইল', en: 'Email', ar: 'البريد الإلكتروني' },
  password: { bn: 'পাসওয়ার্ড', en: 'Password', ar: 'كلمة المرور' },
  role: { bn: 'ভূমিকা', en: 'Role', ar: 'الدور' },
  editor: { bn: 'সম্পাদক', en: 'Editor', ar: 'محرر' },
  reset: { bn: 'রিসেট', en: 'Reset', ar: 'إعادة تعيين' },
  create: { bn: 'তৈরি', en: 'Create', ar: 'إنشاء' },
  
  // Profile
  profileInformation: { bn: 'প্রোফাইল তথ্য', en: 'Profile Information', ar: 'معلومات الملف الشخصي' },
  myProfile: { bn: 'আমার প্রোফাইল', en: 'My Profile', ar: 'ملفي الشخصي' },
  info: { bn: 'তথ্য', en: 'Info', ar: 'معلومات' },
  adminName: { bn: 'অ্যাডমিন নাম', en: 'Admin Name', ar: 'اسم المسؤول' },
  phone: { bn: 'ফোন', en: 'Phone', ar: 'الهاتف' },
  avatarUrl: { bn: 'অবতার URL', en: 'Avatar URL', ar: 'رابط الصورة الرمزية' },
  saveChanges: { bn: 'পরিবর্তন সংরক্ষণ', en: 'Save Changes', ar: 'حفظ التغييرات' },
  updatePassword: { bn: 'পাসওয়ার্ড আপডেট', en: 'Update Password', ar: 'تحديث كلمة المرور' },
  currentPassword: { bn: 'বর্তমান পাসওয়ার্ড', en: 'Current Password', ar: 'كلمة المرور الحالية' },
  newPassword: { bn: 'নতুন পাসওয়ার্ড', en: 'New Password', ar: 'كلمة المرور الجديدة' },
  confirmNewPassword: { bn: 'নতুন পাসওয়ার্ড নিশ্চিত করুন', en: 'Confirm New Password', ar: 'تأكيد كلمة المرور الجديدة' },
  basicInformation: { bn: 'মৌলিক তথ্য', en: 'Basic Information', ar: 'المعلومات الأساسية' },
  additional: { bn: 'অতিরিক্ত', en: 'Additional', ar: 'إضافي' },
  company: { bn: 'কোম্পানি', en: 'Company', ar: 'الشركة' },
  totalDonated: { bn: 'মোট দান', en: 'Total Donated', ar: 'إجمالي التبرع' },
  memberSince: { bn: 'সদস্য হওয়ার তারিখ', en: 'Member Since', ar: 'عضو منذ' },
  youNeedToLogin: { bn: 'আপনার প্রোফাইল দেখতে লগইন করতে হবে।', en: 'You need to login to view your profile.', ar: 'تحتاج إلى تسجيل الدخول لعرض ملفك الشخصي.' },
  failedToLoadProfile: { bn: 'প্রোফাইল লোড করতে ব্যর্থ।', en: 'Failed to load profile.', ar: 'فشل تحميل الملف الشخصي.' },
  passwordUpdated: { bn: 'পাসওয়ার্ড সফলভাবে আপডেট হয়েছে। আপনি লগআউট হয়ে যাবেন।', en: 'Password updated successfully. You will be logged out.', ar: 'تم تحديث كلمة المرور بنجاح. سيتم تسجيل خروجك.' },
  passwordsDoNotMatch: { bn: 'নতুন পাসওয়ার্ড এবং নিশ্চিতকরণ মিলছে না।', en: 'New password and confirmation do not match.', ar: 'كلمة المرور الجديدة والتأكيد غير متطابقين.' },
  failedToUpdatePassword: { bn: 'পাসওয়ার্ড আপডেট করতে ব্যর্থ।', en: 'Failed to update password.', ar: 'فشل تحديث كلمة المرور.' },
  forgotPassword: { bn: 'পাসওয়ার্ড ভুলে গেছেন', en: 'Forgot Password', ar: 'نسيت كلمة المرور' },
  sendResetLink: { bn: 'রিসেট লিংক পাঠান', en: 'Send Reset Link', ar: 'إرسال رابط إعادة التعيين' },
  submitting: { bn: 'জমা দেওয়া হচ্ছে...', en: 'Submitting...', ar: 'جاري الإرسال...' },
  updating: { bn: 'আপডেট করা হচ্ছে...', en: 'Updating...', ar: 'جاري التحديث...' },
  resetLinkSent: { bn: 'যদি একটি অ্যাকাউন্ট থাকে, তাহলে আপনার ইমেইলে একটি রিসেট লিংক পাঠানো হয়েছে।', en: 'If an account exists, a reset link has been sent to your email.', ar: 'إذا كان الحساب موجوداً، تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني.' },
  failedToRequestPasswordReset: { bn: 'পাসওয়ার্ড রিসেট অনুরোধ করতে ব্যর্থ।', en: 'Failed to request password reset.', ar: 'فشل طلب إعادة تعيين كلمة المرور.' },
  showPassword: { bn: 'পাসওয়ার্ড দেখান', en: 'Show password', ar: 'إظهار كلمة المرور' },
  hidePassword: { bn: 'পাসওয়ার্ড লুকান', en: 'Hide password', ar: 'إخفاء كلمة المرور' },
  filterDonations: { bn: 'অনুদান ফিল্টার করুন', en: 'Filter Donations', ar: 'تصفية التبرعات' },
  purpose: { bn: 'উদ্দেশ্য', en: 'Purpose', ar: 'الغرض' },
  allPurposes: { bn: 'সকল উদ্দেশ্য', en: 'All Purposes', ar: 'جميع الأغراض' },
  allStatuses: { bn: 'সকল অবস্থা', en: 'All Statuses', ar: 'جميع الحالات' },
  dateFrom: { bn: 'তারিখ থেকে', en: 'Date From', ar: 'التاريخ من' },
  dateTo: { bn: 'তারিখ পর্যন্ত', en: 'Date To', ar: 'التاريخ إلى' },
  clearAllFilters: { bn: 'সকল ফিল্টার সাফ করুন', en: 'Clear all filters', ar: 'مسح جميع المرشحات' },
  result: { bn: 'ফলাফল', en: 'result', ar: 'نتيجة' },
  results: { bn: 'ফলাফল', en: 'results', ar: 'نتائج' },
  noDonationsMatch: { bn: 'আপনার ফিল্টারের সাথে কোনো অনুদান মিলছে না।', en: 'No donations match your filters.', ar: 'لا توجد تبرعات تطابق المرشحات الخاصة بك.' },
  noDonationRecords: { bn: 'কোনো অনুদানের রেকর্ড পাওয়া যায়নি।', en: 'No donation records found.', ar: 'لم يتم العثور على سجلات تبرع.' },
  loadingDonations: { bn: 'অনুদান লোড করা হচ্ছে...', en: 'Loading donations...', ar: 'جاري تحميل التبرعات...' },
  transactionId: { bn: 'লেনদেন আইডি', en: 'Transaction ID', ar: 'معرف المعاملة' },
  
  // Additional
  users: { bn: 'ব্যবহারকারী', en: 'Users', ar: 'المستخدمون' },
  altText: { bn: 'Alt টেক্সট', en: 'Alt text', ar: 'نص بديل' },
  notAvailable: { bn: 'উপলব্ধ নয়', en: 'Not Available', ar: 'غير متاح' },
  details: { bn: 'বিস্তারিত', en: 'Details', ar: 'التفاصيل' },
  
  // Blog
  blogs: { bn: 'কার্যক্রমসমূহ', en: 'Activities', ar: 'الأنشطة' },
  manageBlogPosts: { bn: 'কার্যক্রম পোস্ট পরিচালনা', en: 'Manage activity posts', ar: 'إدارة منشورات الأنشطة' },
  addBlog: { bn: 'কার্যক্রম যোগ করুন', en: 'Add activity', ar: 'إضافة مدونة' },
  editBlog: { bn: 'কার্যক্রম সম্পাদনা', en: 'Edit activity', ar: 'تعديل المدونة' },
  blogsList: { bn: 'কার্যক্রম তালিকা', en: 'Activities List', ar: 'قائمة المدونات' },
  noBlogsYet: { bn: 'এখনও কোনো কার্যক্রম নেই', en: 'No activities yet', ar: 'لا توجد أنشطة بعد' },
  blogUpdated: { bn: 'কার্যক্রম সফলভাবে আপডেট হয়েছে', en: 'Activity updated successfully', ar: 'تم تحديث الأنشطة بنجاح' },
  blogCreated: { bn: 'কার্যক্রম সফলভাবে তৈরি হয়েছে', en: 'Activity created successfully', ar: 'تم إنشاء الأنشطة بنجاح' },
  blogDeleted: { bn: 'কার্যক্রম সফলভাবে মুছে ফেলা হয়েছে', en: 'Activity deleted successfully', ar: 'تم حذف الأنشطة بنجاح' },
  deleteBlogConfirm: { bn: 'আপনি কি এই কার্যক্রমটি মুছে ফেলতে চান?', en: 'Are you sure you want to delete this activity?', ar: 'هل أنت متأكد أنك تريد حذف هذه الأنشطة؟' },
  operationFailed: { bn: 'অপারেশন ব্যর্থ হয়েছে', en: 'Operation failed', ar: 'فشلت العملية' },
  deleteFailed: { bn: 'মুছে ফেলতে ব্যর্থ', en: 'Failed to delete activity', ar: 'فشل حذف الأنشطة' },
  excerpt: { bn: 'সংক্ষিপ্ত বিবরণ', en: 'Excerpt', ar: 'ملخص' },
  fullContent: { bn: 'সম্পূর্ণ বিষয়বস্তু', en: 'Full Content', ar: 'المحتوى الكامل' },
  author: { bn: 'লেখক', en: 'Author', ar: 'المؤلف' },
  category: { bn: 'বিভাগ', en: 'Category', ar: 'الفئة' },
  readTime: { bn: 'পড়ার সময়', en: 'Read Time', ar: 'وقت القراءة' },
  tags: { bn: 'ট্যাগ', en: 'Tags', ar: 'العلامات' },
  enterTag: { bn: 'ট্যাগ লিখুন এবং Enter চাপুন বা Add ক্লিক করুন', en: 'Enter tag and press Enter or click Add', ar: 'أدخل العلامة واضغط Enter أو انقر فوق إضافة' },
  addTag: { bn: 'ট্যাগ যোগ করুন', en: 'Add Tag', ar: 'إضافة علامة' },
  uploadBlogImage: { bn: 'ব্লগ ছবি আপলোড', en: 'Upload blog image', ar: 'رفع صورة المدونة' },
  uploadAuthorImage: { bn: 'লেখকের ছবি আপলোড', en: 'Upload author image', ar: 'رفع صورة المؤلف' },
  update: { bn: 'আপডেট', en: 'Update', ar: 'تحديث' },
  loading: { bn: 'লোড হচ্ছে...', en: 'Loading...', ar: 'جاري التحميل...' },
  blogNotFound: { bn: 'ব্লগ পাওয়া যায়নি', en: 'Blog Not Found', ar: 'المدونة غير موجودة' },
  blogNotFoundDesc: { bn: 'আপনি যে ব্লগ পোস্ট খুঁজছেন তা বিদ্যমান নেই।', en: 'The blog post you\'re looking for doesn\'t exist.', ar: 'منشور المدونة الذي تبحث عنه غير موجود.' },
  backToBlog: { bn: '← ব্লগে ফিরে যান', en: '← Back to Blog', ar: '← العودة إلى المدونة' },
  share: { bn: 'শেয়ার করুন:', en: 'Share:', ar: 'مشاركة:' },
  relatedBlogs: { bn: 'সম্পর্কিত ব্লগ', en: 'Related Blogs', ar: 'مدونات ذات صلة' },
  readMore: { bn: 'আরও পড়ুন', en: 'Read More', ar: 'اقرأ المزيد' },

  // Member Applications
  memberSearchPlaceholder: { bn: 'নাম, ইমেইল, মোবাইল অথবা ট্রানজেকশন আইডি দিয়ে অনুসন্ধান করুন...', en: 'Search by name, email, mobile, or transaction ID...', ar: 'ابحث بالاسم أو البريد أو الجوال أو معرف المعاملة...' },
  allTypes: { bn: 'সমস্ত ধরন', en: 'All Types', ar: 'كل الأنواع' },
  lifetimeMemberType: { bn: 'আজীবন সদস্য', en: 'Lifetime Member', ar: 'عضو دائم' },
  donorMemberType: { bn: 'দাতা সদস্য', en: 'Donor Member', ar: 'عضو متبرع' },
  allStatus: { bn: 'সমস্ত অবস্থা', en: 'All Status', ar: 'كل الحالات' },
  pendingApproval: { bn: 'অনুমোদনের অপেক্ষায়', en: 'Pending Approval', ar: 'بانتظار الموافقة' },
  approved: { bn: 'অনুমোদিত', en: 'Approved', ar: 'مقبول' },
  rejected: { bn: 'বাতিল', en: 'Rejected', ar: 'مرفوض' },
  allPaymentStatus: { bn: 'সমস্ত পেমেন্ট অবস্থা', en: 'All Payment Status', ar: 'كل حالات الدفع' },
  pending: { bn: 'অপেক্ষমান', en: 'Pending', ar: 'قيد الانتظار' },
  completed: { bn: 'সম্পন্ন', en: 'Completed', ar: 'مكتمل' },
  pendingVerification: { bn: 'যাচাইয়ের অপেক্ষায়', en: 'Pending Verification', ar: 'بانتظار التحقق' },
  failed: { bn: 'ব্যর্থ', en: 'Failed', ar: 'فشل' },
  paymentStatus: { bn: 'পেমেন্ট স্ট্যাটাস', en: 'Payment Status', ar: 'حالة الدفع' },
  status: { bn: 'স্ট্যাটাস', en: 'Status', ar: 'الحالة' },
  statusActions: { bn: 'স্ট্যাটাস অ্যাকশন', en: 'Status Actions', ar: 'إجراءات الحالة' },
  appliedDate: { bn: 'আবেদনের তারিখ', en: 'Applied Date', ar: 'تاريخ التقديم' },
  noMemberApplications: { bn: 'কোনো সদস্য আবেদন পাওয়া যায়নি', en: 'No member applications found', ar: 'لا توجد طلبات عضوية' },
  hideDetails: { bn: 'লুকান', en: 'Hide', ar: 'إخفاء' },
  expandDetails: { bn: 'প্রসারিত করুন', en: 'Expand', ar: 'توسيع' },
  memberDeleteConfirm: { bn: 'আপনি কি এই সদস্য আবেদনটি মুছে ফেলতে চান?', en: 'Are you sure you want to delete this member application?', ar: 'هل أنت متأكد أنك تريد حذف طلب العضوية هذا؟' },
  memberDeleteSuccess: { bn: 'সদস্য আবেদন সফলভাবে মুছে ফেলা হয়েছে', en: 'Member application deleted successfully', ar: 'تم حذف طلب العضوية بنجاح' },
  memberDeleteFailure: { bn: 'সদস্য আবেদন মুছতে ব্যর্থ', en: 'Failed to delete member application', ar: 'فشل حذف طلب العضوية' },
  memberStatusUpdateSuccess: { bn: 'স্ট্যাটাস সফলভাবে আপডেট হয়েছে', en: 'Status updated successfully', ar: 'تم تحديث الحالة بنجاح' },
  memberPaymentStatusUpdateSuccess: { bn: 'পেমেন্ট স্ট্যাটাস সফলভাবে আপডেট হয়েছে', en: 'Payment status updated successfully', ar: 'تم تحديث حالة الدفع بنجاح' },
  memberStatusUpdateFailure: { bn: 'স্ট্যাটাস আপডেট ব্যর্থ হয়েছে', en: 'Failed to update status', ar: 'فشل تحديث الحالة' },
  memberPaymentStatusUpdateFailure: { bn: 'পেমেন্ট স্ট্যাটাস আপডেট ব্যর্থ হয়েছে', en: 'Failed to update payment status', ar: 'فشل تحديث حالة الدفع' },
  fetchMembersFailure: { bn: 'সদস্য আবেদন আনতে ব্যর্থ', en: 'Failed to fetch member applications', ar: 'فشل جلب طلبات العضوية' },
  personalInformation: { bn: 'ব্যক্তিগত তথ্য', en: 'Personal Information', ar: 'المعلومات الشخصية' },
  fatherName: { bn: 'পিতার নাম', en: 'Father Name', ar: 'اسم الأب' },
  gender: { bn: 'লিঙ্গ', en: 'Gender', ar: 'الجنس' },
  male: { bn: 'পুরুষ', en: 'Male', ar: 'ذكر' },
  female: { bn: 'নারী', en: 'Female', ar: 'أنثى' },
  isOverseas: { bn: 'বিদেশে?', en: 'Is Overseas', ar: 'هل بالخارج؟' },
  occupation: { bn: 'পেশা', en: 'Occupation', ar: 'المهنة' },
  reference: { bn: 'রেফারেন্স', en: 'Reference', ar: 'المرجع' },
  address: { bn: 'ঠিকানা', en: 'Address', ar: 'العنوان' },
  applicationDetails: { bn: 'আবেদনের বিবরণ', en: 'Application Details', ar: 'تفاصيل الطلب' },
  applicationStatus: { bn: 'আবেদনের স্ট্যাটাস', en: 'Application Status', ar: 'حالة الطلب' },
  paymentDocument: { bn: 'পেমেন্ট ডকুমেন্ট', en: 'Payment Document', ar: 'مستند الدفع' },
  paymentGatewayDetails: { bn: 'পেমেন্ট গেটওয়ে বিবরণ', en: 'Payment Gateway Details', ar: 'تفاصيل بوابة الدفع' },
  document: { bn: 'ডকুমেন্ট', en: 'Document', ar: 'المستند' },
  viewPaymentDocument: { bn: 'পেমেন্ট ডকুমেন্ট দেখুন', en: 'View Payment Document', ar: 'عرض مستند الدفع' },
  appliedAt: { bn: 'আবেদনের সময়', en: 'Applied At', ar: 'وقت التقديم' },
  lastUpdated: { bn: 'সর্বশেষ আপডেট', en: 'Last Updated', ar: 'آخر تحديث' },
  validationId: { bn: 'ভ্যালিডেশন আইডি', en: 'Validation ID', ar: 'معرف التحقق' },
  applications: { bn: 'আবেদন', en: 'applications', ar: 'طلبات' },
  memberType: { bn: 'সদস্যের ধরন', en: 'Member Type', ar: 'نوع العضو' },
  memberTableType: { bn: 'ধরন', en: 'Type', ar: 'النوع' },
  memberTableAmount: { bn: 'পরিমাণ', en: 'Amount', ar: 'المبلغ' },
  memberTablePaymentStatus: { bn: 'পেমেন্ট স্ট্যাটাস', en: 'Payment Status', ar: 'حالة الدفع' },
  memberTableStatus: { bn: 'স্ট্যাটাস', en: 'Status', ar: 'الحالة' },
  memberTableAppliedDate: { bn: 'আবেদনের তারিখ', en: 'Applied Date', ar: 'تاريخ التقديم' },
  memberTableStatusActions: { bn: 'স্ট্যাটাস অ্যাকশন', en: 'Status Actions', ar: 'إجراءات الحالة' },
  memberTableDetails: { bn: 'বিস্তারিত', en: 'Details', ar: 'التفاصيل' },
  memberTableActions: { bn: 'কার্যক্রম', en: 'Actions', ar: 'الإجراءات' },
  memberTablePaymentStatusActions: { bn: 'পেমেন্ট অ্যাকশন', en: 'Payment Actions', ar: 'إجراءات الدفع' },
  
  // Activities
  manageActivities: { bn: 'কর্মসূচি পরিচালনা', en: 'Manage activities', ar: 'إدارة الأنشطة' },
  addActivity: { bn: 'কর্মসূচি যোগ করুন', en: 'Add Activity', ar: 'إضافة نشاط' },
  editActivity: { bn: 'কর্মসূচি সম্পাদনা', en: 'Edit Activity', ar: 'تعديل النشاط' },
  activityUpdated: { bn: 'কর্মসূচি সফলভাবে আপডেট হয়েছে', en: 'Activity updated successfully', ar: 'تم تحديث النشاط بنجاح' },
  activityCreated: { bn: 'কর্মসূচি সফলভাবে তৈরি হয়েছে', en: 'Activity created successfully', ar: 'تم إنشاء النشاط بنجاح' },
  activityDeleted: { bn: 'কর্মসূচি সফলভাবে মুছে ফেলা হয়েছে', en: 'Activity deleted successfully', ar: 'تم حذف النشاط بنجاح' },
  deleteActivityConfirm: { bn: 'আপনি কি এই কর্মসূচিটি মুছে ফেলতে চান?', en: 'Are you sure you want to delete this activity?', ar: 'هل أنت متأكد أنك تريد حذف هذا النشاط؟' },
  activitiesList: { bn: 'কর্মসূচির তালিকা', en: 'Activities List', ar: 'قائمة الأنشطة' },
  noActivitiesYet: { bn: 'এখনও কোনো কর্মসূচি নেই', en: 'No activities yet', ar: 'لا توجد أنشطة بعد' },
  description: { bn: 'বিবরণ', en: 'Description', ar: 'الوصف' },
  
  // Donation Categories
  manageDonationCategories: { bn: 'অনুদান বিভাগ পরিচালনা', en: 'Manage donation categories', ar: 'إدارة فئات التبرعات' },
  addCategory: { bn: 'বিভাগ যোগ করুন', en: 'Add Category', ar: 'إضافة فئة' },
  editDonationCategory: { bn: 'অনুদান বিভাগ সম্পাদনা', en: 'Edit Donation Category', ar: 'تعديل فئة التبرع' },
  addDonationCategory: { bn: 'অনুদান বিভাগ যোগ করুন', en: 'Add Donation Category', ar: 'إضافة فئة التبرع' },
  donationCategoryUpdated: { bn: 'অনুদান বিভাগ সফলভাবে আপডেট হয়েছে', en: 'Donation category updated successfully', ar: 'تم تحديث فئة التبرع بنجاح' },
  donationCategoryCreated: { bn: 'অনুদান বিভাগ সফলভাবে তৈরি হয়েছে', en: 'Donation category created successfully', ar: 'تم إنشاء فئة التبرع بنجاح' },
  donationCategoryDeleted: { bn: 'অনুদান বিভাগ সফলভাবে মুছে ফেলা হয়েছে', en: 'Donation category deleted successfully', ar: 'تم حذف فئة التبرع بنجاح' },
  deleteDonationCategoryConfirm: { bn: 'আপনি কি এই অনুদান বিভাগটি মুছে ফেলতে চান?', en: 'Are you sure you want to delete this donation category?', ar: 'هل أنت متأكد أنك تريد حذف فئة التبرع هذه؟' },
  donationCategoriesList: { bn: 'অনুদান বিভাগের তালিকা', en: 'Donation Categories List', ar: 'قائمة فئات التبرعات' },
  noDonationCategoriesYet: { bn: 'এখনও কোনো অনুদান বিভাগ নেই', en: 'No donation categories yet', ar: 'لا توجد فئات تبرع بعد' },
  subtitle: { bn: 'উপশিরোনাম', en: 'Subtitle', ar: 'العنوان الفرعي' },
  slug: { bn: 'স্লাগ', en: 'Slug', ar: 'الرابط' },
  generate: { bn: 'তৈরি করুন', en: 'Generate', ar: 'إنشاء' },
  videoUrl: { bn: 'ভিডিও URL', en: 'Video URL', ar: 'رابط الفيديو' },
  expenseCategory: { bn: 'ব্যয় বিভাগ', en: 'Expense Category', ar: 'فئة المصروفات' },
  add: { bn: 'যোগ করুন', en: 'Add', ar: 'إضافة' },
  formTitle: { bn: 'ফর্ম শিরোনাম', en: 'Form Title', ar: 'عنوان النموذج' },
  formDescription: { bn: 'ফর্ম বিবরণ', en: 'Form Description', ar: 'وصف النموذج' },
  donationAmountOptions: { bn: 'অনুদানের পরিমাণের বিকল্প', en: 'Donation Amount Options', ar: 'خيارات مبلغ التبرع' },
  enableDailyDonationAmounts: { bn: 'দৈনিক অনুদানের পরিমাণ সক্রিয় করুন', en: 'Enable Daily Donation Amounts', ar: 'تفعيل مبالغ التبرع اليومية' },
  enableMonthlyDonationAmounts: { bn: 'মাসিক অনুদানের পরিমাণ সক্রিয় করুন', en: 'Enable Monthly Donation Amounts', ar: 'تفعيل مبالغ التبرع الشهرية' },
  enterDailyAmount: { bn: 'দৈনিক পরিমাণ লিখুন...', en: 'Enter daily amount...', ar: 'أدخل المبلغ اليومي...' },
  enterMonthlyAmount: { bn: 'মাসিক পরিমাণ লিখুন...', en: 'Enter monthly amount...', ar: 'أدخل المبلغ الشهري...' },
  enterDonationAmount: { bn: 'অনুদানের পরিমাণ লিখুন...', en: 'Enter donation amount...', ar: 'أدخل مبلغ التبرع...' },
  donationAmounts: { bn: 'অনুদানের পরিমাণ', en: 'Donation Amounts', ar: 'مبالغ التبرع' },
  thumbnail: { bn: 'থাম্বনেইল', en: 'Thumbnail', ar: 'الصورة المصغرة' },
  uploadThumbnail: { bn: 'থাম্বনেইল আপলোড', en: 'Upload thumbnail', ar: 'رفع الصورة المصغرة' },
  validPositiveNumber: { bn: 'একটি বৈধ ধনাত্মক সংখ্যা লিখুন', en: 'Please enter a valid positive number', ar: 'يرجى إدخال رقم موجب صالح' },
  atLeastOneDonationOption: { bn: 'অন্তত একটি অনুদানের পরিমাণ বিকল্প প্রদান করুন (দৈনিক, মাসিক, বা পরিমাণ)', en: 'Please provide at least one donation amount option (daily, monthly, or amount)', ar: 'يرجى توفير خيار مبلغ تبرع واحد على الأقل (يومي أو شهري أو مبلغ)' },
  pleaseUploadThumbnail: { bn: 'একটি থাম্বনেইল ছবি আপলোড করুন', en: 'Please upload a thumbnail image', ar: 'يرجى رفع صورة مصغرة' },
  categoryIdMissing: { bn: 'বিভাগ আইডি অনুপস্থিত', en: 'Category ID is missing', ar: 'معرف الفئة مفقود' },
  failedToLoadCategory: { bn: 'বিভাগের তথ্য লোড করতে ব্যর্থ', en: 'Failed to load category data', ar: 'فشل تحميل بيانات الفئة' },
  
  // Gallery
  manageGalleryItems: { bn: 'গ্যালারি আইটেম পরিচালনা', en: 'Manage gallery items', ar: 'إدارة عناصر المعرض' },
  addItem: { bn: 'আইটেম যোগ করুন', en: 'Add Item', ar: 'إضافة عنصر' },
  galleryItemUpdated: { bn: 'গ্যালারি আইটেম সফলভাবে আপডেট হয়েছে', en: 'Gallery item updated successfully', ar: 'تم تحديث عنصر المعرض بنجاح' },
  galleryItemCreated: { bn: 'গ্যালারি আইটেম সফলভাবে তৈরি হয়েছে', en: 'Gallery item created successfully', ar: 'تم إنشاء عنصر المعرض بنجاح' },
  galleryItemDeleted: { bn: 'গ্যালারি আইটেম সফলভাবে মুছে ফেলা হয়েছে', en: 'Gallery item deleted successfully', ar: 'تم حذف عنصر المعرض بنجاح' },
  deleteGalleryItemConfirm: { bn: 'আপনি কি এই গ্যালারি আইটেমটি মুছে ফেলতে চান?', en: 'Are you sure you want to delete this gallery item?', ar: 'هل أنت متأكد أنك تريد حذف عنصر المعرض هذا؟' },
  noGalleryItemsYet: { bn: 'এখনও কোনো গ্যালারি আইটেম নেই', en: 'No gallery items yet', ar: 'لا توجد عناصر معرض بعد' },
  selectCategory: { bn: 'বিভাগ নির্বাচন করুন', en: 'Select category', ar: 'اختر الفئة' },
  type: { bn: 'ধরন', en: 'Type', ar: 'النوع' },
  image: { bn: 'ছবি', en: 'Image', ar: 'صورة' },
  video: { bn: 'ভিডিও', en: 'Video', ar: 'فيديو' },
  viewVideo: { bn: 'ভিডিও দেখুন', en: 'View video', ar: 'عرض الفيديو' },
  pleaseProvideVideoUrl: { bn: 'একটি ভিডিও URL প্রদান করুন', en: 'Please provide a video URL', ar: 'يرجى توفير رابط فيديو' },
  createCategory: { bn: 'গ্যালারি বিভাগ যোগ করুন', en: 'Create Gallery Category', ar: 'إنشاء فئة المعرض' },
  // Hero
  manageHeroImages: { bn: 'হিরো সেকশনের ব্যাকগ্রাউন্ড ছবি পরিচালনা', en: 'Manage hero section background images', ar: 'إدارة صور خلفية قسم البطل' },
  addImage: { bn: 'ছবি যোগ করুন', en: 'Add Image', ar: 'إضافة صورة' },
  editHeroImage: { bn: 'হিরো ছবি সম্পাদনা', en: 'Edit Hero Image', ar: 'تعديل صورة البطل' },
  addHeroImage: { bn: 'হিরো ছবি যোগ করুন', en: 'Add Hero Image', ar: 'إضافة صورة البطل' },
  heroImageUpdated: { bn: 'হিরো ছবি সফলভাবে আপডেট হয়েছে', en: 'Hero image updated successfully', ar: 'تم تحديث صورة البطل بنجاح' },
  heroImageCreated: { bn: 'হিরো ছবি সফলভাবে তৈরি হয়েছে', en: 'Hero image created successfully', ar: 'تم إنشاء صورة البطل بنجاح' },
  heroImageDeleted: { bn: 'হিরো ছবি সফলভাবে মুছে ফেলা হয়েছে', en: 'Hero image deleted successfully', ar: 'تم حذف صورة البطل بنجاح' },
  deleteHeroImageConfirm: { bn: 'আপনি কি এই হিরো ছবিটি মুছে ফেলতে চান?', en: 'Are you sure you want to delete this hero image?', ar: 'هل أنت متأكد أنك تريد حذف صورة البطل هذه؟' },
  titleOptional: { bn: 'শিরোনাম (ঐচ্ছিক)', en: 'Title (Optional)', ar: 'العنوان (اختياري)' },
  imageTitle: { bn: 'ছবির শিরোনাম', en: 'Image title', ar: 'عنوان الصورة' },
  order: { bn: 'ক্রম', en: 'Order', ar: 'الترتيب' },
  lowerNumbersAppearFirst: { bn: 'নিম্ন সংখ্যাগুলি প্রথমে প্রদর্শিত হবে', en: 'Lower numbers appear first', ar: 'الأرقام الأقل تظهر أولاً' },
  descriptionOptional: { bn: 'বিবরণ (ঐচ্ছিক)', en: 'Description (Optional)', ar: 'الوصف (اختياري)' },
  imageDescription: { bn: 'ছবির বিবরণ', en: 'Image description', ar: 'وصف الصورة' },
  activeShowInSlider: { bn: 'সক্রিয় (স্লাইডারে দেখান)', en: 'Active (Show in slider)', ar: 'نشط (عرض في الشريط)' },
  uploadHeroImage: { bn: 'হিরো ছবি আপলোড', en: 'Upload Hero Image', ar: 'رفع صورة البطل' },
  pleaseUploadImage: { bn: 'একটি ছবি আপলোড করুন', en: 'Please upload an image', ar: 'يرجى رفع صورة' },
  heroImagesCount: { bn: 'হিরো ছবি ({count})', en: 'Hero Images ({count})', ar: 'صور البطل ({count})' },
  active: { bn: 'সক্রিয়', en: 'Active', ar: 'نشط' },
  inactive: { bn: 'নিষ্ক্রিয়', en: 'Inactive', ar: 'غير نشط' },
  heroImageActivated: { bn: 'হিরো ছবি সফলভাবে সক্রিয় হয়েছে', en: 'Hero image activated successfully', ar: 'تم تفعيل صورة البطل بنجاح' },
  heroImageDeactivated: { bn: 'হিরো ছবি সফলভাবে নিষ্ক্রিয় হয়েছে', en: 'Hero image deactivated successfully', ar: 'تم إلغاء تفعيل صورة البطل بنجاح' },
  noHeroImagesYet: { bn: 'এখনও কোনো হিরো ছবি নেই। শুরু করতে একটি যোগ করুন।', en: 'No hero images yet. Add one to get started.', ar: 'لا توجد صور بطل بعد. أضف واحدة للبدء.' },
  
  // Notices
  manageNotices: { bn: 'নোটিশ পরিচালনা', en: 'Manage notices', ar: 'إدارة الإعلانات' },
  addNotice: { bn: 'নোটিশ যোগ করুন', en: 'Add Notice', ar: 'إضافة إعلان' },
  editNotice: { bn: 'নোটিশ সম্পাদনা', en: 'Edit Notice', ar: 'تعديل الإعلان' },
  noticeUpdated: { bn: 'নোটিশ সফলভাবে আপডেট হয়েছে', en: 'Notice updated successfully', ar: 'تم تحديث الإعلان بنجاح' },
  noticeCreated: { bn: 'নোটিশ সফলভাবে তৈরি হয়েছে', en: 'Notice created successfully', ar: 'تم إنشاء الإعلان بنجاح' },
  noticeDeleted: { bn: 'নোটিশ সফলভাবে মুছে ফেলা হয়েছে', en: 'Notice deleted successfully', ar: 'تم حذف الإعلان بنجاح' },
  deleteNoticeConfirm: { bn: 'আপনি কি এই নোটিশটি মুছে ফেলতে চান?', en: 'Are you sure you want to delete this notice?', ar: 'هل أنت متأكد أنك تريد حذف هذا الإعلان؟' },
  noticesList: { bn: 'নোটিশের তালিকা', en: 'Notices List', ar: 'قائمة الإعلانات' },
  noNoticesYet: { bn: 'এখনও কোনো নোটিশ নেই', en: 'No notices yet', ar: 'لا توجد إعلانات بعد' },
  subTitle: { bn: 'উপশিরোনাম', en: 'Subtitle', ar: 'العنوان الفرعي' },
  
  // Programs
  managePrograms: { bn: 'প্রোগ্রাম পরিচালনা', en: 'Manage programs', ar: 'إدارة البرامج' },
  addProgram: { bn: 'প্রোগ্রাম যোগ করুন', en: 'Add Program', ar: 'إضافة برنامج' },
  editProgram: { bn: 'প্রোগ্রাম সম্পাদনা', en: 'Edit Program', ar: 'تعديل البرنامج' },
  programUpdated: { bn: 'প্রোগ্রাম সফলভাবে আপডেট হয়েছে', en: 'Program updated successfully', ar: 'تم تحديث البرنامج بنجاح' },
  programCreated: { bn: 'প্রোগ্রাম সফলভাবে তৈরি হয়েছে', en: 'Program created successfully', ar: 'تم إنشاء البرنامج بنجاح' },
  programDeleted: { bn: 'প্রোগ্রাম সফলভাবে মুছে ফেলা হয়েছে', en: 'Program deleted successfully', ar: 'تم حذف البرنامج بنجاح' },
  deleteProgramConfirm: { bn: 'আপনি কি এই প্রোগ্রামটি মুছে ফেলতে চান?', en: 'Are you sure you want to delete this program?', ar: 'هل أنت متأكد أنك تريد حذف هذا البرنامج؟' },
  programsList: { bn: 'প্রোগ্রামের তালিকা', en: 'Programs List', ar: 'قائمة البرامج' },
  noProgramsYet: { bn: 'এখনও কোনো প্রোগ্রাম নেই', en: 'No programs yet', ar: 'لا توجد برامج بعد' },
  area: { bn: 'এলাকা', en: 'Area', ar: 'المنطقة' },
  duration: { bn: 'সময়কাল', en: 'Duration', ar: 'المدة' },
  beneficiary: { bn: 'উপকারভোগী', en: 'Beneficiary', ar: 'المستفيد' },
  projectGoalsAndObjectives: { bn: 'প্রকল্পের লক্ষ্য ও উদ্দেশ্য', en: 'Project Goals and Objectives', ar: 'أهداف ومقاصد المشروع' },
  addBeneficiary: { bn: 'উপকারভোগী যোগ করুন...', en: 'Add beneficiary...', ar: 'إضافة مستفيد...' },
  addExpenseCategory: { bn: 'ব্যয় বিভাগ যোগ করুন...', en: 'Add expense category...', ar: 'إضافة فئة مصروفات...' },
  addProjectGoal: { bn: 'প্রকল্প লক্ষ্য যোগ করুন...', en: 'Add project goal...', ar: 'إضافة هدف مشروع...' },
  addActivityItem: { bn: 'কর্মসূচি যোগ করুন...', en: 'Add activity...', ar: 'إضافة نشاط...' },
  mediaImages: { bn: 'মিডিয়া ছবি', en: 'Media Images', ar: 'صور الوسائط' },
  uploadImages: { bn: 'ছবি আপলোড', en: 'Upload images', ar: 'رفع الصور' },
  programIdMissing: { bn: 'প্রোগ্রাম আইডি অনুপস্থিত', en: 'Program ID is missing', ar: 'معرف البرنامج مفقود' },
  failedToLoadProgram: { bn: 'প্রোগ্রামের তথ্য লোড করতে ব্যর্থ', en: 'Failed to load program data', ar: 'فشل تحميل بيانات البرنامج' },
  
  // Users
  manageAllUsers: { bn: 'সিস্টেমের সমস্ত ব্যবহারকারী পরিচালনা', en: 'Manage all users in the system', ar: 'إدارة جميع المستخدمين في النظام' },
  searchByEmail: { bn: 'ইমেইল দিয়ে অনুসন্ধান করুন...', en: 'Search by email...', ar: 'ابحث بالبريد الإلكتروني...' },
  allRoles: { bn: 'সমস্ত ভূমিকা', en: 'All Roles', ar: 'جميع الأدوار' },
  adminRole: { bn: 'অ্যাডমিন', en: 'Admin', ar: 'مسؤول' },
  editorRole: { bn: 'সম্পাদক', en: 'Editor', ar: 'محرر' },
  userRole: { bn: 'ব্যবহারকারী', en: 'User', ar: 'مستخدم' },
  createdAt: { bn: 'তৈরির তারিখ', en: 'Created At', ar: 'تاريخ الإنشاء' },
  totalDonate: { bn: 'মোট দান', en: 'Total Donate', ar: 'إجمالي التبرع' },
  userDeleted: { bn: 'ব্যবহারকারী সফলভাবে মুছে ফেলা হয়েছে', en: 'User deleted successfully', ar: 'تم حذف المستخدم بنجاح' },
  failedToDeleteUser: { bn: 'ব্যবহারকারী মুছতে ব্যর্থ', en: 'Failed to delete user', ar: 'فشل حذف المستخدم' },
  deleteUserConfirm: { bn: 'আপনি কি এই ব্যবহারকারীটি মুছে ফেলতে চান?', en: 'Are you sure you want to delete this user?', ar: 'هل أنت متأكد أنك تريد حذف هذا المستخدم؟' },
  updateUser: { bn: 'ব্যবহারকারী আপডেট', en: 'Update User', ar: 'تحديث المستخدم' },
  userUpdated: { bn: 'ব্যবহারকারী সফলভাবে আপডেট হয়েছে', en: 'User updated successfully', ar: 'تم تحديث المستخدم بنجاح' },
  failedToUpdateUser: { bn: 'ব্যবহারকারী আপডেট করতে ব্যর্থ', en: 'Failed to update user', ar: 'فشل تحديث المستخدم' },
  failedToFetchUsers: { bn: 'ব্যবহারকারী আনতে ব্যর্থ', en: 'Failed to fetch users', ar: 'فشل جلب المستخدمين' },
  noUsersFound: { bn: 'কোনো ব্যবহারকারী পাওয়া যায়নি', en: 'No users found', ar: 'لا يوجد مستخدمون' },
  showingUsers: { bn: 'দেখানো হচ্ছে {start} থেকে {end} এর মধ্যে {total} ব্যবহারকারী', en: 'Showing {start} to {end} of {total} users', ar: 'عرض {start} إلى {end} من {total} مستخدم' },
  
  // Volunteers
  manageVolunteerApplications: { bn: 'সমস্ত স্বেচ্ছাসেবক আবেদন পরিচালনা', en: 'Manage all volunteer applications', ar: 'إدارة جميع طلبات المتطوعين' },
  volunteerSearchPlaceholder: { bn: 'নাম, ইমেইল অথবা মোবাইল নম্বর দিয়ে অনুসন্ধান করুন...', en: 'Search by name, email, or mobile number...', ar: 'ابحث بالاسم أو البريد الإلكتروني أو رقم الجوال...' },
  volunteerStatusUpdated: { bn: 'স্ট্যাটাস সফলভাবে আপডেট হয়েছে', en: 'Status updated successfully', ar: 'تم تحديث الحالة بنجاح' },
  volunteerStatusUpdateFailed: { bn: 'স্ট্যাটাস আপডেট ব্যর্থ হয়েছে', en: 'Failed to update status', ar: 'فشل تحديث الحالة' },
  volunteerDeleted: { bn: 'স্বেচ্ছাসেবক আবেদন সফলভাবে মুছে ফেলা হয়েছে', en: 'Volunteer application deleted successfully', ar: 'تم حذف طلب المتطوع بنجاح' },
  volunteerDeleteFailed: { bn: 'স্বেচ্ছাসেবক আবেদন মুছতে ব্যর্থ', en: 'Failed to delete volunteer application', ar: 'فشل حذف طلب المتطوع' },
  deleteVolunteerConfirm: { bn: 'আপনি কি এই স্বেচ্ছাসেবক আবেদনটি মুছে ফেলতে চান?', en: 'Are you sure you want to delete this volunteer application?', ar: 'هل أنت متأكد أنك تريد حذف طلب المتطوع هذا؟' },
  failedToFetchVolunteers: { bn: 'স্বেচ্ছাসেবক আবেদন আনতে ব্যর্থ', en: 'Failed to fetch volunteer applications', ar: 'فشل جلب طلبات المتطوعين' },
  noVolunteerApplications: { bn: 'কোনো স্বেচ্ছাসেবক আবেদন পাওয়া যায়নি', en: 'No volunteer applications found', ar: 'لا توجد طلبات متطوعين' },
  professionalInformation: { bn: 'পেশাগত তথ্য', en: 'Professional Information', ar: 'المعلومات المهنية' },
  currentProfession: { bn: 'বর্তমান পেশা', en: 'Current Profession', ar: 'المهنة الحالية' },
  organizationName: { bn: 'সংস্থার নাম', en: 'Organization Name', ar: 'اسم المنظمة' },
  workplaceAddress: { bn: 'কর্মক্ষেত্রের ঠিকানা', en: 'Workplace Address', ar: 'عنوان مكان العمل' },
  currentAddress: { bn: 'বর্তমান ঠিকানা', en: 'Current Address', ar: 'العنوان الحالي' },
  permanentAddress: { bn: 'স্থায়ী ঠিকানা', en: 'Permanent Address', ar: 'العنوان الدائم' },
  division: { bn: 'বিভাগ', en: 'Division', ar: 'القسم' },
  district: { bn: 'জেলা', en: 'District', ar: 'المنطقة' },
  upazila: { bn: 'উপজেলা', en: 'Upazila', ar: 'المنطقة الفرعية' },
  union: { bn: 'ইউনিয়ন', en: 'Union', ar: 'الاتحاد' },
  fullAddress: { bn: 'সম্পূর্ণ ঠিকানা', en: 'Full Address', ar: 'العنوان الكامل' },
  overseasIfApplicable: { bn: 'বিদেশে (যদি প্রযোজ্য)', en: 'Overseas (if applicable)', ar: 'في الخارج (إن وجد)' },
  country: { bn: 'দেশ', en: 'Country', ar: 'البلد' },
  overseasAddress: { bn: 'বিদেশের ঠিকানা', en: 'Overseas Address', ar: 'عنوان الخارج' },
  socialMediaMessaging: { bn: 'সোশ্যাল মিডিয়া ও মেসেজিং', en: 'Social Media & Messaging', ar: 'وسائل التواصل الاجتماعي والمراسلة' },
  facebookId: { bn: 'ফেসবুক আইডি', en: 'Facebook ID', ar: 'معرف Facebook' },
  linkedinId: { bn: 'লিঙ্কডইন আইডি', en: 'LinkedIn ID', ar: 'معرف LinkedIn' },
  whatsapp: { bn: 'হোয়াটসঅ্যাপ', en: 'WhatsApp', ar: 'WhatsApp' },
  telegram: { bn: 'টেলিগ্রাম', en: 'Telegram', ar: 'Telegram' },
  educationalQualification: { bn: 'শিক্ষাগত যোগ্যতা', en: 'Educational Qualification', ar: 'المؤهلات التعليمية' },
  educationMedium: { bn: 'শিক্ষার মাধ্যম', en: 'Education Medium', ar: 'وسيلة التعليم' },
  educationLevel: { bn: 'শিক্ষার স্তর', en: 'Education Level', ar: 'مستوى التعليم' },
  currentClassYear: { bn: 'বর্তমান শ্রেণী/বছর', en: 'Current Class/Year', ar: 'الصف/السنة الحالية' },
  departmentDegree: { bn: 'বিভাগ/ডিগ্রি', en: 'Department/Degree', ar: 'القسم/الدرجة' },
  lastInstitutionName: { bn: 'শেষ প্রতিষ্ঠানের নাম', en: 'Last Institution Name', ar: 'اسم المؤسسة الأخيرة' },
  previousVolunteerExperience: { bn: 'পূর্ববর্তী স্বেচ্ছাসেবক অভিজ্ঞতা', en: 'Previous Volunteer Experience', ar: 'تجربة المتطوع السابقة' },
  wasVolunteer: { bn: 'স্বেচ্ছাসেবক ছিল', en: 'Was Volunteer', ar: 'كان متطوعاً' },
  projectName: { bn: 'প্রকল্পের নাম', en: 'Project Name', ar: 'اسم المشروع' },
  projectLocation: { bn: 'প্রকল্পের অবস্থান', en: 'Project Location', ar: 'موقع المشروع' },
  batch: { bn: 'ব্যাচ', en: 'Batch', ar: 'الدفعة' },
  beneficiariesCount: { bn: 'উপকারভোগীর সংখ্যা', en: 'Beneficiaries Count', ar: 'عدد المستفيدين' },
  profileImage: { bn: 'প্রোফাইল ছবি', en: 'Profile Image', ar: 'صورة الملف الشخصي' },
  viewFullImage: { bn: 'সম্পূর্ণ ছবি দেখুন', en: 'View full image', ar: 'عرض الصورة الكاملة' },
  notUsed: { bn: 'ব্যবহৃত হয়নি', en: 'Not used', ar: 'غير مستخدم' },
  showingVolunteers: { bn: 'দেখানো হচ্ছে {start} থেকে {end} এর মধ্যে {total} আবেদন', en: 'Showing {start} to {end} of {total} applications', ar: 'عرض {start} إلى {end} من {total} طلب' },
  
  // Admin Users
  createAdminUserTitle: { bn: 'অ্যাডমিন ব্যবহারকারী তৈরি', en: 'Create Admin User', ar: 'إنشاء مستخدم مسؤول' },
  addNewAdminEditor: { bn: 'সিস্টেমে একটি নতুন অ্যাডমিন বা সম্পাদক ব্যবহারকারী যোগ করুন', en: 'Add a new admin or editor user to the system', ar: 'إضافة مستخدم مسؤول أو محرر جديد إلى النظام' },
  adminUserCreated: { bn: 'অ্যাডমিন ব্যবহারকারী সফলভাবে তৈরি হয়েছে', en: 'Admin user created successfully', ar: 'تم إنشاء مستخدم المسؤول بنجاح' },
  failedToCreateAdminUser: { bn: 'অ্যাডমিন ব্যবহারকারী তৈরি করতে ব্যর্থ', en: 'Failed to create admin user', ar: 'فشل إنشاء مستخدم المسؤول' },
  creating: { bn: 'তৈরি হচ্ছে...', en: 'Creating...', ar: 'جاري الإنشاء...' },
  emailPlaceholder: { bn: 'email@example.com', en: 'email@example.com', ar: 'email@example.com' },
  passwordPlaceholder: { bn: '••••••••', en: '••••••••', ar: '••••••••' },
  detailsLabel: { bn: 'বিস্তারিত', en: 'Details', ar: 'التفاصيل' },
  actionsLabel: { bn: 'কার্যক্রম', en: 'Actions', ar: 'الإجراءات' },
  memberTypeLifetime: { bn: 'আজীবন', en: 'Lifetime', ar: 'دائم' },
  memberTypeDonor: { bn: 'দাতা', en: 'Donor', ar: 'متبرع' },
  searchResultsSummary: { bn: 'আবেদন', en: 'applications', ar: 'طلبات' },
  statusSelectLabel: { bn: 'স্ট্যাটাস নির্বাচন করুন', en: 'Select status', ar: 'اختر الحالة' },
  view: { bn: 'দেখুন', en: 'View', ar: 'عرض' },
  searchResultsOf: { bn: 'মোট', en: 'of', ar: 'من' },
  
  // Payment Methods
  paymentMethodOnline: { bn: 'অনলাইন', en: 'Online', ar: 'عبر الإنترنت' },
  paymentMethodBankTransfer: { bn: 'ব্যাংক ট্রান্সফার', en: 'Bank Transfer', ar: 'تحويل بنكي' },
  paymentMethodBankDeposit: { bn: 'ব্যাংক ডিপোজিট', en: 'Bank Deposit', ar: 'إيداع بنكي' },
  
  // Status values (already exist but ensuring consistency)
  statusPendingApproval: { bn: 'অনুমোদনের অপেক্ষায়', en: 'Pending Approval', ar: 'بانتظار الموافقة' },
  statusApproved: { bn: 'অনুমোদিত', en: 'Approved', ar: 'مقبول' },
  statusRejected: { bn: 'বাতিল', en: 'Rejected', ar: 'مرفوض' },
  statusPending: { bn: 'অপেক্ষমান', en: 'Pending', ar: 'قيد الانتظار' },
  statusCompleted: { bn: 'সম্পন্ন', en: 'Completed', ar: 'مكتمل' },
  statusPendingVerification: { bn: 'যাচাইয়ের অপেক্ষায়', en: 'Pending Verification', ar: 'بانتظار التحقق' },
  statusFailed: { bn: 'ব্যর্থ', en: 'Failed', ar: 'فشل' },
  
  // Privacy Policy
  privacyPageTitle: { bn: 'গোপনীয়তা নীতি', en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
  privacyStatementTitle: { bn: 'গোপনীয়তার বিবৃতি', en: 'Privacy Statement', ar: 'بيان الخصوصية' },
  privacyStatementBody1: { bn: 'দারুল কুরআন ফাউন্ডেশন আপনার ব্যক্তিগত তথ্যের গোপনীয়তা ও নিরাপত্তা রক্ষায় প্রতিশ্রুতিবদ্ধ। এই গোপনীয়তা নীতিটি শুধুমাত্র দারুল কুরআন ফাউন্ডেশনের ওয়েবসাইটের জন্য প্রযোজ্য এবং এখান থেকে সংগ্রহকৃত তথ্যের ব্যবহার ও সংরক্ষণ সম্পর্কিত বিষয়গুলো নিয়ন্ত্রণ করে। এটি অন্য কোনো অনলাইন বা অফলাইন প্ল্যাটফর্ম, পণ্য বা সেবার ক্ষেত্রে প্রযোজ্য নয়।', en: 'Darul Quran Foundation is committed to protecting the privacy and security of your personal information. This privacy policy applies only to the Darul Quran Foundation website and governs the use and storage of information collected from here. It does not apply to any other online or offline platform, product, or service.', ar: 'مؤسسة دار القرآن ملتزمة بحماية خصوصية وأمان معلوماتك الشخصية. تنطبق سياسة الخصوصية هذه فقط على موقع مؤسسة دار القرآن وتنظم استخدام وتخزين المعلومات المجمعة من هنا. لا تنطبق على أي منصة أخرى عبر الإنترنت أو غير متصلة بالإنترنت أو منتج أو خدمة.' },
  privacyStatementBody2: { bn: 'আমরা পরামর্শ দিচ্ছি, আপনি ওয়েবসাইট ব্যবহারের আগে এই নীতিমালা সতর্কভাবে পর্যালোচনা করুন।', en: 'We advise you to carefully review this policy before using the website.', ar: 'ننصحك بمراجعة هذه السياسة بعناية قبل استخدام الموقع.' },
  privacyCollectionTitle: { bn: 'ব্যক্তিগত তথ্য সংগ্রহ', en: 'Personal Information Collection', ar: 'جمع المعلومات الشخصية' },
  privacyCollectionBody1: { bn: 'একটি অলাভজনক সংস্থা হিসেবে দারুল কুরআন ফাউন্ডেশন কিছু নির্দিষ্ট ব্যক্তিগত তথ্য সংগ্রহ করে, যেমন: নাম, ইমেইল, ফোন নম্বর, ঠিকানা প্রভৃতি। এই তথ্য কেবল অনুদান গ্রহণ, ইভেন্ট রেজিস্ট্রেশন এবং বিলিং প্রক্রিয়ার জন্য ব্যবহার করা হয়।', en: 'As a non-profit organization, Darul Quran Foundation collects certain personal information such as name, email, phone number, address, etc. This information is used only for receiving donations, event registration, and billing processes.', ar: 'كمنظمة غير ربحية، تجمع مؤسسة دار القرآن معلومات شخصية معينة مثل الاسم والبريد الإلكتروني ورقم الهاتف والعنوان وما إلى ذلك. تُستخدم هذه المعلومات فقط لتلقي التبرعات وتسجيل الأحداث وعمليات الفوترة.' },
  privacyCollectionBody2: { bn: 'আমরা আপনার কম্পিউটার বা ডিভাইসের হার্ডওয়্যার ও সফটওয়্যারের কোনো তথ্য সংগ্রহ করি না।', en: 'We do not collect any information about your computer or device\'s hardware and software.', ar: 'لا نجمع أي معلومات حول أجهزة الكمبيوتر أو الأجهزة أو البرامج.' },
  privacyCollectionBody3: { bn: 'যদি আপনি ওয়েবসাইটে থাকা লিংকের মাধ্যমে অন্য সাইটে প্রবেশ করেন, অনুগ্রহ করে তাদের নিজস্ব গোপনীয়তা নীতি পর্যালোচনা করুন। আমরা তৃতীয় পক্ষের ওয়েবসাইটের গোপনীয়তা রক্ষার নীতির জন্য দায়ী নই।', en: 'If you access other sites through links on the website, please review their own privacy policies. We are not responsible for the privacy policies of third-party websites.', ar: 'إذا قمت بالوصول إلى مواقع أخرى من خلال الروابط الموجودة على الموقع، يرجى مراجعة سياسات الخصوصية الخاصة بهم. نحن لسنا مسؤولين عن سياسات الخصوصية الخاصة بمواقع الطرف الثالث.' },
  privacyUsageTitle: { bn: 'ব্যক্তিগত তথ্যের ব্যবহার', en: 'Use of Personal Information', ar: 'استخدام المعلومات الشخصية' },
  privacyUsageIntro: { bn: 'আপনার দেওয়া ব্যক্তিগত তথ্য নিম্নলিখিত উদ্দেশ্যে ব্যবহৃত হতে পারে:', en: 'Your provided personal information may be used for the following purposes:', ar: 'قد تُستخدم معلوماتك الشخصية المقدمة للأغراض التالية:' },
  privacyUsageItem1: { bn: 'অনুদান গ্রহণ ও লেনদেন সম্পন্ন করতে', en: 'To receive donations and complete transactions', ar: 'لتلقي التبرعات وإتمام المعاملات' },
  privacyUsageItem2: { bn: 'ইভেন্ট সম্পর্কিত কার্যক্রম পরিচালনায়', en: 'To manage event-related activities', ar: 'لإدارة الأنشطة المتعلقة بالأحداث' },
  privacyUsageItem3: { bn: 'নতুন সেবা, পণ্য বা কার্যক্রম সম্পর্কে জানাতে', en: 'To inform about new services, products, or activities', ar: 'للإبلاغ عن الخدمات أو المنتجات أو الأنشطة الجديدة' },
  privacyUsageItem4: { bn: 'ব্যবহারকারীদের মতামত ও চাহিদা জানার জন্য জরিপ পরিচালনায়', en: 'To conduct surveys to understand user opinions and needs', ar: 'لإجراء استطلاعات الرأي لفهم آراء واحتياجات المستخدمين' },
  privacyUsageBody1: { bn: 'আমরা কখনোই আপনার তথ্য বিক্রি, ভাড়া বা তৃতীয় পক্ষের কাছে হস্তান্তর করি না। তবে মেইল বিতরণ, পেমেন্ট প্রসেসিং বা প্রযুক্তিগত সহায়তার মতো নির্দিষ্ট পরিষেবা পরিচালনার জন্য আমরা নির্ভরযোগ্য তৃতীয় পক্ষকে নিযুক্ত করতে পারি। এ ক্ষেত্রে তারা কেবল প্রয়োজনীয় তথ্যই পাবে এবং তা গোপন রাখার জন্য চুক্তিভিত্তিক বাধ্য থাকবে।', en: 'We never sell, rent, or transfer your information to third parties. However, we may engage reliable third parties for specific services such as email distribution, payment processing, or technical support. In such cases, they will only receive necessary information and will be contractually bound to keep it confidential.', ar: 'لا نبيع أو نؤجر أو ننقل معلوماتك إلى أطراف ثالثة أبداً. ومع ذلك، قد نتعامل مع أطراف ثالثة موثوقة لخدمات محددة مثل توزيع البريد الإلكتروني أو معالجة المدفوعات أو الدعم التقني. في مثل هذه الحالات، سيحصلون فقط على المعلومات الضرورية وسيكونون ملزمين تعاقدياً بالحفاظ على سرية المعلومات.' },
  privacyUsageBody2: { bn: 'আমরা সংবেদনশীল তথ্য শুধু আপনার স্পষ্ট সম্মতির ভিত্তিতে সংগ্রহ ও ব্যবহার করি।', en: 'We collect and use sensitive information only with your explicit consent.', ar: 'نجمع ونستخدم المعلومات الحساسة فقط بموافقتك الصريحة.' },
  privacyLegalTitle: { bn: 'আইনগত প্রয়োজনীয়তা', en: 'Legal Requirements', ar: 'المتطلبات القانونية' },
  privacyLegalIntro: { bn: 'আইনগত প্রয়োজন বা জরুরি পরিস্থিতিতে (যেমন ব্যবহারকারীর নিরাপত্তা নিশ্চিতকরণ) আপনার তথ্য প্রকাশ করা হতে পারে:', en: 'Your information may be disclosed in legal requirements or emergency situations (such as ensuring user safety):', ar: 'قد يتم الكشف عن معلوماتك في المتطلبات القانونية أو حالات الطوارئ (مثل ضمان سلامة المستخدم):' },
  privacyLegalItem1: { bn: 'আদালতের নির্দেশনা অনুসারে', en: 'As per court orders', ar: 'وفقاً لأوامر المحكمة' },
  privacyLegalItem2: { bn: 'ফাউন্ডেশনের অধিকার ও সম্পত্তি সুরক্ষায়', en: 'To protect the Foundation\'s rights and property', ar: 'لحماية حقوق وممتلكات المؤسسة' },
  privacyLegalItem3: { bn: 'জনসাধারণের নিরাপত্তা নিশ্চিত করতে', en: 'To ensure public safety', ar: 'لضمان سلامة الجمهور' },
  privacyControlTitle: { bn: 'ব্যক্তিগত তথ্যের নিয়ন্ত্রণ', en: 'Control of Personal Information', ar: 'التحكم في المعلومات الشخصية' },
  privacyControlBody1: { bn: 'আপনার ব্যক্তিগত তথ্য সংগ্রহ, ব্যবহার এবং ভাগ করার বিষয়ে আপনার নিয়ন্ত্রণ রয়েছে।', en: 'You have control over the collection, use, and sharing of your personal information.', ar: 'لديك السيطرة على جمع واستخدام ومشاركة معلوماتك الشخصية.' },
  privacyControlEmail: { bn: 'darulquranfoundationbd@gmail.com', en: 'darulquranfoundationbd@gmail.com', ar: 'darulquranfoundationbd@gmail.com' },
  privacyControlBody2: { bn: '-এ যোগাযোগ করে আপনি আপনার তথ্য পরিবর্তন বা মুছতে অনুরোধ করতে পারেন।', en: 'You can contact us to request changes or deletion of your information.', ar: 'يمكنك الاتصال بنا لطلب تغيير أو حذف معلوماتك.' },
  privacyControlBody3: { bn: 'আপনি যদি আমাদের প্রচারমূলক ইমেইল পাওয়া বন্ধ করতে চান, তাহলে যে কোনো ইমেইলে থাকা \'আনসাবস্ক্রাইব\' অপশনের মাধ্যমে আমাদের মেইলিং তালিকা থেকে নিজেকে সরিয়ে নিতে পারেন।', en: 'If you wish to stop receiving promotional emails from us, you can unsubscribe from our mailing list using the \'Unsubscribe\' option in any email.', ar: 'إذا كنت ترغب في التوقف عن تلقي رسائل البريد الإلكتروني الترويجية منا، يمكنك إلغاء الاشتراك من قائمة بريدنا باستخدام خيار \'إلغاء الاشتراك\' في أي بريد إلكتروني.' },
  privacySecurityTitle: { bn: 'আপনার তথ্যের নিরাপত্তা', en: 'Security of Your Information', ar: 'أمان معلوماتك' },
  privacySecurityBody1: { bn: 'দারুল কুরআন ফাউন্ডেশন আপনার ব্যক্তিগত তথ্য সুরক্ষিত রাখার জন্য বিভিন্ন প্রযুক্তি ও ব্যবস্থা ব্যবহার করে যাতে অননুমোদিত প্রবেশ, ব্যবহার বা প্রকাশ থেকে তথ্য সুরক্ষিত থাকে।', en: 'Darul Quran Foundation uses various technologies and measures to keep your personal information secure, protecting it from unauthorized access, use, or disclosure.', ar: 'تستخدم مؤسسة دار القرآن تقنيات وإجراءات متنوعة للحفاظ على أمان معلوماتك الشخصية، وحمايتها من الوصول غير المصرح به أو الاستخدام أو الكشف.' },
  privacySecurityBody2: { bn: 'উদাহরণস্বরূপ, আমরা তথ্য সুরক্ষিত সার্ভারে সংরক্ষণ করি যেখানে প্রবেশাধিকার সীমিত এবং কঠোর নিরাপত্তা ব্যবস্থার আওতায় থাকে। অত্যন্ত সংবেদনশীল তথ্য (যেমন ক্রেডিট কার্ড নম্বর) অনলাইনে প্রেরণের সময় নিরাপদ পেমেন্ট গেটওয়ে ব্যবহার করা হয় যাতে আপনার তথ্য নিরাপদ থাকে।', en: 'For example, we store information on secure servers where access is limited and under strict security measures. Highly sensitive information (such as credit card numbers) uses secure payment gateways when transmitted online to keep your information safe.', ar: 'على سبيل المثال، نقوم بتخزين المعلومات على خوادم آمنة حيث يكون الوصول محدوداً وتحت إجراءات أمنية صارمة. تستخدم المعلومات الحساسة للغاية (مثل أرقام بطاقات الائتمان) بوابات دفع آمنة عند الإرسال عبر الإنترنت للحفاظ على أمان معلوماتك.' },
  privacyChangesTitle: { bn: 'নীতির পরিবর্তন', en: 'Policy Changes', ar: 'تغييرات السياسة' },
  privacyChangesBody1: { bn: 'আমরা সময়ে সময়ে এই গোপনীয়তা নীতিমালা পর্যালোচনা ও হালনাগাদ করতে পারি। কোনো গুরুত্বপূর্ণ পরিবর্তন হলে তা ওয়েবসাইটে প্রকাশ করা হবে।', en: 'We may review and update this privacy policy from time to time. Any significant changes will be published on the website.', ar: 'قد نراجع ونحدث سياسة الخصوصية هذه من وقت لآخر. سيتم نشر أي تغييرات مهمة على الموقع.' },
  privacyChangesBody2: { bn: 'আপনাকে নিয়মিতভাবে এই নীতিমালা পর্যালোচনা করার অনুরোধ করছি, যেন আপনি সবসময় আপডেটেড থাকেন।', en: 'We request you to regularly review this policy so that you always stay updated.', ar: 'نطلب منك مراجعة هذه السياسة بانتظام حتى تبقى محدثاً دائماً.' },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: TranslateFunction;
};

export const I18nContext = React.createContext<Ctx | null>(null);

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return m ? decodeURIComponent(m[2]) : null;
}

function setCookie(name: string, value: string) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

export default function LanguageProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [lang, setLangState] = React.useState<Lang>('bn');

  React.useEffect(() => {
    const saved = (getCookie('lang') as Lang | null) || 'bn';
    setLangState(saved);
    document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    setCookie('lang', l);
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  };

  const t: TranslateFunction = (key, overrideLang) => {
    const entry = DICT[key];
    if (!entry) {
      console.warn(`Translation key "${String(key)}" not found in dictionary`);
      return String(key);
    }
    const targetLang = overrideLang ?? lang;
    const translation = entry[targetLang];
    if (!translation) {
      console.warn(`Translation for key "${String(key)}" and language "${targetLang}" not found`);
      return entry['en'] || entry['bn'] || String(key);
    }
    return translation;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider');
  return ctx;
}

/**
 * Utility function to translate enum/constant values from backend
 * Maps backend string values to translation keys
 * 
 * @param value - The enum value from backend (e.g., "lifetime", "pending_approval", "bank_transfer")
 * @param lang - Current language
 * @param t - Translation function
 * @returns Translated string
 */
export function translateEnumValue(
  value: string | null | undefined,
  lang: Lang,
  t: TranslateFunction
): string {
  if (!value) return '';
  
  // Normalize the value (lowercase, trim)
  const normalized = value.toLowerCase().trim();
  
  // Map enum values to translation keys
  const enumMap: Record<string, keyof typeof DICT> = {
    // Member Types
    'lifetime': 'memberTypeLifetime',
    'donor': 'memberTypeDonor',
    
    // Application Status
    'pending_approval': 'pendingApproval',
    'approved': 'approved',
    'rejected': 'rejected',
    
    // Payment Status
    'pending': 'pending',
    'completed': 'completed',
    'pending_verification': 'pendingVerification',
    'failed': 'failed',
    
    // Payment Methods
    'online': 'paymentMethodOnline',
    'bank_transfer': 'paymentMethodBankTransfer',
    'bank_deposit': 'paymentMethodBankDeposit',
    
    // Gender
    'male': 'male',
    'female': 'female',
  };
  
  const translationKey = enumMap[normalized];
  
  if (translationKey) {
    return t(translationKey);
  }
  
  // If no mapping found, return formatted version of the value
  // (e.g., "bank_transfer" -> "Bank Transfer")
  return normalized
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Hook to get a function that translates enum values
 * Usage: const translateEnum = useTranslateEnum(); translateEnum('pending_approval')
 */
export function useTranslateEnum() {
  const { lang, t } = useI18n();
  return (value: string | null | undefined) => translateEnumValue(value, lang, t);
}


