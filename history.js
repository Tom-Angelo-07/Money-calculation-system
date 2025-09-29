const historyDiv = document.getElementById("historyTable");
const clearBtn = document.getElementById("clearHistory");

// โหลดประวัติ
function loadHistory() {
  let history = JSON.parse(localStorage.getItem("moneyHistory")) || [];

  if (history.length === 0) {
    historyDiv.innerHTML = "<p>ยังไม่มีประวัติ</p>";
    showPopup("โหลดประวัติเรียบร้อย เวลา: " + new Date().toLocaleTimeString());
    return;
  }

  // จัดกลุ่มตามวัน
  let grouped = {};
  history.forEach(item => {
    if (!grouped[item.date]) grouped[item.date] = [];
    grouped[item.date].push(item);
  });

  let html = "";
  for (let date in grouped) {
    html += `<h3>วันที่ ${date}</h3>`;
    html += `<table border="1" cellpadding="5"><tr><th>เวลา</th><th>ยอดรวม</th></tr>`;
    let dayTotal = 0;
    grouped[date].forEach(item => {
      html += `<tr><td>${item.time}</td><td>${item.total.toFixed(2)} บาท</td></tr>`;
      dayTotal += item.total;
    });
    html += `<tr><td><b>รวมวันนี้</b></td><td><b>${dayTotal.toFixed(2)} บาท</b></td></tr>`;
    html += "</table><br>";
  }

  historyDiv.innerHTML = html;

  // แสดง popup หลังโหลดเสร็จ
  showPopup("โหลดประวัติเรียบร้อย เวลา: " + new Date().toLocaleTimeString());
}

// ลบประวัติ
clearBtn.addEventListener("click", () => {
  const btnConfirm = showPopup("คุณต้องการลบประวัติทั้งหมดหรือไม่?");
  
  // ใช้ปุ่มตกลงเพื่อยืนยันการลบ
  btnConfirm.addEventListener("click", () => {
    localStorage.removeItem("moneyHistory");
    loadHistory();
    showPopup("ลบประวัติเรียบร้อย");
  });
});

// เรียกโหลดประวัติ
loadHistory();
