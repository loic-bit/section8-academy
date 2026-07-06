// Best-effort Kit (ConvertKit) mirror: adds each new Academy signup to the
// email list so the nurture sequence can run. Never blocks or fails signup.
// DISABLED until KIT_API_KEY + KIT_FORM_ID are set on the service, so nothing
// touches the live Kit account until Loic flips it on.

const API_KEY = () => (process.env.KIT_API_KEY || '').trim();
const FORM_ID = () => (process.env.KIT_FORM_ID || '').trim();
const TAG_ID = () => (process.env.KIT_TAG_ID || '').trim(); // optional, e.g. "academy-member" tag

export async function mirrorSignupToKit({ name, email }) {
  if (!API_KEY() || !FORM_ID()) return; // mirror disabled
  try {
    const body = {
      api_key: API_KEY(),
      email,
      first_name: (name || '').split(' ')[0],
    };
    if (TAG_ID()) body.tags = [Number(TAG_ID())];
    const res = await fetch(`https://api.convertkit.com/v3/forms/${FORM_ID()}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text();
      console.warn('[kit] mirror failed', res.status, text.slice(0, 300));
    }
  } catch (e) {
    console.warn('[kit] mirror error', e.message);
  }
}
