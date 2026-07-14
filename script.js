// script.js
const { insertCoin, onTikTokLiveEvent } = Playroom;

document.getElementById('connectBtn').addEventListener('click', async () => {
    const username = document.getElementById('targetId').value;
    if (!username) return alert("Masukkan ID TikTok!");

    // Sembunyikan form, tampilkan area live
    document.getElementById('setup').style.display = 'none';
    document.getElementById('live-display').style.display = 'block';

    try {
        // Mengaktifkan mode TikTok Live dengan username target [4]
        await insertCoin({
            liveMode: "tiktok",
            tiktokUsername: username 
        });

        document.getElementById('status').innerText = `Terhubung ke: @${username}`;

        // Listener untuk berbagai event TikTok LIVE [5, 6]
        onTikTokLiveEvent((event) => {
            const { type, data } = event;

            if (type === "chat") {
                addChat(data.nickname, data.comment);
            } else if (type === "gift") {
                // Membaca gift termasuk jumlah streak (repeatCount) [6, 7]
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
}

function addGift(user, gift, count) {
    const li = document.createElement('li');
    li.innerHTML = `🎁 <b>${user}</b> mengirim <b>${gift}</b> x${count}`;
    document.getElementById('giftList').prepend(li);
}
