import { createClient } from 'redis';

const client = createClient({
  url: `redis://:${process.env.UPSTASH_REDIS_PASSWORD}@${process.env.UPSTASH_REDIS_HOST}:${process.env.UPSTASH_REDIS_PORT}`,
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
    await client.connect();

    // GET: Fetch all chores for the week + historical earnings
    if (req.method === 'GET') {
      const { child } = req.query;

      if (!child) {
        await client.disconnect();
        return res.status(400).json({ error: 'Child parameter required' });
      }

      const weekKey = getWeekKey();
      const choreKey = `asmproductions:chores:${child}:${weekKey}`;
      const totalEarningsKey = `asmproductions:earnings:total:${child}`;
      const historyKey = `asmproductions:earnings:history:${child}`;

      const choreData = await client.get(choreKey);
      const totalEarnings = await client.get(totalEarningsKey);
      const historyData = await client.get(historyKey);

      const chores = choreData ? JSON.parse(choreData) : initializeWeeklyChores();
      const total = totalEarnings ? parseInt(totalEarnings) : 0;
      const history = historyData ? JSON.parse(historyData) : [];

      await client.disconnect();

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

      if (!child || !day || !chore === undefined) {
        await client.disconnect();
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const weekKey = getWeekKey();
      const choreKey = `asmproductions:chores:${child}:${weekKey}`;
      const totalEarningsKey = `asmproductions:earnings:total:${child}`;
      const historyKey = `asmproductions:earnings:history:${child}`;

      let chores = {};
      const existingData = await client.get(choreKey);
      if (existingData) {
        chores = JSON.parse(existingData);
      } else {
        chores = initializeWeeklyChores();
      }

      // Initialize day if it doesn't exist
      if (!chores[day]) {
        chores[day] = {};
      }

      // Update chore status
      chores[day][chore] = checked;

      // Save weekly chores
      await client.set(choreKey, JSON.stringify(chores), { EX: 604800 });

      // Calculate this week's total
      let weeklyTotal = 0;
      Object.values(chores).forEach((dayChores) => {
        Object.values(dayChores).forEach((isCompleted) => {
          if (isCompleted) weeklyTotal++;
        });
      });

      // Update cumulative earnings
      const currentTotal = parseInt(await client.get(totalEarningsKey)) || 0;
      await client.set(totalEarningsKey, currentTotal + (checked ? 1 : -1));

      // Update history (track by week)
      let history = [];
      const historyRaw = await client.get(historyKey);
      if (historyRaw) {
        history = JSON.parse(historyRaw);
      }

      // Check if this week is already in history
      const weekIndex = history.findIndex((entry) => entry.week === weekKey);
      if (weekIndex >= 0) {
        history[weekIndex].total = weeklyTotal;
      } else {
        history.push({ week: weekKey, total: weeklyTotal });
      }

      await client.set(historyKey, JSON.stringify(history));

      await client.disconnect();

      return res.status(200).json({
        success: true,
        chores,
        weeklyTotal,
        allTimeTotal: currentTotal + (checked ? 1 : -1),
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
