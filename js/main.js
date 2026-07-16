// 1. Set current date in the navbar
const dateOptions = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-US', dateOptions);

// 2. Terminal Interactive Logic
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
const terminalContainer = document.getElementById('terminal-container');

// Terminal Commands Database
const commands = {
    help: `Available commands: <br> 
          - <span class="text-white font-bold">about</span>: Learn more about my background <br> 
          - <span class="text-white font-bold">skills</span>: View my technical arsenal <br> 
          - <span class="text-white font-bold">projects</span>: List my ML and Web projects <br> 
          - <span class="text-white font-bold">experience</span>: View my professional timeline <br>
          - <span class="text-white font-bold">clear</span>: Clear the terminal screen`,
    
    about: `Hi, I'm Sujal Donga. I'm a Data Science & AI Professional with a B.Tech in Computer Science and Engineering. I specialize in Machine Learning, Exploratory Data Analysis, and LLM evaluation. I love transforming raw data into intelligent insights.`,
    
    skills: `--- TECH STACK ---<br>
            > <span class="text-[#fde047]">Languages:</span> Python, SQL (MySQL), R, PHP, JavaScript, HTML, CSS<br>
            > <span class="text-[#fde047]">AI / Data:</span> Machine Learning, Pandas, NumPy, LibROSA, LLM Evaluation<br>
            > <span class="text-[#fde047]">Frameworks:</span> Next.js, React, Node.js<br>
            > <span class="text-[#fde047]">Tools:</span> Tableau, Power BI, Jupyter, Google Colab, Git`,
    
    projects: `--- FEATURED PROJECTS ---<br>
              1. <span class="text-white font-bold">Birdcall Recognition Model:</span> Audio feature engineering using LibROSA.<br>
              2. <span class="text-white font-bold">Apple Stock Prediction:</span> Time-series forecasting utilizing ML.<br>
              3. <span class="text-white font-bold">Malware Detection:</span> Co-authored research on hybrid ML models.<br>
              4. <span class="text-white font-bold">Web Applications:</span> Event Management Portal & E-Commerce Platform.`,
    
    experience: `--- TIMELINE ---<br>
                > <span class="text-white font-bold">Feb 2026 - May 2026:</span> AI/LLM Analyst @ Innodata INC.<br>
                > <span class="text-white font-bold">Jul 2025 - Nov 2025:</span> Software Dev Professional @ Air contact Systems<br>
                > <span class="text-white font-bold">Jul 2024 - Aug 2024:</span> PHP Developer Intern @ LOGINIUS INFOTECH`
};

// Listen for "Enter" key press
terminalInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const inputVal = terminalInput.value.trim().toLowerCase();
        
        // Echo the typed command to the screen
        const echo = document.createElement('p');
        echo.innerHTML = `<span class="text-[#60a5fa]">guest@sujal:~$</span> <span class="text-white">${terminalInput.value}</span>`;
        terminalOutput.appendChild(echo);
        
        // Process the command
        if (inputVal === 'clear') {
            terminalOutput.innerHTML = '';
        } else if (commands[inputVal]) {
            const response = document.createElement('p');
            response.innerHTML = commands[inputVal];
            response.className = 'mb-4 mt-2 text-[#4ade80]';
            terminalOutput.appendChild(response);
        } else if (inputVal !== '') {
            const error = document.createElement('p');
            error.innerHTML = `Command not found: <span class="text-white">${inputVal}</span>. Type "help" for a list of commands.`;
            error.className = 'text-[#f87171] mb-4 mt-2';
            terminalOutput.appendChild(error);
        }
        
        // Reset input field and auto-scroll to bottom
        terminalInput.value = '';
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});

// Keep the input field in focus when clicking anywhere inside the terminal box
terminalContainer.addEventListener('click', () => {
    terminalInput.focus();
});