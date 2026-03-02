let dataPemesanan = JSON.parse(localStorage.getItem("dataPemesanan")) || [];
let editIndex = -1;

document.addEventListener("DOMContentLoaded", function () {
    tampilkanData();
});

document.getElementById("formPemesanan")
.addEventListener("submit", function (event) {

    event.preventDefault();

    let nama = document.getElementById("nama").value;
    let hp = document.getElementById("hp").value;
    let alamat = document.getElementById("alamat").value;
    let merek = document.getElementById("merek").value;
    let model = document.getElementById("model").value;
    let tahun = document.getElementById("tahun").value;
    let pembayaran = document.querySelector('input[name="pembayaran"]:checked');

    if (!pembayaran) {
        alert("Pilih jenis pembayaran!");
        return;
    }

    pembayaran = pembayaran.value;

    if (hp.length < 10 || isNaN(hp)) {
        alert("No HP harus angka dan minimal 10 digit!");
        return;
    }

    let objek = { nama, hp, alamat, merek, model, tahun, pembayaran };

    if (editIndex === -1) {
        dataPemesanan.push(objek);
    } else {
        dataPemesanan[editIndex] = objek;
        editIndex = -1;
    }

    localStorage.setItem("dataPemesanan", JSON.stringify(dataPemesanan));

    tampilkanData();
    document.getElementById("formPemesanan").reset();
});

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

function hapusData(index) {
    if (confirm("Yakin ingin menghapus data ini?")) {
        dataPemesanan.splice(index, 1);
        localStorage.setItem("dataPemesanan", JSON.stringify(dataPemesanan));
        tampilkanData();
    }
}

function editData(index) {

    let item = dataPemesanan[index];

    document.getElementById("nama").value = item.nama;
    document.getElementById("hp").value = item.hp;
    document.getElementById("alamat").value = item.alamat;
    document.getElementById("merek").value = item.merek;
    document.getElementById("model").value = item.model;
    document.getElementById("tahun").value = item.tahun;

    document.querySelector(`input[name="pembayaran"][value="${item.pembayaran}"]`).checked = true;

    editIndex = index;
}
