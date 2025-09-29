// popup.js
function showPopup(message) {
  const old = document.getElementById("custom-popup-overlay");
  if (old) old.remove();

  const overlay = document.createElement("div");
  overlay.id = "custom-popup-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = 9999;

  const box = document.createElement("div");
  box.style.backgroundColor = "#fff";
  box.style.padding = "20px";
  box.style.borderRadius = "10px";
  box.style.maxWidth = "300px";
  box.style.textAlign = "center";
  box.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";

  const text = document.createElement("p");
  text.textContent = message;

  const btn = document.createElement("button");
  btn.textContent = "ตกลง";
  btn.style.marginTop = "15px";
  btn.style.padding = "8px 15px";
  btn.style.border = "none";
  btn.style.backgroundColor = "#4caf50";
  btn.style.color = "#fff";
  btn.style.cursor = "pointer";
  btn.style.borderRadius = "5px";

  btn.addEventListener("click", () => {
    overlay.remove();
  });

  box.appendChild(text);
  box.appendChild(btn);
  overlay.appendChild(box);
  document.body.appendChild(overlay);

  return btn; // ส่งปุ่มกลับเพื่อใช้งาน callback
}
