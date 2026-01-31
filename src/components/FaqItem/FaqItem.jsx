'use client';

import { useState } from 'react';

export default function FaqItem({ id, question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faq-item ${open ? 'faq-item--open' : ''}`}>
      <button
        type="button"
        className="faq-item__question"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`faq-answer-${id}`}
        id={`faq-question-${id}`}
      >
        <span>{question}</span>
        <span className="faq-item__icon" aria-hidden>
          {open ? '−' : '+'}
        </span>
      </button>
      <div id={`faq-answer-${id}`} className="faq-item__answer" role="region" aria-labelledby={`faq-question-${id}`} hidden={!open}>
        <p>{answer}</p>
      </div>
    </div>
  );
}
