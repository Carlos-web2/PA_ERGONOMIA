// Item 1: Avaliação de Iluminância e Ruído (NR-17)
function avaliarAmbiente() {
    const lux = parseFloat(document.getElementById('lux').value);
    const db = parseFloat(document.getElementById('db').value);
    const divResultado = document.getElementById('resultadoAmbiente');

    if (isNaN(lux) || isNaN(db)) {
        divResultado.innerHTML = "<p style='color:red;'>Por favor, preencha todos os campos corretamente.</p>";
        return;
    }

    let statusLux = lux >= 300 ? "Adequado (Mínimo recomendado para escritórios/estudos é 300 lux)." : "Inadequado (Abaixo do recomendado pela NR-17, pode causar fadiga visual).";
    let statusDb = db <= 65 ? "Adequado (Nível aceitável para ambientes administrativos/estudo)." : "Inadequado (Acima do limite confortável de 65 dB, pode gerar estresse auditivo).";

    divResultado.innerHTML = `
        <h3>Resultado da Análise:</h3>
        <p><strong>Iluminância:</strong> ${statusLux}</p>
        <p><strong>Nível de Ruído:</strong> ${statusDb}</p>
    `;
}

// Item 2: Calculadora Antropométrica para Posto de Trabalho
function calcularPosto() {
    const altura = parseFloat(document.getElementById('altura').value);
    const divResultado = document.getElementById('resultadoPosto');

    if (isNaN(altura) || altura <= 0) {
        divResultado.innerHTML = "<p style='color:red;'>Insira uma altura válida em centímetros.</p>";
        return;
    }

    // Cálculos estimados baseados em proporções antropométricas para postura sentada
    let alturaCadeira = (altura * 0.28).toFixed(1);
    let alturaMesa = (altura * 0.43).toFixed(1);

    divResultado.innerHTML = `
        <h3>Dimensões Recomendadas para o Posto:</h3>
        <p><strong>Altura da Superfície de Trabalho (Mesa):</strong> aprox. ${alturaMesa} cm</p>
        <p><strong>Altura do Assento (Cadeira ajustável):</strong> aprox. ${alturaCadeira} cm</p>
        <p><em>Dica: Os pés devem ficar totalmente apoiados no chão e os cotovelos em ângulo de 90°.</em></p>
    `;
}

// Item 3: Timer Pomodoro para Pausas e Fadiga
let tempoRestante = 1500; // 25 minutos em segundos
let intervaloTimer = null;

function atualizarDisplayTimer() {
    const minutos = Math.floor(tempoRestante / 60);
    const segundos = tempoRestante % 60;
    const display = document.getElementById('timerDisplay');
    if (display) {
        display.innerText = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    }
}

function iniciarPausa() {
    if (intervaloTimer) return;
    intervaloTimer = setInterval(() => {
        if (tempoRestante > 0) {
            tempoRestante--;
            atualizarDisplayTimer();
        } else {
            clearInterval(intervaloTimer);
            intervaloTimer = null;
            alert("Tempo de foco concluído! Faça uma pausa ergonômica de 5 minutos.");
        }
    }, 1000);
}

function pausarTimer() {
    clearInterval(intervaloTimer);
    intervaloTimer = null;
}

function resetarTimer() {
    clearInterval(intervaloTimer);
    intervaloTimer = null;
    tempoRestante = 1500;
    atualizarDisplayTimer();
}