// Course assembler: three levels (stages of awareness), each with modules.
// Lesson ids are stable across restructures because progress is stored by id.
import ma from './modules/ma.js';
import mb from './modules/mb.js';
import m1 from './modules/m1.js';
import m2 from './modules/m2.js';
import m3 from './modules/m3.js';
import m4 from './modules/m4.js';
import m5 from './modules/m5.js';
import m6 from './modules/m6.js';
import m7 from './modules/m7.js';
import m8new from './modules/m8new.js';

// Level 3 re-homes m7's scale lessons into a dedicated Scale module alongside
// the two new ones, keeping original lesson ids so nobody loses progress.
const m7lessons = m7.lessons;

// Joseph (2026-07): form the LLC BEFORE the first purchase. The entity lesson
// moves up into Picking the Right Market as its closing step (replacing the
// retired landlord-friendly-states lesson). Lesson id stays m7l3 so nobody
// loses progress.
const market = {
  ...m2,
  lessons: [...m2.lessons, m7lessons.find((l) => l.id === 'm7l3')].filter(Boolean),
};
const own = {
  id: 'm7',
  title: 'Own & Operate',
  tagline: 'Run the portfolio without it running you, and protect what you build.',
  lessons: m7lessons.filter((l) => ['m7l1', 'm7l2'].includes(l.id)),
};
const scale = {
  id: 'm8',
  title: 'Scale to 50 Doors',
  tagline: 'Recycle capital, keep more after tax, and build your acquisition machine.',
  lessons: [
    m7lessons.find((l) => l.id === 'm7l4'),
    m8new.lessons.find((l) => l.id === 'm8l2'),
    m7lessons.find((l) => l.id === 'm7l5'),
    m8new.lessons.find((l) => l.id === 'm8l4'),
  ].filter(Boolean),
};

export const LEVELS = [
  {
    key: 'foundation',
    num: 1,
    name: 'Foundation',
    rank: 'Scout',
    icon: '🧭',
    unlock: null, // always open
    checkpoint: 'operator',
    tagline: 'Why cash flow, which vehicle, and why Section 8 wins the math.',
    modules: [ma, mb, m1],
  },
  {
    key: 'firstdeal',
    num: 2,
    name: 'First Deal',
    rank: 'Operator',
    icon: '🔑',
    unlock: 'unlock-operator',
    checkpoint: 'portfolio',
    tagline: 'Market, find, analyze, fund, and close your first Section 8 deal.',
    modules: [market, m3, m4, m5, m6],
  },
  {
    key: 'scale',
    num: 3,
    name: 'Scale',
    rank: 'Portfolio Builder',
    icon: '🏘️',
    unlock: 'unlock-portfolio',
    checkpoint: null,
    tagline: 'Operate, protect, and recycle capital on the path to 50 doors.',
    modules: [own, scale],
  },
];

export const MODULES = LEVELS.flatMap((lv) => lv.modules);
export const TOTAL_LESSONS = MODULES.reduce((n, m) => n + m.lessons.length, 0);

export const ALL_LESSONS = LEVELS.flatMap((lv) =>
  lv.modules.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title, levelKey: lv.key, levelName: lv.name }))
  )
);

export const levelFor = (lessonId) => LEVELS.find((lv) => lv.modules.some((m) => m.lessons.some((l) => l.id === lessonId)));

// A level is open if it has no unlock requirement or the unlock flag is in the
// completed set (earned at a checkpoint).
export const levelOpen = (lv, completedSet) => !lv.unlock || completedSet.has(lv.unlock);
