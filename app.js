 const questions = [
      { q: "What does HTML stand for?", opts:["Hyperlinks and Text Markup Language","Home Tool Markup Language","Hyper Text Markup Language","Hyper Tool Markup Language"], correct:2 },
      { q: "Which tag is used for the largest heading?", opts:["<h6>","<head>","<h1>","<heading>"], correct:2 },
      { q: "Which tag inserts a line break?", opts:["<lb>","<br>","<break>","<nl>"], correct:1 },
      { q: "How do you create a hyperlink?", opts:["<a href='url'>link</a>","<link>url</link>","<href>url</href>","<url>link</url>"], correct:0 },
      { q: "Which attribute provides alternate text for images?", opts:["title","alt","caption","desc"], correct:1 },
      { q: "Which tag defines an unordered list (bulleted)?", opts:["<ol>","<ul>","<li>","<list>"], correct:1 },
      { q: "Which tag defines a table row?", opts:["<td>","<th>","<row>","<tr>"], correct:3 },
      { q: "Which element is used to play audio?", opts:["<sound>","<audio>","<music>","<mp3>"], correct:1 },
      { q: "Which attribute opens a link in a new tab?", opts:["open='_new'","target='_blank'","newtab","linkopen"], correct:1 },
      { q: "Which tag defines emphasized text (usually italic)?", opts:["<i>","<em>","<strong>","<italic>"], correct:1 },
      { q: "What is the correct doctype for HTML5?", opts:["<!DOCTYPE html>","<!DOCTYPE HTML5>","<doctype>","<!HTML>"], correct:0 },
      { q: "Which tag is used to create a checkbox?", opts:["<checkbox>","<input type='checkbox'>","<check>","<input checkbox>"], correct:1 },
      { q: "Which tag groups related inputs in a form?", opts:["<fieldset>","<group>","<inputs>","<formset>"], correct:0 },
      { q: "What does the <title> tag define?", opts:["Page title shown in browser tab","Main heading on page","Footer text","Meta description"], correct:0 },
      { q: "Which tag is used to create a numbered list?", opts:["<ol>","<ul>","<dl>","<list>"], correct:0 },
      { q: "Which tag is used to display images?", opts:["<image>","<img>","<src>","<pic>"], correct:1 },
      { q: "Which attribute sets the URL for a link?", opts:["src","href","link","url"], correct:1 },
      { q: "Which tag is used for the main navigation block?", opts:["<navbar>","<nav>","<navigation>","<menu>"], correct:1 },
      { q: "Which element holds metadata like charset and viewport?", opts:["<meta>","<info>","<head>","<data>"], correct:0 },
      { q: "Which tag is used to display a progress bar in HTML5?", opts:["<meter>","<progress>","<bar>","<status>"], correct:1 },
      { q: "Which tag wraps a paragraph?", opts:["<p>","<para>","<text>","<paragraph>"], correct:0 },
      { q: "Which tag makes text bold (semantic)?", opts:["<b>","<strong>","<bold>","<em>"], correct:1 },
      { q: "Which attribute gives an element a unique identifier?", opts:["class","id","name","key"], correct:1 },
      { q: "Which tag is for inline text container?", opts:["<div>","<span>","<section>","<article>"], correct:1 },
      { q: "Which input type shows a slider control?", opts:["range","slider","scroll","drag"], correct:0 },
      { q: "Which tag embeds an iframe?", opts:["<frame>","<iframe>","<embed>","<window>"], correct:1 },
      { q: "Which tag is used to create a button?", opts:["<btn>","<button>","<control>","<input type='button'>"], correct:1 },
      { q: "Which tag defines a footer for a document or section?", opts:["<footer>","<foot>","<bottom>","<section>"], correct:0 },
      { q: "Which attribute is used to provide alternative text for accessibility?", opts:["alt","title","desc","aria"], correct:0 },
      { q: "What HTML element is used to contain the visible page content?", opts:["<head>","<body>","<main>","<section>"], correct:1 }
    ];
    let current = 0;
    let score = 0;
    let selectedIndex = null;
    let remainingSeconds = 30 * 60;
    let timerInterval = null;
    const total = questions.length;
    const startArea = document.getElementById('startArea');
    const nameInput = document.getElementById('nameInput');
    const startBtn = document.getElementById('startBtn');
    const clearBtn = document.getElementById('clearBtn');
    const quizArea = document.getElementById('quizArea');
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const qcount = document.getElementById('qcount');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const progFill = document.getElementById('progFill');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const resultArea = document.getElementById('resultArea');
    const resultBox = document.getElementById('resultBox');
    const retryBtn = document.getElementById('retryBtn');
    const saveBtn = document.getElementById('saveBtn');
    const greeting = document.getElementById('greeting');
    const timerDisplay = document.getElementById('timerDisplay');

    function formatTime(sec){
      const m = Math.floor(sec/60).toString().padStart(2,'0');
      const s = (sec%60).toString().padStart(2,'0');
      return `${m}:${s}`;
    }

    function updateHeaderName(name){
      greeting.textContent = `Welcome, ${name}`;
    }

    function startTimer(){
      timerDisplay.textContent = formatTime(remainingSeconds);
      timerInterval = setInterval(()=>{
        remainingSeconds--;
        timerDisplay.textContent = formatTime(remainingSeconds);
        if(remainingSeconds <= 0){
          clearInterval(timerInterval);
          finishQuiz();
        }
      },1000);
    }
    function renderQuestion(){
      selectedIndex = null;
      nextBtn.disabled = true;
      const item = questions[current];
      questionText.textContent = item.q; 
      optionsContainer.innerHTML = '';
      item.opts.forEach((opt, idx)=>{
        const btn = document.createElement('button');
        btn.className = 'opt';
        btn.textContent = opt;
        btn.dataset.index = idx;
        btn.addEventListener('click', ()=>{
          const prev = optionsContainer.querySelector('.opt.selected');
          if(prev) prev.classList.remove('selected');
          btn.classList.add('selected');
          selectedIndex = idx;
          nextBtn.disabled = false;
        });
        optionsContainer.appendChild(btn);
      });
      qcount.textContent = `Q ${current+1} / ${total}`;
      scoreDisplay.textContent = `Score: ${score}`;
      const percent = Math.round(((current)/total)*100);
      progFill.style.width = `${percent}%`;
      prevBtn.disabled = current === 0;
    }
    function goNext(){
      if(selectedIndex === null) return;
      if(selectedIndex === questions[current].correct){
        score++;
      }
      current++;
      if(current < total){
        renderQuestion();
      } else {
        finishQuiz();
      }
    }

    function goPrev(){
      if(current === 0) return;
      current--;
      renderQuestion();
    }
    const recordedAnswers = new Array(total).fill(null);

    function goNextWithRecord(){
      if(selectedIndex === null) return;
      recordedAnswers[current] = selectedIndex;
      score = recordedAnswers.reduce((acc, val, idx)=>{
        if(val === questions[idx].correct) return acc+1;
        return acc;
      },0);
      current++;
      if(current < total){
        renderQuestion();
        const prevAns = recordedAnswers[current];
        if(prevAns !== null){
          const btn = optionsContainer.querySelector(`[data-index="${prevAns}"]`);
          if(btn){
            btn.click();
          }
        } else {
          const prev = optionsContainer.querySelector('.opt.selected');
          if(prev) prev.classList.remove('selected');
          selectedIndex = null;
          nextBtn.disabled = true;
        }
      } else {
        finishQuiz();
      }
    }

    function goPrevWithRecord(){
      if(current === 0) return;
      if(selectedIndex !== null) recordedAnswers[current] = selectedIndex;
      current--;
      renderQuestion();
      const prevAns = recordedAnswers[current];
      if(prevAns !== null){
        const btn = optionsContainer.querySelector(`[data-index="${prevAns}"]`);
        if(btn) btn.click();
      }
    }
    function finishQuiz(){
      if(timerInterval) clearInterval(timerInterval);
      if(current < total && selectedIndex !== null){
        recordedAnswers[current] = selectedIndex;
      }
      score = recordedAnswers.reduce((acc, val, idx)=>{
        if(val === questions[idx].correct) return acc+1;
        return acc;
      },0);
      quizArea.style.display = 'none';
      resultArea.style.display = 'block';
      const name = localStorage.getItem('quizName') || nameInput.value || 'User';
      let message = '';
      if(score === total){
        message = `🏆 Amazing, ${name}! Perfect ${score}/${total}!`;
      } else if(score > 20){
        message = `🎉 Great job, ${name}! You scored ${score}/${total}.`;
      } else if(score === 20){
        message = `👍 Nice effort, ${name}. You scored exactly 20/${total}.`;
      } else {
        message = `💪 Keep going, ${name}. You scored ${score}/${total}. Practice and try again!`;
      }
      resultBox.innerHTML = `<strong>${message}</strong><br><br>
        <div style="color:var(--muted)">Answers recorded locally. Use 'Retry' to play again.</div>`;
    }
    function saveScore(){
      const name = localStorage.getItem('quizName') || nameInput.value || 'User';
      const scores = JSON.parse(localStorage.getItem('quizScores')||'[]');
      const entry = { name, score, total, date: new Date().toISOString() };
      scores.push(entry);
      localStorage.setItem('quizScores', JSON.stringify(scores));
      alert('Score saved locally.');
    }
    startBtn.addEventListener('click', ()=>{
      const name = nameInput.value.trim();
      if(!name){
        alert('Please enter your name to start.');
        return;
      }
      localStorage.setItem('quizName', name);
      updateHeaderName(name);
      startArea.style.display = 'none';
      quizArea.style.display = 'block';
      for(let i=0;i<total;i++) recordedAnswers[i]=null;
      renderQuestion();
      startTimer();
    });

    clearBtn.addEventListener('click', ()=>{
      nameInput.value = '';
      localStorage.removeItem('quizName');
      updateHeaderName('Welcome — please enter your name below');
    });

    nextBtn.addEventListener('click', ()=> goNextWithRecord());
    prevBtn.addEventListener('click', ()=> goPrevWithRecord());
    retryBtn.addEventListener('click', ()=>{
      current = 0; score = 0; selectedIndex = null;
      for(let i=0;i<total;i++) recordedAnswers[i]=null;
      resultArea.style.display = 'none';
      startArea.style.display = 'block';
      quizArea.style.display = 'none';
      remainingSeconds = 30*60;
      timerDisplay.textContent = formatTime(remainingSeconds);
    });
    saveBtn.addEventListener('click', saveScore);
    const storedName = localStorage.getItem('quizName');
    if(storedName){
      nameInput.value = storedName;
      updateHeaderName(storedName);
    }