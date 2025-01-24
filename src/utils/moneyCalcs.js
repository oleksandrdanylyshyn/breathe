// takes into account how much time since the person stopped smoking and then multiplies by the cigarrettes smoked
export const moneySavedSinceEnd = (totalSeconds, cigsPerDay, cigsPerPack, pricePerPack) => {
    const dailySaving = (cigsPerDay / cigsPerPack) * pricePerPack; // Cost of cigarettes smoked per day
    const perSecondSaving = dailySaving / 86400; // (86400 seconds in a day)
    return totalSeconds * perSecondSaving; // Total savings in the elapsed seconds
};