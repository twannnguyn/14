let datetxt = "14 November";
let datatxtletter = "chúc cục dàng cụa anh sinh nhặc zui zẻ, louis vuitton và chinh đệp, iu anh nhìu hơn. Last of all, please stop ragebaiting my ass LOVE💕";
let titleLetter = "To Sally";
let charArrDate = datetxt.split('');
let charArrDateLetter = datatxtletter.split('');
let charArrTitle = titleLetter.split('');
let currentIndex = 0;
let currentIndexLetter = 0;
let currentIndexTitle = 0;

const dateWrapper = document.querySelector(".date__of__birth");
const dateSpan = dateWrapper ? dateWrapper.querySelector("span") : null;
const letterElements = {
    title: document.querySelector(".title__letter"),
    text: document.querySelector(".text__letter p"),
    heart: document.querySelector("#heart__letter"),
    loveImg: document.querySelector(".love__img"),
    mewmew: document.querySelector("#mewmew")
};
const hasLetterMarkup = Boolean(letterElements.title && letterElements.text);
const mailToggle = document.querySelector('.mail');
const letterModal = document.querySelector('.boxMail');
const letterModalClose = document.querySelector('.boxMail .fa-xmark');
const youtubeSongLink = "https://www.youtube.com/watch?v=ZYBWv4vCZKI&list=RDZYBWv4vCZKI&start_radio=1"; // Replace with your YouTube URL

function addClassIfPresent(node, className) {
    if (node) {
        node.classList.add(className);
    }
}

function removeClassIfPresent(node, className) {
    if (node) {
        node.classList.remove(className);
    }
}

let timeDatetxt;
if (dateWrapper && dateSpan) {
    setTimeout(function () {
        timeDatetxt = setInterval(function () {
            if (currentIndex < charArrDate.length) {
                dateSpan.textContent += charArrDate[currentIndex];
                currentIndex++;
            }
            else {
                let i = document.createElement("i");
                i.className = "fa-solid fa-star";
                dateWrapper.prepend(i);
                dateWrapper.appendChild(i.cloneNode(true));
                clearInterval(timeDatetxt);
            }
        }, 100);
    }, 12000);
	} else {
	    console.warn("Missing .date__of__birth markup; skipping date animation.");
	}

function extractYouTubeId(url) {
    try {
        const parsed = new URL(url);
        if (parsed.hostname.includes("youtu.be")) {
            return parsed.pathname.replace("/", "");
        }
        if (parsed.hostname.includes("youtube.com")) {
            if (parsed.searchParams.get("v")) {
                return parsed.searchParams.get("v");
            }
            const pathParts = parsed.pathname.split("/");
            const embedIndex = pathParts.indexOf("embed");
            if (embedIndex !== -1 && pathParts[embedIndex + 1]) {
                return pathParts[embedIndex + 1];
            }
        }
    } catch (error) {
        return null;
    }
    return null;
}

function initAutoplaySong(youtubeUrl) {
    const trimmedUrl = (youtubeUrl || "").trim();
    if (!trimmedUrl || trimmedUrl === "PASTE_YOUTUBE_LINK_HERE") {
        console.warn("YouTube link placeholder detected. Update youtubeSongLink to enable autoplay.");
        return;
    }
    const videoId = extractYouTubeId(trimmedUrl);
    if (!videoId) {
        console.warn("Unable to parse the provided YouTube link. Please double-check the URL.");
        return;
    }

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&loop=1&playlist=${videoId}`;
    iframe.allow = "autoplay";
    iframe.width = "0";
    iframe.height = "0";
    iframe.style.position = "absolute";
    iframe.style.width = "1px";
    iframe.style.height = "1px";
    iframe.style.opacity = "0";
    iframe.style.pointerEvents = "none";
    document.body.appendChild(iframe);
}

window.addEventListener("load", function () {
    initAutoplaySong(youtubeSongLink);
});

var intervalContent;
var intervalTitle;
$("#btn__letter").on("click", function () {
    if (mailToggle) {
        mailToggle.classList.add('active');
    }
    if (letterModal) {
        letterModal.classList.add('active');
    }

    if (!hasLetterMarkup) {
        console.warn("Letter markup is missing; skipping typing animation.");
        return;
    }

    setTimeout(function () {
        intervalTitle = setInterval(function () {
            if (currentIndexTitle < charArrTitle.length) {
                letterElements.title.textContent += charArrTitle[currentIndexTitle];
                let i = document.createElement("i");
                i.className = "fa-solid fa-heart";
                letterElements.title.appendChild(i);
                currentIndexTitle++;
            }
            else {
                clearInterval(intervalTitle);
            }
        }, 100);
    }, 1000);

    setTimeout(function () {
        addClassIfPresent(letterElements.heart, "animationOp");
        addClassIfPresent(letterElements.loveImg, "animationOp");
        addClassIfPresent(letterElements.mewmew, "animationOp");
    }, 2000);

    setTimeout(function () {
        document.querySelectorAll(".heart").forEach((item) => {
            item.classList.add("animation");
        });
    }, 3500);

    setTimeout(function () {
        intervalContent = setInterval(function () {
            if (currentIndexLetter < charArrDateLetter.length) {
                letterElements.text.textContent += charArrDateLetter[currentIndexLetter];
                currentIndexLetter++;
            }
            else {
                clearInterval(intervalContent);
            }
        }, 50);
    }, 3000);
});

function resetLetterState() {
    clearInterval(intervalContent);
    clearInterval(intervalTitle);
    if (letterElements.title) {
        letterElements.title.textContent = "";
    }
    if (letterElements.text) {
        letterElements.text.textContent = "";
    }
    currentIndexLetter = 0;
    currentIndexTitle = 0;
    removeClassIfPresent(letterElements.heart, "animationOp");
    removeClassIfPresent(letterElements.loveImg, "animationOp");
    removeClassIfPresent(letterElements.mewmew, "animationOp");
    document.querySelectorAll(".heart").forEach((item) => {
        item.classList.remove("animation");
    });
}

if (letterModalClose) {
    letterModalClose.addEventListener('click', function () {
        resetLetterState();
        if (letterModal) {
            letterModal.classList.remove('active');
        }
        if (mailToggle) {
            mailToggle.classList.remove('active');
        }
    });
} else {
    console.warn("Letter close button is missing; cannot hide the modal.");
}
