const exercises = [
  "Sumo squat with DB 2-3x10-15",
  "Lying leg curls 2-3x10-15",
  "Stationary lunges 2-3x10-12",
  "Floor push ups 2-3x10-15",
  "Flyes in Pec-Deck machine 2-3x12-15",
  "Seated biceps curls with DB 3x10-15",
  "Hyperextensions 2-3x10-15 with body weight",
  "Abs crunches 2-3x101-5",
  "Abs plank 2x20-30 sec hold",
];

const exercises2 = [
  "Sumo squat 3x15",
  "Hyperextensions 3x15",
  "Lying leg curls 3x15",
  "Stationary lunges 3x12-15",
  "Seated calf raises 2x15",
  "Triceps cable pushdown 3x15",
  "Triceps dips in machine  3x15",
  "Abs incline bench straight leg raises 2-3x12-20",
  "Abs incline bench crunches 2-3x12-20",
];
const newlist = [];
exercises.map((ex) => {
  let firstNumIndex = 0;
  let i = 0;
  for (const value of ex.split("")) {
    if (!isNaN(value) && value !== " ") {
      console.log(i, isNaN(value));
      firstNumIndex = i;
      break;
    }
    i++;
  }
  newlist.push({
    name: ex.slice(0, firstNumIndex),
    sets: ex.slice(firstNumIndex).split("x")[0],
    reps: ex.slice(firstNumIndex).split("x")[1],
  });
});

console.log(newlist);
