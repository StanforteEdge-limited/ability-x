/** @jsxRuntime classic */
/** @jsx React.createElement */

// ============================================================
// AbilityX Design System — Speakers Section
// ============================================================

const SPEAKERS = [
  { name: 'Aisha Usman', role: 'Minister of Humanitarian Affairs', org: 'Federal Government of Nigeria', initials: 'AU', track: 'Policy' },
  { name: 'Chukwuemeka Obi', role: 'CEO', org: 'AccessTech Africa', initials: 'CO', track: 'Technology' },
  { name: 'Fatima Al-Hassan', role: 'Executive Director', org: 'Disability Rights Network', initials: 'FA', track: 'Advocacy' },
  { name: 'David Mensah', role: 'Head of Inclusion', org: 'Google Africa', initials: 'DM', track: 'Technology' },
  { name: 'Ngozi Eze', role: 'Founder', org: 'ProjectEnable Africa', initials: 'NE', track: 'Movement' },
  { name: 'James Adeyemi', role: 'Director of Programs', org: 'USAID Nigeria', initials: 'JA', track: 'Funding' },
];

const TRACK_COLORS = {
  Policy: '#1a7a4a',
  Technology: '#0060b0',
  Advocacy: '#CC0000',
  Movement: '#CC0000',
  Funding: '#b56a00',
};

const SpeakerCard = ({ speaker }) => {
  const [hovered, setHovered] = React.useState(false);
  const trackColor = TRACK_COLORS[speaker.track] || '#6b6b6b';

  const s = {
    card: {
      background: '#fff',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: hovered ? '0 8px 28px rgba(0,0,0,0.12)' : '0 2px 12px rgba(0,0,0,0.07)',
      transition: 'box-shadow 200ms ease, transform 200ms ease',
      transform: hovered ? 'translateY(-3px)' : 'none',
      cursor: 'pointer',
    },
    avatar: {
      width: '56px', height: '56px', borderRadius: '50%',
      background: '#0d0d0d',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      marginBottom: '14px',
    },
    initials: {
      fontFamily: "'Nunito', sans-serif",
      fontSize: '18px', fontWeight: '800', color: '#fff',
    },
    track: {
      display: 'inline-flex', padding: '2px 9px',
      background: `${trackColor}18`,
      color: trackColor,
      borderRadius: '4px',
      fontSize: '9px', fontWeight: '700',
      letterSpacing: '0.08em', textTransform: 'uppercase',
      marginBottom: '8px',
    },
    name: {
      fontFamily: "'Nunito', sans-serif",
      fontSize: '17px', fontWeight: '800',
      color: '#0d0d0d', lineHeight: '1.2',
      marginBottom: '4px',
    },
    role: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '13px', color: '#6b6b6b',
      lineHeight: '1.4',
    },
    org: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '12px', color: '#CC0000',
      fontWeight: '600', marginTop: '4px',
    },
  };

  return React.createElement('div', {
    style: s.card,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  },
    React.createElement('div', { style: s.avatar },
      React.createElement('span', { style: s.initials }, speaker.initials)
    ),
    React.createElement('div', { style: s.track }, speaker.track),
    React.createElement('div', { style: s.name }, speaker.name),
    React.createElement('div', { style: s.role }, speaker.role),
    React.createElement('div', { style: s.org }, speaker.org)
  );
};

const SpeakersSection = () => {
  const s = {
    section: {
      background: '#f5f5f5',
      padding: '96px 80px',
    },
    header: { marginBottom: '56px' },
    overline: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '11px', fontWeight: '700',
      letterSpacing: '0.14em', textTransform: 'uppercase',
      color: '#CC0000', marginBottom: '12px',
    },
    title: {
      fontFamily: "'Nunito', sans-serif",
      fontSize: '42px', fontWeight: '900',
      letterSpacing: '-0.02em', color: '#0d0d0d',
      lineHeight: '1.05',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
    },
  };

  return React.createElement('section', { style: s.section },
    React.createElement('div', { style: s.header },
      React.createElement('div', { style: s.overline }, 'Featured Speakers'),
      React.createElement('h2', { style: s.title }, 'Voices of the Movement')
    ),
    React.createElement('div', { style: s.grid },
      SPEAKERS.map(speaker =>
        React.createElement(SpeakerCard, { key: speaker.name, speaker })
      )
    )
  );
};

Object.assign(window, { SpeakersSection, SpeakerCard });
