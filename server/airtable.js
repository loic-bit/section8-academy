// Best-effort CRM mirror: pushes each new free signup into Joseph's Airtable
// so the sales team sees the lead in the CRM they already use. Never blocks or
// fails signup — if Airtable is misconfigured or down, we just log and move on.

const TOKEN = () => (process.env.AIRTABLE_TOKEN || '').trim();
const BASE = () => (process.env.AIRTABLE_BASE_ID || '').trim();
const TABLE = () => (process.env.AIRTABLE_LEADS_TABLE || '').trim();
const SOURCE = () => (process.env.AIRTABLE_SOURCE_LABEL || 'Free Academy').trim();

export async function mirrorLeadToAirtable({ name, email }) {
  if (!TOKEN() || !BASE() || !TABLE()) return; // mirror disabled
  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${BASE()}/${TABLE()}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${TOKEN()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // typecast lets Airtable create select options / coerce types.
          typecast: true,
          records: [
            {
              fields: {
                Name: name,
                Email: email,
                Source: SOURCE(),
              },
            },
          ],
        }),
      }
    );
    if (!res.ok) {
      const text = await res.text();
      console.warn('[airtable] mirror failed', res.status, text.slice(0, 300));
    }
  } catch (e) {
    console.warn('[airtable] mirror error', e.message);
  }
}
