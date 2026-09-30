import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SectionHeader from './components/SectionHeader';

const projects = [
  { icon:'fa-shopping-bag', title:'Kartivo E-Commerce', text:'Complete e-commerce platform deployment with WordPress, security hardening, optimized assets, and payment gateway integration.', tags:['WordPress','Security','CMS'] },
  { icon:'fa-network-wired', title:'API Automation Pipeline', text:'Multi-step business automations connecting webhook listeners, MongoDB storage, and data parsing routines for zero-touch workflows.', tags:['Python','MongoDB','Webhooks'] },
  { icon:'fa-code', title:'Interactive 3D Portfolio', text:'Modern personal portfolio featuring cursor tracking, frosted glass aesthetics, CSS 3D depth, and responsive architecture.', tags:['React','JavaScript','CSS 3D'] },
];

const skillGroups = [
  { title:'Frontend Engineering', skills:[['fa-js','JavaScript (ES6+)'],['fa-html5','HTML5 / Semantic Web'],['fa-css3-alt','CSS3 & 3D Perspective'],['fa-mobile-screen-button','Responsive Layouts'],['fa-arrows-rotate','Async API Integration']] },
  { title:'Backend & Systems', skills:[['fa-python','Python Scripting'],['fa-database','MongoDB & NoSQL'],['fa-server','RESTful Architecture'],['fa-wordpress','WordPress & Plugins']] },
  { title:'Tools & Automation', skills:[['fa-gears','Workflow Automation'],['fa-shield-halved','Web Application Security'],['fa-git-alt','Git & Version Control'],['fa-brain','Generative AI Tooling']] },
];

function CursorFX() {
  const dotRef=useRef(null), auraRef=useRef(null); const [interactive,setInteractive]=useState(false);
  useEffect(()=>{const dot=dotRef.current,aura=auraRef.current;if(!dot||!aura)return;let mx=innerWidth/2,my=innerHeight/2,ax=mx,ay=my,frame;
    const move=e=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate3d(${mx}px,${my}px,0) translate(-50%,-50%)`};
    const render=()=>{ax+=(mx-ax)*.15;ay+=(my-ay)*.15;aura.style.transform=`translate3d(${ax}px,${ay}px,0) translate(-50%,-50%)`;frame=requestAnimationFrame(render)};
    const over=e=>{if(e.target.closest('a,button,.glass-card,.skill-badge'))setInteractive(true)}; const out=e=>{if(!e.relatedTarget?.closest?.('a,button,.glass-card,.skill-badge'))setInteractive(false)};
    addEventListener('mousemove',move);addEventListener('mouseover',over);addEventListener('mouseout',out);frame=requestAnimationFrame(render);
    return()=>{removeEventListener('mousemove',move);removeEventListener('mouseover',over);removeEventListener('mouseout',out);cancelAnimationFrame(frame)};
  },[]);
  return <><div ref={dotRef} className="cursor-dot"/><div ref={auraRef} className={`cursor-aura ${interactive?'cursor-aura--active':''}`}/></>;
}

function MeshBackground(){
  const canvasRef=useRef(null);
  useEffect(()=>{const canvas=canvasRef.current,ctx=canvas.getContext('2d'),dots=[],spacing=50;let frame,mx=innerWidth/2,my=innerHeight/2;
    const resize=()=>{const dpr=devicePixelRatio||1;canvas.width=innerWidth*dpr;canvas.height=innerHeight*dpr;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx.setTransform(dpr,0,0,dpr,0,0);dots.length=0;for(let x=0;x<innerWidth;x+=spacing)for(let y=0;y<innerHeight;y+=spacing)dots.push({x,y,ox:x,oy:y})};
    const move=e=>{mx=e.clientX;my=e.clientY}; const render=()=>{ctx.clearRect(0,0,innerWidth,innerHeight);ctx.fillStyle='rgba(255,255,255,.20)';dots.forEach(dot=>{const dx=mx-dot.ox,dy=my-dot.oy,distance=Math.hypot(dx,dy),max=200;if(distance>0&&distance<max){const force=(max-distance)/max;dot.x=dot.ox-(dx/distance)*force*15;dot.y=dot.oy-(dy/distance)*force*15}else{dot.x+=(dot.ox-dot.x)*.1;dot.y+=(dot.oy-dot.y)*.1}ctx.fillRect(dot.x,dot.y,1.5,1.5)});frame=requestAnimationFrame(render)};
    resize();addEventListener('resize',resize);addEventListener('mousemove',move);frame=requestAnimationFrame(render);return()=>{removeEventListener('resize',resize);removeEventListener('mousemove',move);cancelAnimationFrame(frame)};
  },[]);
  return <canvas ref={canvasRef} id="mesh-canvas" aria-hidden="true"/>;
}

export default function App(){
  return <><CursorFX/><MeshBackground/><Navbar/><div className="app-viewport"><Hero/>
    <section id="about"><SectionHeader eyebrow="Engineering Philosophy">About <span>My Work</span></SectionHeader><div className="grid-3">{[['fa-cubes','Full-Stack Mindset','Architecting clean, maintainable frontend structures coupled with scalable backend APIs and secure database models.'],['fa-bolt','Fluid Interaction & 3D','Crafting dynamic micro-interactions, responsive Canvas visuals, and frictionless UX journeys.'],['fa-robot','System Automation','Bridging custom code with web triggers, third-party APIs, and cloud services to eliminate repetitive operations.']].map(([icon,title,text])=><article className="glass-card" key={title}><div className="card-icon"><i className={`fas ${icon}`}/></div><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section id="projects"><SectionHeader eyebrow="Selected Works">Featured <span>Projects</span></SectionHeader><div className="grid-3">{projects.map(p=><article className="glass-card project-card" key={p.title}><div><div className="card-icon"><i className={`fas ${p.icon}`}/></div><h3>{p.title}</h3><p>{p.text}</p></div><div className="project-tags">{p.tags.map(tag=><span className="tag-pill" key={tag}>{tag}</span>)}</div></article>)}</div></section>
    <section id="skills"><SectionHeader eyebrow="Tech Stack & Tools">Skills <span>Matrix</span></SectionHeader><div className="glass-card skills-panel">{skillGroups.map(g=><div className="tech-category" key={g.title}><h4>{g.title}</h4><div className="skill-badges">{g.skills.map(([icon,label])=><span className="skill-badge" key={label}><i className={`fab ${icon}`}/>{label}</span>)}</div></div>)}</div></section>
    <section id="education"><SectionHeader eyebrow="Academic Milestone">Education <span>Background</span></SectionHeader><div className="edu-box"><div><span className="tag-white"><i className="fas fa-graduation-cap"/> Passed in 2022</span><h3>Bachelor of Computer Applications (BCA)</h3><p className="edu-school">Maharaja Agrasen Himalayan Garhwal University (HGU)</p><p className="edu-copy">Graduated with core foundations in Software Development, Database Management Systems, Data Structures, Computer Architecture, and Modern Web Applications.</p></div><a href="https://www.hgu.ac.in/" target="_blank" rel="noreferrer" className="btn-solid"><i className="fas fa-external-link-alt"/> Visit HGU</a></div></section>
    <section id="contact"><SectionHeader eyebrow="Let's Connect">Get In <span>Touch</span></SectionHeader><div className="glass-card contact-card"><h3>Let's Build Something Great Together</h3><p>I am always excited to discuss web development projects, freelance challenges, or engineering collaborations.</p><div className="contact-actions"><a href="https://www.linkedin.com/in/pradeep-kanwal-064979228/" target="_blank" rel="noreferrer" className="btn-solid"><i className="fab fa-linkedin"/> Connect on LinkedIn</a><a href="https://kartivo.com" target="_blank" rel="noreferrer" className="btn-glass"><i className="fas fa-globe"/> Visit Kartivo.com</a></div></div></section>
    <footer>© 2026 Pradeep Kanwal · Full-Stack Engineer · Built with React + Interactive 3D Depth</footer>
  </div></>;
}