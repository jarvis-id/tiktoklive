// script.js
const { insertCoin, onTikTokLiveEvent } = Playroom;

// Inisialisasi antrean suara (Speech Queue) untuk mencegah bentrokan suara
const speechQueue = [];
let isSpeaking = false;

// Mengambil elemen kontrol suara dari HTML
const readChatCheckbox = document.getElementById('readChat');
const readGiftCheckbox = document.getElementById('readGift');
const volumeSlider = document.getElementById('volume');

// Fungsi untuk memasukkan teks ke antrean suara
function speak(text) {
  if (!('speechSynthesis' in window)) {
    console.warn("Speech Synthesis tidak didukung oleh browser ini.");
    return;
  }

  // Batasi panjang antrean agar suara tidak terlalu tertinggal jauh dari chat aktual
  if (speechQueue.length > 8) {
    speechQueue.shift(); // Buang pesan suara paling lama dalam antrean
  }

  speechQueue.push(text);
  processSpeechQueue();
}

// Fungsi untuk memproses antrean suara satu per satu secara berurutan
function processSpeechQueue() {
  if (isSpeaking || speechQueue.length === 0) return;

  isSpeaking = true;
  const text = speechQueue.shift();
  const utterance = new SpeechSynthesisUtterance(text);

  // Menggunakan konfigurasi suara Bahasa Indonesia
  utterance.lang = 'id-ID';
  
  // Mengambil volume dari slider secara real-time
  utterance.volume = volumeSlider ? parseFloat(volumeSlider.value) : 0.8;
  
  // Sedikit percepat laju bicara (rate) agar pembacaan lebih responsif
  utterance.rate = 1.1; 

  utterance.onend = () => {
    isSpeaking = false;
    processSpeechQueue();
  };

  utterance.onerror = (e) => {
    console.error("SpeechSynthesis error:", e);
    isSpeaking = false;
    processSpeechQueue();
  };

  window.speechSynthesis.speak(utterance);
}

// Memicu aktivasi suara kosong saat interaksi pertama user (klik tombol)
// Ini diperlukan untuk melewati kebijakan keamanan Autoplay di browser modern
function triggerDummySpeech() {
  if ('speechSynthesis' in window) {
    const dummy = new SpeechSynthesisUtterance('');
    window.speechSynthesis.speak(dummy);
  }
}

document.getElementById('connectBtn').addEventListener('click', async () => {
 const username = document.getElementById('targetId').value;
 if (!username) return alert("Masukkan ID TikTok!");

 // Sembunyikan form, tampilkan area live
 document.getElementById('setup').style.display = 'none';
 document.getElementById('live-display').style.display = 'block';

 // Bypass batasan autoplay suara pada browser
 triggerDummySpeech();

 try {
 // Mengaktifkan mode TikTok Live dengan username target
 await insertCoin({
 liveMode: "tiktok",
 tiktokUsername: username 
 });

 document.getElementById('status').innerText = `Terhubung ke: @${username}`;

 // Listener untuk berbagai event TikTok LIVE
 onTikTokLiveEvent((event) => {
 const { type, data } = event;

 if (type === "chat") {
 addChat(data.nickname, data.comment);
 } else if (type === "gift") {
 // Membaca gift termasuk jumlah streak (repeatCount)
 addGift(data.nickname, data.giftName, data.repeatCount);
 }
 });

 } catch (err) {
 console.error("Gagal terhubung:", err);
 alert("Gagal terhubung. Pastikan host sedang LIVE.");
 }
});

function addChat(user, msg) {
 const li = document.createElement('li');
 li.innerHTML = `<b>${user}:</b> ${msg}`;
 document.getElementById('chatList').prepend(li);

 // Bacakan chat dengan suara jika opsi diaktifkan
 if (readChatCheckbox && readChatCheckbox.checked) {
   speak(`${user} berkata: ${msg}`);
 }
}

function addGift(user, gift, count) {
 const li = document.createElement('li');
 li.innerHTML = `🎁 <b>${user}</b> mengirim <b>${gift}</b> x${count}`;
 document.getElementById('giftList').prepend(li);

 // Bacakan gift dengan suara jika opsi diaktifkan
 if (readGiftCheckbox && readGiftCheckbox.checked) {
   speak(`Terima kasih ${user} telah mengirim ${gift} sebanyak ${count}`);
 }
}
