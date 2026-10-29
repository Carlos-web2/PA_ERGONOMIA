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


// =========================================
// EXIBIÇÃO DA REFERÊNCIA BIBLIOGRÁFICA DOS TÍTULOS
// =========================================

document.addEventListener("DOMContentLoaded", function () {
    const titulos = document.querySelectorAll(
        "h1, h2, h3, h4, h5, h6"
    );

    // Cria um único balão para todos os títulos.
    const tooltip = document.createElement("div");
    tooltip.className = "font-tooltip";
    tooltip.setAttribute("role", "tooltip");
    tooltip.setAttribute("aria-hidden", "true");
    document.body.appendChild(tooltip);

    let tituloAtivo = null;

    function atualizarTooltip(titulo, x, y) {
        // Pega a referência armazenada no atributo data-referencia do título
        const referenciaTexto = titulo.getAttribute("data-referencia") || "Referência bibliográfica não especificada para este título.";

        tooltip.replaceChildren();

        const linha = document.createElement("div");
        const nome = document.createElement("strong");

        nome.textContent = "Referência Bibliográfica: ";
        linha.append(nome, document.createTextNode(referenciaTexto.replace(/^Referência:\s*/, '')));
        tooltip.appendChild(linha);

        tooltip.style.left = "0px";
        tooltip.style.top = "0px";
        tooltip.classList.add("visible");
        tooltip.setAttribute("aria-hidden", "false");

        const margem = 12;
        const largura = tooltip.offsetWidth;
        const altura = tooltip.offsetHeight;

        let esquerda = x + 14;
        let topo = y + 14;

        if (esquerda + largura > window.innerWidth - margem) {
            esquerda = x - largura - 14;
        }

        if (topo + altura > window.innerHeight - margem) {
            topo = y - altura - 14;
        }

        esquerda = Math.max(
            margem,
            Math.min(esquerda, window.innerWidth - largura - margem)
        );

        topo = Math.max(
            margem,
            Math.min(topo, window.innerHeight - altura - margem)
        );

        tooltip.style.left = esquerda + "px";
        tooltip.style.top = topo + "px";
    }

    function mostrarComMouse(evento) {
        tituloAtivo = evento.currentTarget;

        atualizarTooltip(
            tituloAtivo,
            evento.clientX,
            evento.clientY
        );
    }

    function moverComMouse(evento) {
        if (tituloAtivo === evento.currentTarget) {
            atualizarTooltip(
                tituloAtivo,
                evento.clientX,
                evento.clientY
            );
        }
    }

    function ocultarTooltip() {
        tituloAtivo = null;
        tooltip.classList.remove("visible");
        tooltip.setAttribute("aria-hidden", "true");
    }

    titulos.forEach(function (titulo) {
        // Permite consultar a referência também pelo teclado.
        if (!titulo.hasAttribute("tabindex")) {
            titulo.setAttribute("tabindex", "0");
        }

        titulo.addEventListener("mouseenter", mostrarComMouse);
        titulo.addEventListener("mousemove", moverComMouse);
        titulo.addEventListener("mouseleave", ocultarTooltip);

        titulo.addEventListener("focus", function (evento) {
            tituloAtivo = evento.currentTarget;

            const retangulo = tituloAtivo.getBoundingClientRect();

            atualizarTooltip(
                tituloAtivo,
                retangulo.left,
                retangulo.bottom
            );
        });

        titulo.addEventListener("blur", ocultarTooltip);
    });

    window.addEventListener("scroll", function () {
        if (tituloAtivo) {
            ocultarTooltip();
        }
    }, { passive: true });

    window.addEventListener("resize", ocultarTooltip);
});