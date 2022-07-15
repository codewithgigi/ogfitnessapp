export const musclegainFemale18B = {
  name: "Muscle gain program",
  subtitle: "Beginner female",
  id: "female-age-18-30-beginner-musclegain",
  goal: ["muscle-gain"],
  level: ["beginner"],
  gender: ["female"],
  age: ["18-30"],
  duration: "4 weeks",
  description: "4 weight training days in the gym and 3 cardio days",
  instructions: "4 week muscle gain program for beginner women.",
  workoutList: [
    {
      day: 1,
      name: "weight training",
      id: "weight-training1",

      warmup: {
        instructions: "Warm up 10 min stretching, warm up exercises",
      },
      exercises: [
        { name: "Sumo squat with DB", sets: "3", reps: "12-15" },
        { name: "Deadlift DB", sets: "3", reps: "12-15" },
        { name: "Leg press", sets: "3", reps: "12-15" },
        { name: "Lying leg curls", sets: "3", reps: "12" },
        { name: "Floor push ups", sets: "3", reps: "8-12" },
        { name: "Flyes in Pec-Deck", sets: "3", reps: "12-15" },
        { name: "Abs floor leg raises", sets: "2", reps: "12-15" },
        { name: "Abs mchine crunches", sets: "2", reps: "12-15" },
      ],
      cooldown: {
        instructions: "Stretching",
      },
    },
    {
      day: 2,
      instructions: "Cardio 25-35 min low intensity",
      name: "cardio",
      id: "cardio2",
    },
    {
      day: 3,
      id: "weight-training3",
      name: "weight training",
      warmup: {
        instructions:
          "Warm up 5 min stretching,warm up exercises Cardio bicycle 8-10 min low intensity",
      },
      exercises: [
        { name: "Hyperextensions", sets: "2", reps: "10-12" },
        { name: "Abduction", sets: "2-3", reps: "15-20" },
        { name: "Standing kickback", sets: "2-3", reps: "12-15" },
        { name: "Bicpes standing curls DB", sets: "3", reps: "10-12" },
        { name: "Seated press", sets: "2-3", reps: "10-12" },
        { name: "Flyes Pec-Deck", sets: "2-3", reps: "10-12" },
        { name: "Standing calf raises no weight", sets: "2-3", reps: "10-15" },
        { name: "Abs floor leg raises", sets: "2", reps: "10-12" },
        { name: "Abs plank", sets: "2", reps: "20-30 sec" },
      ],

      cooldown: {
        instructions: "Stretching, Cardio ellipsoid 8-10 min low intensity",
      },
    },
    {
      day: 4,
      instructions: "Cardio 25-35 min low intensity",
      name: "cardio",
      id: "cardio4",
    },
    {
      day: 5,
      name: "weight training",
      id: "weight-training5",
      warmup: {
        instructions:
          "Warm up 5 min stretching,warm up exercises, Cardio ellipsoid 8-10 min low intensity",
      },
      exercises: [
        { name: "Sumo squat", sets: "2-3", reps: "10-12" },
        { name: "Deadlift DB", sets: "2-3", reps: "10-12" },
        { name: "Leg press", sets: "2-3", reps: "10-12" },
        { name: "Lying leg curls", sets: "2-3", reps: "10-12" },
        { name: "Standing DB front raises", sets: "2-3", reps: "10-12" },
        { name: "Rear delt Pec-Deck", sets: "2-3", reps: "12" },
        { name: "Dips", sets: "2-3", reps: "12-15" },
        { name: "Abs crunches in machine", sets: "2-3", reps: "12-15" },
        { name: "Abs plank", sets: "2", reps: "20-30 sec" },
      ],

      cooldown: {
        instructions: "Stretching",
      },
    },
    {
      day: 6,
      instructions: "Cardio 25-35 min low intensity",
      name: "cardio",
      id: "cardio6",
    },
    {
      day: 7,
      id: "weight-training7",
      name: "weight training",
      warmup: {
        instructions:
          "Warm up 5 min stretching,warm up exercises, Cardio ellipsoid 8-10 min low intensity",
      },
      exercises: [
        { name: "Standing kickback machine", sets: "3", reps: "12-15" },
        { name: "Abduction", sets: "3", reps: "15-20" },
        { name: "Adduction", sets: "3", reps: "15-20" },
        { name: "Vertical pulldown to chest", sets: "2-3", reps: "10-12" },
        {
          name: "Horizontal row machine with chest support",
          sets: "2-3",
          reps: "10-12",
        },
        { name: "Seated DB curls", sets: "3", reps: "10" },
        { name: "Standing calf raises no weight", sets: "2", reps: "15" },
        { name: "Abs floor leg raises", sets: "2-3", reps: "10-12" },
        { name: "Abs crunches machine", sets: "2-3", reps: "10-12" },
      ],
      cooldown: {
        instructions: "Stretching & Cardio bicycle 8-10 min low intensity",
      },
    },
  ],
};
