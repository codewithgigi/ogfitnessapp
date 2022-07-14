import { musclegainFemale45E } from "../female-musclegain-experienced-45";
import { musclegainFemale45B } from "../female-musclegain-beginner-45";
import { muscleGainFemale31B } from "../female-musclegain-beginner-31-45";
import { muscleGainFemale31E } from "../female-musclegain-experienced-31-45";
import { musclegainFemale18E } from "../female-musclegain-experienced-18-30";
import { musclegainFemale18B } from "../female-musclegain-beginner-18-30";

const workoutPlans = [
  musclegainFemale18B,
  musclegainFemale18E,
  muscleGainFemale31B,
  muscleGainFemale31E,
  musclegainFemale45E,
  musclegainFemale45B,
];

export const getTrainingPlans = (params) => {
  console.log("get plans", params);
  const { goal, experience, age, gender } = params;
  if (!goal || !experience || !age || !gender)
    return { error: "invalide params for getTrainingPlans" };

  const plans = workoutPlans.filter((w) => {
    console.log("plan", w?.goal, goal);
    console.log("plan", w?.level, experience);
    console.log("plan", w?.age, age);
    console.log("plan", w?.gender, gender);
    if (
      w.goal.includes(goal) &&
      w.level.includes(experience) &&
      w.age.includes(age) &&
      w.gender.includes(gender)
    ) {
      return w;
    }
  });
  console.log("found plans", plans);
  return plans;
};

export const getTrainingPlan = (id) => {
  if (!id) return { error: "invalid id getTrainingPlan" };
  const plan = workoutPlans.find((w) => w.id === id);
  return plan;
};
