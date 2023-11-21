var orderan = [];
var totalpembayaran = 0;

function addOrder() {
  var type = document.getElementById("type").value;
  var berat = document.getElementById("berat").value;

  if (berat === "" || berat <= 0) {
    alert("Masukkan berat yang valid.");
    return;
  }

  var hargaPerKg = 0;
  var gratisKg = 0;
  var totalbayar = 0;

  if (type === "pakaian") {
    hargaPerKg = 15000;
    gratisKg = 1;

    if (berat > 5) {
      totalbayar = (berat - gratisKg) * hargaPerKg;
    } else {
      totalbayar = berat * hargaPerKg;
    }
  } else if (type === "bedcover") {
    hargaPerKg = 100000;
    gratisKg = 1;

    if (berat > 3) {
      totalbayar = (berat - gratisKg) * hargaPerKg;
    } else {
      totalbayar = berat * hargaPerKg;
    }
  } else if (type === "karpet") {
    hargaPerKg = 150000;
    totalbayar = berat * hargaPerKg;
  }

  var order = {
    type: type,
    berat: parseFloat(berat),
    totalbayar: totalbayar,
  };

  orderan.push(order);
  totalpembayaran += totalbayar;
  displayorderan();
  displaytotalpembayaran();
}

function displayorderan() {
  var table = document.getElementById("listorderan");
  table.innerHTML = `
        <tr>
            <th>Jenis</th>
            <th>Berat (Kg)</th>
            <th>Total Harga</th>
            <th>Aksi</th>
        </tr>
    `;

  for (var i = 0; i < orderan.length; i++) {
    var item = orderan[i];
    var totalbayar = item.totalbayar;
    var discount = 0;

    if (item.type === "pakaian" && item.berat > 5) {
      discount = 15000; // Diskon 1 kg pakaian
    } else if (item.type === "bedcover" && item.berat > 3) {
      discount = 100000; // Diskon 1 kg bedcover
    }

    var row = table.insertRow();
    var jenisCell = row.insertCell(0);
    var beratCell = row.insertCell(1);
    var totalHargaCell = row.insertCell(2);
    var aksiCell = row.insertCell(3);

    jenisCell.innerHTML = item.type;
    beratCell.innerHTML = item.berat;
    if (discount > 0) {
      totalHargaCell.innerHTML = `<b>${
        totalbayar - discount
      } (Diskon: ${discount})</b>`;
    } else {
      totalHargaCell.innerHTML = `<b>${totalbayar}</b>`;
    }
    aksiCell.innerHTML = `<button onclick="editOrder(${i})">Edit</button> <button onclick="devareOrder(${i})">Devare</button>`;
  }
}

function displaytotalpembayaran() {
  var totalpembayaranElement = document.getElementById("totalpembayaran");
  totalpembayaranElement.innerHTML = `<b>Total Pembayaran: ${totalpembayaran}</b>`;
}

function editOrder(index) {
  var newberat = prompt("Masukkan berat baru:");
  if (newberat === null || newberat <= 0) {
    alert("Masukkan berat yang valid.");
    return;
  }

  var item = orderan[index];
  totalpembayaran -= item.totalbayar;

  item.berat = parseFloat(newberat);

  if (item.type === "pakaian") {
    var hargaPerKg = 15000;
    var gratisKg = 1;

    if (item.berat > 5) {
      item.totalbayar = (item.berat - gratisKg) * hargaPerKg;
    } else {
      item.totalbayar = item.berat * hargaPerKg;
    }
  } else if (item.type === "bedcover") {
    var hargaPerKg = 100000;
    var gratisKg = 1;

    if (item.berat > 3) {
      item.totalbayar = (item.berat - gratisKg) * hargaPerKg;
    } else {
      item.totalbayar = item.berat * hargaPerKg;
    }
  } else if (item.type === "karpet") {
    var hargaPerKg = 150000;
    item.totalbayar = item.berat * hargaPerKg;
  }

  totalpembayaran += item.totalbayar;
  displayorderan();
  displaytotalpembayaran();
}

function devareOrder(index) {
  var devaredOrder = orderan[index];
  totalpembayaran -= devaredOrder.totalbayar;
  orderan.splice(index, 1);
  displayorderan();
  displaytotalpembayaran();
}

function calculatekembalian() {
  var amountPaid = parseFloat(document.getElementById("amountPaid").value);
  if (amountPaid < totalpembayaran) {
    alert("Jumlah bayar kurang!");
    return;
  }

  var kembalian = amountPaid - totalpembayaran;
  displaykembalian(kembalian);
}

function displaykembalian(kembalian) {
  var kembalianElement = document.getElementById("kembalian");
  if (kembalian >= 0) {
    kembalianElement.innerHTML = `<b>Kembalian: ${kembalian}</b>`;
  } else {
    kembalianElement.innerHTML = "<b>Jumlah bayar kurang!</b>";
  }
}
