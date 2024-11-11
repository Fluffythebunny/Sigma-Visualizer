const audioFileInput = document.getElementById("audio-file");
const playPauseButton = document.getElementById("playPause");
const resetButton = document.getElementById("reset");
const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");

let audioElement, audioContext, analyser, source;
let analyserData = new Uint8Array(0);

let fallSpeedFactor = 15;

class Particle {
    constructor(x, y, vx, vy, radius) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
        this.alpha = 0.8;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }

    update(audioData) {
        const frequency = audioData[Math.floor(this.x / 2) % audioData.length];

        this.x += this.vx;
        this.y += this.vy;

        this.vx += (Math.random() - 0.5) * 0.5;
        this.vy += (Math.random() - 0.5) * 0.5;

        const intensity = this.calculateIntensity(audioData);
        const speedFactor = intensity / 255;

        this.vy = speedFactor * fallSpeedFactor;

        this.vx *= 0.99;
        this.vy *= 0.99;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    calculateIntensity(audioData) {
        const total = audioData.reduce((sum, value) => sum + value, 0);
        return total / audioData.length;
    }

    draw(audioData) {
        const frequency = audioData[Math.floor(this.x / 2) % audioData.length];
        const pulse = Math.sin(frequency * 0.1) * 2 + 4;
        const alpha = Math.abs(Math.sin(frequency * 0.1)) * 0.8 + 0.2;
        this.radius = pulse;

        const glowIntensity = Math.max(...audioData) / 255;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;

        ctx.shadowBlur = 20 * glowIntensity;
        ctx.shadowColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        ctx.globalAlpha = alpha;
        ctx.fill();
    }
}

let particles = [];

audioFileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        if (audioElement) {
            audioElement.pause();
        }
        audioElement = new Audio(URL.createObjectURL(file));
        audioElement.addEventListener("play", () => {
            createAudioContext();
            source = audioContext.createMediaElementSource(audioElement);
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            analyserData = new Uint8Array(analyser.frequencyBinCount);
            initializeVisualizer();
        });
    }
});

playPauseButton.addEventListener("click", () => {
    if (audioElement.paused) {
        audioElement.play();
        playPauseButton.textContent = "Pause";
    } else {
        audioElement.pause();
        playPauseButton.textContent = "Play";
    }
});

resetButton.addEventListener("click", () => {
    if (audioElement) {
        audioElement.currentTime = 0;
        audioElement.play();
        playPauseButton.textContent = "Pause";
        initializeVisualizer();
    }
});

document.getElementById("speedFactor").addEventListener("input", (event) => {
    fallSpeedFactor = parseFloat(event.target.value);
});

function createAudioContext() {
    if (audioContext) {
        audioContext.close();
    }
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
}

function initializeVisualizer() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderAudioVisualizer();
}

function renderAudioVisualizer() {
    analyser.getByteFrequencyData(analyserData);

    if (particles.length < 100) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const vx = Math.random() * 0.5 - 0.25;
        const vy = Math.random() * 0.5 - 0.25;
        particles.push(new Particle(x, y, vx, vy, Math.random() * 5 + 3));
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
        particle.update(analyserData);
        particle.draw(analyserData);
    });

    requestAnimationFrame(renderAudioVisualizer);
}
