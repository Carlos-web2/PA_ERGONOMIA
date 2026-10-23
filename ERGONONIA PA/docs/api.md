# Documentação Técnica das Funções (script.js)

Este documento descreve as funções implementadas no arquivo `src/script.js` para o funcionamento dos simuladores do portal.

## 1. `avaliarAmbiente()`
Avalia os níveis de iluminação e ruído informados pelo usuário, comparando-os com os parâmetros da NR-17 e ISO 8995-1.

- **Entradas (DOM):**
  - `#lux`: Valor numérico da iluminância em Lux.
  - `#db`: Valor numérico do nível de ruído em decibéis.
- **Saída:**
  - Renderiza o diagnóstico textual no elemento `#resultadoAmbiente`.
- **Critérios:**
  - `Lux >= 300`: Considerado adequado para ambientes de escritório ou estudo.
  - `dB <= 65`: Considerado adequado para concentração e conforto acústico.

## 2. `calcularPosto()`
Calcula as dimensões antropométricas estimadas para mesas e assentos com base na altura total do operador.

- **Entradas (DOM):**
  - `#altura`: Estatura do usuário em centímetros.
- **Saída:**
  - Renderiza as medidas recomendadas no elemento `#resultadoPosto`.
- **Fórmulas de Cálculo:**
  - Altura da superfície de trabalho (mesa) = Estatura $\times$ 0.43
  - Altura do assento (cadeira) = Estatura $\times$ 0.28

## 3. Módulo de Timer Pomodoro
Funções de controle de tempo para gerenciamento de ciclos de foco e pausas preventivas.

- `iniciarPausa()`: Inicia a contagem regressiva de segundos.
- `pausarTimer()`: Interrompe o temporizador mantendo o tempo atual.
- `resetarTimer()`: Restaura o temporizador para o padrão de 25 minutos (1500 segundos).
- `atualizarDisplayTimer()`: Atualiza o elemento `#timerDisplay` no DOM com o formato `MM:SS`.