import { musclegainFemale45E } from "../female-musclegain-experienced-45";
import { musclegainFemale45B } from "../female-musclegain-beginner-45";
import { muscleGainFemale31B } from "../female-musclegain-beginner-31-45";
import { muscleGainFemale31E } from "../female-musclegain-experienced-31-45";

const workoutPlans = [
  muscleGainFemale31B,
  muscleGainFemale31E,
  musclegainFemale45E,
  musclegainFemale45B,
];

export const getTrainingPlans = (params) => {
  const { goal, experience, age, gender } = params;
  if (!goal || !experience || !age || !gender)
    return { error: "invalide params for getTrainingPlans" };

  const plans = workoutPlans.filter((w) => {
    if (
      w.goal.includes(goal) &&
      w.level.includes(experience) &&
      w.age.includes(age) &&
      w.gender.includes(gender)
    ) {
      return w;
    }
  });
  return plans;
};

export const getTrainingPlan = (id) => {
  if (!id) return { error: "invalid id getTrainingPlan" };
  const plan = workoutPlans.find((w) => w.id === id);
  return plan;
};
