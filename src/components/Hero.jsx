import { useEffect, useRef } from 'react';

const profileImage = 'https://media.licdn.com/dms/image/v2/C5603AQG7gQbdy5U5WA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1640446633611?e=1792022400&v=beta&t=BjIlth0jj7fef8cfjOoMOPtyGeVeS0752ZJbBmfWg2Q';

export default function Hero() {
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
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="status-badge"><span className="status-dot" />Open for Roles & Freelance</div>
        <p className="hero-title">Creative Full-Stack Engineer</p>
        <h1 className="hero-name">Pradeep Kanwal</h1>
        <p className="hero-bio">Building fast, scalable web architectures, modern reactive interfaces, and automated workflow pipelines with cutting-edge tech precision.</p>
        <div className="hero-cta">
          <a href="https://www.linkedin.com/in/pradeep-kanwal-064979228/" target="_blank" rel="noreferrer" className="btn-solid"><i className="fab fa-linkedin" /> LinkedIn Profile</a>
          <a href="#projects" className="btn-glass">Explore Work <i className="fas fa-arrow-down" /></a>
        </div>
      </div>

      <div className="hero-3d-stage" ref={stageRef} aria-label="Interactive profile portrait">
        <div className="portrait-card-3d" ref={cardRef}>
          <div className="specular-light" ref={lightRef} />
          <div className="avatar-pod" ref={avatarRef}>
            <img ref={imageRef} src={profileImage} alt="Portrait of Pradeep Kanwal" className="avatar-img" />
          </div>
          <div className="floating-pill-badge">BCA Graduate · 2022</div>
        </div>
      </div>
    </section>
  );
}
