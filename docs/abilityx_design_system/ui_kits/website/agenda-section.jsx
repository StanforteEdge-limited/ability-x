/** @jsxRuntime classic */
/** @jsx React.createElement */

// ============================================================
// AbilityX Design System — Agenda Section
// ============================================================

const AGENDA = [
  {
    day: 'Day 1', date: 'Oct 14, 2025',
    sessions: [
      { time: '9:00 AM', title: 'Opening Ceremony & Keynote', speaker: 'Ngozi Eze', type: 'Keynote', room: 'Main Stage' },
      { time: '10:30 AM', title: 'The State of Disability Inclusion in Nigeria', speaker: 'Aisha Usman', type: 'Panel', room: 'Main Stage' },
      { time: '12:00 PM', title: 'Lunch & Networking', speaker: '', type: 'Break', room: 'Atrium' },
      { time: '2:00 PM', title: 'Building Accessible Products from Day One', speaker: 'David Mensah', type: 'Workshop', room: 'Room A' },
      { time: '4:00 PM', title: 'Startup Showcase: Inclusive Tech Demos', speaker: 'Multiple', type: 'Demo', room: 'Innovation Hub' },
    ],
  },
  {
    day: 'Day 2', date: 'Oct 15, 2025',
    sessions: [
      { time: '9:00 AM', title: 'Funding the Future: Grants for Disability Inclusion', speaker: 'James Adeyemi', type: 'Workshop', room: 'Main Stage' },
      { time: '11:00 AM', title: 'Policy Lab: Making Nigeria Accessible', speaker: 'Fatima Al-Hassan', type: 'Workshop', room: 'Room B' },
      { time: '1:00 PM', title: 'Lunch Break', speaker: '', type: 'Break', room: 'Atrium' },
      { time: '3:00 PM', title: 'AT Innovation Showcase', speaker: 'Chukwuemeka Obi', type: 'Demo', room: 'Innovation Hub' },
      { time: '5:00 PM', title: 'Closing & Awards Ceremony', speaker: 'All Speakers', type: 'Keynote', room: 'Main Stage' },
    ],
  },
];

const TYPE_STYLES = {
  Keynote:  { bg: '#0d0d0d', color: '#fff' },
  Panel:    { bg: '#fde8e8', color: '#CC0000' },
  Workshop: { bg: '#e8f0fb', color: '#0060b0' },
  Demo:     { bg: '#e8f7ef', color: '#1a7a4a' },
  Break:    { bg: '#f5f5f5', color: '#8f8f8f' },
};

const AgendaSession = ({ session, index }) => {
  const style = TYPE_STYLES[session.type] || TYPE_STYLES.Panel;
  const isBreak = session.type === 'Break';

  const s = {
    row: {
      display: 'flex', alignItems: 'center', gap: '20px',
      padding: '16px 20px',
      background: isBreak ? '#fafafa' : '#fff',
      borderRadius: '8px',
      borderLeft: `3px solid ${isBreak ? '#e8e8e8' : style.bg === '#0d0d0d' ? '#0d0d0d' : style.color}`,
    },
    time: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '12px', fontWeight: '600',
      color: '#8f8f8f', minWidth: '70px',
      fontVariantNumeric: 'tabular-nums',
    },
    typeTag: {
      display: 'inline-flex', padding: '2px 8px',
      background: style.bg, color: style.color,
      borderRadius: '4px', fontSize: '9px',
      fontWeight: '700', letterSpacing: '0.07em',
      textTransform: 'uppercase', minWidth: '66px',
      justifyContent: 'center',
    },
    info: { flex: 1 },
    title: {
      fontFamily: "'Nunito', sans-serif",
      fontSize: '15px', fontWeight: '700',
      color: isBreak ? '#8f8f8f' : '#0d0d0d',
      marginBottom: session.speaker ? '2px' : '0',
    },
    speaker: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '12px', color: '#6b6b6b',
    },
    room: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '11px', color: '#b5b5b5', fontWeight: '500',
      minWidth: '100px', textAlign: 'right',
    },
  };

  return React.createElement('div', { style: s.row },
    React.createElement('div', { style: s.time }, session.time),
    React.createElement('div', { style: s.typeTag }, session.type),
    React.createElement('div', { style: s.info },
      React.createElement('div', { style: s.title }, session.title),
      session.speaker && React.createElement('div', { style: s.speaker }, session.speaker)
    ),
    React.createElement('div', { style: s.room }, session.room)
  );
};

const AgendaSection = () => {
  const [activeDay, setActiveDay] = React.useState(0);

  const s = {
    section: { background: '#fff', padding: '96px 80px' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' },
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
    },
    tabs: { display: 'flex', gap: '8px' },
    tab: (active) => ({
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '13px', fontWeight: '600',
      padding: '8px 20px', borderRadius: '999px',
      border: 'none', cursor: 'pointer',
      background: active ? '#0d0d0d' : '#f5f5f5',
      color: active ? '#fff' : '#6b6b6b',
      transition: 'all 150ms ease-in-out',
    }),
    sessions: { display: 'flex', flexDirection: 'column', gap: '8px' },
  };

  const current = AGENDA[activeDay];

  return React.createElement('section', { style: s.section },
    React.createElement('div', { style: s.header },
      React.createElement('div', null,
        React.createElement('div', { style: s.overline }, 'Programme'),
        React.createElement('h2', { style: s.title }, 'Agenda')
      ),
      React.createElement('div', { style: s.tabs },
        AGENDA.map((day, i) =>
          React.createElement('button', {
            key: i,
            style: s.tab(activeDay === i),
            onClick: () => setActiveDay(i),
          }, `${day.day} · ${day.date}`)
        )
      )
    ),
    React.createElement('div', { style: s.sessions },
      current.sessions.map((session, i) =>
        React.createElement(AgendaSession, { key: i, session, index: i })
      )
    )
  );
};

Object.assign(window, { AgendaSection });
