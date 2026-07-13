/** @jsxRuntime classic */
/** @jsx React.createElement */

// ============================================================
// AbilityX Design System — Registration Form
// ============================================================

const RegisterSection = ({ onBack }) => {
  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState({ name: '', email: '', org: '', role: '', track: '', country: '' });
  const [submitted, setSubmitted] = React.useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const s = {
    section: {
      background: '#f5f5f5', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '120px 40px 80px',
    },
    card: {
      background: '#fff', borderRadius: '16px',
      boxShadow: '0 6px 40px rgba(0,0,0,0.1)',
      width: '100%', maxWidth: '560px',
      overflow: 'hidden',
    },
    header: {
      background: '#0d0d0d', padding: '32px 40px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    },
    headerTitle: {
      fontFamily: "'Nunito', sans-serif",
      fontSize: '24px', fontWeight: '900',
      color: '#fff', letterSpacing: '-0.02em',
    },
    headerSub: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '13px', color: 'rgba(255,255,255,0.5)',
      marginTop: '2px',
    },
    logo: { height: '28px', opacity: 0.5 },
    body: { padding: '36px 40px' },
    progress: { display: 'flex', gap: '8px', marginBottom: '32px' },
    progressStep: (active, done) => ({
      flex: 1, height: '4px', borderRadius: '4px',
      background: done ? '#CC0000' : active ? '#CC0000' : '#e8e8e8',
      opacity: done ? 0.5 : 1,
    }),
    stepLabel: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '11px', fontWeight: '700',
      letterSpacing: '0.1em', textTransform: 'uppercase',
      color: '#CC0000', marginBottom: '8px',
    },
    stepTitle: {
      fontFamily: "'Nunito', sans-serif",
      fontSize: '22px', fontWeight: '800',
      color: '#0d0d0d', marginBottom: '24px',
      letterSpacing: '-0.02em',
    },
    fieldGroup: { display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' },
    fieldRow: { display: 'flex', gap: '12px' },
    field: { display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 },
    label: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '13px', fontWeight: '600', color: '#1f1f1f',
    },
    input: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '14px', padding: '11px 14px',
      border: '1.5px solid #d4d4d4', borderRadius: '8px',
      color: '#0d0d0d', outline: 'none', background: '#fff',
      transition: 'border-color 150ms ease',
    },
    actions: { display: 'flex', gap: '12px', justifyContent: 'flex-end' },
    btnPrimary: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '14px', fontWeight: '700',
      background: '#CC0000', color: '#fff',
      padding: '12px 28px', borderRadius: '999px',
      border: 'none', cursor: 'pointer',
    },
    btnBack: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '14px', fontWeight: '600',
      background: 'transparent', color: '#6b6b6b',
      padding: '12px 20px', borderRadius: '999px',
      border: '1.5px solid #d4d4d4', cursor: 'pointer',
    },
    successWrap: {
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      textAlign: 'center', padding: '20px 0',
    },
    successIcon: {
      width: '64px', height: '64px', borderRadius: '50%',
      background: '#fde8e8', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      marginBottom: '20px', fontSize: '28px',
    },
    successTitle: {
      fontFamily: "'Nunito', sans-serif",
      fontSize: '26px', fontWeight: '900',
      color: '#0d0d0d', letterSpacing: '-0.02em',
      marginBottom: '10px',
    },
    successBody: {
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '14px', color: '#6b6b6b',
      lineHeight: '1.6', marginBottom: '28px',
    },
  };

  const handleSubmit = () => {
    if (step < 2) setStep(step + 1);
    else setSubmitted(true);
  };

  if (submitted) {
    return React.createElement('section', { style: s.section },
      React.createElement('div', { style: s.card },
        React.createElement('div', { style: s.header },
          React.createElement('div', null,
            React.createElement('div', { style: s.headerTitle }, 'AbilityX 2025'),
            React.createElement('div', { style: s.headerSub }, 'Registration Complete')
          ),
          React.createElement('img', { src: '../../assets/logo-white.png', alt: 'AbilityX', style: s.logo })
        ),
        React.createElement('div', { style: s.body },
          React.createElement('div', { style: s.successWrap },
            React.createElement('div', { style: s.successIcon }, '✓'),
            React.createElement('div', { style: s.successTitle }, "You're registered!"),
            React.createElement('div', { style: s.successBody },
              `Thank you, ${form.name || 'attendee'}. Your spot at AbilityX 2025 is confirmed. Check your email for your ticket and schedule.`
            ),
            React.createElement('button', { style: s.btnPrimary, onClick: onBack }, 'Back to Home')
          )
        )
      )
    );
  }

  return React.createElement('section', { style: s.section },
    React.createElement('div', { style: s.card },
      React.createElement('div', { style: s.header },
        React.createElement('div', null,
          React.createElement('div', { style: s.headerTitle }, 'AbilityX 2025'),
          React.createElement('div', { style: s.headerSub }, 'October 14–16 · Lagos, Nigeria')
        ),
        React.createElement('img', { src: '../../assets/logo-white.png', alt: 'AbilityX', style: s.logo })
      ),
      React.createElement('div', { style: s.body },
        React.createElement('div', { style: s.progress },
          React.createElement('div', { style: s.progressStep(step === 1, step > 1) }),
          React.createElement('div', { style: s.progressStep(step === 2, step > 2) })
        ),
        step === 1 && React.createElement('div', null,
          React.createElement('div', { style: s.stepLabel }, 'Step 1 of 2'),
          React.createElement('div', { style: s.stepTitle }, 'Your Details'),
          React.createElement('div', { style: s.fieldGroup },
            React.createElement('div', { style: s.fieldRow },
              React.createElement('div', { style: s.field },
                React.createElement('label', { style: s.label }, 'Full Name'),
                React.createElement('input', { style: s.input, value: form.name, onChange: update('name'), placeholder: 'e.g. Amara Obi' })
              )
            ),
            React.createElement('div', { style: s.field },
              React.createElement('label', { style: s.label }, 'Email Address'),
              React.createElement('input', { style: s.input, type: 'email', value: form.email, onChange: update('email'), placeholder: 'your@email.com' })
            ),
            React.createElement('div', { style: s.fieldRow },
              React.createElement('div', { style: s.field },
                React.createElement('label', { style: s.label }, 'Organization'),
                React.createElement('input', { style: s.input, value: form.org, onChange: update('org'), placeholder: 'Your org' })
              ),
              React.createElement('div', { style: s.field },
                React.createElement('label', { style: s.label }, 'Country'),
                React.createElement('input', { style: s.input, value: form.country, onChange: update('country'), placeholder: 'Nigeria' })
              )
            )
          )
        ),
        step === 2 && React.createElement('div', null,
          React.createElement('div', { style: s.stepLabel }, 'Step 2 of 2'),
          React.createElement('div', { style: s.stepTitle }, 'Your Interests'),
          React.createElement('div', { style: s.fieldGroup },
            React.createElement('div', { style: s.field },
              React.createElement('label', { style: s.label }, 'Your Role'),
              React.createElement('select', { style: s.input, value: form.role, onChange: update('role') },
                React.createElement('option', { value: '' }, 'Select your role'),
                React.createElement('option', { value: 'policymaker' }, 'Policymaker / Government'),
                React.createElement('option', { value: 'ngo' }, 'NGO / Civil Society'),
                React.createElement('option', { value: 'tech' }, 'Technologist / Startup'),
                React.createElement('option', { value: 'pwd' }, 'Person with Disability'),
                React.createElement('option', { value: 'funder' }, 'Donor / Funder'),
                React.createElement('option', { value: 'media' }, 'Media / Researcher')
              )
            ),
            React.createElement('div', { style: s.field },
              React.createElement('label', { style: s.label }, 'Preferred Track'),
              React.createElement('select', { style: s.input, value: form.track, onChange: update('track') },
                React.createElement('option', { value: '' }, 'Select a track'),
                React.createElement('option', { value: 'policy' }, 'Policy & Advocacy'),
                React.createElement('option', { value: 'tech' }, 'Technology & Innovation'),
                React.createElement('option', { value: 'funding' }, 'Funding & Partnerships'),
                React.createElement('option', { value: 'lived' }, 'Lived Experience')
              )
            )
          )
        ),
        React.createElement('div', { style: s.actions },
          step > 1 && React.createElement('button', { style: s.btnBack, onClick: () => setStep(step - 1) }, 'Back'),
          React.createElement('button', { style: s.btnPrimary, onClick: handleSubmit },
            step < 2 ? 'Continue →' : 'Complete Registration'
          )
        )
      )
    )
  );
};

Object.assign(window, { RegisterSection });
