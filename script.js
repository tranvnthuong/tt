document.getElementById("wrapper").addEventListener("touchstart", function () {
  this.classList.add("hover");
});

let openLetter = true;
document.getElementById("wrapper").addEventListener("mouseleave", () => {
  document.getElementById("letter").removeAttribute("style");
  openLetter = true;
});

let warn = true;
let showBb = false;
let accept = true;
const storedData = JSON.parse(localStorage.getItem("thoiGianDongY❤️"));
document.getElementById("letter").addEventListener("click", () => {
  const backupContent = document.getElementById("l-content").innerText;
  if (warn && !storedData) {
    warn = false;
    document.getElementById("l-content").innerText =
      'Lá thư này có thể có một chút "sức nặng" hoặc không!\nBạn muốn đọc tiếp chứ?';
    document.getElementById("l-btnA").innerText = "Đọc tiếp";
    document
      .getElementById("l-btnA")
      .setAttribute("onclick", `showResponse("continue", "${backupContent}")`);
    document.getElementById("l-btnR").innerText = "Không đọc nữa";
    document
      .getElementById("l-btnR")
      .setAttribute("onclick", "showResponse('stop')");
  } else if (warn && storedData) {
    document.getElementById("l-content").innerText = backupContent.replace(
      "\\n",
      "\n"
    );
    document.getElementById("l-btnA").innerText = "Đã đồng ý❤️";
    document
      .getElementById("l-btnA")
      .setAttribute("onclick", "showResponse('agreed')");
    document.getElementById("l-btnR").style.display = "none";
  }
  if (showBb) {
    if (accept) {
      showBubble(Math.floor(Math.random() * 50) + 1, "❤️");
    } else {
      showBubble(Math.floor(Math.random() * 50) + 1, "💔");
    }
  }
  let letter = document.getElementById("letter");
  if (openLetter) {
    letter.style.transform = "translateY(-250px)";
    setTimeout(function () {
      letter.style.transform = "translateY(-50px)";
      openLetter = false;
      letter.style.height = "auto";
      letter.style.zIndex = "4";
      if (letter.offsetHeight > 340) {
        letter.style.width = "120%";
        letter.style.transform = "translateY(-120px)";
        letter.style.border = "20px solid transparent";
        letter.style.borderImage = "url('./border.png') 30 round";
      }
    }, 1000);
  } else {
    letter.style.height = "auto";
    letter.style.zIndex = "4";
    if (letter.offsetHeight > 340) {
      letter.style.width = "120%";
      letter.style.transform = "translateY(-120px)";
      letter.style.border = "20px solid transparent";
      letter.style.borderImage = "url('./border.png') 30 round";
    }
  }
});

function showResponse(action, content = "") {
  if (action == "continue") {
    document.getElementById("l-content").innerText = content;
    document.getElementById("l-btnA").innerText = "Chấp nhận";
    document
      .getElementById("l-btnA")
      .setAttribute("onclick", "showResponse('accept')");
    document.getElementById("l-btnR").innerText = "Từ chối";
    document
      .getElementById("l-btnR")
      .setAttribute("onclick", "showResponse('refuse')");
  } else if (action == "stop") {
    accept = false;
    showBb = true;
    showBubble(50, "💔");
    document.getElementById("l-header").innerText = "Thư Tỏ Tình🥲";
    document.getElementById("l-content").innerText =
      "Cảm ơn đã mở lá thư\nChúc bạn ngày mới vui vẻ💔";
    document.getElementById("l-btnA").innerText = "OK";
    document
      .getElementById("l-btnA")
      .setAttribute("onclick", "location.reload()");
    document.getElementById("l-btnR").style.display = "none";
  } else if (action == "refuse") {
    showBubble(50, "💔");

    let child = document.getElementById("l-btnR");

    let containerRect = document
      .getElementById("letter")
      .getBoundingClientRect();

    // Tính toán vị trí ngẫu nhiên
    const maxTop = containerRect.height - child.offsetHeight;
    const maxLeft = containerRect.width - child.offsetWidth;

    const randomTop = Math.random() * maxTop;
    const randomLeft = Math.random() * maxLeft;

    // Cập nhật vị trí của phần tử con
    child.style.top = `${randomTop}px`;
    child.style.left = `${randomLeft}px`;
    return;
  } else if (action == "accept" || action == "agreed") {
    accept = true;
    showBb = true;
    showBubble(50, "❤️");
    var hour, weekday, day, month, year;
    const date = new Date();
    const options = { timeZone: "Asia/Ho_Chi_Minh", hour12: false };
    if (storedData) {
      hour = storedData.hour;
      weekday = storedData.weekday;
      day = storedData.day;
      month = storedData.month;
      year = storedData.year;
    } else {
      hour = new Intl.DateTimeFormat("vi-VN", {
        ...options,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format(date);
      weekday = new Intl.DateTimeFormat("vi-VN", {
        ...options,
        weekday: "long",
      }).format(date);
      day = new Intl.DateTimeFormat("vi-VN", {
        ...options,
        day: "numeric",
      }).format(date);
      month = new Intl.DateTimeFormat("vi-VN", {
        ...options,
        month: "long",
      }).format(date);
      year = new Intl.DateTimeFormat("vi-VN", {
        ...options,
        year: "numeric",
      }).format(date);
      let dateTimeData = {
        hour,
        weekday,
        day,
        month,
        year,
      };
      localStorage.setItem("thoiGianDongY❤️", JSON.stringify(dateTimeData));
    }
    const ther = [
      `Giữa giờ ${hour}, lòng sao bối rối,\n${weekday} về, nắng gọi mưa bay.\nNgày ${day}, ${month} mê say,\nNăm ${year} đến, lòng thành câu hát.\nBao nhiêu thời gian trôi qua thầm lặng,\nChỉ hôm nay, mọi thứ bỗng nên thơ.\nKhoảnh khắc đẹp như một giấc mơ,\nNgày này, giờ này, ta hẹn thề mãi mãi.`,
      `Giờ ${hour} đến nhẹ nhàng, khẽ khàng,\n${weekday} gọi lòng ta thênh thang.\nNgày ${day}, ${month} miên man,\nNăm ${year}, lời yêu vừa trọn vẹn.`,
      `Giữa giờ ${hour}, phút giây mong đợi\n${weekday} về như nắng gọi cơn mưa.\nNgày ${day}, ${month} đong đưa,\nNăm ${year} này mãi khắc vào lòng nhớ.`,
    ];
    const title = [
      "Phút Giây Bất Tận",
      "Thời Gian Đẹp Nhất",
      "Một Ngày Để Nhớ",
    ];
    const randomTher = Math.floor(Math.random() * ther.length);
    document.getElementById("l-header").innerText = title[randomTher];
    document.getElementById("l-content").innerText = ther[randomTher];
    document.getElementById("l-btnA").style.display = "none";
    document.getElementById("l-btnR").style.display = "none";
  }

  const userAgent = navigator.userAgent;
  let osInfo = "Unknown OS";
  if (userAgent.includes("Windows NT")) {
    const start = userAgent.indexOf("Windows NT");
    const end = userAgent.indexOf(")", start);
    osInfo = userAgent.substring(start, end);
  } else if (userAgent.includes("Macintosh")) {
    const start = userAgent.indexOf("Macintosh");
    const end = userAgent.indexOf(")", start);
    osInfo = userAgent.substring(start, end);
  } else if (userAgent.includes("Linux")) {
    const start = userAgent.indexOf("Linux");
    const end = userAgent.indexOf(")", start);
    osInfo = userAgent.substring(start, end);
  } else if (userAgent.includes("Android")) {
    const start = userAgent.indexOf("Android");
    const end = userAgent.indexOf(";", start);
    osInfo = userAgent.substring(start, end);
  } else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) {
    const start = userAgent.indexOf("CPU");
    const end = userAgent.indexOf(" like Mac OS X", start);
    osInfo = userAgent.substring(start, end + " like Mac OS X".length);
  }

  fetch("https://foggy-berry-slayer.glitch.me/log", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: action,
      timestamp: new Date().toLocaleString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
        hour12: false,
      }),
      userAgent: osInfo,
    }),
  });
}

function createHeartBurst(x, y) {
  for (let i = 0; i < 10; i++) {
    const heart = document.createElement("div");
    heart.className = "hearts";

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;

    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 50 + 20;
    const offsetX = Math.cos(angle) * distance;
    const offsetY = Math.sin(angle) * distance;

    heart.style.setProperty("--x", `${offsetX}px`);
    heart.style.setProperty("--y", `${offsetY}px`);

    document.body.appendChild(heart);

    heart.addEventListener("animationend", () => {
      heart.remove();
    });
  }
}

document.addEventListener("click", (e) => {
  createHeartBurst(e.pageX, e.pageY);
});

function showBubble(amount, icon) {
  let overlay = document.querySelector(".overlay");
  let numHearts = amount;
  for (let i = 0; i < numHearts; i++) {
    let bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.innerHTML = icon;
    let x = Math.random() * 100;
    let y = Math.random() * 100;
    bubble.style.left = `${x}%`;
    bubble.style.top = `${y}%`;
    overlay.appendChild(bubble);
    setTimeout(() => {
      bubble.remove();
    }, 2000);
  }
}
