import Layout from '@/components/layout/Layout';
import NavbarWithAuth from '@/components/layout/Navbar/NavbarWithAuth';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import FaqItem from '@/components/FaqItem';
import ShowcaseAnimate from '@/components/ShowcaseAnimate';
import StepAnimate from '@/components/StepAnimate';
import { Icons } from '@/components/icons';
import {
  navItems,
  footerLinks,
  heroData,
  introData,
  showcaseData,
  analysisData,
  featuresData,
  howItWorksData,
  techStackData,
  ctaData
} from '@/data/home';
import { faqData } from '@/data/faq';

export default function HomePage() {
  return (
    <Layout header={<NavbarWithAuth navItems={navItems} />} footer={<Footer links={footerLinks} />}>
      {/* Hero */}
      <section className="hero">
        <div className="hero__inner">
          <h1 className="hero__title">
            <span className="hero__title-line">{heroData.titleLine1}</span>
            <span className="hero__title-line">{heroData.titleLine2}</span>
          </h1>
          <p className="hero__desc">
            <span className="hero__desc-line">{heroData.descriptionLine1}</span>
            <span className="hero__desc-line">{heroData.descriptionLine2}</span>
          </p>
        </div>
      </section>

      {/* 서비스 소개 (section02) */}
      <section id="intro" className="intro intro--dark intro--bg">
        <div className="intro__inner">
          <h2 className="intro__title">{introData.title}</h2>
          <p className="intro__text">{introData.description}</p>
          {introData.description2 && <p className="intro__text">{introData.description2}</p>}
          {introData.points?.length > 0 && (
            <ul className="intro__list">
              {introData.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* 이미지/음성 검사 소개 */}
      <section id="showcase" className="showcase section--gray">
        {showcaseData.map((item, i) => (
          <ShowcaseAnimate key={item.id} reverse={item.reverse} index={i}>
            <div className="showcase__media">
              {item.video ? (
                <video
                  className="showcase__gif"
                  src={item.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : item.gif ? (
                <img src={item.gif} alt="" className="showcase__gif" />
              ) : (
                <div className="showcase__placeholder">
                  {item.id === 'image' && '🖼️'}
                  {item.id === 'audio' && (
                    <div className="showcase__placeholder-audio">
                      <span className="showcase__placeholder-audio-icon">🎙️</span>
                      <span className="showcase__placeholder-audio-text">음성 검사는 준비 중입니다</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="showcase__content">
              <h3 className="showcase__title">{item.title}</h3>
              <p className="showcase__desc">{item.description}</p>
            </div>
          </ShowcaseAnimate>
        ))}
      </section>

      {/* Heimdall 프레임워크 메커니즘 */}
      <section id="analysis" className="section section--white section--mechanism">
        <div className="section__inner">
          <div className="section__header">
            <h2 className="section__title">{analysisData.title}</h2>
            <p className="section__desc">{analysisData.description}</p>
          </div>
          <div className="analysis-grid analysis-grid--cards">
            {analysisData.items.map((item) => (
              <div key={item.id} className="analysis-card analysis-card--feature">
                <span className="analysis-card__icon">{Icons[item.icon]}</span>
                <h3 className="analysis-card__title">{item.title}</h3>
                <p className="analysis-card__desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 핵심 기능 */}
      <section id="features" className="section section--gray">
        <div className="section__inner">
          <div className="section__header">
            <h2 className="section__title">{featuresData.title}</h2>
            <p className="section__desc">{featuresData.description}</p>
          </div>
          <div className="features-grid">
            {featuresData.items.map((item) => (
              <div key={item.id} className="feature-card">
                <span className="feature-card__icon">{Icons[item.icon]}</span>
                <h3 className="feature-card__title">{item.title}</h3>
                <p className="feature-card__desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 작동 방식 */}
      <section id="how" className="section section--white">
        <div className="section__inner">
          <div className="section__header">
            <h2 className="section__title">{howItWorksData.title}</h2>
            <p className="section__desc">{howItWorksData.description}</p>
          </div>
          <div className="steps">
            {howItWorksData.steps.map((s, i) => (
              <StepAnimate key={s.step} index={i}>
                <span className="step__num">{s.step}</span>
                <div className="step__content">
                  <h3 className="step__title">{s.title}</h3>
                  <p className="step__desc">{s.description}</p>
                </div>
              </StepAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* 기술 스택 */}
      <section id="tech" className="section section--gray">
        <div className="section__inner">
          <div className="section__header">
            <h2 className="section__title">{techStackData.title}</h2>
            <p className="section__desc">{techStackData.description}</p>
          </div>
          <div className="tech-grid">
            {techStackData.categories.map((cat) => (
              <div key={cat.name} className="tech-card">
                <h3 className="tech-card__title">{cat.name}</h3>
                {cat.groups ? (
                  <div className="tech-card__groups">
                    {cat.groups.map((g) => (
                      <div key={g.label} className="tech-card__group">
                        <h4 className="tech-card__group-label">{g.label}</h4>
                        <ul className="tech-card__list">
                          {g.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="tech-card__list">
                    {cat.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 자주 묻는 질문 */}
      <section id="faq" className="section section--white">
        <div className="section__inner">
          <div className="section__header">
            <h2 className="section__title">자주 묻는 질문</h2>
            <p className="section__desc">Heimdall 서비스 이용과 관련해 자주 받는 질문을 정리했습니다.</p>
          </div>
          <div className="faq-list faq-list--home">
            {faqData.map((item) => (
              <FaqItem key={item.id} id={item.id} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="section cta-section">
        <div className="section__inner">
          <div className="section__header">
            <h2 className="section__title">{ctaData.title}</h2>
            <p className="section__desc">{ctaData.description}</p>
          </div>
          <div className="cta-actions">
            {ctaData.buttons.map((btn) => (
              <Button
                key={btn.label}
                href={btn.href}
                variant={btn.href.startsWith('http') ? 'outline' : 'primary'}
                size="lg"
              >
                {btn.label}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
