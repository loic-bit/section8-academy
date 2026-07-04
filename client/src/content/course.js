// Course assembler. Each module lives in ./modules/mN.js as a default export
// { id, title, tagline, lessons: [{ id, title, minutes, body:[blocks] }] }.
// Add a module by importing it and appending to MODULES.
import m1 from './modules/m1.js';
import m2 from './modules/m2.js';
import m3 from './modules/m3.js';
import m4 from './modules/m4.js';
import m5 from './modules/m5.js';
import m6 from './modules/m6.js';
import m7 from './modules/m7.js';

export const MODULES = [m1, m2, m3, m4, m5, m6, m7];
export const TOTAL_LESSONS = MODULES.reduce((n, m) => n + m.lessons.length, 0);

// Flat lookup used by "continue where you left off" on the dashboard.
export const ALL_LESSONS = MODULES.flatMap((m) =>
  m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title }))
);
