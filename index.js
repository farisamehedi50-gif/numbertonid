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
    // [PSEUDO-RANDOM & SEED GENERATION]
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

    // নিখুঁতভাবে বাংলা ও ইংরেজি নাম জোড়া (ম্যাচিং) লিস্ট
    const maleList = [
      { bn: "মোঃ শফিকুল ইসলাম", en: "MD. SHAFIQUL ISLAM" },
      { bn: "রিপন মিয়া", en: "RIPON MIA" },
      { bn: "আল-আমিন হোসেন", en: "AL-AMIN HOSSAIN" },
      { bn: "কামরুল হাসান", en: "KAMRUL HASAN" },
      { bn: "ইমন আহমেদ", en: "EMON AHMED" },
      { bn: "নাজমুল ইসলাম", en: "NAZMUL ISLAM" },
      { bn: "তানভীর আহমেদ", en: "TANVIR AHMED" },
      { bn: "আরমান হোসেন", en: "ARMAN HOSSAIN" },
      { bn: "রকিবুল ইসলাম", en: "ROKIBUL ISLAM" },
      { bn: "সোহেল রানা", en: "SOHEL RANA" },
      { bn: "জাকির হোসেন", en: "ZAKIR HOSSAIN" },
      { bn: "হানিফ উদ্দিন", en: "HANIF UDDIN" },
      { bn: "আশিকুর রহমান", en: "ASHIKUR RAHMAN" },
      { bn: "ফয়সাল আহমেদ", en: "FAISAL AHMED" },
      { bn: "ইমরান খান", en: "IMRAN KHAN" },
      { bn: "মেহেদী হাসান", en: "MEHEDI HASAN" },
      { bn: "নাঈম ইসলাম", en: "NAIM ISLAM" },
      { bn: "সাগর আলী", en: "SAGAR ALI" },
      { bn: "জাহিদ হাসান", en: "ZAHID HASAN" },
      { bn: "রাশেদ মিয়া", en: "RASHED MIA" },
      { bn: "মাসুম বিল্লাহ", en: "MASUM BILLAH" },
      { bn: "লিটন মিয়া", en: "LITON MIA" },
      { bn: "সুমন আহমেদ", en: "SUMON AHMED" },
      { bn: "বাধন মিয়া", en: "BADHON MIA" },
      { bn: "সজিব মিয়া", en: "SOJIB MIA" },
      { bn: "আরিফ হোসেন", en: "ARIF HOSSAIN" },
      { bn: "ফারহান সাদিক", en: "FARHAN SADIQ" },
      { bn: "শামিম রেজা", en: "SHAMIM REZA" },
      { bn: "জুয়েল রানা", en: "JUEL RANA" },
      { bn: "সোহাগ মিয়া", en: "SOHAG MIA" },
      { bn: "হাসান আলী", en: "HASAN ALI" },
      { bn: "নাসির উদ্দিন", en: "NASIR UDDIN" },
      { bn: "তৌহিদুর রহমান", en: "TOUHIDUR RAHMAN" },
      { bn: "বায়েজীদ বোস্তামী", en: "BAYEZID BUSTAMI" },
      { bn: "মোস্তফা কামাল", en: "MOSTAFA KAMAL" },
      { bn: "সায়েম উদ্দিন", en: "SAYEM UDDIN" },
      { bn: "মনির হোসেন", en: "MONIR HOSSAIN" },
      { bn: "রফিকুল ইসলাম", en: "ROFIQUL ISLAM" },
      { bn: "জামাল উদ্দিন", en: "JAMAL UDDIN" },
      { bn: "কামাল হোসেন", en: "KAMAL HOSSAIN" },
      { bn: "ফরহাদ হোসেন", en: "FORHAD HOSSAIN" },
      { bn: "মামুনুর রশিদ", en: "MAMUNUR RASHID" },
      { bn: "বজলুর রহমান", en: "BOZLUR RAHMAN" },
      { bn: "আব্দুস সাত্তার", en: "ABDUS SATTAR" },
      { bn: "আবুল কালাম", en: "ABUL KALAM" },
      { bn: "হুমায়ুন কবির", en: "HUMAYUN KABIR" },
      { bn: "আলী আজম", en: "ALI AZAM" },
      { bn: "নয়ন মিয়া", en: "NAYAN MIA" },
      { bn: "দ্বীন ইসলাম", en: "DIN ISLAM" },
      { bn: "শাওন আহমেদ", en: "SHAWON AHMED" },
      { bn: "আশরাফুল আলম", en: "ASHRAFUL ALAM" },
      { bn: "তারিকুল ইসলাম", en: "TARIKUL ISLAM" },
      { bn: "সাইফুল ইসলাম", en: "SAIFUL ISLAM" },
      { bn: "মাইনুল ইসলাম", en: "MAINUL ISLAM" },
      { bn: "আতিকুর রহমান", en: "ATIQUR RAHMAN" },
      { bn: "খোরশেদ আলম", en: "KHORSHED ALAM" },
      { bn: "আনোয়ার হোসেন", en: "ANWAR HOSSAIN" },
      { bn: "জাহাঙ্গীর আলম", en: "JAHANGIR ALAM" }
    ];

    const femaleList = [
      { bn: "মোছাঃ সুরাইয়া আক্তার", en: "MST. SURAIYA AKTER" },
      { bn: "মোছাঃ পারভীন বেগম", en: "MST. PARVIN BEGUM" },
      { bn: "মোছাঃ খাদিজা খাতুন", en: "MST. KHADIJA KHATUN" },
      { bn: "নাজনীন সুলতানা", en: "NAZNIN SULTANA" },
      { bn: "তাসলিমা নাসরিন", en: "TASLIMA NASRIN" },
      { bn: "ফাতেমা বেগম", en: "FATEMA BEGUM" },
      { bn: "আয়েশা সিদ্দিকা", en: "AYESHA SIDDIKA" },
      { bn: "জান্নাতুল ফেরদৌস", en: "JANNATUL FERDOUS" },
      { bn: "সাবিনা ইয়াসমিন", en: "SABINA YASMIN" },
      { bn: "মাজেদা খাতুন", en: "MAJEDA KHATUN" },
      { bn: "রোকেয়া বেগম", en: "ROKEYA BEGUM" },
      { bn: "হোসনে আরা বেগম", en: "HOSNE ARA BEGUM" },
      { bn: "ফরিদা ইয়াসমিন", en: "FARIDA YASMIN" },
      { bn: "খুরশিদা বেগম", en: "KHURSHIDA BEGUM" },
      { bn: "সালমা বেগম", en: "SALMA BEGUM" },
      { bn: "মরিয়ম বেগম", en: "MORIYOM BEGUM" },
      { bn: "নাছরিন আক্তার", en: "NASRIN AKTER" },
      { bn: "মুক্তা আক্তার", en: "MUKTA AKTER" },
      { bn: "সুফিয়া খাতুন", en: "SUFIA KHATUN" },
      { bn: "রেহানা পারভীন", en: "REHANA PARVIN" },
      { bn: "শারমিন সুলতানা", en: "SHARMIN SULTANA" },
      { bn: "তৃষা আক্তার", en: "TRISHA AKTER" },
      { bn: "সুমাইয়া আক্তার", en: "SUMAIYA AKTER" },
      { bn: "সোনালী আক্তার", en: "SONALI AKTER" },
      { bn: "মেহজাবিন হক", en: "MEHZEBIN HOQUE" },
      { bn: "নুসরাত জাহান", en: "NUSRAT JAHAN" },
      { bn: "সাদিয়া ইসলাম", en: "SADIYA ISLAM" },
      { bn: "মিতু আক্তার", en: "MITU AKTER" },
      { bn: "পপি আক্তার", en: "POPI AKTER" },
      { bn: "ঝর্ণা বেগম", en: "JHORNA BEGUM" },
      { bn: "নাদিরা সুলতানা", en: "NADIRA SULTANA" },
      { bn: "রেশমা আক্তার", en: "RESHMA AKTER" },
      { bn: "ফারজানা ইয়াসমিন", en: "FARZANA YASMIN" },
      { bn: "লিজা আক্তার", en: "LIZA AKTER" },
      { bn: "মাহিমা সুলতানা", en: "MAHIMA SULTANA" },
      { bn: "সাবিহা খাতুন", en: "SABIHA KHATUN" },
      { bn: "আছমা বেগম", en: "ASMA BEGUM" },
      { bn: "তানিয়া আক্তার", en: "TANIA AKTER" },
      { bn: "বুলবুলি বেগম", en: "BULBULI BEGUM" },
      { bn: "রত্না রানী", en: "RATNA RANI" },
      { bn: "মালা রানী", en: "MALA RANI" },
      { bn: "জুঁই আক্তার", en: "JUI AKTER" },
      { bn: "পিয়ারি বেগম", en: "PIYARI BEGUM" },
      { bn: "সাজেদা খাতুন", en: "SAJEDA KHATUN" },
      { bn: "মনোয়ারা বেগম", en: "MONOWARA BEGUM" },
      { bn: "হাসনা হেনা", en: "HASNA HENA" },
      { bn: "বিলকিছ বেগম", en: "BILKIS BEGUM" },
      { bn: "শিরিন আকতার", en: "SHIRIN AKTER" },
      { bn: "নাসিমা বেগম", en: "NASIMA BEGUM" },
      { bn: "আফরোজা খাতুন", en: "AFROZA KHATUN" },
      { bn: "খাদেজা বেগম", en: "KHADEJA BEGUM" },
      { bn: "পারভীন আক্তার", en: "PARVIN AKTER" },
      { bn: "শাহনাজ বেগম", en: "SHAHNAZ BEGUM" }
    ];

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
    const selectedObj = isMale 
      ? maleList[randInt(0, maleList.length - 1)] 
      : femaleList[randInt(0, femaleList.length - 1)];

    const fullNameBn = selectedObj.bn;
    const fullNameEn = selectedObj.en;

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
    const ageMonths = randInt(1, 11);
    const ageDays = randInt(1, 28);

    const nid10 = String(randInt(1000000000, 9999999999));
    const nid13 = String(randInt(1990000000000, 1999999999999));
    const nid17 = String(randInt(19900000000000000, 19999999999999999));
    const smartCardNo = "SC-" + String(randInt(10000000, 99999999));

    const photoUrl = `https://vahan.gov.bd/uploads/nid_${nid10}_vahan.jpg`;
    
    // ঠিকানাগুলো সামঞ্জস্যপূর্ণ করা হলো যাতে সব জায়গায় একই ঠিকানা থাকে
    const holdingNo = "হোল্ডিং নং- " + randInt(10, 500);
    const villageRoad = `${district} সদর`;
    const postOfficeText = `${district} - ${postCode}`;
    const addressLineText = `বাসা/হোল্ডিং: ${holdingNo}, গ্রাম/রাস্তা: ${villageRoad}, ডাকঘর: ${postOfficeText}, উপজেলা: ${upazila}, জেলা: ${district}, বিভাগ: ${division}`;

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
        "ageBangla": `${ageYears} বছর, ${ageMonths} মাস, ${ageDays} দিন`,
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
          "HouseHolding": holdingNo,
          "Village/Road": villageRoad,
          "Union/Ward": "সদর ইউনিয়ন",
          "Post Office": postOfficeText,
          "Postal Code": postCode,
          "Upozila": upazila,
          "District": district,
          "Division": division
        },
        "permanentAddress": {
          "HouseHolding": holdingNo,
          "Village/Road": villageRoad,
          "Union/Ward": "সদর ইউনিয়ন",
          "Post Office": postOfficeText,
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
        "age_in_bangla": `${ageYears} বছর, ${ageMonths} মাস, ${ageDays} দিন`,
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
