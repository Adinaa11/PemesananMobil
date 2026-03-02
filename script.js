let nomor = 1;

document.getElementById("formPemesanan")
.addEventListener("submit", function(event) {

    event.preventDefault(); // mencegah reload

    // Ambil nilai input
    let nama = document.getElementById("nama").value;
    let hp = document.getElementById("hp").value;
    let alamat = document.getElementById("alamat").value;
    let merek = document.getElementById("merek").value;
    let model = document.getElementById("model").value;
    let tahun = document.getElementById("tahun").value;

    let pembayaran = document.querySelector('input[name="pembayaran"]:checked');

    // Validasi tambahan JS
    if (!pembayaran) {
        alert("Pilih jenis pembayaran!");
        return;
    }

    pembayaran = pembayaran.value;

    if (hp.length < 10 || isNaN(hp)) {
        alert("No HP harus angka dan minimal 10 digit!");
        return;
    }

    // Ambil tabel body
    let tabel = document.getElementById("dataPemesanan");

    // Buat baris baru
    let baris = tabel.insertRow();

    baris.innerHTML = `
        <td>${nomor++}</td>
        <td>${nama}</td>
        <td>${hp}</td>
        <td>${alamat}</td>
        <td>${merek}</td>
        <td>${model}</td>
        <td>${tahun}</td>
        <td>${pembayaran}</td>
        <td><button onclick="hapusData(this)">Hapus</button></td>
    `;

    // Reset form setelah submit
    document.getElementById("formPemesanan").reset();

});
    

function hapusData(button) {
    let baris = button.parentElement.parentElement;
    baris.remove();
}
