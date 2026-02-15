'use client';

export default function Layout({ children, header, footer, mainClassName }) {
  return (
    <div className="layout">
      {header && <header className="layout__header">{header}</header>}
      <main className={['layout__main', mainClassName].filter(Boolean).join(' ')}>{children}</main>
      {footer && <footer className="layout__footer">{footer}</footer>}
    </div>
  );
}
