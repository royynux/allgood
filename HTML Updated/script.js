/* ═══ DATA ═══ */
const TRIPS = [
  // ── ONE DAY TRIPS (Lombok) ──
  {id:1,tripType:'oneday',name:'Mandalika',badge:'🔥 Viral',city:'Lombok',cat:'Beach',tags:['Pantai','Surfing'],dur:1,price:350000,img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&q=80',status:'Tersedia',desc:'Jelajahi pesisir selatan Lombok dalam satu hari penuh — dari Kuta Lombok, Bukit Merese, hingga Tanjung Aan. Itinerary sudah disiapkan agar kamu menikmati banyak spot terbaik dalam 1 hari.',highlights:[{icon:'🏖️',text:'Kuta Lombok',sub:'Pantai eksotis & surfing spot'},{icon:'📸',text:'Bukit Merese',sub:'Spot foto viral Lombok'},{icon:'🌊',text:'Tanjung Aan',sub:'Pasir bintang yang unik'},{icon:'🍽️',text:'Makan Siang Lokal',sub:'Seafood segar pinggir pantai'}],itinerary:[{day:1,title:'Mandalika & Pesisir Selatan',items:[{time:'07.00',act:'Penjemputan di meeting point (Bandara/Hotel)'},{time:'08.30',act:'Tiba di Kuta Lombok — eksplorasi pantai & surfing spot'},{time:'10.00',act:'Naik ke Bukit Merese — foto panorama & view bukit hijau'},{time:'11.30',act:'Tanjung Aan — bermain di pasir bintang & berenang'},{time:'13.00',act:'Makan siang di warung seafood lokal'},{time:'14.30',act:'Pantai Seger & area Mandalika Circuit'},{time:'16.30',act:'Sunset di Bukit Merese atau Kuta Lombok'},{time:'18.00',act:'Perjalanan kembali ke meeting point'},{time:'19.30',act:'Selesai — tiba di titik awal'}]}]},
  {id:2,tripType:'oneday',name:'Gili Trawangan',badge:'⭐ Terpopuler',city:'Lombok',cat:'Island',tags:['Pulau','Snorkeling'],dur:1,price:420000,img:'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=500&q=80',status:'Tersedia',desc:'Satu hari penuh menjelajahi Gili Trawangan — pulau paling terkenal di kepulauan Gili. Snorkeling dengan penyu, bersepeda keliling pulau, dan sunset ikonik.',highlights:[{icon:'🐢',text:'Snorkeling dengan penyu',sub:'Spot terbaik di sekitar Gili'},{icon:'🚲',text:'Bersepeda keliling pulau',sub:'Transportasi khas Gili'},{icon:'🌅',text:'Sunset ikonik',sub:'View terbaik di ujung barat'},{icon:'🏖️',text:'Pantai berpasir putih',sub:'Air jernih & bersih'}],itinerary:[{day:1,title:'Gili Trawangan Full Day',items:[{time:'07.00',act:'Penjemputan di hotel/meeting point'},{time:'08.00',act:'Perjalanan ke pelabuhan Bangsal'},{time:'08.45',act:'Fast boat ke Gili Trawangan (~30 menit)'},{time:'09.30',act:'Snorkeling — spot penyu terbaik'},{time:'11.30',act:'Naik ke darat — sewa sepeda & keliling pulau'},{time:'13.00',act:'Makan siang di warung tepi pantai'},{time:'14.30',act:'Free time — pantai & bersantai'},{time:'16.30',act:'Sunset di sisi barat Gili Trawangan'},{time:'17.30',act:'Fast boat kembali ke Bangsal'},{time:'19.00',act:'Tiba kembali di meeting point'}]}]},
  {id:3,tripType:'oneday',name:'Senggigi & Malimbu',city:'Lombok',cat:'Beach',tags:['Pantai','Sunset'],dur:1,price:280000,img:'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&q=80',status:'Tersedia',desc:'Jelajahi pesisir barat Lombok dalam satu hari — dari Senggigi yang ramai hingga Malimbu dengan sunset terbaik dan view Gunung Agung Bali di kejauhan.',highlights:[{icon:'🌇',text:'Sunset Malimbu',sub:'View Gunung Agung Bali'},{icon:'🏨',text:'Senggigi Beach',sub:'Pantai ikonik Lombok'},{icon:'🛍️',text:'Pasar Seni Senggigi',sub:'Souvenir & kerajinan lokal'},{icon:'🍽️',text:'Kuliner pinggir pantai',sub:'Seafood & masakan lokal'}],itinerary:[{day:1,title:'Senggigi & Malimbu',items:[{time:'09.00',act:'Penjemputan di meeting point'},{time:'10.00',act:'Senggigi Beach — eksplorasi & foto'},{time:'11.00',act:'Pasar Seni & souvenir shopping'},{time:'12.00',act:'Makan siang di restoran tepi pantai Senggigi'},{time:'13.30',act:'Perjalanan ke Malimbu — mampir di Nipah & Kerandangan'},{time:'15.00',act:'Malimbu Hill — panorama laut & Gunung Agung Bali'},{time:'17.00',act:'Nikmati sunset spektakuler di Malimbu'},{time:'18.30',act:'Perjalanan kembali'},{time:'19.30',act:'Selesai di meeting point'}]}]},
  // ── ONE DAY TRIPS (Bali) ──
  {id:10,tripType:'oneday',name:'Tanah Lot & Uluwatu',badge:'🆕 Baru',city:'Bali',cat:'Culture',tags:['Budaya','Sunset'],dur:1,price:380000,img:'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=500&q=80',status:'Tersedia',desc:'Kunjungi dua pura paling ikonik di Bali — Tanah Lot yang berdiri di atas batu karang, dan Uluwatu dengan pertunjukan Kecak di tepi tebing saat sunset.',highlights:[{icon:'🛕',text:'Tanah Lot',sub:'Pura di atas batu karang'},{icon:'🌅',text:'Uluwatu Sunset',sub:'Tari Kecak di tepi tebing'},{icon:'🌊',text:'Pantai Padang Padang',sub:'Pantai tersembunyi di Uluwatu'},{icon:'🍽️',text:'Seafood Jimbaran',sub:'Makan malam romantis di pantai'}],itinerary:[{day:1,title:'Tanah Lot & Uluwatu',items:[{time:'08.00',act:'Penjemputan di hotel'},{time:'09.30',act:'Tanah Lot — pura ikonik di atas karang'},{time:'11.30',act:'Perjalanan ke Uluwatu'},{time:'13.00',act:'Makan siang di Jimbaran area'},{time:'14.30',act:'Pantai Padang Padang & Bingin'},{time:'17.00',act:'Uluwatu — Kecak Dance saat sunset'},{time:'19.00',act:'Makan malam seafood Jimbaran'},{time:'21.00',act:'Kembali ke hotel'}]}]},
  {id:11,tripType:'oneday',name:'Ubud & Alam Tegallalang',city:'Bali',cat:'Culture',tags:['Budaya','Alam'],dur:1,price:320000,img:'https://images.unsplash.com/photo-1531592937781-344ad608fabf?w=500&q=80',status:'Tersedia',desc:'Jelajahi pusat budaya Bali di Ubud — dari sawah terasering Tegallalang, Monkey Forest, Pasar Ubud, hingga pertunjukan tari Barong yang memukau.',highlights:[{icon:'🌾',text:'Sawah Tegallalang',sub:'Rice terrace ikonik Bali'},{icon:'🐒',text:'Sacred Monkey Forest',sub:'Hutan kera suci Ubud'},{icon:'🛕',text:'Pura Tirta Empul',sub:'Ritual pemandian suci'},{icon:'🎭',text:'Tari Barong',sub:'Pertunjukan seni tradisional'}],itinerary:[{day:1,title:'Ubud & Alam Bali',items:[{time:'08.00',act:'Penjemputan di hotel'},{time:'09.00',act:'Sawah Tegallalang — foto & swing'},{time:'11.00',act:'Pura Tirta Empul'},{time:'12.30',act:'Makan siang di Ubud'},{time:'14.00',act:'Pasar Ubud & toko seni'},{time:'15.30',act:'Sacred Monkey Forest'},{time:'17.00',act:'Tari Barong atau Kecak'},{time:'19.00',act:'Kembali ke hotel'}]}]},
  // ── CUSTOM DESTINATIONS ──
  {id:5,tripType:'destination',name:'Gili Islands (Trawangan, Meno & Air)',city:'Lombok',cat:'Island',tags:['Pulau','Snorkeling'],dur:1,price:950000,img:'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=500&q=80',status:'Tersedia',desc:'Jelajahi tiga pulau Gili yang ikonik — Trawangan, Meno, dan Air. Snorkeling dengan penyu, bersantai di pantai berpasir putih, dan nikmati sunset terbaik.',highlights:[{icon:'🐢',text:'Snorkeling dengan penyu',sub:'Spot terbaik di Gili Meno'},{icon:'🏖️',text:'3 Pulau Gili',sub:'Trawangan, Meno & Air'},{icon:'🌊',text:'Pantai berpasir putih',sub:'Air jernih & bersih'},{icon:'🌅',text:'Sunset terbaik',sub:'Dari Gili Trawangan'}],itinerary:[{day:1,title:'Kedatangan & Gili Trawangan',items:[{time:'08.00',act:'Penjemputan di meeting point'},{time:'09.00',act:'Perjalanan ke Pelabuhan Bangsal'},{time:'10.00',act:'Fast boat ke Gili Trawangan'},{time:'11.00',act:'Check in & eksplorasi Gili Trawangan'},{time:'13.00',act:'Makan siang di warung tepi pantai'},{time:'15.00',act:'Snorkeling di spot terbaik'},{time:'17.30',act:'Sunset di sisi barat Gili Trawangan'},{time:'19.00',act:'Makan malam & istirahat'}]},{day:2,title:'Gili Meno & Gili Air',items:[{time:'07.00',act:'Sarapan'},{time:'08.00',act:'Perahu ke Gili Meno — snorkeling dengan penyu'},{time:'11.00',act:'Island hopping ke Gili Air'},{time:'13.00',act:'Makan siang di Gili Air'},{time:'14.00',act:'Eksplorasi & berenang di Gili Air'},{time:'16.00',act:'Kembali ke Gili Trawangan atau direct ke darat'},{time:'19.00',act:'Makan malam'}]},{day:3,title:'Kepulangan',items:[{time:'07.00',act:'Sarapan & check out'},{time:'09.00',act:'Fast boat kembali ke Bangsal'},{time:'10.00',act:'Perjalanan kembali ke hotel/Mataram'},{time:'12.00',act:'Selesai'}]}]},
  {id:6,tripType:'destination',name:'Selong Belanak & Kuta Lombok',city:'Lombok',cat:'Beach',tags:['Pantai','Surfing'],dur:1,price:650000,img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&q=80',status:'Tersedia',desc:'Eksplorasi pantai-pantai eksotis di pesisir selatan Lombok — dari Selong Belanak yang tenang hingga Kuta Lombok yang spektakuler dengan ombak surfing.',highlights:[{icon:'🏄',text:'Surfing Kuta Lombok',sub:'Ombak kelas dunia'},{icon:'🏖️',text:'Selong Belanak',sub:'Pantai terpanjang di Lombok'},{icon:'📸',text:'Spot foto viral',sub:'Bukit Merese & Tanjung Aan'},{icon:'🦀',text:'Seafood lokal',sub:'Fresh dari nelayan langsung'}],itinerary:[{day:1,title:'Kedatangan & Eksplorasi',items:[{time:'08.00',act:'Penjemputan di meeting point'},{time:'10.00',act:'Perjalanan menuju destinasi'},{time:'12.00',act:'Makan siang di restoran lokal'},{time:'14.00',act:'Eksplorasi spot utama'},{time:'17.00',act:'Sunset & foto-foto'},{time:'19.00',act:'Makan malam & istirahat'}]},{day:2,title:'Eksplorasi Lanjutan',items:[{time:'07.00',act:'Sarapan'},{time:'08.00',act:'Aktivitas utama (surfing / snorkeling / tour)'},{time:'12.00',act:'Makan siang'},{time:'14.00',act:'Free time / aktivitas opsional'},{time:'16.00',act:'Perjalanan kembali ke meeting point'},{time:'17.00',act:'Selesai'}]}]},
  {id:7,tripType:'destination',name:'Sembalun & Bukit Pergasingan',city:'Lombok',cat:'Mountain',tags:['Trekking','View'],dur:1,price:780000,img:'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=500&q=80',status:'Tersedia',desc:'Trekking di lembah Sembalun yang hijau dan mendaki Bukit Pergasingan untuk view Rinjani dari bawah yang tak kalah memukau.',highlights:[{icon:'🌿',text:'Lembah Sembalun',sub:'Perkebunan & alam hijau'},{icon:'🏔️',text:'Bukit Pergasingan',sub:'View Rinjani dari bawah'},{icon:'🌄',text:'Savana Propok',sub:'Padang rumput luas'},{icon:'📸',text:'Foto landscape',sub:'Terbaik di Lombok Timur'}],itinerary:[{day:1,title:'Kedatangan & Trek Bukit Pergasingan',items:[{time:'07.00',act:'Penjemputan di meeting point'},{time:'09.00',act:'Tiba di Sembalun — briefing & persiapan'},{time:'10.00',act:'Mulai trekking ke Bukit Pergasingan'},{time:'12.00',act:'Tiba di puncak — makan siang & foto panorama Rinjani'},{time:'14.00',act:'Turun dari bukit'},{time:'16.00',act:'Eksplorasi Lembah Sembalun & ladang bawang'},{time:'18.00',act:'Makan malam & istirahat'}]},{day:2,title:'Savana & Kepulangan',items:[{time:'06.00',act:'Sunrise walk di Savana Propok'},{time:'08.00',act:'Sarapan'},{time:'09.00',act:'Eksplorasi area Sembalun & beli oleh-oleh'},{time:'11.00',act:'Perjalanan kembali ke Mataram/hotel'},{time:'13.00',act:'Selesai'}]}]},
  {id:8,tripType:'destination',name:'Air Terjun & Hidden Gems Lombok',city:'Lombok',cat:'Culture',tags:['Alam','Tersembunyi'],dur:1,price:580000,img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80',status:'Tersedia',desc:'Temukan keindahan tersembunyi Lombok — air terjun Sendang Gile, Tiu Kelep, dan spot-spot rahasia yang hanya diketahui guide lokal kami.',highlights:[{icon:'💦',text:'Air Terjun Sendang Gile',sub:'Air sejuk & kolam alami'},{icon:'🌊',text:'Tiu Kelep',sub:'Dibalik Sendang Gile'},{icon:'🦋',text:'Hutan tropis lebat',sub:'Flora & fauna langka'},{icon:'🗺️',text:'Hidden spots rahasia',sub:'Hanya guide lokal yang tahu'}],itinerary:[{day:1,title:'Kedatangan & Air Terjun',items:[{time:'08.00',act:'Penjemputan di meeting point'},{time:'10.00',act:'Tiba di Senaru — Sendang Gile waterfall'},{time:'11.30',act:'Trek ke Tiu Kelep (30 menit trekking)'},{time:'13.00',act:'Makan siang & istirahat'},{time:'14.30',act:'Kunjungi hidden spots rahasia'},{time:'17.00',act:'Kembali ke penginapan'},{time:'19.00',act:'Makan malam'}]},{day:2,title:'Hidden Gems & Kepulangan',items:[{time:'07.00',act:'Sarapan'},{time:'08.00',act:'Eksplorasi hidden gems tambahan'},{time:'11.00',act:'Perjalanan kembali'},{time:'13.00',act:'Selesai'}]}]},
  {id:9,tripType:'destination',name:'Senggigi & Pantai Barat',city:'Lombok',cat:'Beach',tags:['Pantai','Sunset'],dur:1,price:550000,img:'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&q=80',status:'Tersedia',desc:'Jelajahi pesisir barat Lombok yang memesona — dari Senggigi yang ramai hingga Malimbu dengan sunset terbaik dan view Gunung Agung Bali di kejauhan.',highlights:[{icon:'🌇',text:'Sunset Malimbu',sub:'View Gunung Agung Bali'},{icon:'🏨',text:'Senggigi Beach',sub:'Pantai ikonik Lombok'},{icon:'🛥️',text:'Sunset cruise',sub:'Perahu tradisional Lombok'},{icon:'🍽️',text:'Kuliner pinggir pantai',sub:'Seafood & masakan lokal'}],itinerary:[{day:1,title:'Senggigi & Eksplorasi',items:[{time:'09.00',act:'Penjemputan di meeting point'},{time:'10.00',act:'Senggigi Beach — eksplorasi & bersantai'},{time:'12.00',act:'Makan siang seafood di tepi pantai'},{time:'14.00',act:'Pantai Barat — Nipah & Kerandangan'},{time:'17.00',act:'Sunset di Malimbu Hill'},{time:'19.00',act:'Makan malam & istirahat'}]},{day:2,title:'Eksplorasi Lanjutan & Kepulangan',items:[{time:'07.00',act:'Sarapan'},{time:'08.00',act:'Snorkeling di pantai barat'},{time:'11.00',act:'Free time & bersantai'},{time:'13.00',act:'Makan siang & persiapan pulang'},{time:'15.00',act:'Perjalanan kembali ke meeting point'},{time:'17.00',act:'Selesai'}]}]},
  // ── CUSTOM DESTINATIONS (Bali) ──
  {id:12,tripType:'destination',name:'Nusa Penida',city:'Bali',cat:'Island',tags:['Pulau','Snorkeling'],dur:1,price:0,img:'https://images.unsplash.com/photo-1604608672516-f1b9cf8e2a8b?w=500&q=80',status:'Tersedia',desc:'Jelajahi pulau surga Nusa Penida dengan tebing-tebing dramatis, pantai tersembunyi, dan spot snorkeling terbaik di Bali. Manta Point, Kelingking Beach, dan Angel Billabong menanti.',highlights:[{icon:'🦈',text:'Manta Point',sub:'Berenang dengan pari manta'},{icon:'📸',text:'Kelingking Beach',sub:'Tebing ikonik Nusa Penida'},{icon:'💧',text:'Angel Billabong',sub:'Kolam alami di tebing'},{icon:'🌊',text:'Broken Beach',sub:'Lengkung batu karang natural'}],itinerary:[{day:1,title:'Nusa Penida Barat',items:[{time:'07.00',act:'Fast boat dari Sanur ke Nusa Penida'},{time:'09.00',act:'Kelingking Beach & view point'},{time:'11.30',act:'Angel Billabong & Broken Beach'},{time:'13.00',act:'Makan siang lokal'},{time:'14.30',act:'Crystal Bay — snorkeling'},{time:'17.00',act:'Kembali ke penginapan'}]},{day:2,title:'Nusa Penida Timur & Kepulangan',items:[{time:'07.00',act:'Sarapan'},{time:'08.00',act:'Manta Point — berenang bersama manta ray'},{time:'11.00',act:'Atuh Beach & Diamond Beach'},{time:'13.00',act:'Makan siang'},{time:'15.00',act:'Fast boat kembali ke Sanur'},{time:'17.00',act:'Selesai'}]}]},
  {id:13,tripType:'destination',name:'Ubud & Kintamani',city:'Bali',cat:'Culture',tags:['Budaya','Alam'],dur:1,price:0,img:'https://images.unsplash.com/photo-1531592937781-344ad608fabf?w=500&q=80',status:'Tersedia',desc:'Eksplorasi mendalam Ubud — pusat seni dan budaya Bali — hingga kawasan vulkanik Kintamani dengan Gunung Batur dan Danau Batur yang memukau.',highlights:[{icon:'🌾',text:'Sawah Tegallalang',sub:'Rice terrace ikonik Bali'},{icon:'🌋',text:'Gunung Batur',sub:'Sunrise trekking aktif'},{icon:'💧',text:'Danau Batur',sub:'Kaldera vulkanik indah'},{icon:'🎭',text:'Seni & Budaya Ubud',sub:'Tari, lukisan, kerajinan'}],itinerary:[{day:1,title:'Ubud Art & Culture',items:[{time:'08.00',act:'Penjemputan di hotel'},{time:'09.00',act:'Sawah Tegallalang & Ceking rice terrace'},{time:'11.00',act:'Pasar Ubud & Puri Agung Ubud'},{time:'13.00',act:'Makan siang di Ubud'},{time:'14.30',act:'Sacred Monkey Forest'},{time:'16.00',act:'Pura Tirta Empul'},{time:'19.00',act:'Tari Legong / Kecak malam'}]},{day:2,title:'Kintamani & Gunung Batur',items:[{time:'06.00',act:'Trekking Gunung Batur — sunrise'},{time:'09.00',act:'Sarapan sambil menikmati view kaldera'},{time:'11.00',act:'Danau Batur — perahu tradisional'},{time:'13.00',act:'Makan siang di Kintamani'},{time:'15.00',act:'Perjalanan kembali ke hotel'},{time:'17.00',act:'Selesai'}]}]},
  {id:14,tripType:'destination',name:'Seminyak & Canggu',city:'Bali',cat:'Beach',tags:['Pantai','Lifestyle'],dur:1,price:0,img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&q=80',status:'Tersedia',desc:'Nikmati sisi Bali yang trendi dan kosmopolitan — dari pantai Seminyak yang stylish hingga Canggu dengan vibes surf dan kafe-kafe instagramable.',highlights:[{icon:'🏄',text:'Surfing Canggu',sub:'Ombak terbaik untuk pemula'},{icon:'🌅',text:'Sunset Seminyak',sub:'Ku De Ta & Potato Head'},{icon:'☕',text:'Café Culture Canggu',sub:'Kafe-kafe terbaik Bali'},{icon:'🛍️',text:'Shopping & Spa',sub:'Seminyak Square & spa lokal'}],itinerary:[{day:1,title:'Seminyak Beach & Lifestyle',items:[{time:'09.00',act:'Penjemputan di hotel'},{time:'10.00',act:'Seminyak Beach — bersantai & foto'},{time:'12.00',act:'Makan siang di Seminyak'},{time:'14.00',act:'Petitenget & Batu Belig Beach'},{time:'17.00',act:'Sunset di Ku De Ta / Potato Head'},{time:'19.30',act:'Makan malam di Seminyak'}]},{day:2,title:'Canggu Surf & Vibes',items:[{time:'07.00',act:'Surf lesson di Canggu'},{time:'09.30',act:'Sarapan di beach café'},{time:'11.00',act:'Explore Old Man\'s & Pererenan'},{time:'13.00',act:'Makan siang & kafe hopping Canggu'},{time:'15.00',act:'Free time & belanja'},{time:'17.00',act:'Sunset di Echo Beach'},{time:'19.00',act:'Selesai'}]}]},
];

const GUIDES = [
  {id:1,name:'Bima Arjuna',location:'Lombok, NTB',specialty:'mountain',specialtyLabel:'Gunung & Trekking',cover:'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80',avatar:'https://i.pravatar.cc/200?img=11',rating:4.9,reviewCount:187,tripsDone:312,yearsExp:8,languages:'Indonesia, Inggris',bio:'Spesialis pendakian gunung Lombok. Telah memandu 300+ ekspedisi ke Rinjani dan Sembalun. Bersertifikat BNSP dan SAR.',certifications:['BNSP Level 3','SAR Bersertifikat','P3K Gunung'],destinations:['Rinjani','Sembalun','Bukit Pergasingan','Sendang Gile'],availability:{Senin:'08.00–18.00',Selasa:'08.00–18.00',Rabu:'Tidak tersedia',Kamis:'08.00–18.00',Jumat:'08.00–18.00',Sabtu:'06.00–20.00',Minggu:'06.00–20.00'}},
  {id:2,name:'Rudi Kartono',location:'Lombok, NTB',specialty:'island',specialtyLabel:'Island Hopping',cover:'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=600&q=80',avatar:'https://i.pravatar.cc/200?img=59',rating:5.0,reviewCount:143,tripsDone:198,yearsExp:7,languages:'Indonesia, Inggris',bio:'Spesialis Gili Islands dan island hopping Lombok. Putra daerah yang mengenal setiap spot snorkeling dan pantai tersembunyi.',certifications:['PADI Divemaster','BNSP Level 2','Boat Captain License'],destinations:['Gili Trawangan','Gili Meno','Gili Air','Pantai Barat'],availability:{Senin:'06.00–18.00',Selasa:'06.00–18.00',Rabu:'06.00–18.00',Kamis:'06.00–18.00',Jumat:'06.00–18.00',Sabtu:'06.00–20.00',Minggu:'Tidak tersedia'}},
  {id:3,name:'Siti Nurhaliza',location:'Lombok, NTB',specialty:'beach',specialtyLabel:'Pantai & Budaya',cover:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80',avatar:'https://i.pravatar.cc/200?img=47',rating:4.8,reviewCount:156,tripsDone:234,yearsExp:5,languages:'Indonesia, Inggris',bio:'Spesialis pantai selatan Lombok. Ahli surfing guide dan wisata budaya Sasak. Sangat direkomendasikan untuk group wanita.',certifications:['BNSP Level 2','Surfing Guide Certified'],destinations:['Kuta Lombok','Selong Belanak','Tanjung Aan','Senggigi'],availability:{Senin:'08.00–17.00',Selasa:'08.00–17.00',Rabu:'08.00–17.00',Kamis:'08.00–17.00',Jumat:'08.00–12.00',Sabtu:'07.00–18.00',Minggu:'07.00–18.00'}},
  {id:4,name:'Eka Wijaya',location:'Lombok, NTB',specialty:'mountain',specialtyLabel:'Gunung & Alam',cover:'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=600&q=80',avatar:'https://i.pravatar.cc/200?img=53',rating:4.8,reviewCount:112,tripsDone:178,yearsExp:6,languages:'Indonesia, Inggris',bio:'Ahli trekking dan wisata alam Lombok. Fotografer lanskap profesional yang selalu memastikan traveler mendapat momen terbaik.',certifications:['BNSP Level 2','Mountain Rescue','Photography Guide'],destinations:['Sembalun','Bukit Pergasingan','Sendang Gile','Air Terjun Tiu Kelep'],availability:{Senin:'07.00–18.00',Selasa:'07.00–18.00',Rabu:'07.00–18.00',Kamis:'07.00–18.00',Jumat:'Tidak tersedia',Sabtu:'06.00–20.00',Minggu:'06.00–20.00'}},
  {id:5,name:'Hamdan Fauzi',location:'Lombok, NTB',specialty:'beach',specialtyLabel:'Pantai & Sunset',cover:'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=600&q=80',avatar:'https://i.pravatar.cc/200?img=68',rating:4.7,reviewCount:98,tripsDone:156,yearsExp:4,languages:'Indonesia',bio:'Guide muda yang energik dan fun! Spesialis sunset tour dan culinary trip di Lombok. Tahu semua warung seafood terbaik.',certifications:['BNSP Level 1','Food & Culture Guide'],destinations:['Malimbu','Senggigi','Sekotong','Gili Nanggu'],availability:{Senin:'10.00–22.00',Selasa:'10.00–22.00',Rabu:'10.00–22.00',Kamis:'10.00–22.00',Jumat:'14.00–22.00',Sabtu:'09.00–22.00',Minggu:'09.00–22.00'}},
];

/* ═══ STATE ═══ */
let bookingState = {
  tripType: null,
  destination: null,
  customDestinations: [],
  customDuration: 0,
  guide: null,
  startDate: '',
  endDate: '',
  duration: 0,
  participants: 1,
  participantNames: [''],
  meetingPoint: '',
  name: '',
  phone: '',
  email: '',
  notes: '',
};
let currentStep = 1;
let currentGuideFilter = 'all';
let currentKatalogTripType = 'all';
let currentKatalogLocation = 'all';

/* ═══ NAVIGATION ═══ */
function nav(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  localStorage.setItem('aga-page', page);

  if (page === 'beranda') renderHomeTrips();
  if (page === 'katalog') filterTrips();
  if (page === 'booking') initBooking();
  if (page === 'tourguide') renderGuides();
}

function openDrawer() { document.getElementById('drawer').classList.add('open'); document.getElementById('drawerOverlay').classList.add('open'); document.body.style.overflow='hidden'; }
function closeDrawer() { document.getElementById('drawer').classList.remove('open'); document.getElementById('drawerOverlay').classList.remove('open'); document.body.style.overflow=''; }

let toastTimer;
function showToast(msg, bg='#16A34A') {
  const t = document.getElementById('toast');
  t.textContent = msg; t.style.background = bg.replace('var(--success)','#16A34A').replace('var(--primary)','#E8490F');
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3400);
}

function fmtPrice(n) { return 'Rp ' + n.toLocaleString('id-ID'); }
function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}

/* ═══ HOME TRIPS ═══ */
function renderHomeTrips() {
  const el = document.getElementById('home-trips');
  if (!el) return;
  const picks = [
    TRIPS.find(t => t.tripType === 'oneday'),
    ...TRIPS.filter(t => t.tripType === 'destination').slice(0,3),
  ].filter(Boolean);
  el.innerHTML = picks.map(t => tripCardHtml(t)).join('');

  // Render trending section
  const featured = TRIPS.filter(t => t.badge);
  const trendEl = document.getElementById('trending-trips');
  const trendSection = document.getElementById('trendingSection');
  if (trendEl && featured.length > 0) {
    trendSection.style.display = 'block';
    trendEl.innerHTML = featured.map(t => tripCardHtml(t)).join('');
  }
}

function tripCardHtml(trip) {
  const statusColor = trip.status === 'Tersedia' ? '#16A34A' : '#DC2626';
  const typeLabel = trip.tripType === 'oneday' ? '🌅 One Day' : '🗺️ Custom';
  const typeColor = trip.tripType === 'oneday'
    ? {bg:'#FFF0EB',color:'#E8490F',border:'#FECACA'}
    : {bg:'#F3F4F6',color:'#374151',border:'#D1D5DB'};
  const priceHtml = trip.tripType === 'destination'
    ? `<div style="font-size:13px;font-weight:700;color:var(--body)">Harga dikonfirmasi</div>`
    : `<div class="tc-price">${fmtPrice(trip.price)} <small>/ orang</small></div>`;
  const badgeHtml = trip.badge
    ? `<span class="tc-badge-viral">${trip.badge}</span>`
    : `<span class="tc-badge-status" style="background:${statusColor}">${trip.status}</span>`;
  return `<div class="trip-card" onclick="openDestModal(${trip.id})">
    <div class="tc-img" style="position:relative">
      <img src="${trip.img}" alt="${trip.name}" loading="lazy">
      ${badgeHtml}
      <span class="tc-badge-dur">1 Hari</span>
    </div>
    <div class="tc-body">
      <div class="tc-tags">
        <span class="tag" style="background:${typeColor.bg};color:${typeColor.color};border-color:${typeColor.border}">${typeLabel}</span>
        ${trip.tags.map(t=>`<span class="tag">${t}</span>`).join('')}
      </div>
      <div class="tc-title">${trip.name}</div>
      <div class="tc-foot">
        ${priceHtml}
        <button class="btn-book" onclick="event.stopPropagation();openDestModal(${trip.id})">Detail →</button>
      </div>
    </div>
  </div>`;
}

/* ═══ KATALOG FILTER ═══ */
function setKatalogLocation(loc) {
  currentKatalogLocation = loc;
  ['all','Lombok','Bali'].forEach(l => document.getElementById('loc-'+l)?.classList.toggle('active', l===loc));
  filterTrips();
}

function setTripTypeTab(type) {
  currentKatalogTripType = type;
  ['all','oneday','destination'].forEach(t => document.getElementById('ttab-'+t)?.classList.toggle('active', t===type));
  const note = document.getElementById('customKatalogNote');
  if (note) note.classList.toggle('show', type === 'destination');
  const title = document.getElementById('listingTitle');
  if (title) {
    title.textContent = type === 'oneday' ? 'One Day Trip'
      : type === 'destination' ? 'Destinasi untuk Custom Trip'
      : 'Semua Destinasi Private Trip';
  }
  filterTrips();
}

function filterTrips() {
  const search = (document.getElementById('searchFilter')?.value || '').toLowerCase();
  const kategori = document.getElementById('kategoriFilter')?.value || '';
  const sort = document.getElementById('sortFilter')?.value || 'default';
  const priceMin = parseInt(document.getElementById('priceMin')?.value) || 0;
  const priceMax = parseInt(document.getElementById('priceMax')?.value) || 0;

  // Update price label
  const priceLabel = document.getElementById('priceRangeLabel');
  if (priceLabel && (priceMin || priceMax)) {
    priceLabel.textContent = `${priceMin ? fmtPrice(priceMin) : 'Rp 0'} — ${priceMax ? fmtPrice(priceMax) : '∞'}`;
  } else if (priceLabel) { priceLabel.textContent = ''; }

  let result = TRIPS.filter(t => {
    const mType = currentKatalogTripType === 'all' || t.tripType === currentKatalogTripType;
    const mLoc = currentKatalogLocation === 'all' || t.city === currentKatalogLocation;
    const mSearch = !search || t.name.toLowerCase().includes(search) || t.tags.join(' ').toLowerCase().includes(search);
    const mKat = !kategori || t.cat === kategori;
    const mPriceMin = !priceMin || t.price >= priceMin;
    const mPriceMax = !priceMax || t.price <= priceMax;
    return mType && mLoc && mSearch && mKat && mPriceMin && mPriceMax;
  });

  if (sort === 'price-asc') result.sort((a,b) => a.price - b.price);
  else if (sort === 'price-desc') result.sort((a,b) => b.price - a.price);

  const el = document.getElementById('listingGrid');
  const count = document.getElementById('listingCount');
  if (!el) return;
  count.textContent = `${result.length} destinasi ditemukan`;
  el.innerHTML = result.length ? result.map(tripCardHtml).join('') : `<div style="grid-column:1/-1;text-align:center;padding:60px 20px"><div style="font-size:52px;margin-bottom:14px">🔍</div><h3 style="font-size:18px;font-weight:700;color:var(--dark);margin-bottom:8px">Destinasi Tidak Ditemukan</h3><p style="color:var(--body-2)">Coba ubah filter atau kata pencarian kamu.</p><button onclick="resetKatalogFilters()" style="margin-top:16px;background:var(--primary);color:#fff;border:none;font-family:var(--font);font-size:13.5px;font-weight:700;padding:10px 22px;border-radius:var(--r-sm);cursor:pointer">Reset Filter</button></div>`;
}

function resetKatalogFilters() {
  document.getElementById('searchFilter').value = '';
  document.getElementById('kategoriFilter').value = '';
  document.getElementById('sortFilter').value = 'default';
  const pm = document.getElementById('priceMin'); if(pm) pm.value = '';
  const px = document.getElementById('priceMax'); if(px) px.value = '';
  setKatalogLocation('all');
  setTripTypeTab('all');
}

/* ═══ DESTINATION MODAL (Katalog) — 4 Tabs ═══ */
let destModalTab = 'deskripsi';

function openDestModal(id) {
  const trip = TRIPS.find(t => t.id === id);
  if (!trip) return;
  destModalTab = 'deskripsi';
  const isCustom = trip.tripType === 'destination';

  document.getElementById('destModalBox').innerHTML = `
    <div class="dest-modal-img" style="height:220px">
      <img src="${trip.img}" alt="${trip.name}" style="width:100%;height:100%;object-fit:cover;display:block">
      <div class="dest-modal-img-grad"></div>
      <div class="dest-modal-img-title">
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px">
          <span style="font-size:11px;font-weight:600;padding:3px 10px;border-radius:50px;background:rgba(232,73,15,.85);color:#fff">${trip.tripType==='oneday'?'One Day':'Custom'}</span>
          <span style="font-size:11px;font-weight:600;padding:3px 10px;border-radius:50px;background:rgba(255,255,255,.2);color:#fff">⏱️ 1 Hari</span>
        </div>
        <h2 style="font-size:22px;font-weight:800;margin-bottom:3px">${trip.name}</h2>
        <p style="font-size:13px;opacity:.8">📍 ${trip.city}</p>
      </div>
      <button class="dest-modal-close" onclick="closeDestModal()">✕</button>
    </div>
    <div class="dest-modal-tabs">
      <button class="dmt active" id="dmt-deskripsi" onclick="switchDestTab('deskripsi',${trip.id})">Deskripsi</button>
      <button class="dmt" id="dmt-itinerary" onclick="switchDestTab('itinerary',${trip.id})">Itinerary</button>
      <button class="dmt" id="dmt-meeting" onclick="switchDestTab('meeting',${trip.id})">Meeting Points</button>
      <button class="dmt" id="dmt-ulasan" onclick="switchDestTab('ulasan',${trip.id})">Ulasan</button>
    </div>
    <div class="dest-modal-body" id="destModalTabBody">
      ${buildDestTab('deskripsi', trip)}
    </div>
    <div class="dest-modal-footer">
      ${isCustom ? `
        <div class="dest-price-box">
          <div class="dest-price-label">Harga</div>
          <div style="font-size:16px;font-weight:700;color:var(--dark)">Dikonfirmasi Admin</div>
          <div class="dest-price-note">Hubungi kami untuk penawaran terbaik</div>
        </div>
      ` : `
        <div class="dest-price-box">
          <div class="dest-price-label">Harga mulai dari</div>
          <div class="dest-price-val">${fmtPrice(trip.price)}<span style="font-size:13px;font-weight:400;color:var(--body-2)"> / orang</span></div>
          <div class="dest-price-note">Belum termasuk jasa guide</div>
        </div>
      `}
      <button class="btn-book-dest" onclick="bookFromModal(${trip.id})">${isCustom ? 'Tambahkan ke Custom Trip →' : 'Booking Private Trip ini →'}</button>
    </div>`;

  document.getElementById('destModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function switchDestTab(tab, tripId) {
  destModalTab = tab;
  const trip = TRIPS.find(t => t.id === tripId);
  ['deskripsi','itinerary','meeting','ulasan'].forEach(t => {
    document.getElementById('dmt-'+t)?.classList.toggle('active', t === tab);
  });
  const body = document.getElementById('destModalTabBody');
  if (body && trip) body.innerHTML = buildDestTab(tab, trip);
}

function buildDestTab(tab, trip) {
  if (tab === 'deskripsi') {
    const hl = trip.highlights.map(h => `
      <div class="highlight-item">
        <div class="highlight-icon">${h.icon}</div>
        <div><div class="highlight-text">${h.text}</div><div class="highlight-sub">${h.sub}</div></div>
      </div>`).join('');
    return `
      <p style="font-size:13.5px;color:var(--body);line-height:1.8;margin-bottom:20px">${trip.desc}</p>
      <div class="itin-section-title" style="margin-bottom:12px">✨ Highlight</div>
      <div class="dest-modal-highlights">${hl}</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:16px">
        ${trip.tags.map(t=>`<span class="tag">${t}</span>`).join('')}
        <span class="tag" style="background:#DCFCE7;color:#16A34A;border-color:#BBF7D0">${trip.status}</span>
      </div>
      <div style="margin-top:20px;display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div>
          <div class="itin-section-title" style="margin-bottom:10px">✅ Sudah Termasuk</div>
          <div class="includes-list">
            ${['Guide profesional bersertifikat','Transport PP','Snack & makan siang','P3K & asuransi dasar'].map(i=>`<div class="includes-item"><span class="inc-check">✓</span>${i}</div>`).join('')}
          </div>
        </div>
        <div>
          <div class="itin-section-title" style="margin-bottom:10px">❌ Tidak Termasuk</div>
          <div class="includes-list">
            ${['Tiket masuk objek wisata','Penginapan','Biaya pribadi','Makan malam'].map(i=>`<div class="includes-item"><span class="exc-check">✕</span>${i}</div>`).join('')}
          </div>
        </div>
      </div>`;
  }

  if (tab === 'itinerary') {
    if (!trip.itinerary || trip.itinerary.length === 0) {
      return `<div style="text-align:center;padding:40px 0;color:var(--body-2)"><div style="font-size:36px;margin-bottom:10px">📋</div><p>Itinerary belum tersedia.</p></div>`;
    }
    return trip.itinerary.map(day => `
      <div class="itin-day">
        <div class="itin-day-header">
          <span class="itin-day-num">Hari ${day.day}</span>
          <span class="itin-day-title">${day.title}</span>
        </div>
        <div class="itin-items">
          ${day.items.map(item => `
            <div class="itin-item">
              <span class="itin-time">${item.time}</span>
              <span class="itin-act">${item.act}</span>
            </div>`).join('')}
        </div>
      </div>`).join('') + `<div style="font-size:12px;color:var(--body-2);margin-top:10px;font-style:italic">*Itinerary bersifat informatif dan dapat disesuaikan kondisi lapangan.</div>`;
  }

  if (tab === 'meeting') {
    const points = [
      {name:'Bandara Lombok International (BIL)', address:'Terminal Kedatangan, Praya'},
      {name:'Hotel Area Senggigi', address:'Jl. Raya Senggigi, Lombok Barat'},
      {name:'Pelabuhan Bangsal', address:'Pemenang, Lombok Utara'},
    ];
    return `
      <p style="font-size:13px;color:var(--body-2);margin-bottom:16px">Pilih titik kumpul yang paling nyaman untukmu. Meeting point final dikonfirmasi saat booking.</p>
      ${points.map(mp=>`
        <div class="meeting-point-item">
          <div class="mp-icon">📍</div>
          <div>
            <div style="font-size:14px;font-weight:700;color:var(--dark)">${mp.name}</div>
            <div style="font-size:12.5px;color:var(--body-2);margin-top:3px">${mp.address}</div>
          </div>
        </div>`).join('')}`;
  }

  if (tab === 'ulasan') {
    const reviews = [
      {name:'Andi Pratama', rating:5, date:'April 2026', comment:'Trip yang luar biasa! Guide sangat profesional dan ramah. Semua berjalan lancar sesuai itinerary. Pasti balik lagi!'},
      {name:'Sari Dewi', rating:5, date:'Maret 2026', comment:'Pengalaman private trip terbaik yang pernah kami rasakan. Pemandangan spektakuler dan pelayanan memuaskan.'},
      {name:'Budi Santoso', rating:4, date:'Februari 2026', comment:'Sangat puas! Koordinasi dengan tim AGA mudah, semua permintaan dipenuhi. Recommended banget untuk group trip.'},
    ];
    return `
      ${reviews.map(r=>`
        <div class="review-item">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
            <div>
              <div style="font-size:14px;font-weight:700;color:var(--dark)">${r.name}</div>
              <div style="font-size:11.5px;color:var(--body-2);margin-top:2px">Trip: ${r.date}</div>
            </div>
            <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
          </div>
          <p class="review-comment">"${r.comment}"</p>
        </div>`).join('')}`;
  }
  return '';
}

function closeDestModal(e) {
  if (e && e.target !== document.getElementById('destModal')) return;
  document.getElementById('destModal').classList.remove('open');
  document.body.style.overflow = '';
}

function bookFromModal(tripId) {
  const trip = TRIPS.find(t => t.id === tripId);
  if (trip.tripType === 'destination') {
    // Custom trip — add to selection then go to booking custom flow
    bookingState.tripType = 'custom';
    if (!bookingState.customDestinations.some(d => d.id === trip.id)) {
      bookingState.customDestinations.push(trip);
    }
    bookingState.destination = null;
  } else {
    bookingState.tripType = trip.tripType;
    bookingState.destination = trip;
    bookingState.customDestinations = [];
  }
  closeDestModal();
  document.body.style.overflow = '';
  nav('booking');
  showToast(`${trip.name} dipilih! Lanjutkan booking 🎒`, '#E8490F');
}

/* ═══ BOOKING 5-STEP ═══ */
function initBooking() {
  // If coming from modal with pre-selected destination, determine type automatically
  if (bookingState.destination && bookingState.tripType === null) {
    bookingState.tripType = bookingState.destination.tripType === 'oneday' ? 'oneday' : 'custom';
  }
  if (bookingState.tripType) {
    // Re-enter step flow
    document.getElementById('tripTypeSelectorWrap').style.display = 'none';
    document.getElementById('bookingStepBar').style.display = 'flex';
    applyTripTypeUI(bookingState.tripType);
    currentStep = 1;
    renderStepBar();
    showStep(1);
    renderDestGrid();
    renderGuideGrid();
    updateParticipantDisplay();
  } else {
    // Show type selector
    document.getElementById('tripTypeSelectorWrap').style.display = 'block';
    document.getElementById('bookingStepBar').style.display = 'none';
    for (let i=1;i<=5;i++) { const p=document.getElementById('step-'+i); if(p) p.classList.remove('active'); }
    ['oneday','custom'].forEach(t => document.getElementById('ttc-'+t)?.classList.remove('selected'));
    currentStep = 1;
  }
  // Set today as min date
  const today = new Date().toISOString().split('T')[0];
  ['tglBerangkat','tglOneday','tglCustom'].forEach(id => {
    const el = document.getElementById(id); if(el) el.min = today;
  });
  updateParticipantDisplay();
}

function selectBookingTripType(type) {
  bookingState.tripType = type;
  bookingState.destination = null;
  bookingState.customDestinations = [];
  bookingState.startDate = '';
  bookingState.endDate = '';
  bookingState.duration = 0;
  bookingState.customDuration = 0;
  bookingState.participants = 1;
  bookingState.participantNames = [''];

  ['oneday','custom'].forEach(t => document.getElementById('ttc-'+t)?.classList.toggle('selected', t===type));

  setTimeout(() => {
    document.getElementById('tripTypeSelectorWrap').style.display = 'none';
    document.getElementById('bookingStepBar').style.display = 'flex';
    applyTripTypeUI(type);
    currentStep = 1;
    renderStepBar();
    showStep(1);
    renderDestGrid();
    renderGuideGrid();
    updateParticipantDisplay();
    window.scrollTo({top:0,behavior:'smooth'});
  }, 200);
}

function applyTripTypeUI(type) {
  document.getElementById('onedayDestSection').style.display = type === 'custom' ? 'none' : 'block';
  document.getElementById('customDestSection').style.display = type === 'custom' ? 'block' : 'none';
  document.getElementById('onedayDateSection').style.display = type === 'oneday' ? 'block' : 'none';
  document.getElementById('customDurSection').style.display = type === 'custom' ? 'block' : 'none';
  if (type === 'oneday') {
    const el = document.getElementById('step1Title'); if(el) el.textContent = 'Pilih Paket One Day Trip';
    const sub = document.getElementById('step1Sub'); if(sub) sub.textContent = 'Pilih paket one day trip yang ingin kamu ikuti';
  }
}

function showStep(n) {
  for (let i = 1; i <= 5; i++) {
    const p = document.getElementById('step-' + i);
    if (p) p.classList.toggle('active', i === n);
  }
  renderStepBar();
  // Update chips for context
  updateStepChips(n);
  if (n === 4) renderParticipantNameFields();
}

function renderStepBar() {
  for (let i = 1; i <= 5; i++) {
    const el = document.getElementById('sb-' + i);
    if (!el) continue;
    el.classList.remove('active', 'done');
    if (i < currentStep) el.classList.add('done');
    else if (i === currentStep) el.classList.add('active');
    // Update circle content
    const circle = el.querySelector('.sb-circle');
    if (circle) circle.textContent = i < currentStep ? '✓' : i;
  }
}

function updateStepChips(step) {
  if (step === 2) {
    const el = document.getElementById('step2-dest-chip');
    if (el) {
      if (bookingState.tripType === 'custom' && bookingState.customDestinations.length) {
        el.innerHTML = bookingState.customDestinations.map(d => `<span class="selection-chip">📍 ${d.name}</span>`).join('');
      } else if (bookingState.destination) {
        el.innerHTML = `<span class="selection-chip">📍 ${bookingState.destination.name} <span class="chip-change" onclick="goToStep(1)">Ganti</span></span>`;
      }
    }
  }
  if (step === 3) {
    const el = document.getElementById('step3-chips');
    if (el) {
      let html = '';
      if (bookingState.tripType === 'custom') {
        html = bookingState.customDestinations.map(d => `<span class="selection-chip">📍 ${d.name}</span>`).join('');
      } else if (bookingState.destination) {
        html += `<span class="selection-chip">📍 ${bookingState.destination.name}</span>`;
      }
      if (bookingState.guide) html += `<span class="selection-chip">👤 ${bookingState.guide.name}</span>`;
      el.innerHTML = html;
    }
  }
}

function backToTypeSelector() {
  bookingState.tripType = null;
  bookingState.destination = null;
  bookingState.customDestinations = [];
  bookingState.participants = 1;
  bookingState.participantNames = [''];
  updateParticipantDisplay();
  for (let i=1;i<=5;i++) { const p=document.getElementById('step-'+i); if(p) p.classList.remove('active'); }
  document.getElementById('bookingStepBar').style.display = 'none';
  document.getElementById('tripTypeSelectorWrap').style.display = 'block';
  ['oneday','custom'].forEach(t => document.getElementById('ttc-'+t)?.classList.remove('selected'));
  window.scrollTo({top:0,behavior:'smooth'});
}

function goToStep(n) {
  if (n > currentStep) return; // only go back
  currentStep = n;
  showStep(n);
}

const STEP_NAMES = {1:'Pemilihan Destinasi',2:'Pemilihan Tour Guide',3:'Detail Perjalanan',4:'Data Pemesan'};

function nextStep(from) {
  showStepSuccess(STEP_NAMES[from] || `Langkah ${from}`, () => {
    currentStep = from + 1;
    showStep(currentStep);
    window.scrollTo({top:0,behavior:'smooth'});
    if (currentStep === 5) buildOrderSummary();
  });
}

let stepOkTimer;
function showStepSuccess(stepName, callback) {
  const overlay = document.getElementById('stepOkOverlay');
  const desc = document.getElementById('stepOkDesc');
  if (!overlay) { callback(); return; }
  desc.textContent = stepName + ' berhasil diisi. Melanjutkan ke langkah berikutnya...';
  overlay.classList.add('open');
  clearTimeout(stepOkTimer);
  stepOkTimer = setTimeout(() => {
    overlay.classList.remove('open');
    callback();
  }, 1500);
}

function prevStep(from) {
  currentStep = from - 1;
  showStep(currentStep);
  window.scrollTo({top:0,behavior:'smooth'});
}

/* ── STEP 1: DESTINATIONS ── */
function renderDestGrid() {
  const type = bookingState.tripType;
  if (type === 'custom') { renderCustomDestGrid(); return; }

  const search = (document.getElementById('destSearch')?.value || '').toLowerCase();
  const filtered = TRIPS.filter(t => t.tripType === 'oneday' && (!search || t.name.toLowerCase().includes(search)));
  const el = document.getElementById('destGrid');
  if (!el) return;
  el.innerHTML = filtered.map(t => `
    <div class="dest-opt ${bookingState.destination?.id === t.id ? 'selected' : ''}" id="dopt-${t.id}" onclick="selectDestination(${t.id})">
      <img src="${t.img}" alt="${t.name}" loading="lazy">
      <div style="padding:10px 12px">
        <div class="dest-opt-label">${t.name}</div>
        <div class="dest-opt-city">📍 ${t.city} · 1 Hari</div>
        <div class="dest-opt-price">${fmtPrice(t.price)} / orang</div>
      </div>
    </div>`).join('');

  const info = document.getElementById('destSelected');
  if (bookingState.destination && info) {
    info.style.display = 'block';
    info.innerHTML = `<div class="selection-chip">✅ Terpilih: <strong>${bookingState.destination.name}</strong></div>`;
  }
  validateStep1();
}

function renderCustomDestGrid() {
  const search = (document.getElementById('customDestSearch')?.value || '').toLowerCase();
  const filtered = TRIPS.filter(t => !search || t.name.toLowerCase().includes(search));
  const el = document.getElementById('customDestGrid');
  if (!el) return;
  el.innerHTML = filtered.map(t => {
    const sel = bookingState.customDestinations.some(d => d.id === t.id);
    return `<div class="custom-dest-item ${sel?'selected':''}" onclick="toggleCustomDest(${t.id})">
      <div class="cdi-check">✓</div>
      <img src="${t.img}" alt="${t.name}" loading="lazy">
      <div class="cdi-body">
        <div class="cdi-label">${t.name}</div>
        <div class="cdi-tags">📍 ${t.city} · ${t.tags.join(' · ')}</div>
      </div>
    </div>`;
  }).join('');
  updateCustomSelectedList();
  validateStep1();
}

function toggleCustomDest(id) {
  const trip = TRIPS.find(t => t.id === id);
  if (!trip) return;
  const idx = bookingState.customDestinations.findIndex(d => d.id === id);
  if (idx >= 0) bookingState.customDestinations.splice(idx, 1);
  else bookingState.customDestinations.push(trip);
  renderCustomDestGrid();
}

function updateCustomSelectedList() {
  const el = document.getElementById('customSelectedList');
  if (!el) return;
  if (bookingState.customDestinations.length === 0) {
    el.innerHTML = '<span style="font-size:12.5px;color:var(--body-2)">Belum ada destinasi dipilih</span>';
  } else {
    el.innerHTML = bookingState.customDestinations.map(d =>
      `<span class="selection-chip">📍 ${d.name} <span class="chip-change" onclick="toggleCustomDest(${d.id})">✕</span></span>`
    ).join('');
  }
}

function selectDestination(id) {
  bookingState.destination = TRIPS.find(t => t.id === id);
  renderDestGrid();
}

function validateStep1() {
  const btn = document.getElementById('nextBtn1');
  if (!btn) return;
  if (bookingState.tripType === 'custom') btn.disabled = bookingState.customDestinations.length === 0;
  else btn.disabled = !bookingState.destination;
}

/* ── STEP 2: GUIDES ── */
function renderGuideGrid() {
  const search = (document.getElementById('guideSearchBook')?.value || '').toLowerCase();
  const filtered = GUIDES.filter(g => !search || g.name.toLowerCase().includes(search) || g.specialtyLabel.toLowerCase().includes(search));
  const el = document.getElementById('guideGrid2');
  if (!el) return;
  el.innerHTML = filtered.map(g => `
    <div class="guide-opt ${bookingState.guide?.id === g.id ? 'selected' : ''}" id="gopt-${g.id}" onclick="selectGuide(${g.id})">
      <div class="guide-opt-av"><img src="${g.avatar}" alt="${g.name}" loading="lazy"></div>
      <div class="guide-opt-name">${g.name}</div>
      <div class="guide-opt-loc">📍 ${g.location}</div>
      <div class="guide-opt-rating">⭐ ${g.rating} (${g.reviewCount} ulasan)</div>
      <div style="font-size:11.5px;color:var(--body-2);margin-top:4px">🎯 ${g.specialtyLabel}</div>
    </div>`).join('');

  const info = document.getElementById('guideSelected');
  if (bookingState.guide && info) {
    info.style.display = 'block';
    info.innerHTML = `<div class="selection-chip">✅ Guide terpilih: <strong>${bookingState.guide.name}</strong> · ⭐ ${bookingState.guide.rating}</div>`;
  }
  validateStep2();
}

function selectGuide(id) {
  bookingState.guide = GUIDES.find(g => g.id === id);
  renderGuideGrid();
}

function validateStep2() {
  const btn = document.getElementById('nextBtn2');
  if (btn) btn.disabled = !bookingState.guide;
}

/* ── STEP 3: DETAIL ── */
function calcOnedayDate() {
  const d = document.getElementById('tglOneday')?.value;
  bookingState.startDate = d;
  bookingState.endDate = d;
  bookingState.duration = 1;
  validateStep3();
}

function calcRinjaniDate() {
  const s = document.getElementById('tglBerangkat')?.value;
  bookingState.startDate = s;
  if (s) {
    const [year, month, day] = s.split('-').map(Number);
    const end = new Date(Date.UTC(year, month - 1, day + 2));
    bookingState.endDate = end.toISOString().split('T')[0];
    bookingState.duration = 3;
  } else {
    bookingState.endDate = '';
    bookingState.duration = 0;
  }
  validateStep3();
}

function validateCustomDur() {
  const input = document.getElementById('customDurInput');
  if (input && parseInt(input.value) > 14) input.value = 14;
  const dur = parseInt(input?.value) || 0;
  const tgl = document.getElementById('tglCustom')?.value;
  bookingState.customDuration = dur;
  bookingState.startDate = tgl || '';
  bookingState.duration = dur;
  bookingState.meetingPoint = document.getElementById('meetingPointCustom')?.value || '';
  validateStep3();
}

function changeParticipants(delta) {
  bookingState.participants = Math.max(1, bookingState.participants + delta);
  syncParticipantNames();
  updateParticipantDisplay();
  renderParticipantNameFields();
  validateStep3();
  validateStep4();
}

function updateParticipantDisplay() {
  ['participantValOneday','participantVal','participantValCustom'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = bookingState.participants;
  });
}

function syncParticipantNames() {
  const existing = bookingState.participantNames || [];
  bookingState.participantNames = Array.from({length: bookingState.participants}, (_, i) => existing[i] || '');
}

function validateStep3() {
  const btn = document.getElementById('nextBtn3');
  if (!btn) return;
  const type = bookingState.tripType;
  if (type === 'oneday') {
    btn.disabled = !bookingState.startDate;
  } else if (type === 'custom') {
    btn.disabled = !(bookingState.customDuration > 0 && bookingState.startDate);
  } else {
    btn.disabled = !bookingState.startDate;
  }
}

/* ── STEP 4: DATA PEMESAN ── */
function renderParticipantNameFields() {
  const el = document.getElementById('participantNamesSection');
  if (!el) return;
  syncParticipantNames();
  el.innerHTML = `
    <div class="step-title" style="font-size:18px;margin-bottom:5px">Nama Peserta</div>
    <div class="step-sub" style="margin-bottom:14px">Isi nama sesuai jumlah peserta trip</div>
    <div class="detail-grid">
      ${bookingState.participantNames.map((name, i) => `
        <div class="form-group">
          <label>Peserta ${i + 1} <span class="req">*</span></label>
          <input type="text" class="form-input participant-name-input" data-index="${i}" value="${escapeHtml(name)}" placeholder="Nama peserta ${i + 1}" oninput="updateParticipantName(${i}, this.value)">
        </div>
      `).join('')}
    </div>
  `;
}

function updateParticipantName(index, value) {
  syncParticipantNames();
  bookingState.participantNames[index] = value.trim();
  validateStep4();
}

function validateStep4() {
  const name = document.getElementById('namaLengkap')?.value.trim();
  const phone = document.getElementById('nomorPonsel')?.value.trim();
  const email = document.getElementById('emailPemesan')?.value.trim();
  document.querySelectorAll('.participant-name-input').forEach(input => {
    const index = Number(input.dataset.index);
    bookingState.participantNames[index] = input.value.trim();
  });
  const participantNamesComplete = (bookingState.participantNames || []).length === bookingState.participants
    && bookingState.participantNames.every(Boolean);
  bookingState.name = name;
  bookingState.phone = phone;
  bookingState.email = email;
  bookingState.notes = document.getElementById('catatanKhusus')?.value || '';
  bookingState.meetingPoint = document.getElementById('meetingPoint')?.value || '';
  const btn = document.getElementById('nextBtn4');
  if (btn) btn.disabled = !(name && phone && email && email.includes('@') && participantNamesComplete);
}

/* ── STEP 5: ORDER SUMMARY ── */
function buildOrderSummary() {
  const d = bookingState;
  const isCustom = d.tripType === 'custom';
  const fmtDate = str => {
    if (!str) return '-';
    return new Date(str).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'});
  };

  const durLabel = d.tripType === 'oneday' ? '1 Hari'
    : d.tripType === 'custom' ? `${d.customDuration} Hari (perkiraan)`
    : `${d.duration} Hari ${d.duration-1} Malam`;

  const destLabel = isCustom
    ? (d.customDestinations.map(x=>x.name).join(', ') || '-')
    : (d.destination?.name || '-');

  const tripTotal = !isCustom && d.destination ? d.destination.price * d.participants : 0;
  const grandTotal = tripTotal;
  const participantNamesHtml = (d.participantNames || []).map((name, i) =>
    `<div>${i + 1}. ${escapeHtml(name)}</div>`
  ).join('');

  const meetingPt = d.tripType === 'custom' ? (document.getElementById('meetingPointCustom')?.value || d.meetingPoint || '-') : (d.meetingPoint || '-');

  const el = document.getElementById('orderSummary');
  if (!el) return;

  const typeLabelMap = {oneday:'🌅 One Day Trip', custom:'🗺️ Custom Trip'};

  const osRow = (label, val, step) => `
    <div class="os-row">
      <span class="os-row-label" style="min-width:130px">${label}</span>
      <span class="os-row-val" style="flex:1;text-align:right">${val}</span>
      <button class="btn-os-edit" onclick="goToStep(${step})">Edit</button>
    </div>`;

  el.innerHTML = `
    <div class="order-summary">
      <div class="os-header">
        <h3>📋 Ringkasan Pemesanan</h3>
        <span style="margin-left:auto"><span class="private-badge">🔒 100% Private</span></span>
      </div>
      <div class="os-body">
        ${osRow('Jenis Trip', typeLabelMap[d.tripType]||'Private Trip', 0)}
        ${osRow('Destinasi', destLabel, 1)}
        ${osRow('Tour Guide', d.guide?.name || '-', 2)}
        ${osRow('Tanggal Berangkat', fmtDate(d.startDate), 3)}
        ${!isCustom && d.endDate && d.endDate !== d.startDate ? osRow('Tanggal Kembali', fmtDate(d.endDate), 3) : ''}
        ${osRow('Durasi', durLabel, 3)}
        ${osRow('Jumlah Peserta', d.participants + ' orang', 3)}
        ${osRow('Nama Peserta', participantNamesHtml || '-', 4)}
        ${osRow('Meeting Point', meetingPt, 3)}
        ${osRow('Nama Pemesan', d.name, 4)}
        ${osRow('Nomor Ponsel', d.phone, 4)}
        ${osRow('Email', d.email, 4)}
        ${d.notes ? osRow('Catatan', d.notes, 4) : ''}
        ${!isCustom ? `
        <div style="padding:16px 0 0;margin-top:4px;border-top:1px dashed var(--stroke)">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px"><span style="font-size:13px;color:var(--body)">Harga trip (${fmtPrice(d.destination?.price||0)} × ${d.participants} orang)</span><span style="font-size:13px;font-weight:600;color:var(--dark)">${fmtPrice(tripTotal)}</span></div>
          <div style="display:flex;justify-content:space-between;margin-bottom:8px"><span style="font-size:13px;color:var(--body)">Tour guide</span><span style="font-size:13px;font-weight:600;color:var(--success)">Termasuk</span></div>
        </div>` : ''}
      </div>
      ${!isCustom ? `
      <div class="os-total-row">
        <div class="os-total-label">Total Estimasi Biaya</div>
        <div class="os-total-val">${fmtPrice(grandTotal)}</div>
      </div>
      <div class="os-note">💡 Harga ini adalah estimasi. Konfirmasi final akan dikirim melalui WhatsApp dalam 1×24 jam.</div>
      ` : `
      <div style="padding:20px 22px">
        <div class="custom-price-box">
          <div class="cpb-icon">📞</div>
          <h4>Harga Akan Dikonfirmasi oleh Admin</h4>
          <p>Untuk Custom Trip, harga dihitung berdasarkan destinasi, durasi, dan jumlah peserta yang kamu pilih. Tour guide sudah termasuk dalam penawaran. Tim kami akan menghubungimu dalam 1×24 jam untuk memberikan harga terbaik.</p>
        </div>
      </div>
      `}
    </div>`;
}

function submitBooking() {
  const btn = document.querySelector('.btn-submit-final');
  if (btn) { btn.innerHTML = '⏳ Mengirim...'; btn.disabled = true; }
  setTimeout(() => {
    if (btn) { btn.innerHTML = 'Kirim Permintaan ✈️'; btn.disabled = false; }
    showToast('✓ Permintaan berhasil dikirim! Kami akan menghubungimu dalam 1×24 jam.', '#16A34A');
    // Reset
    bookingState = {tripType:null,destination:null,customDestinations:[],customDuration:0,guide:null,startDate:'',endDate:'',duration:0,participants:1,participantNames:[''],meetingPoint:'',name:'',phone:'',email:'',notes:''};
    currentStep = 1;
    setTimeout(() => { nav('beranda'); }, 2000);
  }, 1800);
}

function startBookingWithGuide(id) {
  const guide = GUIDES.find(g => g.id === id);
  if (!guide) return;
  bookingState = {
    tripType: null,
    destination: null,
    customDestinations: [],
    customDuration: 0,
    guide,
    startDate: '',
    endDate: '',
    duration: 0,
    participants: 1,
    participantNames: [''],
    meetingPoint: '',
    name: '',
    phone: '',
    email: '',
    notes: '',
  };
  closeGuideModal();
  nav('booking');
  showToast(`Guide ${guide.name} dipilih! Lanjutkan booking`, '#E8490F');
}

/* ═══ TOUR GUIDE PAGE ═══ */
function renderGuides(guides) {
  if (!guides) guides = filterGuidesResult(currentGuideFilter);
  const el = document.getElementById('guideGrid');
  const label = document.getElementById('guideCountLabel');
  if (!el) return;
  if (label) label.textContent = `Menampilkan ${guides.length} tour guide`;
  el.innerHTML = guides.map(g => `
    <div class="guide-card" onclick="openGuideModal(${g.id})">
      <div class="gc-cover"><img src="${g.cover}" alt="${g.name}" loading="lazy"><span class="gc-specialty-badge">${g.specialtyLabel}</span></div>
      <div class="gc-body">
        <div class="gc-header">
          <div class="gc-avatar"><img src="${g.avatar}" alt="${g.name}"></div>
          <div style="padding-top:42px">
            <div class="gc-name">${g.name} <span class="gc-verified">✓</span></div>
            <div class="gc-location">📍 ${g.location}</div>
          </div>
        </div>
        <div class="gc-rating-row"><span class="gc-stars">${'★'.repeat(Math.floor(g.rating))}</span><span class="gc-rating-num">${g.rating}</span><span class="gc-rating-count">(${g.reviewCount} ulasan)</span></div>
        <div class="gc-languages">🗣️ ${g.languages}</div>
        <div class="gc-bio">${g.bio}</div>
        <div class="gc-stats-row">
          <div class="gc-stat-item"><div class="gc-stat-val">${g.tripsDone}+</div><div class="gc-stat-lbl">Trip</div></div>
          <div class="gc-stat-item"><div class="gc-stat-val">${g.yearsExp}+</div><div class="gc-stat-lbl">Tahun</div></div>
          <div class="gc-stat-item"><div class="gc-stat-val">${g.rating}⭐</div><div class="gc-stat-lbl">Rating</div></div>
        </div>
        <div class="gc-footer">
          <button class="btn-hire" onclick="event.stopPropagation();openGuideModal(${g.id})">Lihat Profil</button>
        </div>
      </div>
    </div>`).join('');
}

function filterGuidesResult(specialty) {
  const search = (document.getElementById('guideSearch')?.value || '').toLowerCase();
  return GUIDES.filter(g => {
    const mSpec = specialty === 'all' || g.specialty === specialty;
    const mSearch = !search || g.name.toLowerCase().includes(search);
    return mSpec && mSearch;
  });
}

function filterGuides(specialty) {
  currentGuideFilter = specialty;
  ['all','mountain','beach','culture','island'].forEach(s => document.getElementById('tgf-'+s)?.classList.toggle('active', s === specialty));
  renderGuides(filterGuidesResult(specialty));
}

function openGuideModal(id) {
  const g = GUIDES.find(x => x.id === id);
  if (!g) return;
  const sched = Object.entries(g.availability).map(([day,time]) => `<div class="schedule-item"><div class="schedule-day">${day}</div><div class="schedule-time">${time}</div></div>`).join('');
  document.getElementById('modalBox').innerHTML = `
    <div class="modal-cover"><img src="${g.cover}" alt="${g.name}"><div class="modal-cover-grad"></div><button class="modal-close" onclick="closeGuideModal()">✕</button></div>
    <div class="modal-body">
      <div class="modal-avatar-row"><div class="modal-avatar"><img src="${g.avatar}" alt="${g.name}"></div><div><div class="modal-name">${g.name} <span class="gc-verified" style="font-size:14px">✓</span></div><div class="modal-loc">📍 ${g.location} · 🗣️ ${g.languages}</div><div style="margin-top:6px;display:flex;gap:8px;align-items:center"><span style="color:#F59E0B;font-size:14px">${'★'.repeat(Math.floor(g.rating))}</span><span style="font-size:14px;font-weight:700;color:var(--dark)">${g.rating}</span><span style="font-size:12px;color:var(--body-2)">(${g.reviewCount} ulasan)</span></div></div></div>
      <div style="font-size:13.5px;color:var(--body);line-height:1.75;margin-bottom:8px">${g.bio}</div>
      <div class="modal-section-title">Sertifikasi</div>
      <div class="modal-badges">${g.certifications.map(c=>`<span class="modal-badge">✓ ${c}</span>`).join('')}</div>
      <div class="modal-section-title">Destinasi Unggulan</div>
      <div class="modal-badges">${g.destinations.map(d=>`<span class="modal-badge">📍 ${d}</span>`).join('')}</div>
      <div class="modal-section-title">Jadwal Ketersediaan</div>
      <div class="modal-schedule">${sched}</div>
      <div class="modal-cta">
        <button class="btn-modal-wa">📱 WhatsApp</button>
        <button class="btn-modal-hire" onclick="startBookingWithGuide(${g.id})">Book Guide Ini</button>
      </div>
    </div>`;
  document.getElementById('guideModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeGuideModal(e) {
  if (e && e.target !== document.getElementById('guideModal')) return;
  document.getElementById('guideModal').classList.remove('open');
  document.body.style.overflow = '';
}

/* ═══ PROFILE TABS ═══ */
function showProfTab(tab) {
  ['akun','history','wallet','keamanan','bantuan'].forEach(t => {
    const el = document.getElementById('ptab-'+t);
    if (el) el.style.display = t === tab ? 'block' : 'none';
  });
  const idx = {akun:0,history:1,wallet:2,keamanan:3,bantuan:4};
  document.querySelectorAll('.pmi').forEach((btn,i) => btn.classList.toggle('active', i === idx[tab]));
}

/* ═══ OTP ═══ */
function otpNext(el, idx) {
  el.value = el.value.replace(/\D/g,'');
  if (el.value && idx < 3) document.getElementById('otp'+(idx+1))?.focus();
}
function otpBack(e, idx) {
  if (e.key === 'Backspace' && !e.target.value && idx > 0) document.getElementById('otp'+(idx-1))?.focus();
}

let resendInterval;
function startResendTimer() {
  let sec = 60;
  const link = document.getElementById('resendLink');
  const timer = document.getElementById('resendTimer');
  if (link) { link.style.pointerEvents='none'; link.style.opacity='.5'; }
  clearInterval(resendInterval);
  resendInterval = setInterval(() => {
    if (timer) timer.textContent = `Kirim ulang dalam ${sec}s`;
    sec--;
    if (sec < 0) {
      clearInterval(resendInterval);
      if (timer) timer.textContent = '';
      if (link) { link.style.pointerEvents=''; link.style.opacity='1'; }
    }
  }, 1000);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeGuideModal(); closeDestModal(); closeDrawer(); }
});

/* ═══ INIT ═══ */
(function init() {
  const saved = localStorage.getItem('aga-page');
  nav(saved && document.getElementById('page-'+saved) ? saved : 'beranda');
})();
