import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const CHORES_LIST = [
  'Breakfast prep/cleanup',
  'Lunch prep/cleanup',
  'Snack prep/cleanup',
  'Dinner prep/cleanup',
  'Washing clothes',
  'Drying clothes',
  'Folding clothes',
  'Putting clothes away',
  'Washing dishes',
  'Drying dishes',
  'Cleaning room',
  'Sweeping home',
  'Mopping home',
  'Wiping table and counters',
];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default async function handler(req, res) {
  const { asmproductions_session } = req.cookies;

  if (!asmproductions_session || !asmproductions_session.startsWith('chores-access')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // GET: Fetch all chores for the week + historical earnings
    if (req.method === 'GET') {
      const { child } = req.query;

      if (!child) {
        return res.status(400).json({ error: 'Child parameter required' });
      }

      const weekKey = getWeekKey();
      const choreKey = `asmproductions:chores:${child}:${weekKey}`;
      const totalEarningsKey = `asmproductions:earnings:total:${child}`;
      const historyKey = `asmproductions:earnings:history:${child}`;

      // @upstash/redis auto-deserializes JSON values
      const choreData = await redis.get(choreKey);
      const totalEarnings = await redis.get(totalEarningsKey);
      const historyData = await redis.get(historyKey);

      const chores = choreData || initializeWeeklyChores();
      const total = totalEarnings ? parseInt(totalEarnings) : 0;
      const history = historyData || [];

      return res.status(200).json({
        chores,
        totalEarningsAllTime: total,
        history,
        currentWeekKey: weekKey,
      });
    }

    // POST: Update chore checkbox
    if (req.method === 'POST') {
      const { child, day, chore, checked } = req.body;

      if (!child || !day || chore === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const weekKey = getWeekKey();
      const choreKey = `asmproductions:chores:${child}:${weekKey}`;
      const totalEarningsKey = `asmproductions:earnings:total:${child}`;
      const historyKey = `asmproductions:earnings:history:${child}`;

      const existingData = await redis.get(choreKey);
      const chores = existingData || initializeWeeklyChores();

      if (!chores[day]) {
        chores[day] = {};
      }

      chores[day][chore] = checked;

      // Save weekly chores (7-day TTL)
      await redis.set(choreKey, chores, { ex: 604800 });

      // Calculate this week's total
      let weeklyTotal = 0;
      Object.values(chores).forEach((dayChores) => {
        Object.values(dayChores).forEach((isCompleted) => {
          if (isCompleted) weeklyTotal++;
        });
      });

      // Update cumulative all-time earnings
      const currentTotal = parseInt(await redis.get(totalEarningsKey)) || 0;
      const newTotal = currentTotal + (checked ? 1 : -1);
      await redis.set(totalEarningsKey, newTotal);

      // Update weekly history
      const historyRaw = await redis.get(historyKey);
      const history = historyRaw || [];

      const weekIndex = history.findIndex((entry) => entry.week === weekKey);
      if (weekIndex >= 0) {
        history[weekIndex].total = weeklyTotal;
      } else {
        history.push({ week: weekKey, total: weeklyTotal });
      }

      await redis.set(historyKey, history);

      return res.status(200).json({
        success: true,
        chores,
        weeklyTotal,
        allTimeTotal: newTotal,
      });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Chores API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

function getWeekKey() {
  const now = new Date();
  const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
  return weekStart.toISOString().split('T')[0];
}

function initializeWeeklyChores() {
  const chores = {};
  DAYS.forEach((day) => {
    chores[day] = {};
    CHORES_LIST.forEach((chore) => {
      chores[day][chore] = false;
    });
  });
  return chores;
}
