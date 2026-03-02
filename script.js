let dataPemesanan = JSON.parse(localStorage.getItem("dataPemesanan")) || [];
let editIndex = -1;

document.addEventListener("DOMContentLoaded", function () {
    tampilkanData();
    cekPembayaran();
});

// ====== CEK PEMBAYARAN ======
document.querySelectorAll('input[name="pembayaran"]')
.forEach(radio => {
    radio.addEventListener("change", cekPembayaran);
});

function cekPembayaran() {
    let kredit = document.querySelector('input[name="pembayaran"][value="Kredit"]');
    let info = document.getElementById("infoKredit");

    if (kredit.checked) {
        info.textContent = "Wajib menyerahkan berkas fotokopi KTP dan KK sebelum pengambilan.";
    } else {
        info.textContent = "";
    }
}

// ====== VALIDASI & SUBMIT ======
document.getElementById("formPemesanan")
.addEventListener("submit", function (event) {

    event.preventDefault();

    let nama = document.getElementById("nama").value.trim();
    let hp = document.getElementById("hp").value.trim();
    let alamat = document.getElementById("alamat").value;
    let merek = document.getElementById("merek").value;
    let model = document.getElementById("model").value;
    let tahun = document.getElementById("tahun").value;
    let pembayaran = document.querySelector('input[name="pembayaran"]:checked');

    // VALIDASI NAMA (tidak boleh angka)
    if (!/^[a-zA-Z\s]+$/.test(nama)) {
        alert("Nama hanya boleh huruf!");
        return;
    }

    // VALIDASI HP (hanya angka)
    if (!/^[0-9]+$/.test(hp)) {
        alert("No HP hanya boleh angka!");
        return;
    }

    if (!pembayaran) {
        alert("Pilih jenis pembayaran!");
        return;
    }

    pembayaran = pembayaran.value;

    let objek = { nama, hp, alamat, merek, model, tahun, pembayaran };

    if (editIndex === -1) {
        dataPemesanan.push(objek);
    } else {
        dataPemesanan[editIndex] = objek;
        editIndex = -1;
        resetMode();
    }

    localStorage.setItem("dataPemesanan", JSON.stringify(dataPemesanan));

    tampilkanData();
    document.getElementById("formPemesanan").reset();
    cekPembayaran();
});

// ====== TAMPILKAN DATA ======
function tampilkanData() {
    let tabel = document.getElementById("dataPemesanan");
    tabel.innerHTML = "";

    dataPemesanan.forEach((item, index) => {
        let baris = tabel.insertRow();

        baris.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.nama}</td>
            <td>${item.hp}</td>
            <td>${item.alamat}</td>
            <td>${item.merek}</td>
            <td>${item.model}</td>
            <td>${item.tahun}</td>
            <td>${item.pembayaran}</td>
            <td>
                <button onclick="editData(${index})">Edit</button>
                <button onclick="hapusData(${index})">Hapus</button>
            </td>
        `;
    });
}

// ====== HAPUS ======
function hapusData(index) {
    if (confirm("Yakin ingin menghapus data ini?")) {
        dataPemesanan.splice(index, 1);
        localStorage.setItem("dataPemesanan", JSON.stringify(dataPemesanan));
        tampilkanData();
    }
}

// ====== EDIT ======
function editData(index) {

    let item = dataPemesanan[index];

    document.getElementById("nama").value = item.nama;
    document.getElementById("hp").value = item.hp;
    document.getElementById("alamat").value = item.alamat;
    document.getElementById("merek").value = item.merek;
    document.getElementById("model").value = item.model;
    document.getElementById("tahun").value = item.tahun;

    document.querySelector(`input[name="pembayaran"][value="${item.pembayaran}"]`).checked = true;

    cekPembayaran();

    editIndex = index;

    document.getElementById("btnSubmit").textContent = "Simpan Perubahan";

    buatTombolCancel();
}

// ====== CANCEL EDIT ======
function buatTombolCancel() {

    if (!document.getElementById("btnCancel")) {
        let btn = document.createElement("button");
        btn.textContent = "Cancel";
        btn.type = "button";
        btn.id = "btnCancel";
        btn.style.marginLeft = "10px";

        btn.onclick = function () {
            resetMode();
        };

        document.getElementById("btnSubmit").after(btn);
    }
}

function resetMode() {
    editIndex = -1;
    document.getElementById("formPemesanan").reset();
    document.getElementById("btnSubmit").textContent = "Kirim Pemesanan";
    cekPembayaran();

    let btnCancel = document.getElementById("btnCancel");
    if (btnCancel) btnCancel.remove();
}
