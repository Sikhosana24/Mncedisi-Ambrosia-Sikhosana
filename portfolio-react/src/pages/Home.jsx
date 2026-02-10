import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass.js";

const navItems = ["Home", "About", "Portfolio", "Skills", "Contact"];

const latestProjects = [
  {
    title: "App Design",
    subtitle: "Cinematic UI systems with bold storytelling.",
  },
  {
    title: "Web Design",
    subtitle: "Neon interfaces tuned for conversion and clarity.",
  },
];

const skillIcons = [
  { name: "Figma", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg" },
  { name: "Blender", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/blender/blender-original.svg" },
  { name: "After Effects", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/aftereffects/aftereffects-original.svg" },
  { name: "Lottie", logo: "https://raw.githubusercontent.com/airbnb/lottie-web/master/docs/_assets/lottie-logo.svg" },
  { name: "React", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" },
  { name: "Vite", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vitejs/vitejs-original.svg" },
  { name: "Tailwind CSS", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg" },
  { name: "Framer Motion", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/framermotion/framermotion-original.svg" },
  { name: "GSAP", logo: "https://raw.githubusercontent.com/greensock/GSAP/master/assets/gsap-logo.svg" },
  { name: "Three.js", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/threejs/threejs-original.svg" },
];

const specialties = [
  {
    title: "UI/UX Design",
    text: "Interface systems, product storytelling, and prototyping.",
  },
  {
    title: "Web Development",
    text: "High-performance React builds with scalable architecture.",
  },
  {
    title: "Motion Graphics",
    text: "Micro-interactions, animated branding, and cinematic flow.",
  },
];

export default function Home() {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const [skillsPage, setSkillsPage] = useState(1);
  const skillsPerPage = 6;
  const totalSkillPages = Math.max(1, Math.ceil(skillIcons.length / skillsPerPage));
  const skillPageStart = (skillsPage - 1) * skillsPerPage;
  const pagedSkills = skillIcons.slice(skillPageStart, skillPageStart + skillsPerPage);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(".neon-nav", {
        y: -30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.from(".hero-core h1 span, .hero-core h1", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.1,
      });

      gsap.from(".hero-subtitle, .hero-desc", {
        y: 16,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        delay: 0.2,
        stagger: 0.1,
      });

      gsap.from(".hero-actions a", {
        y: 10,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.3,
        stagger: 0.12,
      });

      gsap.from(".panel", {
        y: 24,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
      });

      gsap.from(".skill-pill, .mini-card", {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.05,
        delay: 0.4,
      });

      gsap.from(".specialty-card", {
        y: 20,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.2,
      });

      gsap.to(".grid-glow", {
        opacity: 0.35,
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(".orb-a", {
        x: -20,
        y: 30,
        duration: 10,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".orb-b", {
        x: 25,
        y: -20,
        duration: 12,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".orb-c", {
        x: -15,
        y: -25,
        duration: 11,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.utils.toArray(".section-title").forEach((title) => {
        gsap.from(title, {
          opacity: 0,
          y: 25,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: title,
            start: "top 80%",
          },
        });
      });

      gsap.utils.toArray(".about-row, .specialties, .skills-showcase, .contact-row").forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 12;

    const group = new THREE.Group();
    scene.add(group);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = "anonymous";
    const boxGeometry = new THREE.BoxGeometry(1, 1, 0.12);

    const fallbackPalette = [
      "#0ea5e9",
      "#22c55e",
      "#f97316",
      "#a855f7",
      "#eab308",
      "#f43f5e",
      "#38bdf8",
      "#6366f1",
      "#14b8a6",
      "#f59e0b",
    ];

    const makeFallbackTexture = (label, color) => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "rgba(10, 15, 26, 0.95)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = color;
      ctx.lineWidth = 6;
      ctx.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);
      ctx.fillStyle = color;
      ctx.font = "bold 96px Manrope, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(label.slice(0, 2).toUpperCase(), canvas.width / 2, canvas.height / 2);
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    const frontMeshes = [];
    const logoMeshes = skillIcons.map((skill, i) => {
      const fallbackTexture = makeFallbackTexture(skill.name, fallbackPalette[i % fallbackPalette.length]);

      const frontMaterial = new THREE.MeshStandardMaterial({
        map: fallbackTexture,
        transparent: true,
        alphaTest: 0.05,
        roughness: 0.35,
        metalness: 0.2,
        emissiveMap: fallbackTexture,
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 0.85,
      });

      const sideMaterial = new THREE.MeshStandardMaterial({
        color: 0x0b1220,
        roughness: 0.8,
        metalness: 0.1,
        transparent: true,
        opacity: 0.9,
      });

      const materials = [
        sideMaterial,
        sideMaterial,
        sideMaterial,
        sideMaterial,
        frontMaterial,
        frontMaterial,
      ];

      const front = new THREE.Mesh(boxGeometry, materials);
      frontMeshes.push(front);

      const glowMaterial = new THREE.MeshBasicMaterial({
        map: fallbackTexture,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const glowPlane = new THREE.Mesh(new THREE.PlaneGeometry(1.12, 1.12), glowMaterial);
      glowPlane.position.z = 0.08;

      const edgeMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.35,
      });
      const edgeGeo = new THREE.EdgesGeometry(boxGeometry);
      const edges = new THREE.LineSegments(edgeGeo, edgeMaterial);

      const logoGroup = new THREE.Group();
      logoGroup.add(front, glowPlane, edges);
      logoGroup.position.set(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );

      const scale = 1.6 + (i % 4) * 0.45;
      logoGroup.scale.setScalar(scale);
      logoGroup.rotation.set(Math.random(), Math.random(), Math.random());
      logoGroup.userData = {
        baseZ: logoGroup.position.z,
        baseScale: scale,
        floatSpeed: 0.35 + Math.random() * 0.5,
        floatOffset: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.004,
        frontMaterial,
        glowMaterial,
        sideMaterial,
        edgeMaterial,
      };
      group.add(logoGroup);
      return logoGroup;
    });

    skillIcons.forEach((skill, i) => {
      textureLoader.load(
        skill.logo,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.anisotropy = 8;
          const mesh = frontMeshes[i];
          if (!mesh) return;
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          materials.forEach((mat) => {
            if (mat.map) {
              mat.map = tex;
            }
            if (mat.emissiveMap) {
              mat.emissiveMap = tex;
            }
            mat.needsUpdate = true;
          });
          const glow = logoMeshes[i]?.userData?.glowMaterial;
          if (glow) {
            glow.map = tex;
            glow.needsUpdate = true;
          }
        },
        undefined,
        () => {}
      );
    });

    const keyLight = new THREE.PointLight(0xffffff, 1.6, 100);
    keyLight.position.set(6, 6, 10);
    const rimLight = new THREE.PointLight(0x38bdf8, 1.2, 100);
    rimLight.position.set(-8, 4, 6);
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(keyLight, rimLight, ambient);

    const particleCount = 400;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 40;
      positions[i + 1] = (Math.random() - 0.5) * 25;
      positions[i + 2] = (Math.random() - 0.5) * 30;
    }
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });
    const starField = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(starField);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.35,
      0.9,
      0.2
    );
    composer.addPass(bloomPass);
    const bokehPass = new BokehPass(scene, camera, {
      focus: 12,
      aperture: 0.00014,
      maxblur: 0.006,
    });
    composer.addPass(bokehPass);

    const onResize = () => {
      const { innerWidth, innerHeight } = window;
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
      composer.setSize(innerWidth, innerHeight);
      bloomPass.setSize(innerWidth, innerHeight);
    };
    onResize();
    window.addEventListener("resize", onResize);

    let frameId;
    const clock = new THREE.Clock();
    const mouse = new THREE.Vector2(0, 0);
    const raycaster = new THREE.Raycaster();
    let hovered = null;

    const handleMouse = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouse);

    const applyFocus = (mesh, focusFactor) => {
      const { frontMaterial, glowMaterial, sideMaterial, edgeMaterial } = mesh.userData;
      const baseOpacity = 0.45 + 0.55 * focusFactor;
      frontMaterial.opacity = baseOpacity;
      glowMaterial.opacity = 0.2 + 0.5 * focusFactor;
      sideMaterial.opacity = 0.6 + 0.4 * focusFactor;
      edgeMaterial.opacity = 0.2 + 0.5 * focusFactor;
      frontMaterial.needsUpdate = true;
      glowMaterial.needsUpdate = true;
    };

    const animate = () => {
      const t = clock.getElapsedTime();
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(frontMeshes, false);
      hovered = hits.length ? hits[0].object.parent : null;

      logoMeshes.forEach((mesh) => {
        mesh.position.y += Math.sin(t * mesh.userData.floatSpeed + mesh.userData.floatOffset) * 0.002;
        mesh.position.x += Math.cos(t * mesh.userData.floatSpeed + mesh.userData.floatOffset) * 0.0015;
        mesh.rotation.y += mesh.userData.spin;
        mesh.rotation.x += mesh.userData.spin * 0.6;
        const targetScale = hovered === mesh ? mesh.userData.baseScale * 1.15 : mesh.userData.baseScale;
        mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
        const targetZ = mesh.userData.baseZ + (hovered === mesh ? 1.2 : 0);
        mesh.position.z += (targetZ - mesh.position.z) * 0.08;

        const depth = Math.abs(camera.position.z - mesh.position.z);
        const focus = 1 - Math.min(Math.abs(depth - 12) / 6, 1);
        applyFocus(mesh, focus);
      });
      group.rotation.y += 0.0012 + mouse.x * 0.0008;
      group.rotation.x += 0.0004 + mouse.y * 0.0006;
      starField.rotation.y += 0.0002;
      composer.render();
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", handleMouse);
      renderer.dispose();
      boxGeometry.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      logoMeshes.forEach((logoGroup) => {
        logoGroup.traverse((child) => {
          if (child.isMesh) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => mat.dispose());
            } else if (child.material && typeof child.material.dispose === "function") {
              child.material.dispose();
            }
            if (child.geometry) {
              child.geometry.dispose();
            }
          }
        });
      });
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    const handleMove = (event) => {
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      gsap.to(".hero-core", {
        rotateY: x * 8,
        rotateX: -y * 8,
        duration: 0.6,
        ease: "power3.out",
      });
      gsap.to(".panel-left", {
        rotateY: x * 5,
        rotateX: -y * 4,
        duration: 0.6,
        ease: "power3.out",
      });
      gsap.to(".panel-right", {
        rotateY: x * -5,
        rotateX: -y * 4,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    const resetTilt = () => {
      gsap.to(".hero-core, .panel-left, .panel-right", {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    hero.addEventListener("mousemove", handleMove);
    hero.addEventListener("mouseleave", resetTilt);
    return () => {
      hero.removeEventListener("mousemove", handleMove);
      hero.removeEventListener("mouseleave", resetTilt);
    };
  }, []);

  return (
    <div className="neon-page" ref={rootRef}>
      <canvas className="three-canvas" ref={canvasRef} aria-hidden="true"></canvas>
      <div className="grid-glow" aria-hidden="true"></div>
      <div className="orb orb-a" aria-hidden="true"></div>
      <div className="orb orb-b" aria-hidden="true"></div>
      <div className="orb orb-c" aria-hidden="true"></div>

      <header className="hero-stage" ref={heroRef}>
        <div className="scanlines" aria-hidden="true"></div>
        <div className="beam beam-left" aria-hidden="true"></div>
        <div className="beam beam-right" aria-hidden="true"></div>
        <nav className="neon-nav">
          <div className="brand">Mncedisi</div>
          <div className="nav-pills">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}>
                {item}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <a className="icon-pill" href="#home">EN</a>
            <a className="hire-btn" href="#contact">Hire Me</a>
          </div>
        </nav>

        <section className="hero-grid" id="home">
          <aside className="panel panel-left">
            <div className="panel-header">
              <span className="panel-chip">Latest Projects</span>
              <span className="panel-meta">Selected</span>
            </div>
            <div className="panel-cards">
              {latestProjects.map((project) => (
                <div key={project.title} className="mini-card">
                  <h3>{project.title}</h3>
                  <p>{project.subtitle}</p>
                  <a className="mini-btn" href="#portfolio">View More</a>
                </div>
              ))}
            </div>
          </aside>

          <div className="hero-core">
            <div className="hero-badge">Welcome</div>
            <h1>
              WELCOME
              <span>TO MY</span>
              PORTFOLIO
            </h1>
            <p className="hero-subtitle">Creative UI/UX Designer + Full Stack Developer</p>
            <p className="hero-desc">
              I craft premium digital experiences using cinematic visuals, motion
              storytelling, and production-grade engineering. Let's build a
              portfolio that feels like a universe.
            </p>
            <div className="hero-actions">
              <a className="neon-primary" href="#contact">Let's Connect</a>
              <a className="neon-ghost" href="#portfolio">View Portfolio</a>
            </div>
            <div className="hero-strip">
              <div>
                <span>2+</span>
                <p>Years Experience</p>
              </div>
              <div>
                <span>45+</span>
                <p>Brands Delivered</p>
              </div>
              <div>
                <span>100%</span>
                <p>Pixel Precision</p>
              </div>
            </div>
          </div>

          <aside className="panel panel-right">
            <div className="panel-header">
              <span className="panel-chip">Skills & Tools</span>
              <span className="panel-meta">Design + Dev</span>
            </div>
            <div className="skill-grid">
              {skillIcons.map((skill) => (
                <span key={skill.name} className="skill-pill">
                  {skill.name}
                </span>
              ))}
            </div>
            <div className="panel-footer">
              <p>Tooling crafted for neon-grade visuals and production-ready builds.</p>
            </div>
          </aside>
        </section>
      </header>

      <main>
        <section className="about-row" id="about">
          <div className="panel about-panel">
            <div className="panel-header">
              <span className="panel-chip">About Me</span>
              <span className="panel-meta">Creative Tech</span>
            </div>
            <h2>Mncedisi Ambrosia Sikhosana</h2>
            <p>
              I design immersive brand universes and build the systems behind
              them. From Figma to full-stack delivery, every frame is tuned for
              impact.
            </p>
            <a className="neon-ghost" href="#contact">Know More</a>
          </div>
          <div className="panel focus-panel">
            <h3>Design Stack</h3>
            <ul>
              <li>Figma, Blender, After Effects, Lottie</li>
              <li>Motion UI, kinetic typography, storyboards</li>
              <li>3D lighting, compositing, product visualization</li>
            </ul>
            <h3>Dev Stack</h3>
            <ul>
              <li>React + Vite, Tailwind CSS, Framer Motion</li>
              <li>GSAP, optional Three.js for 3D web scenes</li>
              <li>Optimized deployment and performance tuning</li>
            </ul>
          </div>
        </section>

        <section className="specialties" id="portfolio">
          <div className="section-title">
            <p>My Specialties</p>
            <h2>Design, build, and animate.</h2>
          </div>
          <div className="specialties-grid">
            {specialties.map((item) => (
              <div key={item.title} className="panel specialty-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a className="mini-btn" href="#contact">Explore</a>
              </div>
            ))}
          </div>
        </section>

        <section className="skills-showcase" id="skills">
          <div className="section-title">
            <p>Skills</p>
            <h2>Design + development systems.</h2>
          </div>
          <div className="panel skills-panel">
            <div className="logo-grid">
              {pagedSkills.map((skill) => (
                <div key={`logo-${skill.name}`} className="logo-card">
                  <img src={skill.logo} alt={`${skill.name} logo`} loading="lazy" />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
            <div className="pagination">
              <button
                className="page-btn"
                type="button"
                onClick={() => setSkillsPage((page) => Math.max(1, page - 1))}
                disabled={skillsPage === 1}
              >
                Prev
              </button>
              <div className="page-dots" role="tablist" aria-label="Skills pages">
                {Array.from({ length: totalSkillPages }, (_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <button
                      key={`skill-page-${pageNumber}`}
                      type="button"
                      className={`page-dot${skillsPage === pageNumber ? " active" : ""}`}
                      onClick={() => setSkillsPage(pageNumber)}
                      aria-label={`Go to skills page ${pageNumber}`}
                      aria-pressed={skillsPage === pageNumber}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>
              <button
                className="page-btn"
                type="button"
                onClick={() => setSkillsPage((page) => Math.min(totalSkillPages, page + 1))}
                disabled={skillsPage === totalSkillPages}
              >
                Next
              </button>
            </div>
          </div>
        </section>

        <section className="contact-row" id="contact">
          <div className="panel contact-panel">
            <h2>Let's build your next universe.</h2>
            <p>Email: ambrosiasikhosana@gmail.com</p>
            <p>Location: Remote / Global</p>
          </div>
          <div className="panel contact-actions">
            <a className="neon-primary" href="mailto:ambrosiasikhosana@gmail.com">
              Book a Call
            </a>
            <a className="neon-ghost" href="/resume.pdf" download>
              Download Resume
            </a>
          </div>
        </section>
      </main>

      <footer className="neon-footer">
        (c) 2026 Mncedisi Ambrosia Sikhosana. Crafted for bold digital experiences.
      </footer>
    </div>
  );
}
