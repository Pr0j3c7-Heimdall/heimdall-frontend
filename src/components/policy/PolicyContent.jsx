'use client';

/**
 * 정책 페이지 본문 렌더링
 * body[]: { type: 'p'|'ul'|'ol'|'blockquote'|'h3', text?, items?, strong?, warn? }
 * items: string[] 또는 { key, text }[]
 */
function Block({ block }) {
  if (block.type === 'p') {
    return (
      <p className={`policy__p ${block.strong ? 'policy__p--strong' : ''}`}>
        {block.text}
      </p>
    );
  }
  if (block.type === 'h3') {
    return <h3 className="policy__h3">{block.text}</h3>;
  }
  if (block.type === 'ul') {
    const items = block.items || [];
    return (
      <ul className="policy__ul">
        {items.map((item, i) => (
          <li key={typeof item === 'string' ? i : item.key || i}>
            {typeof item === 'string' ? item : item.text}
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === 'ol') {
    const items = block.items || [];
    return (
      <ol className="policy__ol">
        {items.map((item, i) => (
          <li key={typeof item === 'string' ? i : item.key || i}>
            {typeof item === 'string' ? item : item.text}
          </li>
        ))}
      </ol>
    );
  }
  if (block.type === 'blockquote') {
    return (
      <blockquote className={`policy__blockquote ${block.warn ? 'policy__blockquote--warn' : ''}`}>
        {block.text}
      </blockquote>
    );
  }
  return null;
}

export default function PolicyContent({ sections, meta, showFooter = true }) {
  return (
    <article className="policy">
      <header className="policy__header">
        <h1 className="policy__title">{meta.title}</h1>
      </header>

      <div className="policy__body">
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="policy__section"
          >
            {section.title && (
              <h2 className="policy__section-title">{section.title}</h2>
            )}
            <div className="policy__section-body">
              {section.body.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {showFooter && (
        <footer className="policy__footer">
          <ul className="policy__meta">
            <li><strong>적용 대상</strong> {meta.applyTarget}</li>
            <li><strong>시행일</strong> {meta.effectiveDate}</li>
            <li><strong>최종 업데이트</strong> {meta.lastUpdated}</li>
          </ul>
        </footer>
      )}
    </article>
  );
}
