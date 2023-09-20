const bodyBlur = document.querySelector(".main");

const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector(".header .time_line");
const timeText = quiz_box.querySelector(".header .time_text");

const option_list = document.querySelector(".option_list");

start_btn.onclick = () => {
	info_box.classList.add('active_info');
	bodyBlur.classList.add("active");
}
exit_btn.onclick = () => {
	info_box.classList.remove('active_info');
	bodyBlur.classList.remove("active");
}
continue_btn.onclick = () => {
	info_box.classList.remove('active_info');
	quiz_box.classList.add('active_quiz');
	showQuestion(0);
	queCounter(1);
	startTimer(15);
	startTimerLine(0)
}


let que_count = 0;
let que_numb = 1; //page
let counter; //timer
let counterLine;
let timeValue = 15; // 다음 버튼 누르면 초기화 
let widthValue = 0;
let userScore = 0; // 결과 맞춘 개수

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = () => {
	result_box.classList.remove("active_result");
	quiz_box.classList.add('active_quiz');
	timeValue = 15; 
	que_count = 0;
	que_numb = 1;
	userScore = 0;
	widthValue = 0;
	showQuestion(que_count);
	queCounter(que_numb);
	clearInterval(counter);
	clearInterval(counterLine);
	startTimer(timeValue);
	startTimerLine(widthValue);
	timeText.textContent = "Time Left";
	next_btn.classList.remove("show");
}
quit_quiz.onclick = () => {
	window.location.reload();
}

// next 버튼
next_btn.onclick = () => {
	if (que_count < questions.length - 1) {
		que_count++;
		que_numb++;
		showQuestion(que_count);
		queCounter(que_numb);
		clearInterval(counter);
		startTimer(timeValue);
		clearInterval(counterLine);
		startTimerLine(widthValue);
		next_btn.classList.remove("show");
		timeText.textContent = "Time Left";
	} else {
		clearInterval(counter);
		clearInterval(counterLine);
		console.log('completed')
		showResultBox()
	}
}

// questions와 option 출력
function showQuestion(index) {
	const que_text = document.querySelector(".que_text");
	
	let que_tag = '<span>' + questions[index].numb + '.' + questions[index].question + '</span>'
	let option_tag = '<div class="option"><span>' + questions[index].options[0] +'</span></div>'
	+ '<div class="option"><span>' + questions[index].options[1] +'</span></div>'
	+ '<div class="option"><span>' + questions[index].options[2] +'</span></div>'
	+ '<div class="option"><span>' + questions[index].options[3] +'</span></div>';
	que_text.innerHTML = que_tag;
	option_list.innerHTML = option_tag;
	
	// option에 클릭이벤트 넣기
	const option = option_list.querySelectorAll(".option");
	for (let i = 0; i < option.length; i++){
		option[i].setAttribute("onclick", "optionSelected(this)");
	}
}

let tickIcon = '<div class="icon tick"><i class="bx bx-check"></i></div>'
let crossIcon = '<div class="icon cross"><i class="bx bx-x"></i></div>'
// 정답
function optionSelected(answer) {
	clearInterval(counter);
	clearInterval(counterLine);

	let userAnswer = answer.textContent;
	let correctAnswer = questions[que_count].answer;
	let allOptions = option_list.children.length;
	// console.log(correctAnswer);        
	if (userAnswer == correctAnswer) {
		userScore += 1;
		console.log(userScore + "맞춘 개수");
		answer.classList.add("correct");
		console.log("Anser is Correct");
		answer.insertAdjacentHTML("beforeend", tickIcon);

	} else {
		answer.classList.add("incorrect");
		console.log("Anser is Wrong");
		answer.insertAdjacentHTML("beforeend", crossIcon);

		// 틀리면 정답 표시
		for (let i = 0; i < allOptions; i++){
			if (option_list.children[i].textContent == correctAnswer) {
				option_list.children[i].setAttribute("class", "option correct");
				option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);;
			}
		}
	}
	// console.log(allOptions)
	// 하나만 체크 나머지는 disabled
	for (let i = 0; i < allOptions; i++){
		option_list.children[i].classList.add("disabled")
	}
	next_btn.classList.add("show");
}

// 결과창 보기
function showResultBox() {
	info_box.classList.remove('active_info');
	quiz_box.classList.remove('active_quiz');	
	result_box.classList.add('active_result');

	const scoreText = result_box.querySelector(".score_text");
	if (userScore > 3) {
		let scoreTag = '<p>and congrats! You got <span>' + userScore + '</span> out of <span> ' + questions.length + '</span></p>'
		scoreText.innerHTML = scoreTag;
	} else if (userScore > 1) {
		let scoreTag = '<p>and nice, You got <span>' + userScore + '</span> out of <span> ' + questions.length + '</span></p>'
		scoreText.innerHTML = scoreTag;
	} else {
		let scoreTag = '<p>and sorry, You got only <span>' + userScore + '</span> out of <span> ' + questions.length + '</span></p>'
		scoreText.innerHTML = scoreTag;
	}
}

// timer
function startTimer(time) {
	counter = setInterval(timer, 1000);
	function timer() {
		timeCount.textContent = time;
		time--;
		if (time < 9) {
			let addZero = timeCount.textContent;
			timeCount.textContent = "0" + addZero;
		}
		if (time < 0) {
			clearInterval(counter);
			timeCount.textContent = "00";
			timeText.textContent = "Time off";

			let correctAnswer = questions[que_count].answer;
			let allOptions = option_list.children.length;

			for (let i = 0; i < allOptions; i++){
				if (option_list.children[i].textContent == correctAnswer) {
					option_list.children[i].setAttribute("class", "option correct");
					option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);;
				}
			}
					
			for (let i = 0; i < allOptions; i++){
				option_list.children[i].classList.add("disabled")
			}
			next_btn.classList.add("show");

		}
	}
}

// time line
function startTimerLine(time) {
	counterLine = setInterval(timer, 29);
	function timer() {
		time += 1;
		timeLine.style.width = time + "px";
		if (time > 549) {
			clearInterval(counterLine);
		}
	}
}



// 문제 counter
function queCounter(index) {
	const bottom_ques_counter = quiz_box.querySelector(".total_que");
	let totalQuesCountTag = '<p><span>' + index + '</span>of<span>' + questions.length + '</span>Questions</p>'
	bottom_ques_counter.innerHTML = totalQuesCountTag;
}
