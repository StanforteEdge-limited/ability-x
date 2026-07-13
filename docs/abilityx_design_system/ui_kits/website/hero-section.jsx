/** @jsxRuntime classic */
/** @jsx React.createElement */

// ============================================================
// AbilityX Design System — Hero Section
// ============================================================

const HeroSection = ({ onRegister }) => {
  const s = {
    hero: {
      background: '#0d0d0d',
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '120px 80px 80px',
      position: 'relative', overflow: 'hidden',
    },
    bgAccent: {
      position: 'absolute', top: '-80px', right: '-80px',
      width: '500px', height: '500px', borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(204,0,0,0.15) 0%, transparent 70%)',
      pointerEvents: 'none',
    },
    bgAccent2: {
      position: 'absolute', bottom: '-100px', left: '30%',
      width: '400px', height: '400px', borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(204,0,0,0.08) 0%, transparent 70%)',
      pointerEvents: 'none',
    },
    overline: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '12px', fontWeight: '700',
      letterSpacing: '0.14em', textTransform: 'uppercase',
      color: '#CC0000', marginBottom: '20px',
      display: 'flex', alignItems: 'center', gap: '10px',
    },
    overlineLine: { width: '32px', height: '2px', background: '#CC0000', borderRadius: '2px' },
    headline: {
      fontFamily: "'Nunito', sans-serif",
      fontSize: 'clamp(52px, 7vw, 88px)',
      fontWeight: '900', lineHeight: '1.0',
      letterSpacing: '-0.03em',
      color: '#fff',
      marginBottom: '8px',
    },
    headlineAccent: { color: '#CC0000' },
    sub: {
      fontFamily: "'Nunito', sans-serif",
      fontSize: 'clamp(24px, 3vw, 40px)',
      fontWeight: '800',
      color: 'rgba(255,255,255,0.55)',
      lineHeight: '1.1',
      marginBottom: '28px',
      letterSpacing: '-0.02em',
    },
    body: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '18px', fontWeight: '400',
      color: 'rgba(255,255,255,0.65)',
      lineHeight: '1.65',
      maxWidth: '560px',
      marginBottom: '40px',
    },
    actions: { display: 'flex', gap: '14px', alignItems: 'center' },
    btnPrimary: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '15px', fontWeight: '700',
      background: '#CC0000', color: '#fff',
      padding: '16px 36px', borderRadius: '999px',
      border: 'none', cursor: 'pointer',
      transition: 'background 150ms ease-in-out',
    },
    btnGhost: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '15px', fontWeight: '600',
      background: 'transparent', color: '#fff',
      padding: '15px 35px', borderRadius: '999px',
      border: '1.5px solid rgba(255,255,255,0.25)',
      cursor: 'pointer',
    },
    stats: {
      display: 'flex', gap: '48px',
      marginTop: '64px',
      paddingTop: '40px',
      borderTop: '1px solid rgba(255,255,255,0.1)',
    },
    stat: { display: 'flex', flexDirection: 'column', gap: '4px' },
    statNum: {
      fontFamily: "'Nunito', sans-serif",
      fontSize: '36px', fontWeight: '900',
      color: '#CC0000', lineHeight: '1',
    },
    statLabel: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '13px', color: 'rgba(255,255,255,0.5)',
      fontWeight: '500',
    },
    logoImg: {
      position: 'absolute', right: '80px', bottom: '80px',
      height: '48px', opacity: '0.12',
      objectFit: 'contain',
    },
  };

  return React.createElement('section', { style: s.hero },
    React.createElement('div', { style: s.bgAccent }),
    React.createElement('div', { style: s.bgAccent2 }),
    React.createElement('div', { style: s.overline },
      React.createElement('div', { style: s.overlineLine }),
      'Nigeria\'s #1 Disability Inclusion Event'
    ),
    React.createElement('h1', { style: s.headline },
      'Ability', React.createElement('span', { style: s.headlineAccent }, 'X'), ' 2025'
    ),
    React.createElement('div', { style: s.sub }, 'It\'s not just an event. It\'s a movement.'),
    React.createElement('p', { style: s.body },
      'Bringing together innovators, policymakers, startups, technologists, donors, civil society, and persons with disabilities to reimagine inclusive development in Africa.'
    ),
    React.createElement('div', { style: s.actions },
      React.createElement('button', { style: s.btnPrimary, onClick: onRegister }, 'Register Now'),
      React.createElement('button', { style: s.btnGhost }, 'View Schedule')
    ),
    React.createElement('div', { style: s.stats },
      React.createElement('div', { style: s.stat },
        React.createElement('div', { style: s.statNum }, '500+'),
        React.createElement('div', { style: s.statLabel }, 'Attendees')
      ),
      React.createElement('div', { style: s.stat },
        React.createElement('div', { style: s.statNum }, '40+'),
        React.createElement('div', { style: s.statLabel }, 'Speakers')
      ),
      React.createElement('div', { style: s.stat },
        React.createElement('div', { style: s.statNum }, '3'),
        React.createElement('div', { style: s.statLabel }, 'Days')
      ),
      React.createElement('div', { style: s.stat },
        React.createElement('div', { style: s.statNum }, '12+'),
        React.createElement('div', { style: s.statLabel }, 'Countries')
      )
    ),
    React.createElement('img', { src: '../../assets/logo-white.png', alt: '', style: s.logoImg })
  );
};

Object.assign(window, { HeroSection });
