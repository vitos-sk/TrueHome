import { useState } from "react";
import styled from "styled-components";
import { useLanguage } from "../components/LanguageContext";

const PortfolioContainer = ({ className }) => {
  const { language, toggleLanguage } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAllWorks, setShowAllWorks] = useState(false);

  const works = Array.from({ length: 33 }, (_, i) => ({
    title: language === "ru" ? `Работа ${i + 1}` : `Trabajo ${i + 1}`,
    image: `/our-works/${i + 1}.jpg`,
  }));

  // Показываем только 3 фотки, если showAllWorks = false
  const displayedWorks = showAllWorks ? works : works.slice(0, 5);

  return (
    <section className={className}>
      {/* Переключатель языка */}
      <button className="language-toggle" onClick={toggleLanguage}>
        {language === "ru" ? "🇪🇸 ES" : "🇷🇺 RU"}
      </button>

      <h1>{language === "ru" ? "Наши работы" : "Nuestros trabajos"}</h1>
      <h2>
        {language === "ru"
          ? "Смотрите примеры наших выполненных проектов"
          : "Vea ejemplos de nuestros proyectos realizados"}
      </h2>

      {/* Сетка фоток */}
      <div className="works-grid">
        {displayedWorks.map((work, index) => (
          <div
            key={index}
            className="work-card"
            onClick={() => setSelectedImage(work.image)}
          >
            <img src={work.image} alt={work.title} />
          </div>
        ))}
      </div>

      {/* Кнопка показать/скрыть все */}
      <button
        className="toggle-works-btn"
        onClick={() => setShowAllWorks(!showAllWorks)}
      >
        {showAllWorks
          ? language === "ru"
            ? "Скрыть работы"
            : "Ocultar trabajos"
          : language === "ru"
          ? "Показать все работы"
          : "Mostrar todos los trabajos"}
      </button>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setSelectedImage(null)}
            >
              ✖
            </button>
            <img src={selectedImage} alt="Enlarged work" />
          </div>
        </div>
      )}
    </section>
  );
};

export const Portfolio = styled(PortfolioContainer)`
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  color: white;

  h1 {
    font-size: 3rem;
    color: #fdb913;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 1.3rem;
    color: #ccc;
    margin-bottom: 30px;
  }

  .toggle-works-btn {
    background: #fdb913;
    color: #1a1a1a;
    border: none;
    padding: 12px 28px;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 20px 0;
  }

  .toggle-works-btn:hover {
    background: #e5a50d;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(253, 185, 19, 0.3);
  }

  .works-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
  }

  .work-card {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .work-card img {
    width: 100%;
    aspect-ratio: 1.1 / 1;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;
  }

  .work-card:hover img {
    transform: scale(1.05);
  }

  /* Lightbox */
  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
  }

  .lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 85%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lightbox-content img {
    max-width: 100%;
    max-height: 85vh;
    border-radius: 12px;
    object-fit: contain;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(255, 255, 255, 0.8);
    border: none;
    font-size: 1.5rem;
    padding: 4px 10px;
    border-radius: 6px;
    cursor: pointer;
    z-index: 10;
  }

  /* Language Toggle Button */
  .language-toggle {
    position: fixed;
    bottom: 50px;
    right: 40px;
    background: rgba(26, 26, 26, 0.341);
    backdrop-filter: blur(10px);
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
`;
