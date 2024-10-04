;(function () {
	
	'use strict';



	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	// Main Menu Superfish
	var mainMenu = function() {

		$('#fh5co-primary-menu').superfish({
			delay: 0,
			animation: {
				opacity: 'show'
			},
			speed: 'fast',
			cssArrows: true,
			disableHI: true
		});

	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};


	// Offcanvas and cloning of the main menu
	var offcanvas = function() {

		var $clone = $('#fh5co-menu-wrap').clone();
		$clone.attr({
			'id' : 'offcanvas-menu'
		});
		$clone.find('> ul').attr({
			'class' : '',
			'id' : ''
		});

		$('#fh5co-page').prepend($clone);

		// click the burger
		$('.js-fh5co-nav-toggle').on('click', function(){

			if ( $('body').hasClass('fh5co-offcanvas') ) {
				$('body').removeClass('fh5co-offcanvas');
			} else {
				$('body').addClass('fh5co-offcanvas');
			}
			// $('body').toggleClass('fh5co-offcanvas');

		});

		$('#offcanvas-menu').css('height', $(window).height());

		$(window).resize(function(){
			var w = $(window);


			$('#offcanvas-menu').css('height', w.height());

			if ( w.width() > 769 ) {
				if ( $('body').hasClass('fh5co-offcanvas') ) {
					$('body').removeClass('fh5co-offcanvas');
				}
			}

		});	

	}

	

	// Click outside of the Mobile Menu
	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
	    var container = $("#offcanvas-menu, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('fh5co-offcanvas') ) {
				$('body').removeClass('fh5co-offcanvas');
			}
	    }
		});
	};


	// Animations

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							el.addClass('fadeInUp animated');
							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};
	

	// Document on load.
	$(function(){
		mainMenu();
		parallax();
		offcanvas();
		mobileMenuOutsideClick();
		contentWayPoint();
		

	});


}());
function giveHint(){
	document.getElementById('hint').textContent = 'Use the mnemonic My Very Excellent Mom Just Served Us Noodles.';
}

function submitPlanets() {
	 // Array containing the correct planets of the solar system
	 const solarSystemPlanets = [
		"Mercury", 
		"Venus", 
		"Earth", 
		"Mars", 
		"Jupiter", 
		"Saturn", 
		"Uranus", 
		"Neptune"
	];
	
	let correctCount = 0;
	let resultText = '';
	
	for (let i = 1; i <= 8; i++) {
		let userPlanet = document.getElementById('planet' + i).value.trim();
		let correctPlanet = solarSystemPlanets[i - 1];

		// Compare user input (case-insensitive) with the correct planet
		if (userPlanet.toLowerCase() === correctPlanet.toLowerCase()) {
			
			correctCount++;
		} 
	}

	// Display the result
	if(correctCount === 8){
		document.getElementById('planetResult').textContent = 'Well Done! You got all 8 correct!';
	}
	else {
		document.getElementById('planetResult').textContent = 'Hmmm...Something is not right. Try again';
	}
	
}

function checkAnswers() {
	// Correct answers array
	const correctAnswers = {
	  q1: "C",
	  q2: "B",
	  q3: "C",
	  q4: "B",
	  q5: "A",
	  q6: "D",
	  q7: "B",
	  q8: "A",
	  q9: "A",
	  q10: "B"
	};

	let score = 0;
	const form = document.getElementById('quizForm');
	const form2 = document.getElementById('quizForm2');

	// Loop through each question and check if the selected answer is correct
	for (let i = 1; i <= 5; i++) {
	  const selectedAnswer = form[`q${i}`].value;
	  if (selectedAnswer === correctAnswers[`q${i}`]) {
		score++;
	  }
	}
	for (let i = 6; i <= 10; i++) {
		const selectedAnswer = form2[`q${i}`].value;
		if (selectedAnswer === correctAnswers[`q${i}`]) {
		  score++;
		}
	  }

	// Display the result
	const resultDiv = document.getElementById('result');
	if (score >= 8){
		resultDiv.textContent = `Great job! You scored ${score} out of 10!`;
	}
	else if(score <8 && score > 5){
		resultDiv.textContent = `Not bad! You scored ${score} out of 10!`;
	}
	else {
		resultDiv.textContent = `Try again! You scored ${score} out of 10!`;
	}
	
  }

  // Setup the canvas
  const canvas = document.getElementById('solarSystemCanvas');
  const ctx = canvas.getContext('2d');
  let drawing = false;
  var mouseClicked = false;

  // Get the color and size inputs
  const colorPicker = document.getElementById('colorPicker');
  const sizeSlider = document.getElementById('sizeSlider');

  // Start drawing on the canvas
  canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  draw(e);
  });

  canvas.addEventListener('mousemove', (e) => {
  if (drawing) {
	  draw(e);
  }
  });

  canvas.addEventListener('mouseup', () => {
  drawing = false;
  });

  canvas.addEventListener('mouseleave', () => {
  drawing = false;
  });

  // Function to draw circles (planets) on the canvas
  function draw(event) {
  const rect = canvas.getBoundingClientRect();
  const x = Math.round((event.clientX - rect.left)/(rect.right-rect.left)*canvas.width);
  const y = Math.round((event.clientY - rect.top)/(rect.bottom-rect.top)*canvas.height);

  // Get the current color and size
  const color = colorPicker.value;
  const size = sizeSlider.value;

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, size / 2, 0, Math.PI * 2); // Draw a circle
  ctx.fill();
  }

  // Clear the canvas when the button is clicked
  document.getElementById('clearCanvas').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  // Save the canvas as an image (PNG)
  document.getElementById('saveImage').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'solar_system_drawing.png';
  link.href = canvas.toDataURL();
  link.click();
  });

  // Print the canvas
  document.getElementById('printImage').addEventListener('click', () => {
  const printWindow = window.open('', '_blank');
  const imageData = canvas.toDataURL();
  printWindow.document.write('<img src="' + imageData + '" onload="window.print(); window.close();" />');
  });

  //KWHLAQ script
  function generatePDF() {
	const { jsPDF } = window.jspdf;
	const doc = new jsPDF();

	doc.setFontSize(14);
	doc.text("KWHLAQ Chart", 10, 10);

	const know = document.getElementById('know').value;
	const want = document.getElementById('want').value;
	const how = document.getElementById('how').value;
	const learned = document.getElementById('learned').value;
	const action = document.getElementById('action').value;
	const question = document.getElementById('question').value;

	
	doc.text("K (What I Know):", 10, 20);
	doc.text(know, 10, 30);
	doc.text("W (What I Want to Know):", 10, 50);
	doc.text(want, 10, 60);
	doc.text("H (How I Will Learn):", 10, 80);
	doc.text(how, 10, 90);
	doc.text("L (What I Learned):", 10, 110);
	doc.text(learned, 10, 120);
	doc.text("A (Action I Will Take):", 10, 140);
	doc.text(action, 10, 150);
	doc.text("Q (Questions I Still Have):", 10, 170);
	doc.text(question, 10, 180);

	doc.save('[INSERT_NAME][INSERT_CLASS]_kwhlaq_chart.pdf');
}
