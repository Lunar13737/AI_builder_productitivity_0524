/* ========== [COMMENT / 注释区] BEGIN ==========
 * BuildArena 商业分享的沉浸式 custom slide 渲染器。
 * 数据来自 src/deck/slides.ts，props 由 BuildArenaShowcasePropsSchema 校验。
 * ========== [COMMENT / 注释区] END ========== */

import { useEffect, useRef, useState } from "react";
import { Code2, Cog, Scale, type LucideIcon } from "lucide-react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import styles from "./BuildArenaShowcase.module.css";
import {
  BuildArenaShowcasePropsSchema,
  type BuildArenaShowcaseProps,
} from "./BuildArenaShowcase.schema";

/* ========== [VARIABLE / 可变区] BEGIN [REQ-REF: §13.exemption-1, §2 12 页大纲、素材与交互] ========== */

const logoSrc = "/assets/images/UniForce%20Logo.png";
const reducedMotionFallbackSrc = "/assets/images/header_image.png";
const motivationIcons: LucideIcon[] = [Scale, Code2, Cog];

export function BuildArenaShowcase({ props }: { props: unknown }) {
  const slide = BuildArenaShowcasePropsSchema.parse(props);

  return (
    <section className={`${styles.slide} ${styles[slide.variant]}`}>
      <Logo dark={slide.variant === "cover" || slide.variant === "closing"} />
      {renderVariant(slide)}
    </section>
  );
}

function Logo({ dark }: { dark: boolean }) {
  return (
    <img
      className={`${styles.logo} ${dark ? styles.logoLight : ""}`}
      src={logoSrc}
      alt="UniForce"
    />
  );
}

function renderVariant(slide: BuildArenaShowcaseProps) {
  switch (slide.variant) {
    case "cover":
      return <Cover slide={slide} />;
    case "motivation":
      return <Motivation slide={slide} />;
    case "results":
      return <Results slide={slide} />;
    case "framework":
      return <Framework slide={slide} />;
    case "failure":
      return <Failure slide={slide} />;
    case "sequence":
      return <Sequence slide={slide} />;
    case "feedback":
      return <Feedback slide={slide} />;
    case "representation":
      return <Representation slide={slide} />;
    case "creativity":
      return <Creativity slide={slide} />;
    case "infra":
      return <Infra slide={slide} />;
    case "industry":
      return <Industry slide={slide} />;
    case "closing":
      return <Closing slide={slide} />;
  }
}

function Header({ slide, className = "" }: { slide: BuildArenaShowcaseProps; className?: string }) {
  return (
    <header className={`${styles.header} ${className}`}>
      <p>{slide.eyebrow}</p>
      <h1>{slide.title}</h1>
      {slide.subtitle ? <span>{slide.subtitle}</span> : null}
    </header>
  );
}

function stableAssetSrc(src: string) {
  if (typeof window === "undefined") return src;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return reduced && src.endsWith(".gif") ? reducedMotionFallbackSrc : src;
}

function Cover({ slide }: { slide: BuildArenaShowcaseProps }) {
  return (
    <>
      {slide.assets?.length ? (
        <div className={styles.coverMedia} aria-hidden="true">
          {slide.assets.map((asset) => (
            <video key={asset.src} autoPlay loop muted playsInline src={asset.src} />
          ))}
        </div>
      ) : null}
      <div className={styles.coverShade} />
      <main className={styles.coverContent}>
        <p>{slide.eyebrow}</p>
        <h1>{slide.title}</h1>
        <strong>{slide.subtitle}</strong>
        <div className={styles.coverChips}>
          {(slide.items ?? []).map((item) => (
            <span key={item.label}>{item.label}</span>
          ))}
        </div>
      </main>
    </>
  );
}

function Motivation({ slide }: { slide: BuildArenaShowcaseProps }) {
  return (
    <main className={styles.content}>
      <Header slide={slide} />
      <div className={styles.capabilityLane}>
        {(slide.items ?? []).map((item, index) => (
          <article
            className={`${styles.capabilityCard} ${index === 2 ? styles.frontierCard : ""}`}
            key={item.label}
          >
            <MotivationIconPair icons={motivationIcons[index]} />
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{item.label}</h2>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
      <div className={styles.verdict}>{slide.verdict}</div>
    </main>
  );
}

function MotivationIconPair({ icons: Icon }: { icons?: LucideIcon }) {
  if (!Icon) return null;

  return (
    <div className={styles.capabilityIcon} aria-hidden="true">
      <Icon size={58} strokeWidth={1.9} />
    </div>
  );
}

function Results({ slide }: { slide: BuildArenaShowcaseProps }) {
  const assets = slide.assets ?? [];
  const [active, setActive] = useState(0);
  return (
    <main className={styles.content}>
      <Header slide={slide} className={styles.resultsHeader} />
      <div className={styles.resultsGrid}>
        <div className={styles.resultsStage}>
          {assets.map((asset, index) => (
            <img
              className={index === active ? styles.active : ""}
              key={asset.src}
              src={stableAssetSrc(asset.src)}
              alt={asset.alt ?? ""}
            />
          ))}
        </div>
        <div className={styles.switchList}>
          {assets.map((asset, index) => (
            <button
              className={index === active ? styles.active : ""}
              key={asset.src}
              type="button"
              onClick={() => setActive(index)}
            >
              <span>{asset.label}</span>
              <strong>{asset.detail}</strong>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

function Framework({ slide }: { slide: BuildArenaShowcaseProps }) {
  const items = slide.items ?? [];
  const [active, setActive] = useState(0);
  return (
    <main className={styles.content}>
      <Header slide={slide} />
      <div className={styles.frameworkGrid}>
        <div className={styles.frameworkList}>
          {items.map((item, index) => (
            <button
              className={index === active ? styles.active : ""}
              key={item.label}
              type="button"
              onClick={() => setActive(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.label}</strong>
              <em>{item.detail}</em>
            </button>
          ))}
        </div>
        <div className={styles.frameworkVisual}>
          <img src={slide.assets?.[0]?.src} alt={slide.assets?.[0]?.alt ?? ""} />
          <div className={`${styles.frameworkLens} ${styles[`lens${active}`]}`} />
        </div>
      </div>
    </main>
  );
}

function Failure({ slide }: { slide: BuildArenaShowcaseProps }) {
  return (
    <main className={styles.content}>
      <Header slide={slide} />
      <div className={styles.failureGrid}>
        <div className={styles.codeWindow}>
          <div className={styles.windowBar}>
            <i />
            <i />
            <i />
            <span>machine.xml</span>
          </div>
          <pre>{`<Block id="BaseBox">
  <Size x="2.50" y="1.20" z="1.35" />
  <Position x="-0.15" y="0.60" z="0.00" />
  <Rotation x="0" y="0" z="0" />
</Block>

<Block id="NewBox">
  <Size x="2.20" y="1.10" z="1.25" />
  <Position x="0.75" y="0.72" z="0.28" />
  <Rotation x="0" y="0" z="0" />
</Block>`}</pre>
        </div>
        <div className={styles.collisionCard}>
          <div className={styles.collisionHeader}>
            <span>空间合法性检查</span>
            <strong>冲突</strong>
          </div>
          <div className={styles.collisionSpace}>
            <ThreeOverlapScene />
          </div>
          <div className={styles.validity}>
            <span>同一个坐标附近放了两个模块</span>
            <strong>空间非法</strong>
          </div>
        </div>
      </div>
      <div className={styles.failureVerdict}>{slide.verdict}</div>
    </main>
  );
}

function ThreeOverlapScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf7fbff);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(4.8, 4.2, 5.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 4;
    controls.maxDistance = 9;
    controls.target.set(0.4, 0.4, 0.2);

    scene.add(new THREE.HemisphereLight(0xffffff, 0xbfd7ff, 2.4));
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(4, 7, 5);
    scene.add(keyLight);

    const grid = new THREE.GridHelper(7, 14, 0x60a5fa, 0xbfdbfe);
    grid.position.y = -0.02;
    scene.add(grid);

    const axes = new THREE.AxesHelper(2.6);
    axes.position.set(-2.8, 0, -2.6);
    scene.add(axes);

    const baseBox = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 1.2, 1.35),
      new THREE.MeshStandardMaterial({
        color: 0x2563eb,
        transparent: true,
        opacity: 0.78,
        roughness: 0.42,
      }),
    );
    baseBox.position.set(-0.15, 0.6, 0);
    scene.add(baseBox);

    const newBox = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 1.1, 1.25),
      new THREE.MeshStandardMaterial({
        color: 0xef4444,
        transparent: true,
        opacity: 0.66,
        roughness: 0.5,
      }),
    );
    newBox.position.set(0.75, 0.72, 0.28);
    scene.add(newBox);

    const overlap = new THREE.Mesh(
      new THREE.BoxGeometry(1.25, 0.74, 0.82),
      new THREE.MeshStandardMaterial({
        color: 0xff2f2f,
        emissive: 0x991b1b,
        emissiveIntensity: 0.25,
        transparent: true,
        opacity: 0.86,
      }),
    );
    overlap.position.set(0.34, 0.78, 0.13);
    scene.add(overlap);

    const outlineMaterial = new THREE.LineBasicMaterial({ color: 0x0f172a, transparent: true, opacity: 0.42 });
    [baseBox, newBox, overlap].forEach((mesh) => {
      const edges = new THREE.EdgesGeometry(mesh.geometry);
      const outline = new THREE.LineSegments(edges, outlineMaterial);
      mesh.add(outline);
    });

    let frame = 0;
    const animate = () => {
      frame = window.requestAnimationFrame(animate);
      controls.update();
      overlap.scale.setScalar(1 + Math.sin(Date.now() / 300) * 0.035);
      renderer.render(scene, camera);
    };
    animate();

    const resizeObserver = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const { width, height } = entry.contentRect;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(mount);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, []);

  return <div className={styles.threeScene} ref={mountRef} />;
}

function Sequence({ slide }: { slide: BuildArenaShowcaseProps }) {
  const assets = slide.assets ?? [];
  const [active, setActive] = useState(0);
  return (
    <main className={styles.content}>
      <Header slide={slide} />
      <div className={styles.sequenceGrid}>
        <div className={styles.sequenceStage}>
          {assets.map((asset, index) => (
            <img
              className={index === active ? styles.active : ""}
              key={asset.src}
              src={asset.src}
              alt={asset.alt ?? ""}
            />
          ))}
        </div>
        <div className={styles.sequenceSteps}>
          {(slide.items ?? []).map((item, index) => (
            <button
              className={index === active ? styles.active : ""}
              key={item.label}
              type="button"
              onClick={() => setActive(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.label}</strong>
            </button>
          ))}
        </div>
      </div>
      <div className={styles.sequenceInvariant}>{slide.verdict}</div>
    </main>
  );
}

function Feedback({ slide }: { slide: BuildArenaShowcaseProps }) {
  const items = slide.items ?? [];
  const [active, setActive] = useState(0);
  return (
    <main className={styles.content}>
      <Header slide={slide} />
      <div className={styles.loopBoard}>
        {items.map((item, index) => (
          <button
            type="button"
            className={`${styles.loopNode} ${styles[`node${index}`]} ${
              index === active ? styles.active : ""
            }`}
            key={item.label}
            onClick={() => setActive(index)}
          >
            <span>{item.label}</span>
            <strong>{item.title}</strong>
          </button>
        ))}
        <div className={styles.loopCore}>online constraint check</div>
        <div className={styles.feedbackLog}>
          {items.map((item, index) => (
            <button
              className={index === active ? styles.active : ""}
              key={item.detail}
              type="button"
              onClick={() => setActive(index)}
            >
              {item.detail}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

function Representation({ slide }: { slide: BuildArenaShowcaseProps }) {
  const items = slide.items ?? [];
  const [active, setActive] = useState(0);
  return (
    <main className={styles.content}>
      <Header slide={slide} />
      <div className={styles.representationGrid}>
        <div className={styles.tabList}>
          {items.map((item, index) => (
            <button
              className={index === active ? styles.active : ""}
              key={item.label}
              type="button"
              onClick={() => setActive(index)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className={styles.representationStage}>
          {active === 0 ? <GuiPane /> : null}
          {active === 1 ? <QuaternionPane /> : null}
          {active === 2 ? <DirectionPane /> : null}
          <article>
            <strong>{items[active]?.title}</strong>
            <p>{items[active]?.detail}</p>
          </article>
        </div>
      </div>
    </main>
  );
}

function GuiPane() {
  return (
    <div className={styles.guiPane}>
      <img src="/assets/images/GUI.png" alt="Besiege GUI 界面" />
      <span>拖拽视角 + 点击操作，精度要求 &lt;5% 屏幕容差</span>
    </div>
  );
}

function QuaternionPane() {
  return (
    <div className={styles.mathPane}>
      <div className={styles.mathGroup}>
        <span className={styles.mathLabel}>3D 向量</span>
        <pre>{`position  = [  0.75,  0.72,  0.28 ]
forward   = [ -0.707, 0.000,  0.707 ]
up        = [  0.000, 1.000,  0.000 ]`}</pre>
      </div>
      <div className={styles.mathGroup}>
        <span className={styles.mathLabel}>四元数</span>
        <pre>{`rotation  = ( 0.000, 0.707, 0.000, 0.707 )
           //  x      y      z      w`}</pre>
      </div>
      <div className={styles.mathGroup}>
        <span className={styles.mathLabel}>欧拉角</span>
        <pre>{`roll   =   0.0°   (绕 X 轴)
pitch  =   0.0°   (绕 Z 轴)
yaw    =  90.0°   (绕 Y 轴)`}</pre>
      </div>
    </div>
  );
}

function DirectionPane() {
  return (
    <div className={styles.directionPane}>
      <div className={styles.compass}>
        <span>北</span>
        <span>东</span>
        <span>南</span>
        <span>西</span>
        <i style={{ transform: "rotate(-60deg)" }} />
      </div>
      <p>
        朝向：北偏东 30°<br />
        俯仰角：0°
      </p>
    </div>
  );
}

function GalleryMedia({ src, alt }: { src: string; alt: string }) {
  if (src.endsWith(".mp4")) {
    return <video className={styles.galleryVideo} src={src} autoPlay loop muted playsInline />;
  }
  return <img src={stableAssetSrc(src)} alt={alt} />;
}

function Creativity({ slide }: { slide: BuildArenaShowcaseProps }) {
  const assets = slide.assets ?? [];
  const [active, setActive] = useState(0);
  return (
    <main className={styles.content}>
      <Header slide={slide} />
      <div className={styles.gallery}>
        {assets.map((asset, index) => (
          <button
            className={index === active ? styles.active : ""}
            key={asset.src}
            type="button"
            onClick={() => setActive(index)}
          >
            <GalleryMedia src={asset.src} alt={asset.alt ?? ""} />
            <span>{asset.label}</span>
            <strong>{asset.detail}</strong>
          </button>
        ))}
      </div>
      <div className={styles.designSpace}>{slide.verdict}</div>
    </main>
  );
}

function Infra({ slide }: { slide: BuildArenaShowcaseProps }) {
  const items = slide.items ?? [];
  const [active, setActive] = useState(0);
  return (
    <main className={styles.content}>
      <Header slide={slide} />
      <div className={styles.equation}>
        {items.map((item, index) => (
          <>
            <button
              className={index === active ? styles.active : ""}
              key={item.label}
              type="button"
              onClick={() => setActive(index)}
            >
              {item.label}
            </button>
            {index < items.length - 1 && (
              <span key={`sep-${index}`} className={styles.equationSep}>+</span>
            )}
          </>
        ))}
      </div>
      <div className={styles.infraModules}>
        {items.map((item, index) => (
          <article className={index === active ? styles.active : ""} key={item.title}>
            <strong>{item.title}</strong>
            <span>{item.detail}</span>
          </article>
        ))}
      </div>
      <p className={styles.infraVerdict}>{slide.verdict}</p>
    </main>
  );
}

function Industry({ slide }: { slide: BuildArenaShowcaseProps }) {
  return (
    <main className={styles.content}>
      <Header slide={slide} />
      <div className={styles.archDiagram}>
        <div className={styles.archPrinciple}>
          <img src={logoSrc} alt="UniForce" className={styles.archLogo} />
          <div>
            <strong>{slide.subtitle}</strong>
            <p>{slide.verdict}</p>
          </div>
        </div>
        <div className={styles.archBranches}>
          {(slide.items ?? []).map((item) => (
            <article key={item.label} className={styles.archCard}>
              <span className={styles.archTag}>{item.label}</span>
              <h2>{item.title}</h2>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

function Closing({ slide }: { slide: BuildArenaShowcaseProps }) {
  const qr = slide.assets?.[0];
  return (
    <main className={styles.closingGrid}>
      <section>
        {slide.eyebrow ? <p>{slide.eyebrow}</p> : null}
        <h1>{slide.title}</h1>
        <strong>{slide.subtitle}</strong>
      </section>
      <aside className={styles.closingQr}>
        {qr ? (
          <div className={styles.closingQrFrame}>
            <img src={qr.src} alt={qr.alt ?? ""} />
          </div>
        ) : null}
        {qr?.label ? <span>{qr.label}</span> : null}
      </aside>
    </main>
  );
}

/* ========== [VARIABLE / 可变区] END ========== */
