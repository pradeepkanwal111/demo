import { useEffect, useRef, useState } from 'react';

const profileImage =
  'https://media.licdn.com/dms/image/v2/C5603AQG7gQbdy5U5WA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1640446633611?e=1792022400&v=beta&t=BjIlth0jj7fef8cfjOoMOPtyGeVeS0752ZJbBmfWg2Q';

const projects = [
  {
    icon: 'fa-shopping-bag',
    title: 'Kartivo E-Commerce',
    text: 'Complete e-commerce platform deployment with WordPress, security hardening, optimized assets, and payment gateway integration.',
    tags: ['WordPress', 'Security', 'CMS'],
  },
  {
    icon: 'fa-network-wired',
    title: 'API Automation Pipeline',
    text: 'Multi-step business automations connecting webhook listeners, MongoDB storage, and data parsing routines for zero-touch workflows.',
    tags: ['Python', 'MongoDB', 'Webhooks'],
  },
  {
    icon: 'fa-code',
    title: 'Interactive 3D Portfolio',
    text: 'Modern personal portfolio featuring cursor tracking, frosted glass aesthetics, CSS 3D depth, and responsive architecture.',
    tags: ['React', 'JavaScript', 'CSS 3D'],
  },
];

const skillGroups = [
  {
    title: 'Frontend Engineering',
    skills: [
      ['fa-js', 'JavaScript (ES6+)'],
      ['fa-html5', 'HTML5 / Semantic Web'],
      ['fa-css3-alt', 'CSS3 & 3D Perspective'],
      ['fa-mobile-screen-button', 'Responsive Layouts'],
      ['fa-arrows-rotate', 'Async API Integration'],
    ],
  },
  {
    title: 'Backend & Systems',
    skills: [
      ['fa-python', 'Python Scripting'],
      ['fa-database', 'MongoDB & NoSQL'],
      ['fa-server', 'RESTful Architecture'],
      ['fa-wordpress', 'WordPress & Plugins'],
    ],
  },
  {
    title: 'Tools & Automation',
    skills: [
      ['fa-gears', 'Workflow Automation'],
      ['fa-shield-halved', 'Web Application Security'],
      ['fa-git-alt', 'Git & Version Control'],
      ['fa-brain', 'Generative AI Tooling'],
    ],
  },
];

function CursorFX() {
  const dotRef = useRef(null);
  const auraRef = useRef(null);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const aura = auraRef.current;
    if (!dot || !aura) return;

    let mouseX = innerWidth / 2;
    let mouseY = innerHeight / 2;
    let auraX = mouseX;
    let auraY = mouseY;
    let frame;

    const move = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    const render = () => {
      auraX += (mouseX - auraX) * 0.15;
      auraY += (mouseY - auraY) * 0.15;
      aura.style.transform = `translate3d(${auraX}px, ${auraY}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(render);
    };

    const onOver = (event) => {
      if (event.target.closest('a, button, .glass-card, .skill-badge')) setInteractive(true);
    };
    const onOut = (event) => {
      if (!event.relatedTarget?.closest?.('a, button, .glass-card, .skill-badge')) setInteractive(false);
    };

    addEventListener('mousemove', move);
    addEventListener('mouseover', onOver);
    addEventListener('mouseout', onOut);
    frame = requestAnimationFrame(render);

    return () => {
      removeEventListener('mousemove', move);
      removeEventListener('mouseover', onOver);
      removeEventListener('mouseout', onOut);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={auraRef} className={`cursor-aura ${interactive ? 'cursor-aura--active' : ''}`} />
    </>
  );
}

function MeshBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const spacing = 50;
    const dots = [];
    let width = 0;
    let height = 0;
    let frame;

    const resize = () => {
      width = canvas.width = innerWidth * devicePixelRatio;
      height = canvas.height = innerHeight * devicePixelRatio;
      canvas.style.width = innerWidth + 'px';
      canvas.style.height = innerHeight + 'px';
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      dots.length = 0;
      for (let x = 0; x < innerWidth; x += spacing) {
        for (let y = 0; y < innerHeight; y += spacing) {
          dots.push({ x, y, ox: x, oy: y });
        }
      }
    };

    let mouseX = innerWidth / 2;
    let mouseY = innerHeight / 2;

    const move = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const render = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      ctx.fillStyle = 'rgba(255,255,255,.20)';

      dots.forEach((dot) => {
        const dx = mouseX - dot.ox;
        const dy = mouseY - dot.oy;
        const distance = Math.hypot(dx, dy);
        const maxDistance = 200;

        if (distance > 0 && distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          dot.x = dot.ox - (dx / distance) * force * 15;
          dot.y = dot.oy - (dy / distance) * force * 15;
        } else {
          dot.x += (dot.ox - dot.x) * 0.1;
          dot.y += (dot.oy - dot.y) * 0.1;
        }

        ctx.fillRect(dot.x, dot.y, 1.5, 1.5);
      });

      frame = requestAnimationFrame(render);
    };

    resize();
    addEventListener('resize', resize);
    addEventListener('mousemove', move);
    frame = requestAnimationFrame(render);

    return () => {
      removeEventListener('resize', resize);
      removeEventListener('mousemove', move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} id="mesh-canvas" aria-hidden="true" />;
}

function TiltCard() {
  const stageRef = useRef(null);
  const cardRef = useRef(null);
  const avatarRef = useRef(null);
  const imageRef = useRef(null);
  const lightRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    const card = cardRef.current;
    const avatar = avatarRef.current;
    const image = imageRef.current;
    const light = lightRef.current;
    if (!stage || !card) return;

    const move = (event) => {
      const rect = stage.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) / (innerWidth / 2);
      const dy = (event.clientY - (rect.top + rect.height / 2)) / (innerHeight / 2);
      card.style.transform = `rotateX(${-dy * 26}deg) rotateY(${dx * 26}deg)`;
      if (avatar) avatar.style.transform = `translateZ(50px) translate(${dx * 14}px, ${dy * 14}px)`;
      if (image) image.style.transform = `scale(1.08) translate(${dx * -8}px, ${dy * -8}px)`;
      if (light) {
        const lx = ((event.clientX - rect.left) / rect.width) * 100;
        const ly = ((event.clientY - rect.top) / rect.height) * 100;
        light.style.background = `radial-gradient(circle at ${lx}% ${ly}%, rgba(255,255,255,.45), transparent 60%)`;
      }
    };

    const reset = () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
      if (avatar) avatar.style.transform = 'translateZ(50px)';
      if (image) image.style.transform = 'scale(1.08)';
    };

    addEventListener('mousemove', move);
    stage.addEventListener('mouseleave', reset);
    return () => {
      removeEventListener('mousemove', move);
      stage.removeEventListener('mouseleave', reset);
    };
  }, []);

  return (
    <div className="hero-3d-stage" ref={stageRef}>
      <div className="portrait-card-3d" ref={cardRef}>
        <div className="specular-light" ref={lightRef} />
        <div className="avatar-pod" ref={avatarRef}>
          <img
            ref={imageRef}
            src={profileImage}
            onError={(event) => { event.currentTarget.src = '/my-3d-avatar.png'; }}
            alt="Pradeep Kanwal"
            className="avatar-img"
          />
        </div>
        <div className="floating-pill-badge">BCA Graduate · 2022</div>
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, children }) {
  return (
    <div className="section-header">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="section-heading">{children}</h2>
    </div>
  );
}

export default function App() {
  return (
    <>
      <CursorFX />
      <MeshBackground />

      <header className="site-header">
        <nav className="nav-pill" aria-label="Primary navigation">
          {[
            ['About', '#about'],
            ['Work', '#projects'],
            ['Skills', '#skills'],
            ['Education', '#education'],
            ['Contact', '#contact'],
          ].map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
      </header>

      <div className="app-viewport">
        <main className="hero" id="home">
          <div className="hero-content">
            <div className="status-badge"><span className="status-dot" />Open for Roles & Freelance</div>
            <p className="hero-title">Creative Full-Stack Engineer</p>
            <h1 className="hero-name">Pradeep Kanwal</h1>
            <p className="hero-bio">
              Building fast, scalable web architectures, modern reactive interfaces, and automated workflow pipelines with cutting-edge tech precision.
            </p>
            <div className="hero-cta">
              <a href="https://www.linkedin.com/in/pradeep-kanwal-064979228/" target="_blank" rel="noreferrer" className="btn-solid">
                <i className="fab fa-linkedin" /> LinkedIn Profile
              </a>
              <a href="#projects" className="btn-glass">Explore Work <i className="fas fa-arrow-down" /></a>
            </div>
          </div>
          <TiltCard />
        </main>

        <section id="about">
          <SectionHeader eyebrow="Engineering Philosophy">About <span>My Work</span></SectionHeader>
          <div className="grid-3">
            {[
              ['fa-cubes', 'Full-Stack Mindset', 'Architecting clean, maintainable frontend structures coupled with scalable backend APIs and secure database models.'],
              ['fa-bolt', 'Fluid Interaction & 3D', 'Crafting dynamic micro-interactions, responsive Canvas visuals, and frictionless UX journeys.'],
              ['fa-robot', 'System Automation', 'Bridging custom code with web triggers, third-party APIs, and cloud services to eliminate repetitive operations.'],
            ].map(([icon, title, text]) => (
              <article className="glass-card" key={title}>
                <div className="card-icon"><i className={`fas ${icon}`} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="projects">
          <SectionHeader eyebrow="Selected Works">Featured <span>Projects</span></SectionHeader>
          <div className="grid-3">
            {projects.map((project) => (
              <article className="glass-card project-card" key={project.title}>
                <div>
                  <div className="card-icon"><i className={`fas ${project.icon}`} /></div>
                  <h3>{project.title}</h3>
                  <p>{project.text}</p>
                </div>
                <div className="project-tags">{project.tags.map((tag) => <span className="tag-pill" key={tag}>{tag}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills">
          <SectionHeader eyebrow="Tech Stack & Tools">Skills <span>Matrix</span></SectionHeader>
          <div className="glass-card skills-panel">
            {skillGroups.map((group) => (
              <div className="tech-category" key={group.title}>
                <h4>{group.title}</h4>
                <div className="skill-badges">
                  {group.skills.map(([icon, label]) => (
                    <span className="skill-badge" key={label}><i className={`fab ${icon}`} />{label}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="education">
          <SectionHeader eyebrow="Academic Milestone">Education <span>Background</span></SectionHeader>
          <div className="edu-box">
            <div>
              <span className="tag-white"><i className="fas fa-graduation-cap" /> Passed in 2022</span>
              <h3>Bachelor of Computer Applications (BCA)</h3>
              <p className="edu-school">Maharaja Agrasen Himalayan Garhwal University (HGU)</p>
              <p className="edu-copy">Graduated with core foundations in Software Development, Database Management Systems, Data Structures, Computer Architecture, and Modern Web Applications.</p>
            </div>
            <a href="https://www.hgu.ac.in/" target="_blank" rel="noreferrer" className="btn-solid"><i className="fas fa-external-link-alt" /> Visit HGU</a>
          </div>
        </section>

        <section id="contact">
          <SectionHeader eyebrow="Let's Connect">Get In <span>Touch</span></SectionHeader>
          <div className="glass-card contact-card">
            <h3>Let's Build Something Great Together</h3>
            <p>I am always excited to discuss web development projects, freelance challenges, or engineering collaborations.</p>
            <div className="contact-actions">
              <a href="https://www.linkedin.com/in/pradeep-kanwal-064979228/" target="_blank" rel="noreferrer" className="btn-solid"><i className="fab fa-linkedin" /> Connect on LinkedIn</a>
              <a href="https://kartivo.com" target="_blank" rel="noreferrer" className="btn-glass"><i className="fas fa-globe" /> Visit Kartivo.com</a>
            </div>
          </div>
        </section>

        <footer>© 2026 Pradeep Kanwal · Full-Stack Engineer · Built with Interactive 3D Depth</footer>
      </div>
    </>
  );
}