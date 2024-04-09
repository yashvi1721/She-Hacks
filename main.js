const SHRINK_BTN = document.querySelector(".shrink-btn");
const SEARCH = document.querySelector(".search");
const SIDEBAR_LINKS = document.querySelectorAll(".sidebar-links a");
const ACTTIVE_TAB = document.querySelector(".active-tab");
const TOOLTIP_ELEMENTS = document.querySelectorAll(".tooltip-element");
const SECTIONS = document.querySelectorAll("div.section");
const OPEN = document.getElementById("last-open");

let activeIndex;
let minWidth = window.matchMedia("(min-width: 915px)").matches;
let widthOpen = window.matchMedia("(max-width: 715px)").matches;

let colors = [
	"var(--main-blue-color-lighter)",
	"var(--main-red-color)",
	"var(--main-green-color)",
	"var(--main-blue-color-dark)",
];

window.addEventListener("load", function () {
	const loadingScreen = document.getElementById("loading-screen");
	loadingScreen.classList.add("hide");
});

if (widthOpen && OPEN) {
	OPEN.open = true;
}

//Moving the active tab to the active link
function moveTab() {
	if (!minWidth) {
		ACTTIVE_TAB.style.top = `2.5px`;
		ACTTIVE_TAB.style.left = `${activeIndex * 48}px`;
		loadShrink();
	} else {
		ACTTIVE_TAB.style.left = `2.5px`;
		ACTTIVE_TAB.style.top = `${activeIndex * 58 + 2.5}px`;
		loadShrink();
	}
}

//Loading the shrinked state
function loadShrink() {
	let shrinked = localStorage.getItem("shrinked");
	if (minWidth) {
		if (shrinked == "true") {
			localStorage.setItem("shrinked", "true");
			document.body.classList.add("shrink");
		} else {
			localStorage.setItem("shrinked", "false");
			document.body.classList.remove("shrink");
		}
	} else {
		document.body.classList.remove("shrink");
	}
}

//Shrink and unshrink the sidebar
SHRINK_BTN.addEventListener("click", () => {
	document.body.classList.toggle("shrink");
	if (document.body.classList.contains("shrink")) {
		localStorage.setItem("shrinked", "true");
	} else {
		localStorage.setItem("shrinked", "false");
	}

	SHRINK_BTN.classList.add("hovered");

	setTimeout(() => {
		SHRINK_BTN.classList.remove("hovered");
	}, 500);
});

//Change the state of the link as you srcoll or click on it

function changeLink() {
	SIDEBAR_LINKS.forEach((sideLink) => sideLink.classList.remove("active"));
	this.classList.add("active");

	activeIndex = this.dataset.active;
}

SIDEBAR_LINKS.forEach((link) => link.addEventListener("click", changeLink));

function changeLinkState() {
	let index = SECTIONS.length;

	while (--index && window.scrollY + 50 < SECTIONS[index].offsetTop) {}

	SIDEBAR_LINKS.forEach((link) => link.classList.remove("active"));
	SIDEBAR_LINKS[index].classList.add("active");

	activeIndex = index;
	moveTab();
}

window.addEventListener("scroll", changeLinkState);

//Hide and show the tool tip bar
function showTooltip() {
	let tooltip = this.parentNode.lastElementChild;
	let spans = tooltip.children;
	let tooltipIndex = this.dataset.tooltip;

	Array.from(spans).forEach((sp) => sp.classList.remove("show"));
	spans[tooltipIndex].classList.add("show");

	tooltip.style.top = `${
		(100 / (spans.length * 2)) * (tooltipIndex * 2 + 1)
	}%`;
}

TOOLTIP_ELEMENTS.forEach((elem) => {
	elem.addEventListener("mouseover", showTooltip);
});





//Adding a zoom effect to the .zoomable class
let imgs = document.getElementsByClassName("zoomable");
for (let i = 0; i < imgs.length; i++) {
	imgs[i].addEventListener("click", function () {
		let imgClone = this.cloneNode();
		imgClone.id = "img-clone";
		imgClone.classList.remove("infog", "marker");

		let altText = document.createElement("a");
		altText.id = "alt-text";
		altText.href = this.src;
		altText.download = `${this.alt}.png`;
		altText.innerHTML = `descargar`;

	// Attach the element to the DOM
	document.body.appendChild(altText);

	// Your JavaScript code from earlier
	document.querySelectorAll('.button').forEach(button => {
		let duration = 3000;
	
		let svg = button.querySelector('svg');
		let svgPath = new Proxy(
			{
				y: null,
				smoothing: null,
			},
			{
				set(target, key, value) {
					target[key] = value;
					if (target.y !== null && target.smoothing !== null) {
						svg.innerHTML = getPath(target.y, target.smoothing, null);
					}
					return true;
				},
				get(target, key) {
					return target[key];
				},
			}
		);
	
		button.style.setProperty('--duration', duration);
	
		svgPath.y = 20;
		svgPath.smoothing = 0;
	
		button.addEventListener('click', e => {
			e.preventDefault();
	
			if (!button.classList.contains('loading')) {
				button.classList.add('loading');
	
				gsap.to(svgPath, {
					smoothing: 0.3,
					duration: duration * 0.065 / 1000,
				});
	
				gsap.to(svgPath, {
					y: 12,
					duration: duration * 0.265 / 1000,
					delay: duration * 0.065 / 1000,
					ease: Elastic.easeOut.config(1.12, 0.4),
				});
	
				setTimeout(() => {
					svg.innerHTML = getPath(0, 0, [
						[3, 14],
						[8, 19],
						[21, 6],
					]);
	
					// Get the clicked image's alt attribute
					const clickedImageAlt = button.querySelector('img').getAttribute('alt');
	
					// Generate a filename based on the clicked image's alt
					const filename = `${clickedImageAlt}.png`;
	
					// Create a Data URL for the clicked image
					const imgDataUrl = button.querySelector('img').src;
	
					// Create a temporary anchor element for download
					const tempLink = document.createElement('a');
					tempLink.href = imgDataUrl;
					tempLink.download = filename;
					tempLink.style.display = 'none';
	
					// Add the anchor to the body and simulate a click
					document.body.appendChild(tempLink);
					tempLink.click();
	
					// Clean up by removing the anchor
					document.body.removeChild(tempLink);
	
					// Reset button state or perform any other desired actions
					button.classList.remove('loading');
					// ... additional actions ...
				}, duration / 2);
			}
		});
	});
	

	
		altText.style.position = "relative";
		altText.style.bottom = "1rem";
		altText.style.left = "0";
		altText.style.width = "30%";
		altText.style.margin = "1rem 0";
		altText.style.color = "white";
		altText.style.textAlign = "center";
		altText.style.textDecoration = "underline";

		// Create a new div element to hold the image
		let imgContainer = document.createElement("div");
		imgContainer.id = "img-container";
		imgContainer.style.position = "fixed";
		imgContainer.style.top = "0";
		imgContainer.style.left = "0";
		imgContainer.style.width = "100%";
		imgContainer.style.height = "100%";
		imgContainer.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
		imgContainer.style.backdropFilter = "blur(3px)";
		imgContainer.style.display = "flex";
		imgContainer.style.alignItems = "center";
		imgContainer.style.justifyContent = "center";
		imgContainer.style.flexDirection = "column";
		imgContainer.style.gap = "1rem";
		imgContainer.style.zIndex = "9999";

		// Add the image element to the container
		imgContainer.appendChild(imgClone);
		imgContainer.appendChild(altText);
		imgClone.style.maxWidth = "85%";
		imgClone.style.maxHeight = "85%";

		// Add the container to the body
		document.body.appendChild(imgContainer);

		// Add a click event listener to the container to close the image when clicking outside of it
		imgContainer.addEventListener("click", function (e) {
			if (e.target == imgContainer) {
				imgContainer.remove();
			}
		});
	});
}

//Add a p element that has the text of the alt attribute inside all the images with the .resource class inside the .qrs div
let qrsResource = document.querySelectorAll("img.qr");
qrsResource.forEach((img) => {
	let p = document.createElement("p");
	p.style.color = `${colors[Math.floor(Math.random() * colors.length)]}`;
	p.style.fontWeight = "bold";
	p.innerHTML = img.alt;
	img.parentNode.appendChild(p);
});

let qrsList = document.querySelectorAll("img.marker");
qrsList.forEach((img) => {
	let p = document.createElement("p");
	p.innerHTML = img.alt;
	img.parentNode.appendChild(p);
});

//loading the shrinked state
window.addEventListener("resize", () => {
	minWidth = window.matchMedia("(min-width: 915px)").matches;
	loadShrink();
});



//boton de descarga
document.querySelectorAll('.button').forEach(button => {

let duration = 3000,
	svg = button.querySelector('svg'),
	svgPath = new Proxy({
		y: null,
		smoothing: null
	}, {
		set(target, key, value) {
			target[key] = value;
			if(target.y !== null && target.smoothing !== null) {
				svg.innerHTML = getPath(target.y, target.smoothing, null);
			}
			return true;
		},
		get(target, key) {
			return target[key];
		}
	});

button.style.setProperty('--duration', duration);

svgPath.y = 20;
svgPath.smoothing = 0;

button.addEventListener('click', e => {
	
	e.preventDefault();

	if(!button.classList.contains('loading')) {

		button.classList.add('loading');

		gsap.to(svgPath, {
			smoothing: .3,
			duration: duration * .065 / 1000
		});

		gsap.to(svgPath, {
			y: 12,
			duration: duration * .265 / 1000,
			delay: duration * .065 / 1000,
			ease: Elastic.easeOut.config(1.12, .4)
		});

		setTimeout(() => {
			svg.innerHTML = getPath(0, 0, [
				[3, 14],
				[8, 19],
				[21, 6]
			]);
		}, duration / 2);

	}

});

});

function getPoint(point, i, a, smoothing) {
let cp = (current, previous, next, reverse) => {
		let p = previous || current,
			n = next || current,
			o = {
				length: Math.sqrt(Math.pow(n[0] - p[0], 2) + Math.pow(n[1] - p[1], 2)),
				angle: Math.atan2(n[1] - p[1], n[0] - p[0])
			},
			angle = o.angle + (reverse ? Math.PI : 0),
			length = o.length * smoothing;
		return [current[0] + Math.cos(angle) * length, current[1] + Math.sin(angle) * length];
	},
	cps = cp(a[i - 1], a[i - 2], point, false),
	cpe = cp(point, a[i - 1], a[i + 1], true);
return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
}

function getPath(update, smoothing, pointsNew) {
let points = pointsNew ? pointsNew : [
		[4, 12],
		[12, update],
		[20, 12]
	],
	d = points.reduce((acc, point, i, a) => i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${getPoint(point, i, a, smoothing)}`, '');
return `<path d="${d}" />`;
}



//js de el chatburbuja
$(function() {
	var INDEX = 0; 
	$("#chat-submit").click(function(e) {
	  e.preventDefault();
	  var msg = $("#chat-input").val(); 
	  if(msg.trim() == ''){
		return false;
	  }
	  generate_message(msg, 'self');
	  var buttons = [
		  {
			name: 'Existing User',
			value: 'existing'
		  },
		  {
			name: 'New User',
			value: 'new'
		  }
		];
	  setTimeout(function() {      
		generate_message(msg, 'user');  
	  }, 1000)
	  
	})
	
	function generate_message(msg, type) {
	  INDEX++;
	  var str="";
	  str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg "+type+"\">";
	  str += "          <span class=\"msg-avatar\">";
	  str += "            <img src=\"https:\/\/image.crisp.im\/avatar\/operator\/196af8cc-f6ad-4ef7-afd1-c45d5231387c\/240\/?1483361727745\">";
	  str += "          <\/span>";
	  str += "          <div class=\"cm-msg-text\">";
	  str += msg;
	  str += "          <\/div>";
	  str += "        <\/div>";
	  $(".chat-logs").append(str);
	  $("#cm-msg-"+INDEX).hide().fadeIn(300);
	  if(type == 'self'){
	   $("#chat-input").val(''); 
	  }    
	  $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);    
	}  
	
   
	
	$(document).delegate(".chat-btn", "click", function() {
	  var value = $(this).attr("chat-value");
	  var name = $(this).html();
	  $("#chat-input").attr("disabled", false);
	  generate_message(name, 'self');
	})
	
	$("#chat-circle").click(function() {    
	  $("#chat-circle").toggle('scale');
	  $(".chat-box").toggle('scale');
	})
	
	$(".chat-box-toggle").click(function() {
	  $("#chat-circle").toggle('scale');
	  $(".chat-box").toggle('scale');
	})
	
  })

  

    // Función para cambiar el icono al hacer clic
	$(document).ready(function() {
		$("#chat-circle").click(function() {
		  $("#chat-icon").html('<i style="font-size: 40px; margin-left: -14px; margin-top: -11px;" class="bx bx-message-square-dots bx-flip-horizontal"></i>');
		  $(".fixed-div").hide();  // Oculta el div con la clase .fixed-div
		});
	  });

var accessibilityIcon = document.querySelector('.accessibility-icon-container-mobile');
var optionsPanel = document.querySelector('.options-panel');

accessibilityIcon.addEventListener('click', function(event) {
    if (optionsPanel.style.display === 'none') {
        optionsPanel.style.display = 'block';
    } else {
        optionsPanel.style.display = 'none';
    }
    event.stopPropagation();
});

document.addEventListener('click', function(event) {
    if (event.target !== optionsPanel && event.target !== accessibilityIcon) {
        optionsPanel.style.display = 'none';
    }
});



			