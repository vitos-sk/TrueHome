import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { useLanguage } from "../components/LanguageContext"; // ✅
import { Contacts } from "../components";

// Контекст для языка
const translations = {
  ru: {
    // Hero Section
    heroTitle: "Мы строим качество — создаём доверие",
    heroSubtitle: "С 2004 года. Более 21 года опыта.",
    heroDescription:
      "во внутренних и наружных работах\n100% гарантия качества и полная удовлетворённость",
    heroText:
      "Мы работаем с полной отдачей и профессионализмом, чтобы обеспечить высокое качество в каждом проекте, всегда соблюдая сроки и ожидания клиента.",
    contactButton: "Связаться с нами",

    // Stats
    yearsExperience: "Лет опыта",
    happyClients: "Довольные клиенты",
    qualityGuarantee: "Гарантия качества",

    // Services
    servicesBadge: "Строительные решения",
    servicesTitle:
      "Мы предлагаем полный комплекс услуг для всех видов строительных работ",
    service1Title: "Комплексные ремонты",
    service1Desc: "Полный цикл ремонтных работ под ключ",
    service2Title: "Электромонтаж и сантехника",
    service2Desc: "Профессиональная установка и обслуживание",
    service3Title: "Внутренняя и внешняя отделка",
    service3Desc: "Качественная отделка любой сложности",

    // Skills
    skillsBadge: "Наши навыки",
    skillsTitle: "Мы превращаем ваши идеи в реальные результаты",
    skillsText:
      "Более 20 лет опыта в ремонте, строительстве и отделке. Мы работаем профессионально и с полной отдачей в каждом проекте.",
    skill1: "Комплексные ремонты",
    skill2: "Электромонтаж и сантехника",
    skill3: "Внутренняя и внешняя отделка",

    // Portfolio
    portfolioTitle: "Наши работы",
    project1: "Современная квартира",
    project2: "Частный дом",
    project3: "Премиум Санузел ",
    project4: "Жилой комплекс",
    moreButton: "Смотреть больше",

    // CTA
    ctaTitle: "Готовы начать ваш проект?",
    ctaSubtitle: "Бесплатный звонок для записи и онлайн-консультации",
  },
  es: {
    // Hero Section
    heroTitle: "Construimos calidad — creamos confianza",
    heroSubtitle: "Desde 2004. Más de 21 años de experiencia.",
    heroDescription:
      "en trabajos internos y externos\n100% garantía de calidad y satisfacción total",
    heroText:
      "Trabajamos con dedicación total y profesionalismo para garantizar alta calidad en cada proyecto, siempre cumpliendo con plazos y expectativas del cliente.",
    contactButton: "Contáctenos",

    // Stats
    yearsExperience: "Años de experiencia",
    happyClients: "Clientes satisfechos",
    qualityGuarantee: "Garantía de calidad",

    // Services
    servicesBadge: "Soluciones de construcción",
    servicesTitle:
      "Ofrecemos un conjunto completo de servicios para todo tipo de trabajos de construcción",
    service1Title: "Reformas integrales",
    service1Desc: "Ciclo completo de trabajos de reforma llave en mano",
    service2Title: "Instalación eléctrica y fontanería",
    service2Desc: "Instalación y mantenimiento profesional",
    service3Title: "Acabados interiores y exteriores",
    service3Desc: "Acabados de calidad de cualquier complejidad",

    // Skills
    skillsBadge: "Nuestras habilidades",
    skillsTitle: "Convertimos tus ideas en resultados reales",
    skillsText:
      "Más de 20 años de experiencia en reformas, construcción y acabados. Trabajamos profesionalmente y con dedicación total en cada proyecto.",
    skill1: "Reformas integrales",
    skill2: "Instalación eléctrica y fontanería",
    skill3: "Acabados interiores y exteriores",

    // Portfolio
    portfolioTitle: "Nuestros trabajos",
    project1: "Apartamento moderno",
    project2: "Casa privada",
    project3: "Baño de lujo",
    project4: "Complejo residencial",
    moreButton: "Ver más",

    // CTA
    ctaTitle: "¿Listo para comenzar tu proyecto?",
    ctaSubtitle: "Llamada gratuita para cita y consulta online",
  },
};

const MainContainer = ({ className }) => {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage(); // <- получаем из контекста

  const t = translations[language];

  return (
    <>
      <div className={className}>
        {/* Language Toggle Button */}
        <button className="language-toggle" onClick={toggleLanguage}>
          {language === "ru" ? "🌍 ES" : "🌍 UA"}
        </button>

        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1>{t.heroTitle}</h1>
            <h2>{t.heroSubtitle}</h2>
            <p className="hero-subtitle">
              {t.heroDescription.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
            <p className="hero-text">{t.heroText}</p>

            <button className="cta-button" onClick={() => navigate("/contact")}>
              {t.contactButton}
            </button>
          </div>
          <div className="hero-image">
            <div className="image-placeholder">
              <img
                className="tools-img"
                src="/images/tools.jpg"
                alt="work-tool"
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-number">21+</div>
            <div className="stat-label">{t.yearsExperience}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">1000+</div>
            <div className="stat-label">{t.happyClients}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-label">{t.qualityGuarantee}</div>
          </div>
        </div>

        {/* Services Section */}
        <div className="services-section">
          <div className="section-badge">{t.servicesBadge}</div>
          <h2 className="section-title">{t.servicesTitle}</h2>

          <div className="services-grid">
            <div className="service-card white">
              <div className="service-icon">
                <img src="/emoji_home.png" alt="home" />
              </div>
              <h3>{t.service1Title}</h3>
              <p>{t.service1Desc}</p>
            </div>
            <div className="service-card black">
              <div className="service-icon">
                <img src="/bulb.png" alt="bulb" />
              </div>
              <h3>{t.service2Title}</h3>
              <p>{t.service2Desc}</p>
            </div>
            <div className="service-card yellow">
              <div className="service-icon">
                <img src="/in_home.png" alt="home" />
              </div>
              <h3>{t.service3Title}</h3>
              <p>{t.service3Desc}</p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="skills-section">
          <div className="skills-content">
            <div className="skills-left">
              <div className="section-badge">{t.skillsBadge}</div>
              <h2>{t.skillsTitle}</h2>
              <p>{t.skillsText}</p>
            </div>

            <div className="skills-right">
              <div className="skill-bar">
                <div className="skill-header">
                  <span className="skill-name">{t.skill1}</span>
                  <span className="skill-percent">95%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress" style={{ width: "95%" }}></div>
                </div>
              </div>

              <div className="skill-bar">
                <div className="skill-header">
                  <span className="skill-name">{t.skill2}</span>
                  <span className="skill-percent">85%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress" style={{ width: "85%" }}></div>
                </div>
              </div>

              <div className="skill-bar">
                <div className="skill-header">
                  <span className="skill-name">{t.skill3}</span>
                  <span className="skill-percent">90%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress" style={{ width: "90%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Section */}
        <div className="portfolio-section">
          <h2 className="section-title">{t.portfolioTitle}</h2>
          <div className="portfolio-grid">
            <div className="portfolio-card">
              <div className="portfolio-image">
                <img
                  className="portfolio-image"
                  src="/images/modern_apartament.jpg"
                  alt="apartment"
                />
              </div>
              <h3>{t.project1}</h3>
            </div>
            <div className="portfolio-card">
              <div className="portfolio-image">
                <img
                  className="portfolio-image"
                  src="/images/house-outside.jpg"
                  alt="house"
                />
              </div>
              <h3>{t.project2}</h3>
            </div>
            <div className="portfolio-card">
              <div className="portfolio-image">
                <img
                  className="portfolio-image"
                  src="/images/bad_room.jpg"
                  alt="room"
                />
              </div>
              <h3>{t.project3}</h3>
            </div>
            <div className="portfolio-card">
              <div className="portfolio-image">
                <img
                  className="portfolio-image"
                  src="/images/strit_img.jpg"
                  alt="strit"
                />
              </div>
              <h3>{t.project4}</h3>
            </div>
          </div>
          <button className="more-button" onClick={() => navigate("/services")}>
            {t.moreButton}
          </button>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaSubtitle}</p>
          <button
            className="cta-button-large"
            onClick={() => navigate("/contact")}
          >
            {t.contactButton}
          </button>
          <Contacts />
        </div>
      </div>
    </>
  );
};

export const Main = styled(MainContainer)`
  width: 100%;
  position: relative;

  /* Language Toggle Button */
  .language-toggle {
    position: fixed;
    bottom: 50px;
    right: 40px;
    background: rgba(26, 26, 26, 0.341);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(5px);
    color: #ffffff;
    padding: 12px 10px;
    font-size: 15px;
    font-weight: 600;
    border-radius: 20px;
    cursor: pointer;
    z-index: 1000;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }

  .language-toggle:hover {
    background: #fdb913;
    transform: scale(1.05);
    box-shadow: 0 6px 30px rgba(253, 185, 19, 0.4);
  }

  /* Hero Section */
  .hero-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 60px;
    padding: 140px 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .hero-content {
    flex: 1;
  }

  .hero-content h1 {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 20px;
    color: #ffffff;
  }

  .hero-content h2 {
    font-size: 1.8rem;
    font-weight: 600;
    color: #fdb913;
    margin-bottom: 10px;
  }

  .hero-subtitle {
    font-size: 1.2rem;
    color: #ffffff;
    margin-bottom: 20px;
    line-height: 1.6;
  }

  .hero-text {
    font-size: 1rem;
    color: #ffffff;
    line-height: 1.8;
    margin-bottom: 30px;
  }

  .cta-button {
    background: #fdb913;
    color: #1a1a1a;
    border: none;
    padding: 16px 40px;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .cta-button:hover {
    background: #e5a50d;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(253, 185, 19, 0.3);
  }

  .hero-image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tools-img {
    width: 100%;
    max-width: 500px;
    aspect-ratio: 1;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.241);
  }

  .image-placeholder {
    width: 100%;
    max-width: 500px;
    aspect-ratio: 1;
    backround-color: #9f9e9c79;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.241);
  }
  .portfolio-image {
    width: 100%;
    max-width: 500px;
    aspect-ratio: 1;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.241);
  }

  /* Stats Section */
  .stats-section {
    display: flex;
    justify-content: center;
    gap: 60px;
    padding: 60px 20px;
    background: #f8f9fa;
    flex-wrap: wrap;
  }

  .stat-card {
    text-align: center;
  }

  .stat-number {
    font-size: 3.5rem;
    font-weight: 800;
    color: #fdb913;
    margin-bottom: 10px;
  }

  .stat-label {
    font-size: 1.1rem;
    color: #666;
    font-weight: 500;
  }

  /* Services Section */
  .services-section {
    padding: 100px 20px;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }

  .section-badge {
    display: inline-block;
    background: rgba(26, 26, 26, 0.341);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #ffffff;
    padding: 8px 20px;
    border-radius: 5px;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 60px;
    line-height: 1.3;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-top: 40px;
  }

  .service-card {
    padding: 40px 30px;
    border-radius: 16px;
    text-align: left;
    transition: transform 0.3s ease;
  }

  .service-card.white {
    background: #e5e4e4;
    color: #1a1a1a;
  }
  .service-card.yellow {
    background: #fdb913;
    color: #1a1a1a;
  }

  .service-card.black {
    background: #1a1a1a;
    color: #fff;
  }

  .service-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  .service-icon {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  .service-card h3 {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 15px;
  }

  .service-card p {
    font-size: 1rem;
    line-height: 1.6;
    opacity: 0.9;
  }

  /* Skills Section */
  .skills-section {
    padding: 100px 20px;
    background: rgba(26, 26, 26, 0.612);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .skills-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
  }

  .skills-left h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 20px;
    line-height: 1.3;
  }

  .skills-left p {
    font-size: 1.1rem;
    color: #cdcccc;
    line-height: 1.8;
  }

  .skills-right {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .skill-bar {
    width: 100%;
  }

  .skill-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .skill-name {
    font-weight: 600;
    color: #cecdcd;
  }

  .skill-percent {
    font-weight: 700;
    color: #fdb913;
  }

  .progress-bar {
    width: 100%;
    height: 10px;
    background: #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
  }

  .progress {
    height: 100%;
    background: linear-gradient(90deg, #fdb913 0%, #e5a50d 100%);
    transition: width 1s ease;
  }

  /* Portfolio Section */
  .portfolio-section {
    padding: 100px 20px;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }

  .portfolio-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    margin-bottom: 40px;
  }

  .portfolio-card {
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .portfolio-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  }

  .portfolio-image {
    width: 100%;
    aspect-ratio: 3/3;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
  }

  .portfolio-card h3 {
    padding: 20px;
    font-size: 1.2rem;
    font-weight: 600;
    background: white;
  }

  .more-button {
    background: transparent;
    border: 2px solid #fdb913;
    color: #fdb913;
    padding: 14px 40px;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .more-button:hover {
    background: #fdb913;
    color: #1a1a1a;
  }

  /* CTA Section */
  .cta-section {
    background: rgba(26, 26, 26, 0.341);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 80px 20px;
    text-align: center;
    position: relative;
  }

  .cta-section h2 {
    font-size: 2.8rem;
    font-weight: 700;
    color: white;
    margin-bottom: 20px;
  }

  .cta-section p {
    font-size: 1.2rem;
    color: #ccc;
    margin-bottom: 40px;
  }

  .cta-button-large {
    background: #fdb913;
    color: #1a1a1a;
    border: none;
    padding: 18px 50px;
    font-size: 1.2rem;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .cta-button-large:hover {
    background: #e5a50d;
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(1, 1, 0, 0.4);
  }

  /* Responsive */
  @media (max-width: 968px) {
    .hero-section {
      flex-direction: column;
      text-align: center;
      gap: 40px;
    }

    .hero-content h1 {
      font-size: 2.5rem;
    }

    .skills-content {
      grid-template-columns: 1fr;
      gap: 40px;
    }

    .section-title {
      font-size: 2rem;
    }

    .language-toggle {
      bottom: 20px;
      right: 10px;
      padding: 10px 5px;
    }
  }
`;
