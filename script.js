document.addEventListener("DOMContentLoaded", () => {
  const moneyMap = {
    b1000: 1000, b500: 500, b100: 100, b50: 50, b20: 20,
    c10: 10, c5: 5, c2: 2, c1: 1, c050: 0.5, c025: 0.25
  };

  const resultDiv = document.getElementById("result");
  const btnEach = document.getElementById("calcEach");
  const btnAll = document.getElementById("calcAll");
  const goHistory = document.getElementById("goHistory");

  function getFormData() {
    const data = {};
    for (const key in moneyMap) {
      data[key] = parseInt(document.getElementById(key).value) || 0;
    }
    return data;
  }

  // คำนวณแยก
  btnEach.addEventListener("click", () => {
    const data = getFormData();
    let html = "<h3>ผลลัพธ์แยก:</h3><ul>";
    let total = 0;
    for (const key in data) {
      const amount = data[key] * moneyMap[key];
      if (amount > 0) html += `<li>${key}: ${amount.toFixed(2)} บาท</li>`;
      total += amount;
    }
    html += `</ul><p><b>รวมทั้งหมด (ชั่วคราว):</b> ${total.toFixed(2)} บาท</p>`;
    resultDiv.innerHTML = html;

    showPopup(`คำนวณแยกเสร็จสิ้น!\nรวมทั้งหมด: ${total.toFixed(2)} บาท`);
  });

  // คำนวณรวม
  btnAll.addEventListener("click", () => {
    const data = getFormData();
    let total = 0;
    for (const key in data) total += data[key] * moneyMap[key];

    resultDiv.innerHTML = `<h3>รวมทั้งหมด:</h3><p>${total.toFixed(2)} บาท</p>`;

    // เก็บประวัติลง LocalStorage
    const history = JSON.parse(localStorage.getItem("moneyHistory")) || [];
    history.push({
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      data,
      total
    });
    localStorage.setItem("moneyHistory", JSON.stringify(history));

    showPopup(`คำนวณรวมเสร็จสิ้น!\nรวมทั้งหมด: ${total.toFixed(2)} บาท`);
  });

  // ตรวจสอบ history ก่อนไปหน้า history.html
  goHistory.addEventListener("click", (e) => {
    e.preventDefault();

    const history = JSON.parse(localStorage.getItem("moneyHistory")) || [];
    const timeNow = new Date().toLocaleTimeString();
    let message = "โหลดประวัติเรียบร้อย เวลา: " + timeNow;
    if (history.length === 0) message += "\nยังไม่มีประวัติการคำนวณ";

    const btn = showPopup(message);

    // กดตกลงแล้วไป history.html
    btn.addEventListener("click", () => {
      window.location.href = "history.html";
    });
  });
});
