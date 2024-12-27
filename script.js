let firstTouch = false;

function isHaveHover() {
  return window.matchMedia("(hover: hover)").matches;
}

if (isHaveHover()) {
  document
    .getElementById("wrapper")
    .addEventListener("mouseenter", function () {
      this.onclick = function () {
        document.getElementById("letter").click();
      };
    });
} else {
  document
    .getElementById("wrapper")
    .addEventListener("touchstart", function () {
      if (firstTouch) {
        this.onclick = function () {
          document.getElementById("letter").click();
        };
      } else {
        this.classList.add("hover");
        firstTouch = true;
      }
    });
}

let openLetter = false;

document.getElementById("wrapper").addEventListener("mouseleave", function () {
  document.getElementById("letter").removeAttribute("style");
  this.addEventListener("mouseenter", function () {
    this.onclick = function () {
      document.getElementById("letter").click();
    };
  });
  openLetter = false;
  firstTouch = false;
});

let warn = true;
let showBb = false;
let agree = true;

const firstTitle = "Lá thư✉️";
const firstContent =
  'Lá thư này có thể có một chút "sức nặng" hoặc không!\nBạn muốn đọc tiếp chứ?';
const originalTitle = "Lá thư❤️";
const originalContent =
  "Tôi đã thích bạn từ rất lâu, trái tim tôi đã lỡ trao cho bạn mất rồi.\nBạn có thể nhận không ♡";
const storedData = JSON.parse(localStorage.getItem("thoiGianDongY❤️"));

document.getElementById("letter").addEventListener("click", () => {
  document.getElementById("wrapper").onclick = null;
  if (warn && !storedData) {
    document.getElementById("l-content").innerText = firstContent;
    document.getElementById("l-btnA").innerText = "Đọc tiếp";
    document.getElementById("l-btnA").onclick = function () {
      showResponse("continue");
    };
    document.getElementById("l-btnR").innerText = "Không đọc nữa";
    document.getElementById("l-btnR").onclick = function () {
      showResponse("stop");
    };
  } else if (warn && storedData) {
    showBb = true;
    agree = true;
    document.getElementById("l-header").innerText = originalTitle;
    document.getElementById("l-content").innerText = originalContent;
    document.getElementById("l-btnA").innerText = "Đã đồng ý❤️";
    document.getElementById("l-btnA").onclick = function (event) {
      event.stopPropagation();
      showResponse("agreed");
    };
    document.getElementById("l-btnR").style.display = "none";
  }
  if (showBb) {
    if (agree) {
      showBubble(Math.floor(Math.random() * 30) + 1, "❤️");
    } else {
      showBubble(Math.floor(Math.random() * 5) + 1, "💔");
    }
  }
  let letter = document.getElementById("letter");
  if (!openLetter) {
    letter.style.transform = "translateY(-250px)";
    setTimeout(function () {
      letter.style.transform = "translateY(-50px)";
      letter.style.height = "auto";
      letter.style.zIndex = "4";
      if (letter.offsetHeight > 340) {
        letter.style.width = "120%";
        letter.style.transform = "translateY(-120px)";
        letter.style.border = "20px solid transparent";
        letter.style.borderImage = "url('./border.png') 30 round";
      }
    }, 1000);
  }
  warn = false;
  openLetter = true;
});

function moveButton() {
  let button = document.getElementById("l-btnR");
  if (!button.className.includes("do-not-cover")) {
    button.className = "do-not-cover";
  }
  let containerRect = document.getElementById("letter").getBoundingClientRect();

  const maxTop = containerRect.height - button.offsetHeight;
  const maxLeft = containerRect.width - button.offsetWidth;

  const randomTop = Math.random() * maxTop;
  const randomLeft = Math.random() * maxLeft;

  button.style.top = `${randomTop}px`;
  button.style.left = `${randomLeft}px`;
}

function showResponse(action) {
  if (action == "continue") {
    let btnA = document.getElementById("l-btnA");
    let btnR = document.getElementById("l-btnR");
    showBubble(Math.floor(Math.random() * 10) + 1, "❤️");
    document.getElementById("l-header").innerText = originalTitle;
    document.getElementById("l-content").innerText = originalContent;
    btnA.innerText = "Đồng ý";
    btnA.onclick = function () {
      showResponse("agree");
    };
    btnR.innerText = "Từ chối";
    btnR.onclick = function () {
      let ratio = Math.random() * 100 < 15;
      if (ratio) {
        showResponse("refuse");
      } else {
        moveButton();
      }
    };
    btnR.addEventListener("mouseenter", function () {
      moveButton();
    });
  } else if (action == "stop") {
    agree = false;
    showBb = true;
    showBubble(Math.floor(Math.random() * 5) + 1, "💔");
    document.getElementById("l-header").innerText = "Lá thư💔";
    document.getElementById("l-content").innerText =
      "Cảm ơn đã mở lá thư\nChúc bạn ngày mới vui vẻ";
    document.getElementById("l-btnA").innerText = "OK";
    document.getElementById("l-btnA").onclick = function () {
      location.reload();
    };
    document.getElementById("l-btnR").style.display = "none";
  } else if (action == "refuse") {
    agree = false;
    showBb = true;
    showBubble(Math.floor(Math.random() * 5) + 1, "💔");
    document.getElementById("l-header").innerText = "Lá thư💔";
    document.getElementById("l-content").innerText =
      "Cảm ơn đã đọc thư\nChúc bạn có nhiều niềm vui";
    document.getElementById("l-btnA").innerText = "OK";
    document.getElementById("l-btnA").onclick = function () {
      location.reload();
    };
    document.getElementById("l-btnR").style.display = "none";
  } else if (action == "agree" || action == "agreed") {
    agree = true;
    showBb = true;
    showBubble(50, "❤️");
    let hour, weekday, day, month, year;
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
      `Giữa ${hour}, lòng sao bối rối,\n${weekday} về, nắng gọi mưa bay.\nNgày ${day}, ${month} mê say,\nNăm ${year} đến, lòng thành câu hát.\nBao nhiêu thời gian trôi qua thầm lặng,\nChỉ hôm nay, mọi thứ bỗng nên thơ.\nKhoảnh khắc đẹp như một giấc mơ,\nNgày này, giờ này, ta hẹn thề mãi mãi.`,
      `Giờ ${hour} đến nhẹ nhàng, khẽ khàng,\n${weekday} gọi lòng ta thênh thang.\nNgày ${day}, ${month} miên man,\nNăm ${year}, lời thương vừa trọn vẹn.`,
      `Giữa ${hour}, phút giây mong đợi\n${weekday} về như nắng gọi cơn mưa.\nNgày ${day}, ${month} đong đưa,\nNăm ${year} này mãi khắc vào lòng nhớ.`,
    ];
    const title = [
      "♡ Phút Giây Bất Tận ♡",
      "♡ Thời Gian Đẹp Nhất ♡",
      "♡ Một Ngày Để Nhớ ♡",
    ];
    const randomTher = Math.floor(Math.random() * ther.length);
    document.getElementById("l-header").innerText = title[randomTher];
    document.getElementById("l-content").innerText = ther[randomTher];
    document.getElementById("l-btnA").style.display = "none";
    document.getElementById("l-btnR").style.display = "none";
    let letter = document.getElementById("letter");
    if (letter.offsetHeight > 340) {
      letter.style.width = "120%";
      letter.style.transform = "translateY(-120px)";
      letter.style.border = "20px solid transparent";
      letter.style.borderImage = "url('./border.png') 30 round";
    }
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

  if (action !== "agreed") {
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

let isDragging = false;
let offsetX = 0,
  offsetY = 0;
let currentElement = null;

async function showBubble(amount, icon) {
  let overlay = document.querySelector(".overlay");
  let numHearts = amount;
  for (let Index = 0; Index < numHearts; Index++) {
    let bubble = document.createElement("div");
    bubble.classList.add("bubbleIcon");
    bubble.innerHTML = icon;
    let x = Math.random() * 100;
    let y = Math.random() * 10;
    bubble.style.left = `${x}%`;
    bubble.style.bottom = `${y}%`;
    overlay.appendChild(bubble);

    if (isHaveHover()) {
      bubble.addEventListener("mousedown", (e) => {
        if (agree) {
          bubble.setAttribute(
            "data-category",
            '["🌷","💖","💌","🌹","🥰","💍","🌸","💋"]'
          );
        }
        isDragging = true;
        currentElement = bubble;
        offsetX = e.clientX - bubble.offsetLeft;
        offsetY = e.clientY - bubble.offsetTop;
      });
    } else {
      bubble.addEventListener("touchstart", (e) => {
        if (agree) {
          bubble.setAttribute(
            "data-category",
            '["🌷","💖","💌","🌹","🥰","💍","🌸","💋"]'
          );
        }
        isDragging = true;
        currentElement = bubble;
        const touch = e.touches[0];
        offsetX = touch.clientX - bubble.offsetLeft;
        offsetY = touch.clientY - bubble.offsetTop;
      });
      bubble.addEventListener("touchmove", (e) => {
        if (isDragging && currentElement) {
          const touch = e.touches[0];
          const x = touch.clientX - offsetX;
          const y = touch.clientY - offsetY;

          currentElement.style.left = `${x}px`;
          currentElement.style.top = `${y}px`;

          e.preventDefault();
        }
      });

      bubble.addEventListener("touchend", () => {
        isDragging = false;
        currentElement = null;
      });
    }
    setTimeout(() => {
      bubble.classList.add("explode");

      let randomCategory = "🌹";
      let bubbleIsGrabbed = bubble.hasAttribute("data-category");
      if (bubbleIsGrabbed) {
        let categories = JSON.parse(bubble.getAttribute("data-category"));
        randomCategory =
          categories[Math.floor(Math.random() * categories.length)];
      }
      for (let i = 0; i < 10; i++) {
        let miniIcon = document.createElement("div");
        miniIcon.classList.add("mini-icon");
        miniIcon.innerHTML = bubbleIsGrabbed ? randomCategory : icon;
        bubble.appendChild(miniIcon);
      }

      bubble.style.visibility = "hidden";
      setTimeout(() => {
        bubble.remove();
      }, 600);
    }, 5000);

    if (Index == numHearts - 1) {
      document
        .querySelectorAll(".bubbleIcon")
        .forEach((el) => el.classList.add("animate"));
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

document.querySelector(".overlay").addEventListener("mousemove", (e) => {
  if (isDragging && currentElement) {
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    currentElement.style.left = `${x}px`;
    currentElement.style.top = `${y}px`;
  }
});

document.querySelector(".overlay").addEventListener("mouseup", () => {
  isDragging = false;
  currentElement = null;
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".from").innerHTML = "—FROM—<br />TRAN VAN THUONG";
  if (!storedData) {
    document.getElementById("l-header").innerText = firstTitle;
    document.getElementById("l-content").innerText = firstContent;
  } else {
    document.getElementById("l-header").innerText = originalTitle;
    document.getElementById("l-content").innerText = originalContent;
  }
  document.getElementById("l-btnA").innerText = "Đồng ý";
  document.getElementById("l-btnR").innerText = "Từ chối";
});
