// let canvas = document.getElementById('canvas');
// let ctx = canvas.getContext('2d');
// console.log(ctx);
if ( document.querySelector('body').classList.contains('click-game') ) {

	let $start = document.querySelector('#start');
	let $game = document.querySelector('#game');
	let colors = ['seagreen', 'crimson', 'dodgerblue', 'mediumslateblue', 'slategray', 'orange', 'plum', 'cyan', 'coral', 'mediumturquoise', 'indianred', 'forestgreen', 'midnightblue', 'deeppink', 'greenyellow', 'tan', ];
	let counter = 0;
	let isGameStarted = false;
	let $time = document.querySelector('#time');
	let $result = document.querySelector('#result');
	let $timeHeader = document.querySelector('#time-header');
	let $resultHeader = document.querySelector('#result-header');
	let $gameTime = document.querySelector('#game-time');

	$start.addEventListener('click', startGame);
	$game.addEventListener('click', handleBoxClick);
	$gameTime.addEventListener('input', setGameTime);

	function show($el) {
		$el.classList.remove('hide')
	}
	function hide($el) {
		$el.classList.add('hide')
	}

	function startGame() {
		setGameTime();
		counter = 0;
		isGameStarted = true;
		$gameTime.setAttribute('readonly', 'true');
		$game.style.backgroundColor = 'snow';
		hide($start);


		let interval = setInterval(function () {
			let time = $time.textContent;
			if ( time > 0 ) {
				$time.textContent = (time - 0.1).toFixed(1);
			} else {
				clearInterval(interval);
				endGame();
				console.log('the end')
			}
		}, 100);

		renderBox()
	}

	function setGameTime() {
		$time.textContent = parseFloat($gameTime.value).toFixed(1);
		show($timeHeader);
		hide($resultHeader);
	}

	function setGameScore() {
		$result.textContent = counter.toString();
	}

	function endGame() {
		isGameStarted = false;
		$gameTime.removeAttribute('readonly');
		setGameScore();
		show($start);
		$game.style.backgroundColor = 'grey';
		$game.innerHTML = '';
		hide($timeHeader);
		show($resultHeader);
	}

	function handleBoxClick(event) {
		if ( !isGameStarted ) {
			return
		}
		if ( event.target.dataset.box ) {
			counter++;
			renderBox();
			console.log(counter)
		}
	}

	function renderBox() {
		$game.innerHTML = '';
		let box = document.createElement('div');
		let boxSize = getRandom(30, 70);
		let gameSize = $game.getBoundingClientRect();
		let maxTop = gameSize.height - boxSize;
		let maxLeft = gameSize.width - boxSize;
		let randomColor = getRandom(0, colors.length);
		let leftPosition = getRandom(0, maxLeft);
		let topPosition = getRandom(0, maxTop);

		console.log(randomColor);

		box.style.height = box.style.width = boxSize + 'px';
		box.style.position = 'absolute';
		box.style.backgroundColor = colors[randomColor];
		box.style.top = topPosition + 'px';
		box.style.left = leftPosition + 'px';
		box.style.cursor = 'pointer';
		box.setAttribute('data-box', 'true');

		$game.insertAdjacentElement("afterbegin", box);
	}

	function getRandom(min, max) {
		return Math.floor(Math.random() * (max - min) + min)
	}
}