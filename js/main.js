// 1. Set & Auto-Update current date in the navbar
function updateDate() {
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        dateElement.textContent = new Date().toLocaleDateString('en-US', dateOptions);
    }
}
updateDate(); // Run immediately on load
setInterval(updateDate, 3600000); // Check and update every hour

// 2. Terminal Interactive Logic
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
const terminalContainer = document.getElementById('terminal-container');

// Game States
let terminalState = 'normal';
let magicNumber = 0;

const commands = {
    help: `Available commands: whoami, skills, projects, clear, sudo<br>Fun commands: game`,
    
    whoami: `Hi, I'm Sujal Donga. I'm a Data Science & AI Professional with a B.Tech in CSE. I specialize in Machine Learning, EDA, and LLM evaluation.`,
    
    skills: `--- TECH STACK ---<br>
            > Languages: Python, SQL, R, PHP, JavaScript, HTML, CSS<br>
            > AI / Data: Machine Learning, Pandas, NumPy, LibROSA, LLM Evaluation<br>
            > Frameworks: Next.js, React, Node.js<br>
            > Tools: Tableau, Power BI, Git`,
    
    projects: `--- FEATURED PROJECTS ---<br>
              1. Birdcall Recognition Model<br>
              2. Apple Stock Prediction<br>
              3. Malware Detection<br>
              4. Web Applications`,
              
    sudo: `Nice try! This incident will be reported. 🚨`,
    
    game: `🎮 Available games:<br>
          • guess -> Number Guessing Game<br>
          • rps -> Rock Paper Scissors`
};

if (terminalInput) {
    terminalInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const inputVal = terminalInput.value.trim().toLowerCase();
            
            // Echo the typed command to screen
            const echo = document.createElement('p');
            echo.innerHTML = `<span class="text-white">guest@sujal:~$</span> <span class="text-[#60a5fa]">${terminalInput.value}</span>`;
            terminalOutput.appendChild(echo);
            
            // Handle 'clear' immediately
            if (inputVal === 'clear') {
                terminalOutput.innerHTML = '';
                terminalInput.value = '';
                terminalState = 'normal'; // Reset state just in case
                return;
            }
            
            const response = document.createElement('p');
            response.className = 'mb-4 mt-2 text-[#60a5fa]';

            // Check if user is currently playing Rock Paper Scissors
            if (terminalState === 'rps') {
                const choices = ['rock', 'paper', 'scissors'];
                if (choices.includes(inputVal)) {
                    const botChoice = choices[Math.floor(Math.random() * choices.length)];
                    response.innerHTML = `Bot chose: ${botChoice}<br>`;
                    
                   if (inputVal === botChoice) {
                        response.innerHTML += `It's a tie! 🤝`;
                    } else if (
                        (inputVal === 'rock' && botChoice === 'scissors') ||
                        (inputVal === 'paper' && botChoice === 'rock') ||
                        (inputVal === 'scissors' && botChoice === 'paper')
                    ) {
                        response.innerHTML += `You win! 🎉`;
                    } else {
                        response.innerHTML += `You lose! 💀`;
                    }
                    // Keep the game going and prompt the user again
                    response.innerHTML += `<br><br><span class="text-white">Play again? (rock, paper, scissors) or quit:</span>`;
                } else if (inputVal === 'quit') {
                    response.innerHTML = `Exited game.`;
                    terminalState = 'normal';
                } else {
                    response.innerHTML = `Invalid choice. Type rock, paper, scissors, or quit.`;
                }
            } 
            // Check if user is currently playing Number Guesser
            else if (terminalState === 'guess') {
                if (inputVal === 'quit') {
                    response.innerHTML = `Exited game.`;
                    terminalState = 'normal';
                } else {
                    const guess = parseInt(inputVal);
                    if (isNaN(guess)) {
                        response.innerHTML = `Please enter a valid number, or type quit.`;
                    } else if (guess === magicNumber) {
                        response.innerHTML = `Correct! 🎉 You guessed the magic number!`;
                        terminalState = 'normal'; // End game
                    } else if (guess < magicNumber) {
                        response.innerHTML = `Too low! Try again:`;
                    } else {
                        response.innerHTML = `Too high! Try again:`;
                    }
                }
            } 
            // Normal Terminal Commands
            else {
                if (inputVal === 'rps') {
                    response.innerHTML = `Let's play Rock, Paper, Scissors!<br>Type your choice (rock, paper, scissors) or quit:`;
                    terminalState = 'rps'; // Start RPS game
                } else if (inputVal === 'guess') {
                    magicNumber = Math.floor(Math.random() * 10) + 1;
                    response.innerHTML = `I'm thinking of a number between 1 and 10.<br>Enter your guess or quit:`;
                    terminalState = 'guess'; // Start Guess game
                } else if (commands[inputVal]) {
                    response.innerHTML = commands[inputVal];
                } else if (inputVal !== '') {
                    response.innerHTML = `Command not found: <span class="text-white">${inputVal}</span>. Type "help" for a list of commands.`;
                    response.className = 'text-[#f87171] mb-4 mt-2';
                }
            }
            
            if (response.innerHTML !== '') {
                terminalOutput.appendChild(response);
            }
            terminalInput.value = '';
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });

    terminalContainer.addEventListener('click', () => {
        terminalInput.focus();
    });
}

// 3. Interactive Drawing Board Logic
const canvas = document.getElementById('drawing-board');
if (canvas) {
    const ctx = canvas.getContext('2d');
    const placeholderText = document.getElementById('canvas-placeholder');

    function resizeCanvas() {
        const parent = canvas.parentElement;
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); 

    let isDrawing = false;
    let currentMode = 'draw'; 

    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    function startDrawing(e) {
        isDrawing = true;
        if(placeholderText) placeholderText.style.display = 'none'; 
        draw(e);
    }

    function draw(e) {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (currentMode === 'draw') {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = '#ffffff'; 
            ctx.lineWidth = 4;
        } else {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = 30; 
        }

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    function stopDrawing() {
        isDrawing = false;
        ctx.beginPath();
    }

    const btnDraw = document.getElementById('btn-draw');
    const btnErase = document.getElementById('btn-erase');
    const btnClear = document.getElementById('btn-clear');

    if(btnDraw) {
        btnDraw.addEventListener('click', () => {
            currentMode = 'draw';
            btnDraw.classList.add('active');
            btnErase.classList.remove('active');
        });
    }

    if(btnErase) {
        btnErase.addEventListener('click', () => {
            currentMode = 'erase';
            btnErase.classList.add('active');
            btnDraw.classList.remove('active');
        });
    }

    if(btnClear) {
        btnClear.addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if(placeholderText) placeholderText.style.display = 'block'; 
        });
    }
}