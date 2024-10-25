const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let apple = { x: 5, y: 5 };
let message = "";
const box = 20;
const messages = [
  "Você é a razão do meu sorriso!",
  "Te amo mais do que palavras podem dizer.",
  "Você é meu sonho tornado realidade.",
  "Com você, tudo é mais bonito!",
  "Meu amor por você só cresce.",
  "Você faz meu coração bater mais rápido!",
  "Amo você hoje, amanhã e sempre."
];
let speed = 200; // Tempo em milissegundos entre os movimentos

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenhar a cobra
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "green" : "lightgreen";
    ctx.fillRect(snake[i].x * box, snake[i].y * box, box, box);
  }

  // Desenhar a maçã
  ctx.fillStyle = "red";
  ctx.fillRect(apple.x * box, apple.y * box, box, box);

  // Mover a cobra
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Verifica se a cobra sai da tela e ajusta a posição
  if (head.x < 0) head.x = canvas.width / box - 1;
  if (head.x >= canvas.width / box) head.x = 0;
  if (head.y < 0) head.y = canvas.height / box - 1;
  if (head.y >= canvas.height / box) head.y = 0;

  snake.unshift(head);

  // Verifica se a cobra comeu a maçã
  if (head.x === apple.x && head.y === apple.y) {
    // Seleciona uma mensagem aleatória
    message = messages[Math.floor(Math.random() * messages.length)];
    // Gerar nova maçã
    apple = {
      x: Math.floor(Math.random() * (canvas.width / box)),
      y: Math.floor(Math.random() * (canvas.height / box))
    };
  } else {
    snake.pop();
  }

  // Desenhar a mensagem romântica
  if (message) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.fillRect(0, 0, canvas.width, 50); // Área da mensagem
    ctx.fillStyle = "black"; // Muda a cor da fonte para preto
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText(message, canvas.width / 2, 30); // Centraliza a mensagem
  }

  // Desenhar o nome no canto inferior direito
  ctx.fillStyle = "black"; // Cor do texto
  ctx.font = "16px Arial";
  ctx.textAlign = "right";
  ctx.fillText("Lilian Gandra", canvas.width - 10, canvas.height - 10); // Posição do nome

  setTimeout(draw, speed); // Controla a velocidade da cobra
}

// Controlar a cobra com os botões
document.getElementById("up").addEventListener("click", () => {
  if (direction.y === 0) {
    direction = { x: 0, y: -1 };
  }
});

document.getElementById("down").addEventListener("click", () => {
  if (direction.y === 0) {
    direction = { x: 0, y: 1 };
  }
});

document.getElementById("left").addEventListener("click", () => {
  if (direction.x === 0) {
    direction = { x: -1, y: 0 };
  }
});

document.getElementById("right").addEventListener("click", () => {
  if (direction.x === 0) {
    direction = { x: 1, y: 0 };
  }
});

draw(); // Inicia o jogo
