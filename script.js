document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Canvas Interactive Particle Background ---
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 60;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            size: Math.random() * 2 + 1
        });
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = '#00f3ff';
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                let p2 = particles[j];
                let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 243, 255, ${1 - dist / 120})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // --- 2. Typing Effect for Roles ---
    const typedTextSpan = document.getElementById('typed-text');
    const roles = [
        "Software Engineer",
        "Cloud & DevOps Enthusiast",
        "AI & Deep Learning Researcher",
        "Full-Stack Developer"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 500;
        }

        setTimeout(type, speed);
    }
    type();

    // --- 3. Web Audio Synth Sound FX ---
    let soundEnabled = false;
    const soundBtn = document.getElementById('sound-btn');
    const soundIcon = document.getElementById('sound-icon');

    soundBtn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        if (soundEnabled) {
            soundIcon.className = 'fas fa-volume-up';
            playTone(880, 0.1);
        } else {
            soundIcon.className = 'fas fa-volume-mute';
        }
    });

    function playTone(freq, duration) {
        if (!soundEnabled) return;
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {}
    }

    // Play tone on button clicks
    document.querySelectorAll('.cyber-btn, .hud-btn, .nav-links a').forEach(btn => {
        btn.addEventListener('click', () => playTone(600, 0.08));
    });

    // --- 4. Interactive Terminal Form Submission ---
    const form = document.getElementById('contact-form');
    const output = document.getElementById('term-output');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('sender-name').value;
        playTone(1000, 0.15);

        output.innerHTML = `<span style="color: var(--neon-blue);">&gt; Transmitting signal...</span>`;
        setTimeout(() => {
            output.innerHTML = `<span style="color: var(--neon-green);">&gt; SUCCESS: Transmission received from ${name}. Sana Ullah will reach out shortly!</span>`;
            form.reset();
        }, 1200);
    });

});