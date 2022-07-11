const workoutPlans = [
  {
    id: "fat-loss-women-beginner-1",
    name: "Fat loss plan for women",
    goal: ["fat-loss"],
    level: ["beginner"],
    gender: ["female"],
    age: ["18-30"],
    duration: "4 weeks",
    description: "4 week fat loss program for beginner women.",
    workoutList: [
      {
        id: "fat-loss-women-beginner-1-weight-training1",
        week: 1,
        day: 1,
        name: "weight training",
        instructions: "Do this in the morning or evening",
        warmup: {
          description: "warm up 5 mins",
          video: "assets/exercise/squat.mp4",
          image: "assets/exercise/squat.png",
        },
        cooldown: {
          description: "cooldown 5 mins",
          video: "assets/exercise/squat.mp4",
          image: "assets/exercise/squat.png",
        },
        exercises: [
          {
            id: "squats",
            name: "squats",
            video: "assets/exercise/squat.mp4",
            image: "assets/exercise/squat.png",
            sets: 1,
            reps: "15-20",
          },
        ],
      },
      {
        id: "fat-loss-women-beginner-1-cardio1",
        week: 1,
        day: 1,
        name: "Cardio",
        instructions: "Do this in the morning or evening",
      },
      {
        id: "fat-loss-women-beginner-1-weight-training1",
        week: 1,
        day: 2,
        name: "weight training",
        instructions: "Do this in the morning or evening",
        warmup: {
          description: "warm up 5 mins",
          video: "assets/exercise/squat.mp4",
          image: "assets/exercise/squat.png",
        },
        cooldown: {
          description: "cooldown 5 mins",
          video: "assets/exercise/squat.mp4",
          image: "assets/exercise/squat.png",
        },
        exercises: [
          {
            id: "squats",
            name: "squats",
            video: "assets/exercise/squat.mp4",
            image: "assets/exercise/squat.png",
            sets: 1,
            reps: "15-20",
          },
        ],
      },
      {
        id: "fat-loss-women-beginner-1-cardio1",
        week: 1,
        day: 2,
        name: "Cardio",
        instructions: "Do this in the morning or evening",
      },
      {
        id: "fat-loss-women-beginner-1-weight-training1",
        week: 1,
        day: 3,
        name: "weight training",
        instructions: "Do this in the morning or evening",
        warmup: {
          description: "warm up 5 mins",
          video: "assets/exercise/squat.mp4",
          image: "assets/exercise/squat.png",
        },
        cooldown: {
          description: "cooldown 5 mins",
          video: "assets/exercise/squat.mp4",
          image: "assets/exercise/squat.png",
        },
        exercises: [
          {
            id: "squats",
            name: "squats",
            video: "assets/exercise/squat.mp4",
            image: "assets/exercise/squat.png",
            sets: 1,
            reps: "15-20",
          },
        ],
      },
      {
        id: "fat-loss-women-beginner-1-cardio1",
        week: 1,
        day: 3,
        name: "Cardio",
        instructions: "Do this in the morning or evening",
      },
    ],
  },
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
