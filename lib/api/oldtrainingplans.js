import { musclegainFemale45E } from "../female-musclegain-experienced-45";
import { musclegainFemale45B } from "../female-musclegain-beginner-45";
import { muscleGainFemale31 } from "../female-musclegain-beginner-31-45";

const workoutPlans = [
  musclegainFemale45E,
  musclegainFemale45B,
  {
    id: "fat-loss-women-beginner-1",
    name: "Fat loss plan",
    subtitle: "phase 1",
    goal: ["fat-loss"],
    level: ["beginner"],
    gender: ["female"],
    age: ["18-30", "45+", "30-45"],
    duration: "4 weeks",
    instructions: "4 week fat loss program for beginner women.",
    workoutList: [
      {
        id: "fat-loss-women-beginner-1-weight-training1",
        week: 1,
        day: 1,
        name: "weight training",
        instructions:
          "bicycle or treadmill 25 min with 10 sec bursts every 2 min.",
        warmup: {
          instructions:
            "Bike for 8 min with intervals : 20 sec bursts every 2 min.",
          video: "assets/exercise/squat.mp4",
        },
        cooldown: {
          instructions: "cooldown 5 mins",
          video: "assets/exercise/squat.mp4",
        },
        exercises: [
          {
            id: "squats",
            name: "squats",
            video: "assets/exercise/squat.mp4",
            image: "/assets/exercise/squatimage.png",
            sets: 1,
            reps: "15-20",
          },
          {
            id: "romanian-deadlifts",
            name: "romanian deadlifts",
            video: "assets/exercise/squat.mp4",
            image: "/assets/exercise/squatimage.png",
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
        instructions:
          "bicycle or treadmill 25 min with 10 sec bursts every 2 min.",
      },
      {
        id: "fat-loss-women-beginner-1-weight-training1",
        week: 1,
        day: 2,
        name: "weight training",
        instructions:
          "bicycle or treadmill 25 min with 10 sec bursts every 2 min.",
        warmup: {
          instructions: "warm up 5 mins",
          video: "assets/exercise/squat.mp4",
        },
        cooldown: {
          instructions: "cooldown 5 mins",
          video: "assets/exercise/squat.mp4",
        },
        exercises: [
          {
            id: "squats",
            name: "squats",
            video: "assets/exercise/squat.mp4",
            image: "/assets/exercise/squatimage.png",
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
        instructions:
          "bicycle or treadmill 25 min with 10 sec bursts every 2 min.",
      },
      {
        id: "fat-loss-women-beginner-1-weight-training1",
        week: 1,
        day: 2,
        name: "weight training",
        instructions:
          "bicycle or treadmill 25 min with 10 sec bursts every 2 min.",
        warmup: {
          instructions: "warm up 5 mins",
          video: "assets/exercise/squat.mp4",
        },
        cooldown: {
          instructions: "cooldown 5 mins",
          video: "assets/exercise/squat.mp4",
        },
        exercises: [
          {
            id: "squats",
            name: "squats",
            video: "assets/exercise/squat.mp4",
            image: "/assets/exercise/squatimage.png",
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
        instructions:
          "bicycle or treadmill 25 min with 10 sec bursts every 2 min.",
      },
      {
        id: "fat-loss-women-beginner-1-weight-training1",
        week: 1,
        day: 3,
        name: "weight training",
        instructions:
          "bicycle or treadmill 25 min with 10 sec bursts every 2 min.",
        warmup: {
          instructions: "warm up 5 mins",
          video: "assets/exercise/squat.mp4",
        },
        cooldown: {
          instructions: "cooldown 5 mins",
          video: "assets/exercise/squat.mp4",
        },
        exercises: [
          {
            id: "squats",
            name: "squats",
            video: "assets/exercise/squat.mp4",
            image: "/assets/exercise/squatimage.png",
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
        instructions:
          "bicycle or treadmill 25 min with 10 sec bursts every 2 min.",
      },
    ],
  },
  {
    id: "fat-loss-women-experienced-1",
    name: "Fat loss plan",
    subtitle: "phase 2",
    goal: ["fat-loss"],
    level: ["beginner"],
    gender: ["female"],
    age: ["18-30", "45+", "30-45"],
    duration: "8 weeks",
    instructions: "8 week fat loss program for beginner women.",
    workoutList: [
      {
        id: "fat-loss-women-beginner-1-weight-training1",
        week: 1,
        day: 1,
        name: "weight training",
        instructions:
          "bicycle or treadmill 25 min with 10 sec bursts every 2 min.",
        warmup: {
          instructions:
            "Bike for 8 min with intervals : 20 sec bursts every 2 min.",
          video: "assets/exercise/squat.mp4",
        },
        cooldown: {
          instructions: "cooldown 5 mins",
          video: "assets/exercise/squat.mp4",
        },
        exercises: [
          {
            id: "squats",
            name: "squats",
            video: "assets/exercise/squat.mp4",
            image: "/assets/exercise/squatimage.png",
            sets: 1,
            reps: "15-20",
          },
          {
            id: "romanian-deadlifts",
            name: "romanian deadlifts",
            video: "assets/exercise/squat.mp4",
            image: "/assets/exercise/squatimage.png",
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
        instructions:
          "bicycle or treadmill 25 min with 10 sec bursts every 2 min.",
      },
      {
        id: "fat-loss-women-beginner-1-weight-training1",
        week: 1,
        day: 2,
        name: "weight training",
        instructions:
          "bicycle or treadmill 25 min with 10 sec bursts every 2 min.",
        warmup: {
          instructions: "warm up 5 mins",
          video: "assets/exercise/squat.mp4",
        },
        cooldown: {
          instructions: "cooldown 5 mins",
          video: "assets/exercise/squat.mp4",
        },
        exercises: [
          {
            id: "squats",
            name: "squats",
            video: "assets/exercise/squat.mp4",
            image: "/assets/exercise/squatimage.png",
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
        instructions:
          "bicycle or treadmill 25 min with 10 sec bursts every 2 min.",
      },
      {
        id: "fat-loss-women-beginner-1-weight-training1",
        week: 1,
        day: 2,
        name: "weight training",
        instructions:
          "bicycle or treadmill 25 min with 10 sec bursts every 2 min.",
        warmup: {
          instructions: "warm up 5 mins",
          video: "assets/exercise/squat.mp4",
        },
        cooldown: {
          instructions: "cooldown 5 mins",
          video: "assets/exercise/squat.mp4",
        },
        exercises: [
          {
            id: "squats",
            name: "squats",
            video: "assets/exercise/squat.mp4",
            image: "/assets/exercise/squatimage.png",
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
        instructions:
          "bicycle or treadmill 25 min with 10 sec bursts every 2 min.",
      },
      {
        id: "fat-loss-women-beginner-1-weight-training1",
        week: 1,
        day: 3,
        name: "weight training",
        instructions:
          "bicycle or treadmill 25 min with 10 sec bursts every 2 min.",
        warmup: {
          instructions: "warm up 5 mins",
          video: "assets/exercise/squat.mp4",
        },
        cooldown: {
          instructions: "cooldown 5 mins",
          video: "assets/exercise/squat.mp4",
        },
        exercises: [
          {
            id: "squats",
            name: "squats",
            video: "assets/exercise/squat.mp4",
            image: "/assets/exercise/squatimage.png",
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
        instructions:
          "bicycle or treadmill 25 min with 10 sec bursts every 2 min.",
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
