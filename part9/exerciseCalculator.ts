interface resultValue {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number | undefined;
  ratingDescription: string | undefined;
  target: number;
  average: number;
}

const calculateExercises  = (a: Array<number>, b: number): resultValue => {
  let rating;
  let ratingDescription;

  const ratingCalculation = () => {
    if (b > a.reduce((acc, cur) => acc + cur) / a.length) {
      rating = 1;
      ratingDescription = "Not so good."
    } else if (b < a.reduce((acc, cur) => acc + cur) / a.length) {
      rating = 3;
      ratingDescription = "Good job.";
    } else {
      rating = 2;
      ratingDescription = "Fair enough.";
    }
  }
  
  ratingCalculation();

  const result = {
    periodLength: a.length,
    trainingDays: a.filter(day => day !== 0).length,
    target: b,
    average: a.reduce(function (acc, cur) { return acc + cur }) / a.length,
    success: (b > a.reduce((acc, cur) => acc + cur) / a.length ? false : true),
    rating: rating,
    ratingDescription: ratingDescription 
  }

  return result;
}

export { calculateExercises }
