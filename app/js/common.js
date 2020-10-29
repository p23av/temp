// $(function() {
//     $("a[href^='#']").click(function(){
//         $('.btn-h').removeClass('active');
//         $('body').removeClass('fixed');
//         $('.header-nav').removeClass('active');
//         var _href = $(this).attr("href");
//         $("html, body").animate({scrollTop: $(_href).offset().top-140+"px"});
//         return false;
//     });
//     // mask input
//     var phoneMask = new IMask(
//         document.getElementById('phone-mask'), {
//             mask: '+{7} (000) 000-00-00'
//         });
//     var phoneMaskNew = new IMask(
//         document.getElementById('phone-mask-new'), {
//             mask: '+{7} (000) 000-00-00'
//         });
//     // end
//     // copy-link
//     $(document).on('click', '.copy', function (e) {
//         event.preventDefault();
//         var copyText = $('#pdf-link');
//         copyText.select();
//         document.execCommand("copy");
//        $(this).html('<i class="copy-icon"></i> Ссылка скопирована');
//     });
//     // end
//     // Modal-form
//     $(document).on('click', '.modal-active', function () {
//        $('.modal-form').addClass('active')
//     });
//     $(document).keyup(function (e) {
//         if (e.keyCode == 27) {
//             $('.modal-form').removeClass('active');
//         }
//     });
//     $(document).mouseup(function (e) {
//         var cart = $('.modal-form');
//         if (cart.has(e.target).length === 0) {
//             $('.modal-form').removeClass('active')
//         }
//     });
//     $('.btn-close button').click(function () {
//        $('.modal-form').removeClass('active')
//     });
//     // end
// // Scroll header shadow and display-none for link
//     function scrollHide() {
//         if ($(document).scrollTop() > 150 && !$('.btn-h').hasClass('active')) {
//             $('header').addClass('scroll-up')
//         } else {
//             $('header').removeClass('scroll-up')
//         }
//         if ($(document).scrollTop() > 600) {
//             $('body').addClass('scroll')
//         } else {
//             $('body').removeClass('scroll')
//         }
//     }
//     scrollHide();
//     $(window).scroll(scrollHide);
// // end
// // main slider
//     let owl = $('.main-slider').owlCarousel({
//         loop: true,
//         items: 1,
//         margin: 30,
//         nav: false,
//         dotsContainer: '#ulcarousel-custom-dots',
//         // dots: false,
//         animateIn: "fadeIn",
//         animateOut: "fadeOut",
//     });
//     $('.button-prev').click(function() {
//         $('.main-slider').owlCarousel().trigger('prev.owl.carousel');
//     });
//     $('.button-next').click(function() {
//         $('.main-slider').owlCarousel().trigger('next.owl.carousel');
//     });
//     $('.owl-dot').click(function () {
//         owl.trigger('to.owl.carousel', [$(this).index(), 300]);
//     });
// // end
// // hamburger
//     $('.btn-h').on('click', function() {
//         $(this).toggleClass('active');
//         $('body').toggleClass('fixed');
//         $('.header-nav').toggleClass('active')
//     });
//     $(document).on('click', function(){
//         if (($('.btn-h').hasClass('active'))) {
//             // $('.black-box').addClass('active')
//         } else {
//             $('.black-box').removeClass('active')
//         }
//     });
// });

let saveCanvas = () => {
	var dataURL = document.getElementById('canvas').toDataURL("image/png");
	var link = document.createElement("a");
	link.id = "save-canvas-btn";
	link.href = dataURL;
	link.download = "my-image-name.png";
	document.getElementsByTagName('body')[0].append(link)
	link.click();
}
document.addEventListener('click', function (event) {
	if (event.target.classList.contains('save-canvas')) {
		event.preventDefault();
		saveCanvas();
	}
})
//canvas
let diam;
let ctx;
let color = '#ff6347';
if (document.getElementById('size')) {
	document.getElementById('size').addEventListener('change', function(event) {
		diam = this.value;
		// console.log(diam);
		document.getElementById('circle').style.width = `${diam}px`;
		document.getElementById('circle').style.height = `${diam}px`;
		ctx.lineWidth = diam;
		// ctx.arc(e.clientX, e.clientY, diam / 2, 0, Math.PI * 2);
	});
}
if (document.getElementById('color-picker')) {
	document.getElementById('color-picker').addEventListener('change', function(event) {
		color = this.value;
		// console.log(color);
		ctx.strokeStyle = color;
		ctx.fillStyle = color;
	});
}
$(function () {
	if ( document.getElementsByTagName('body')[0].classList.contains('canvas') ) {
		let canv = document.getElementById('canvas');
		ctx = canv.getContext('2d');
		let isMouseDown = false;
		diam = 30;

		document.getElementById('circle').style.width = `${diam}px`;
		document.getElementById('circle').style.height = `${diam}px`;
		document.getElementById('color').style.backgroundColor = color;
		document.getElementById('color-picker').value = color;
		document.getElementById('size').value = diam;

		canv.width = window.innerWidth;
		canv.height = window.innerHeight;
		canv.addEventListener('mousedown', function () {
			isMouseDown = true;
		});
		canv.addEventListener('mouseup', function () {
			isMouseDown = false;
			ctx.beginPath();
		});
		ctx.strokeStyle = color;
		ctx.fillStyle = color;
		ctx.lineWidth = diam;
		canv.addEventListener('mousemove', function (e) {
			if (isMouseDown) {
				ctx.lineTo(e.clientX, e.clientY);
				ctx.stroke();

				ctx.beginPath();
				ctx.arc(e.clientX, e.clientY, diam / 2, 0, Math.PI * 2);
				ctx.fill();

				ctx.beginPath();
				ctx.moveTo(e.clientX, e.clientY);
			}
		});
		console.log(ctx);
		// $('.save-canvas').on('click', function () {
		// 	window.open(canv.toDataURL("image/png"));
		// });
		
		//link.click();
	}
});
// tetris

if ( document.getElementsByTagName('body')[0].classList.contains('tetris-game') ) {
	$(function () {
		let newModal = document.querySelector('.new-modal');
	let gameBox = document.querySelector('.game-box');
	console.log(newModal);
	let startSpeed = 400;
	let newSpeed = 0;
	//let totalSpeed = startSpeed - newSpeed;
	let totalSpeed = {
		speed: 400,
	};

	newModal.addEventListener('click', function (e) {
		if (e.target.classList.contains('button')) {
			newModal.style.display = 'none';
			gameBox.classList.add('active');
			startGame();
		}
	});

	function startGame() {

		if ($('body').hasClass('tetris-game')) {
			let startLevel = [];
			let newLevel = [];
			let level = 1;
			let inputFieldLevel = document.getElementsByClassName('level')[0];
			inputFieldLevel.value = `Текущий уровень: ${level}`;
			let inputFieldSpeed = document.getElementsByClassName('speed')[0];
			inputFieldSpeed.value = `Текущяя скорость: ${totalSpeed.speed}`;
			createLevel();

			function createLevel() {
				let newLevelArr = [];
				for (let iRandom = 0; iRandom < 1000; iRandom++) {

					let newRandom = function getRandom() {
						return Math.round(Math.random() * 6);
					};
					newLevelArr[iRandom] = newRandom();
				}
				newLevel = startLevel.concat(newLevelArr);
			}

			let tetris = document.createElement('div');
			tetris.classList.add('tetris');

			for (let i = 1; i < 181; i++) {
				let excel = document.createElement('div');
				excel.classList.add('excel');
				tetris.appendChild(excel);
			}

			let main = document.getElementsByClassName('main')[0];
			main.appendChild(tetris);

			let excel = document.getElementsByClassName('excel');
			let i = 0;
			let previewItem = $('.item');
			let ip = 0;
			for (let y = 18; y > 0; y--) {
				for (x = 1; x < 11; x++) {
					excel[i].setAttribute('posX', x);
					excel[i].setAttribute('posY', y);
					i++
				}
			}
			for (let yp = 4; yp > 0; yp--) {
				for (let xp = 1; xp < 5; xp++) {
					previewItem[ip].setAttribute('prX', xp);
					previewItem[ip].setAttribute('prY', yp);
					ip++
				}
			}
			x = 5, y = 15;
			xp = 2, yp = 1;
			let mainArr = [
				// I - figure (0)
				[
					[0, 1],
					[0, 2],
					[0, 3],
					// rotate 90
					[[-1, 1], [0, 0], [1, -1], [2, -2],],
					//rotate 180
					[[1, -1], [0, 0], [-1, 1], [-2, 2],],
					// rotate 270
					[[-1, 1], [0, 0], [1, -1], [2, -2],],
					//rotate 360
					[[1, -1], [0, 0], [-1, 1], [-2, 2],],
				],
				// square-figure (1)
				[
					[1, 0],
					[0, 1],
					[1, 1],
					//rotate 90
					[[0, 0], [0, 0], [0, 0], [0, 0],],
					//rotate 180
					[[0, 0], [0, 0], [0, 0], [0, 0],],
					//rotate 270
					[[0, 0], [0, 0], [0, 0], [0, 0],],
					//rotate 360
					[[0, 0], [0, 0], [0, 0], [0, 0],],
				],
				// lego-figure (2)
				[
					[1, 0],
					[2, 0],
					[1, 1],
					// rotate 90
					[[0, 2], [-1, 1], [-2, 0], [0, 0],],
					//rotate 180
					[[2, 0], [1, 1], [0, 2], [0, 0],],
					//rotate 270
					[[0, -2], [1, -1], [2, 0], [0, 0],],
					//rotate 360
					[[-2, 0], [-1, -1], [0, -2], [0, 0],],
				],
				// L-figure (3)
				[
					[1, 0],
					[0, 1],
					[0, 2],
					// rotate 90
					[[0, 1], [-1, 0], [1, 0], [2, -1],],
					//rotate 180
					[[1, 1], [0, 2], [0, 0], [-1, -1],],
					//rotate 270
					[[1, -2], [2, -1], [0, -1], [-1, 0],],
					//rotate 360
					[[-2, 0], [-1, -1], [-1, 1], [0, 2],],
				],
				// mirr-L-figure (4)
				[
					[1, 0],
					[1, 1],
					[1, 2],
					// rotate 90
					[[0, 1], [-1, 0], [0, -1], [1, -2],],
					// rotate 180
					[[1, 1], [0, 2], [-1, 1], [-2, 0],],
					// rotate 270
					[[1, -2], [2, -1], [1, 0], [0, 1],],
					// rotate 360
					[[-2, 0], [-1, -1], [0, 0], [1, 1],],
				],
				// z-figure (5)
				[
					[1, 0],
					[-1, 1],
					[0, 1],
					// rotate 90
					[[-1, 1], [-2, 0], [1, 1], [0, 0],],
					// rotate 180
					[[1, -1], [2, 0], [-1, -1], [0, 0],],
					// rotate 270
					[[-1, 1], [-2, 0], [1, 1], [0, 0],],
					// rotate 360
					[[1, -1], [2, 0], [-1, -1], [0, 0],],
				],
				// s-figure (6)
				[
					[1, 0],
					[1, 1],
					[2, 1],
					// rotete 90
					[[1, 0], [0, 1], [-1, 0], [-2, 1],],
					// rotete 180
					[[-1, 0], [0, -1], [1, 0], [2, -1],],
					// rotete 270
					[[1, 0], [0, 1], [-1, 0], [-2, 1],],
					// rotete 360
					[[-1, 0], [0, -1], [1, 0], [2, -1],],
				]
			];
			let currentFigure = 0;
			let figureBody = 0;
			let rotate = 1;
			let elNumber = 0;

			function create() {
				// function getRandom() {
				//     return Math.round(Math.random() * (mainArr.length - 1));
				// }
				rotate = 1;

				currentFigure = newLevel[elNumber]; //currentFigure = getRandom();
				currentFigurePreview = newLevel[elNumber + 1];
				figureBody = [
					document.querySelector(`[posX = "${x}"][posY = "${y}"]`),
					document.querySelector(`[posX = "${x + mainArr[currentFigure][0][0]}"][posY = "${y + mainArr[currentFigure][0][1]}"]`),
					document.querySelector(`[posX = "${x + mainArr[currentFigure][1][0]}"][posY = "${y + mainArr[currentFigure][1][1]}"]`),
					document.querySelector(`[posX = "${x + mainArr[currentFigure][2][0]}"][posY = "${y + mainArr[currentFigure][2][1]}"]`)
				];
				for (let i = 0; i < figureBody.length; i++) {
					figureBody[i].classList.add('figure');
				}
				figurePreviewBody = [
					document.querySelector(`[prx = "${xp}"][pry = "${yp}"]`),
					document.querySelector(`[prx = "${xp + mainArr[currentFigurePreview][0][0]}"][pry = "${yp + mainArr[currentFigurePreview][0][1]}"]`),
					document.querySelector(`[prx = "${xp + mainArr[currentFigurePreview][1][0]}"][pry = "${yp + mainArr[currentFigurePreview][1][1]}"]`),
					document.querySelector(`[prx = "${xp + mainArr[currentFigurePreview][2][0]}"][pry = "${yp + mainArr[currentFigurePreview][2][1]}"]`)
				];
				for (let ip = 0; ip < figurePreviewBody.length; ip++) {
					figurePreviewBody[ip].classList.add('green');
				}
			}

			create();
			let score = 0;
			let inputField = document.getElementsByClassName('score')[0];
			inputField.value = `Ваши очки: ${score}`;

			// движение фигуры вниз
			function move() {
				let moveFlag = true; // разрешение движения вниз
				let coordinates = [
					[figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
					[figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
					[figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
					[figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')],
				];
				// для каждого элемента фигуры
				for (let i = 0; i < coordinates.length; i++) {
					// проверка можно ли двигаться вниз
					if (coordinates[i][1] == 1 || document.querySelector(`[posX = "${coordinates[i][0]}"][posY = "${coordinates[i][1] - 1}"]`).classList.contains('set')) {
						moveFlag = false;
						elNumber = elNumber + 1;
						for (let ip = 0; ip < figurePreviewBody.length; ip++) {
							figurePreviewBody[ip].classList.remove('green');
						}
						break;
					}
				}
				// движение вниз
				if (moveFlag) {
					for (let i = 0; i < figureBody.length; i++) {
						figureBody[i].classList.remove('figure');
					}
					figureBody = [
						document.querySelector(`[posX = "${coordinates[0][0]}"][posY = "${coordinates[0][1] - 1}"]`),
						document.querySelector(`[posX = "${coordinates[1][0]}"][posY = "${coordinates[1][1] - 1}"]`),
						document.querySelector(`[posX = "${coordinates[2][0]}"][posY = "${coordinates[2][1] - 1}"]`),
						document.querySelector(`[posX = "${coordinates[3][0]}"][posY = "${coordinates[3][1] - 1}"]`),
					];
					for (let i = 0; i < figureBody.length; i++) {
						figureBody[i].classList.add('figure');
					}
					// фигура не может двигаться вниз
				} else {
					// перекрасить в цвет неподвижных
					for (let i = 0; i < figureBody.length; i++) {
						figureBody[i].classList.remove('figure');
						figureBody[i].classList.add('set');
					}
					// проверка, есть ли заполненные ряды
					for (let iLine = 1; iLine < 15; iLine++) { // перебор строк
						let count = 0; // если станет равным 10 - удалить строку (iLine)
						for (let k = 1; k < 11; k++) { // перебор столбцов
							if (document.querySelector(`[posX = "${k}"][posY= "${iLine}"]`).classList.contains('set')) {
								count++;
								if (count === 10) {
									// увеличение счета
									score += 10;
									inputField.value = `Ваши очки: ${score}`;
									// увеличение уровня
									level = Math.floor(score / 100) + 1;
									inputFieldLevel.value = `Текущий уровень: ${level}`;
									// увеличение скорости
									//newSpeed = Math.floor((level - 1) * 50);
									//console.log(newSpeed);

									inputFieldSpeed.value = `Текущяя скорость: ${totalSpeed.speed}`;
									// ----
									clearInterval(interval);
									totalSpeed.speed = startSpeed - (level * 10);
									interval = setInterval(() => {
										move();
									}, totalSpeed.speed);
									// ----
									// удаление (у каждой ячейки строки) класса, отвечающего за цвет неподвижного элемента
									for (let iColumnToRemove = 1; iColumnToRemove < 11; iColumnToRemove++) {
										document.querySelector(`[posX = "${iColumnToRemove}"][posY= "${iLine}"]`).classList.remove('set')
									}
									let set = document.querySelectorAll('.set'); // получить все ячейки с классом "set"
									let newSet = [];
									for (let s = 0; s < set.length; s++) { // перебор всех ячеек с классом "set"
										let setCoordinates = [set[s].getAttribute('posX'), set[s].getAttribute('posY')];
										// для всех ячеек с классом "set", находящихся выше строки iLine
										if (setCoordinates[1] > iLine) {
											set[s].classList.remove('set');
											newSet.push(document.querySelector(`[posX = "${setCoordinates[0]}"][posY= "${setCoordinates[1] - 1}"]`));
										}
									}
									for (let a = 0; a < newSet.length; a++) {
										newSet[a].classList.add('set');
									}
									iLine--;
								}
							}
						}
					}
					for (let n = 1; n < 11; n++) {
						if (document.querySelector(`[posX = "${n}"][posY = "15"]`).classList.contains('set')) {
							clearInterval(interval);
							alert('Game over! Ваши очки - ' + score);
							//newModal.style.display = 'flex';
							//gameBox.classList.remove('active');
							break;
						}
					}
					create();
				}
			}

			let interval = setInterval(() => {
				move();
			}, totalSpeed.speed);
			window.addEventListener('keydown', function (e) {
				let coordinates1 = [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')];
				let coordinates2 = [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')];
				let coordinates3 = [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')];
				let coordinates4 = [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')];

				function getNewState(a) {
					flag = true;
					let figureNew = [
						document.querySelector(`[posX = "${+coordinates1[0] + a}"][posY = "${coordinates1[1]}"]`),
						document.querySelector(`[posX = "${+coordinates2[0] + a}"][posY = "${coordinates2[1]}"]`),
						document.querySelector(`[posX = "${+coordinates3[0] + a}"][posY = "${coordinates3[1]}"]`),
						document.querySelector(`[posX = "${+coordinates4[0] + a}"][posY = "${coordinates4[1]}"]`),
					];
					for (let i = 0; i < figureNew.length; i++) {
						if (!figureNew[i] || figureNew[i].classList.contains('set')) {
							flag = false;
						}
					}
					if (flag) {
						for (let i = 0; i < figureBody.length; i++) {
							figureBody[i].classList.remove('figure');
						}
						figureBody = figureNew;
						for (let i = 0; i < figureBody.length; i++) {
							figureBody[i].classList.add('figure');
						}
					}
				}

				if (e.keyCode == 37) {
					getNewState(-1);
				} else if (e.keyCode == 39) {
					getNewState(1);
				} else if (e.keyCode == 40) {
					move();
				} else if (e.keyCode == 38) {
					flag = true;
					let figureNew = [
						document.querySelector(`[posX = "${+coordinates1[0] + mainArr[currentFigure][rotate + 2][0][0]}"][posY = "${+coordinates1[1] + mainArr[currentFigure][rotate + 2][0][1]}"]`),
						document.querySelector(`[posX = "${+coordinates2[0] + mainArr[currentFigure][rotate + 2][1][0]}"][posY = "${+coordinates2[1] + mainArr[currentFigure][rotate + 2][1][1]}"]`),
						document.querySelector(`[posX = "${+coordinates3[0] + mainArr[currentFigure][rotate + 2][2][0]}"][posY = "${+coordinates3[1] + mainArr[currentFigure][rotate + 2][2][1]}"]`),
						document.querySelector(`[posX = "${+coordinates4[0] + mainArr[currentFigure][rotate + 2][3][0]}"][posY = "${+coordinates4[1] + mainArr[currentFigure][rotate + 2][3][1]}"]`),
					];
					for (let i = 0; i < figureNew.length; i++) {
						if (!figureNew[i] || figureNew[i].classList.contains('set')) {
							flag = false;
						}
					}
					if (flag) {
						for (let i = 0; i < figureBody.length; i++) {
							figureBody[i].classList.remove('figure');
						}
						figureBody = figureNew;
						for (let i = 0; i < figureBody.length; i++) {
							figureBody[i].classList.add('figure');
						}
						if (rotate < 4) {
							rotate++;
						} else {
							rotate = 1;
						}
					}
				}
			});
		}
	}
});
}
$(function () {
	if ($('body').hasClass('vue-js')) {
		new Vue({
			el: "#app",
			data: {
				message: '',
				bears: [
					{
						name: 'bear1',
						age: 19
					},
					{
						name: 'bear2',
						age: 21
					},
					{
						name: 'bear3',
						age: 18
					},
					{
						name: 'bear4',
						age: 42
					}
				]
			},
			methods: {
				onClick: function () {
					alert(this.message);
				}
			}
		});
	}
});
