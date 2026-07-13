/** @jsxRuntime classic */
/** @jsx React.createElement */

// ============================================================
// AbilityX Design System — Navigation Component
// ============================================================

const NavBar = ({ currentPage, onNavigate }) => {
  const pages = ['Home', 'Speakers', 'Agenda', 'Register'];

  const navStyles = {
    nav: {
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: '#fff',
      borderBottom: '1px solid #e8e8e8',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 48px', height: '72px',
    },
    logoWrap: { display: 'flex', alignItems: 'center' },
    logo: { height: '36px', objectFit: 'contain' },
    links: { display: 'flex', alignItems: 'center', gap: '8px' },
    link: (active) => ({
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '14px',
      fontWeight: active ? '600' : '500',
      color: active ? '#CC0000' : '#404040',
      padding: '8px 16px',
      borderRadius: '999px',
      background: active ? '#fde8e8' : 'transparent',
      border: 'none', cursor: 'pointer',
      transition: 'all 150ms ease-in-out',
      textDecoration: 'none',
    }),
    cta: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '14px', fontWeight: '600',
      background: '#CC0000', color: '#fff',
      padding: '10px 24px', borderRadius: '999px',
      border: 'none', cursor: 'pointer',
      transition: 'background 150ms ease-in-out',
    },
  };

  return React.createElement('nav', { style: navStyles.nav },
    React.createElement('div', { style: navStyles.logoWrap },
      React.createElement('img', { src: '../../assets/logo-primary.png', alt: 'AbilityX', style: navStyles.logo })
    ),
    React.createElement('div', { style: navStyles.links },
      pages.map(page =>
        React.createElement('button', {
          key: page,
          style: navStyles.link(currentPage === page),
          onClick: () => onNavigate(page),
        }, page)
      )
    ),
    React.createElement('button', {
      style: navStyles.cta,
      onClick: () => onNavigate('Register'),
    }, 'Register Now')
  );
};

Object.assign(window, { NavBar });
