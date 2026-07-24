// ==========================================
// 1. KHAI BÁO BIẾN & TRẠNG THÁI (STATE)
// ==========================================
let questions = []; // Đã đổi thành 'questions'
let currentIndex = 0;
let score = 0;
let timeleft = 60;
let timerId = null;
let allQuestions = [];
// ==========================================
// 2. BẮT CÁC PHẦN TỬ HTML (DOM)
// ==========================================
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn'); // Đã thêm 'restart-btn'

const questionNumberEL = document.getElementById('question-number');
const questionTextEL = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container'); // Đã thêm 's'

const scoreDisplay = document.getElementById('score-display');
const timerDisplay = document.getElementById('timer-display');
const finalScoreEL = document.getElementById('final-score');

// ==========================================
// 3. BẮT SỰ KIỆN CLICK (EVENT LISTENERS)
// ==========================================
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', handleNextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// ==========================================
// 4. CÁC HÀM XỬ LÝ LOGIC
// ==========================================

// Lấy dữ liệu câu hỏi
async function fetchQuestions() {
  try {
    const response = await fetch('questions.json');
    allQuestions = await response.json()// Lưu vào mảng 100 câu gốc
    console.log('Đã tải tổng cộng:', allQuestions.length, 'câu hỏi');
  } catch (error) {
    console.error('Lỗi khi tải câu hỏi:', error);
  }
}
fetchQuestions();

function shuffleArray(array){
    // Tạo bản sao của mảng để không làm hỏng mảng gốc
    const shuffled = [...array];

    for(let i = shuffled.length - 1; i > 0; i--){
        // Lấy một chỉ số ngẫu nhiên từ 0 đến i
        const j = Math.floor(Math.random() * (i + 1));
        // Đổi chỗ 2 phần tử shuffled[i] và shuffled[j]
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    return shuffled
}

// Bắt đầu Quiz
function startQuiz() {
  currentIndex = 0;
  score = 0;
  scoreDisplay.textContent = score;
// STEP A: Xáo trộn mảng 100 câu gốc
const randomizedQuestions = shuffleArray(allQuestions)
// STEP B: Cắt lấy 25 câu đầu tiên (Nếu file JSON ít hơn 25 câu nó sẽ lấy toàn bộ)
questions = randomizedQuestions.slice(0,25)
console.log('Đã chọn ngẫu nhiên', questions.length, 'câu cho lượt chơi này!');

  // Ẩn màn Start, Hiện màn Quiz
  startScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');

  loadQuestion();
}

// Tải câu hỏi hiện tại
function loadQuestion() {
  // Xóa sạch các nút câu hỏi cũ
  optionsContainer.innerHTML = '';
  nextBtn.classList.add('hidden'); // Ẩn nút Next khi sang câu mới

  const currentQ = questions[currentIndex];
  questionNumberEL.textContent = `Câu hỏi ${currentIndex + 1}/${questions.length}`;
  questionTextEL.textContent = currentQ.question;

  // Tạo động các nút đáp án
  currentQ.options.forEach((optionText, index) => {
    const button = document.createElement('button');
    button.textContent = optionText;
    button.className = 'w-full text-left p-4 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 transition font-medium cursor-pointer';
    
    // Gán sự kiện click
    button.addEventListener('click', () => selectAnswer(index));
    optionsContainer.appendChild(button);
  });

  startTimer(); // Bật bộ đếm thời gian
}

// Bắt đầu đếm ngược 60s
function startTimer() {
  clearInterval(timerId); // Xóa timer cũ nếu có

  timeleft = 60;
  timerDisplay.textContent = `${timeleft}s`;

  timerId = setInterval(() => {
    timeleft--;
    timerDisplay.textContent = `${timeleft}s`;

    // Khi HẾT GIỜ
    if (timeleft <= 0) {
      clearInterval(timerId);
      score--; // Trừ 1 điểm
      scoreDisplay.textContent = score;
      console.log('Hết giờ! Tự động chuyển câu tiếp theo.');

      handleNextQuestion();
    }
  }, 1000);
}

// Xử lý khi chọn đáp án
function selectAnswer(selectedIndex) {
  // Dừng timer ngay lập tức
  clearInterval(timerId);
  
  const currentQ = questions[currentIndex];
  const buttons = optionsContainer.children;

  // Duyệt qua tất cả các nút để vô hiệu hóa và đổi màu
  Array.from(buttons).forEach((button, index) => {
    button.disabled = true; // Đã sửa thành 'disabled' (có chữ d)

    if (index === currentQ.correctAnswer) {
      // Đúng => Màu xanh
      button.classList.add('bg-emerald-600', 'border-emerald-500');    
    } else if (index === selectedIndex) {
      // Sai => Màu đỏ (Đã sửa 'border-rose-500')
      button.classList.add('bg-rose-600', 'border-rose-500');
    }
  });

  // Tăng điểm nếu chọn đúng
  if (selectedIndex === currentQ.correctAnswer) {
    score++;
    scoreDisplay.textContent = score;
  }

  // Hiện nút Next
  nextBtn.classList.remove('hidden');
}

// Xử lý chuyển câu hoặc kết thúc
function handleNextQuestion() {
  currentIndex++;

  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showEndScreen();
  }
}

// Hiển thị màn hình kết thúc
function showEndScreen() {
  clearInterval(timerId);

  quizScreen.classList.add('hidden');
  endScreen.classList.remove('hidden');

  finalScoreEL.textContent = score;
}

// Làm lại bài từ đầu
function restartQuiz() {
  endScreen.classList.add('hidden');
  startQuiz();
}