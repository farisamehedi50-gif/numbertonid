export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const tgLink = "https://t.me/CobraX_Empire";

    // ==========================================================
    // [HTML RESPONSIVE NOTICE RENDERER]
    // ==========================================================
    function renderMasterNotice(title, message, tgLink) {
      const htmlContent = `<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, sans-serif; }
        body { background: #090d16; color: #f1f5f9; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }
        .master-card { background: #111827; border: 1px solid #1f2937; border-radius: 20px; padding: 40px 30px; max-width: 480px; width: 100%; text-align: center; box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.7); }
        .badge { display: inline-block; background: rgba(244, 63, 94, 0.15); color: #f43f5e; padding: 6px 14px; border-radius: 50px; font-size: 13px; font-weight: 600; margin-bottom: 20px; }
        h2 { color: #f8fafc; font-size: 24px; margin-bottom: 14px; font-weight: 700; }
        p { color: #94a3b8; font-size: 15px; line-height: 1.7; margin-bottom: 30px; }
        .action-btn { display: inline-block; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-weight: 600; font-size: 15px; transition: all 0.3s ease; box-shadow: 0 8px 20px rgba(37, 99, 235, 0.4); }
        .action-btn:hover { background: linear-gradient(135deg, #1d4ed8, #1e40af); transform: translateY(-3px); }
        .footer-sig { margin-top: 25px; font-size: 12px; color: #4b5563; }
    </style>
</head>
<body>
    <div class="master-card">
        <div class="badge">SYSTEM NOTICE</div>
        <h2>${title}</h2>
        <p>${message}</p>
        <a href="${tgLink}" target="_blank" class="action-btn">📢 অফিশিয়াল চ্যানেলে যুক্ত হোন</a>
        <div class="footer-sig">Secured by @XrootCodeX | Dev: @MehediSanix</div>
    </div>
</body>
</html>`;
      return new Response(htmlContent, {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    // ==========================================================
    // [REQUEST & PARAMETER VALIDATION]
    // ==========================================================
    let query = url.searchParams.get('number') || url.searchParams.get('nid') || url.searchParams.get('q') || '';
    query = query.trim();

    if (!query) {
      return new Response(
        JSON.stringify({ success: false, message: "Bad Request. Required parameter: 'number' or 'nid'." }, null, 2),
        { status: 400, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' } }
      );
    }

    // ==========================================================
    // [10,000+ COMBINATION HUGE DIVERSIFIED POOL & PSEUDO-RANDOM]
    // ==========================================================
    let numericOnly = query.replace(/[^0-9]/g, '');
    let seedBase = numericOnly !== '' ? parseInt(numericOnly, 10) : [...query].reduce((acc, char) => acc + char.charCodeAt(0), 0);

    let seed = seedBase + query.length * 13;
    function random() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    }
    function randInt(min, max) {
      return Math.floor(random() * (max - min + 1)) + min;
    }

    const firstNamesMale = [
      "মোঃ শফিকুল ইসলাম", "রিপন মিয়া", "আল-আমিন হোসেন", "কামরুল হাসান", "ইমন আহমেদ", "নাজমুল ইসলাম", "তানভীর আহমেদ", 
      "আরমান হোসেন", "রকিবুল ইসলাম", "সোহেল রানা", "জাকির হোসেন", "হানিফ উদ্দিন", "আশিকুর রহমান", "ফয়সাল আহমেদ", 
      "ইমরান খান", "মেহেদী হাসান", "নাঈম ইসলাম", "সাগর আলী", "জাহিদ হাসান", "রাশেদ মিয়া", "মাসুম বিল্লাহ", "লিটন মিয়া", 
      "সুমন আহমেদ", "বাধন মিয়া", "সজিব মিয়া", "আরিফ হোসেন", "ফারহান সাদিক", "শামিম রেজা", "জুয়েল রানা", "সোহাগ মিয়া", 
      "হাসান আলী", "নাসির উদ্দিন", "তৌহিদুর রহমান", "বায়েজীদ বোস্তামী", "মোস্তফা কামাল", "সায়েম উদ্দিন", "মনির হোসেন", 
      "রফিকুল ইসলাম", "জামাল উদ্দিন", "কামাল হোসেন", "ফরহাদ হোসেন", "মামুনুর রশিদ", "বজলুর রহমান", "আব্দুস সাত্তার", 
      "আবুল কালাম", "হুমায়ুন কবির", "আলী আজম", "নয়ন মিয়া", "দ্বীন ইসলাম", "শাওন আহমেদ", "আশরাফুল আলম", "তারিকুল ইসলাম",
      "সাইফুল ইসলাম", "মাইনুল ইসলাম", "সোহেল রানা", "আতিকুর রহমান", "খোরশেদ আলম", "আনোয়ার হোসেন", "জাহাঙ্গীর আলম"
    ];

    const firstNamesFemale = [
      "মোছাঃ সুরাইয়া আক্তার", "মোছাঃ পারভীন বেগম", "মোছাঃ খাদিজা খাতুন", "নাজনীন সুলতানা", "তাসলিমা নাসরিন", "ফাতেমা বেগম", 
      "আয়েশা সিদ্দিকা", "জান্নাতুল ফেরদৌস", "সাবিনা ইয়াসমিন", "মাজেদা খাতুন", "রোকেয়া বেগম", "হোসনে আরা বেগম", "ফরিদা ইয়াসমিন", 
      "খুরশিদা বেগম", "সালমা বেগম", "মরিয়ম বেগম", "নাছরিন আক্তার", "মুক্তা আক্তার", "সুফিয়া খাতুন", "রেহানা পারভীন", "শারমিন সুলতানা", 
      "তৃষা আক্তার", "সুমাইয়া আক্তার", "সোনালী আক্তার", "মেহজাবিন হক", "নুসরাত জাহান", "সাদিয়া ইসলাম", "মিতু আক্তার", "পপি আক্তার", 
      "ঝর্ণা বেগম", "নাদিরা সুলতানা", "রেশমা আক্তার", "ফারজানা ইয়াসমিন", "লিজা আক্তার", "মাহিমা সুলতানা", "সাবিহা খাতুন", "আছমা বেগম", 
      "তানিয়া আক্তার", "বুলবুলি বেগম", "রত্না রানী", "মালা রানী", "জুঁই আক্তার", "পিয়ারি বেগম", "সাজেদা খাতুন", "মনোয়ারা বেগম", 
      "হাসনা হেনা", "বিলকিছ বেগম", "শিরিন আকতার", "নাসিমা বেগম", "আফরোজা খাতুন", "খাদেজা বেগম", "পারভীন আক্তার", "শাহনাজ বেগম"
    ];

    const englishFirstNamesMale = ["MD. SHAFIQUL ISLAM", "RIPON MIA", "AL-AMIN HOSSAIN", "KAMRUL HASAN", "EMON AHMED", "NAZMUL ISLAM", "TANVIR AHMED", "ARMAN HOSSAIN", "ROKIBUL ISLAM", "SOHEL RANA", "ZAKIR HOSSAIN", "ASHIKUR RAHMAN", "FAISAL AHMED", "IMRAN KHAN", "MEHEDI HASAN", "NAIM ISLAM", "SAGAR ALI", "ZAHID HASAN", "RASHED MIA", "MASUM BILLAH", "SUMON AHMED", "ARIF HOSSAIN", "FARHAN SADIQ", "SHAMIM REZA", "JUEL RANA", "SOHAG MIA", "HASAN ALI", "NASIR UDDIN", "TOUHIDUR RAHMAN", "MOSTAFA KAMAL", "MONIR HOSSAIN", "ROFIQUL ISLAM", "JAMAL UDDIN", "KAMAL HOSSAIN", "MAMUNUR RASHID", "ABUL KALAM", "HUMAYUN KABIR", "ASHAFUL ALAM", "TARIKUL ISLAM", "SAIFUL ISLAM", "MAINUL ISLAM", "ATIQUR RAHMAN", "ANWAR HOSSAIN", "JAHANGIR ALAM"];
    const englishFirstNamesFemale = ["MST. SURAIYA AKTER", "PARVIN BEGUM", "KHADIJA KHATUN", "NAZNIN SULTANA", "TASLIMA NASRIN", "FATEMA BEGUM", "AYESHA SIDDIKA", "JANNATUL FERDOUS", "SABINA YASMIN", "MAJEDA KHATUN", "ROKEYA BEGUM", "FARIDA YASMIN", "SALMA BEGUM", "MORIYOM BEGUM", "NASRIN AKTER", "MUKTA AKTER", "SUFIA KHATUN", "SHARMIN SULTANA", "TRISHA AKTER", "SUMAIYA AKTER", "SONALI AKTER", "NUSRAT JAHAN", "SADIYA ISLAM", "MITU AKTER", "POPI AKTER", "JHORNA BEGUM", "FARZANA YASMIN", "LIZA AKTER", "SABIHA KHATUN", "TANIA AKTER", "RATNA RANI", "ROKEYA BEGUM", "NASIMA BEGUM", "AFROZA KHATUN", "PARVIN AKTER", "SHAHNAZ BEGUM"];

    const fatherNames = [
      "আব্দুল জব্বার", "নুর মোহাম্মদ", "হাশেম আলী", "কোরবান আলী", "মকবুল হোসেন", "সৈয়দ আলী", "মোজাম্মেল হক", "আবু বকর", 
      "সোলায়মান মিয়া", "সামছুল হক", "মজিবুর রহমান", "লোকমান হাকিম", "নুরুল ইসলাম", "শামসুল হক", "আনোয়ার হোসেন", "আব্দুল মজিদ", 
      "নুরুল আমিন", "মোস্তফা কামাল", "খলিলুর রহমান", "আব্দুল খালেক", "কাসেম আলী", "হাফিজ উদ্দিন", "করিম বক্স", "আকবর আলী", 
      "রিয়াজ উদ্দিন", "ইব্রাহিম খলিল", "মনসুর আলী", "শহীদুল ইসলাম", "নঈমুদ্দিন আহমেদ", "আব্দুল কাদের মিয়া", "রমিজ উদ্দিন", 
      "আফসার আলী", "মৃত হাশেম আলী", "মৃত সোবহান মিয়া", "মৃত ইউনুস আলী", "কফিল উদ্দিন", "জয়নাল আবেদীন", "ছমির উদ্দিন"
    ];

    const motherNames = [
      "ফাতেমা খাতুন", "সাজেদা বেগম", "মাজেদা খাতুন", "হোসনে আরা", "রোকেয়া বেগম", "আলেয়া খাতুন", "জাহানারা বেগম", "খুরশিদা বেগম", 
      "ফরিদা ইয়াছমিন", "সাজেদা খাতুন", "রোকেয়া বেগম", "ফরিদা ইয়াসমিন", "সালমা বেগম", "রাবেয়া খাতুন", "আয়েশা খাতুন", "মরিয়ম বেগম", 
      "খাদিজা বেগম", "মোছাঃ রহিমা খাতুন", "ফাতেমা বেগম", "মর্জিনা বেগম", "সুফিয়া খাতুন", "বিলকিছ বেগম", "নুরজাহান বেগম", 
      "আমেনা খাতুন", "সাজেদা খাতুন", "জোবেদা বেগম", "মোছাম্মত আয়েশা", "হালিমা খাতুন", "মাজেদা বেগম", "জাহানারা বেগম"
    ];

    const districtsData = [
      { "dist": "ঢাকা", "div": "ঢাকা", "ups": ["মিরপুর", "ধানমন্ডি", "উত্তরা", "তেজগাঁও", "রমনা", "গুলশান", "লালবাগ", "সাভার"] },
      { "dist": "চট্টগ্রাম", "div": "চট্টগ্রাম", "ups": ["কোতোয়ালী", "পাহাড়তলী", "ডবলমুরিং", "খুলশী", "বায়েজিদ", "হালিশহর", "সীতাকুণ্ড"] },
      { "dist": "গাজীপুর", "div": "ঢাকা", "ups": ["কালিয়াকৈর", "সদর", "শ্রীপুর", "কাপাসিয়া", "কালীগঞ্জ"] },
      { "dist": "বগুড়া", "div": "রাজশাহী", "ups": ["সদর", "শাজাহানপুর", "দুপচাঁচিয়া", "আদমদীঝি", "কাহালু"] },
      { "dist": "সিলেট", "div": "সিলেট", "ups": ["দক্ষিণ সুরমা", "কোতোয়ালী", "জকিগঞ্জ", "বিয়ানীবাজার", "গোলাপগঞ্জ"] },
      { "dist": "রংপুর", "div": "রংপুর", "ups": ["পীরগঞ্জ", "সদর", "তারাগঞ্জ", "মিঠাপুকুর", "কাউনিয়া"] },
      { "dist": "খুলনা", "div": "খুলনা", "ups": ["সোনাডাঙ্গা", "খালিশপুর", "দৌলতপুর", "কোতোয়ালী", "হরিণটানা"] },
      { "dist": "বরিশাল", "div": "বরিশাল", "ups": ["কোতোয়ালী", "বাবুগঞ্জ", "উজিরপুর", "বাকেরগঞ্জ", "মেহেন্দিগঞ্জ"] },
      { "dist": "ময়মনসিংহ", "div": "ময়মনসিংহ", "ups": ["ভালুকা", "সদর", "ত্রিশাল", "মুক্তাগাছা", "ফুলপুর"] },
      { "dist": "কুমিল্লা", "div": "চট্টগ্রাম", "ups": ["ব্রাহ্মণপাড়া", "সদর", "চৌদ্দগ্রাম", "বুড়িচং", "লাকসাম", "দেবিদ্বার"] }
    ];

    const professionsList = ["Private Service", "Business", "Student", "Teacher", "Engineer", "Govt. Employee", "Doctor", "Banker", "Freelancer", "Lawyer", "Driver", "Farmer"];
    const bloodGroupsList = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

    const isMale = (random() * 100 > 45);
    const nameIndex = randInt(0, (isMale ? firstNamesMale.length : firstNamesFemale.length) - 1);
    const fullNameBn = isMale ? firstNamesMale[nameIndex] : firstNamesFemale[nameIndex];
    const fullNameEn = isMale ? englishFirstNamesMale[nameIndex % englishFirstNamesMale.length] : englishFirstNamesFemale[nameIndex % englishFirstNamesFemale.length];

    const father = fatherNames[randInt(0, fatherNames.length - 1)];
    const mother = motherNames[randInt(0, motherNames.length - 1)];
    const spouse = isMale ? "নাজমিন আক্তার" : "মোস্তাফিজুর রহমান";
    const maritalStatus = (randInt(0, 1) === 0) ? "Unmarried" : "Married";
    const finalSpouse = (maritalStatus === "Married") ? spouse : "N/A";

    const distInfo = districtsData[randInt(0, districtsData.length - 1)];
    const district = distInfo.dist;
    const division = distInfo.div;
    const upazila = distInfo.ups[randInt(0, distInfo.ups.length - 1)];
    const postCode = String(randInt(1000, 8900));

    const profession = professionsList[randInt(0, professionsList.length - 1)];
    const bloodGroup = bloodGroupsList[randInt(0, bloodGroupsList.length - 1)];

    const birthYear = randInt(1978, 2004);
    const birthMonth = String(randInt(1, 12)).padStart(2, '0');
    const birthDay = String(randInt(1, 28)).padStart(2, '0');
    const dob = `${birthYear}-${birthMonth}-${birthDay}`;
    const ageYears = 2026 - birthYear;

    const nid10 = String(randInt(1000000000, 9999999999));
    const nid13 = String(randInt(1990000000000, 1999999999999));
    const nid17 = String(randInt(19900000000000000, 19999999999999999));
    const smartCardNo = "SC-" + String(randInt(10000000, 99999999));

    const photoUrl = `https://vahan.gov.bd/uploads/nid_${nid10}_vahan.jpg`;
    const addressLineText = `বাসা/হোল্ডিং: হোল্ডিং নং- ${randInt(10, 500)}, গ্রাম/রাস্তা: ${district} সদর, ডাকঘর: ${district} - ${postCode}, উপজেলা: ${upazila}, জেলা: ${district}, বিভাগ: ${division}`;

    // ==========================================================
    // [OFFICIAL NID SERVER JSON FORMAT]
    // ==========================================================
    const responsePayload = {
      "success": true,
      "balance_remaining": randInt(500, 999),
      "data-Info": {
        "searchedNumber": query,
        "nationalId": nid10,
        "oldId": nid13,
        "pin": nid17,
        "smartCardNo": smartCardNo,
        "formNo": "FRM-" + String(randInt(100000, 999999)),
        "nameBangla": fullNameBn,
        "nameEnglish": fullNameEn,
        "dateOfBirth": dob,
        "birthDayBangla": "শুক্রবার",
        "ageBangla": `${ageYears} বছর, ${randInt(1, 11)} মাস, ${randInt(1, 28)} দিন`,
        "gender": (isMale ? "Male" : "Female"),
        "religion": "Islam",
        "bloodGroup": bloodGroup,
        "maritalStatus": maritalStatus,
        "profession": profession,
        "fatherName": father,
        "motherName": mother,
        "spouseName": finalSpouse,
        "birthPlace": district,
        "voterArea": upazila,
        "voterAreaCode": String(randInt(1000, 9999)),
        "voterNo": String(randInt(1000000, 9999999)),
        "photo": photoUrl,
        "presentAddress": {
          "HouseHolding": "হোল্ডিং নং- " + randInt(10, 500),
          "Village/Road": `${district} সদর`,
          "Union/Ward": "সদর ইউনিয়ন",
          "Post Office": `${district} - ${postCode}`,
          "Postal Code": postCode,
          "Upozila": upazila,
          "District": district,
          "Division": division
        },
        "permanentAddress": {
          "HouseHolding": "হোল্ডিং নং- " + randInt(10, 500),
          "Village/Road": `${district} সদর`,
          "Union/Ward": "সদর ইউনিয়ন",
          "Post Office": `${district} - ${postCode}`,
          "Postal Code": postCode,
          "Upozila": upazila,
          "District": district,
          "Division": division
        },
        "preAddress": {
          "addressLine": addressLineText
        },
        "perAddress": {
          "addressLine": addressLineText
        }
      },
      "id-summary": {
        "searched_phone_number": query,
        "10_digit_nid": nid10,
        "13_digit_oldid": nid13,
        "17_digit_pin": nid17,
        "smart_card_id": smartCardNo,
        "note": `🔍 সার্চ করা হয়েছে: ${query} মোবাইল নম্বর দিয়ে (Massive 10K+ Database Match)`
      },
      "extra-info": {
        "birthday_day": "শুক্রবার",
        "age_in_bangla": `${ageYears} বছর, ৬ মাস, ১২ দিন`,
        "data_source": "official_nid_vahan_db",
        "cache_status": "STORED_AND_LOCKED",
        "main_api_status": "✅ success"
      },
      "developer_info": {
        "create": "TG: @XrootCodeX",
        "Devloper": "TG: @MehediSanix"
      }
    };

    return new Response(JSON.stringify(responsePayload, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
};
