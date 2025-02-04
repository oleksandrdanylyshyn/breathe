import goalData from '../storage/goalData';

const timeMultipliers = {
  hourlyGoals: 3600,           // 1 hour = 3600 seconds
  dailyGoals: 86400,           // 1 day = 86400 seconds
  weeklyGoals: 604800,         // 1 week = 604800 seconds
  monthlyGoals: 2592000,       // Approx. 30 days
  yearlyGoals: 31536000,       // 365 days
};

const convertGoalsToSeconds = () => {
    const allGoals = [];

    Object.keys(timeMultipliers).forEach((category) => {
        goalData[category].forEach((goal) => {
        allGoals.push({
            ...goal,
            category,
            requiredSeconds: goal.goal * timeMultipliers[category],
        });
        });
    });

    // Sort goals by requiredSeconds in ascending order
    allGoals.sort((a, b) => a.requiredSeconds - b.requiredSeconds);

    return allGoals;
};

export default convertGoalsToSeconds;
