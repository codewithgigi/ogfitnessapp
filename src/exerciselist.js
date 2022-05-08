//Data structure:
//{muscles, name, level, bodypart, pp, modality, joint, ..... add these: description, instructions, video, image, id}

export const ExerciseList = [
  "Abs,Full Reverse Crunch,Advanced,Core",
  "Abs,Incline Hip Thrust,Advanced,Core",
  "Abs,Incline Reverse Crunch,Advanced,Core",
  "Abs,Lying Hip Thrust,Advanced,Core",
  "Abs,Reverse Crunch,Beginner,Core",
  "Abs,Reverse Medicine Ball Crunch,Advanced,Core",
  "Abs,Alternating Heel Touch,Beginner,Core",
  "Abs,Bent-Knee Medicine Ball Hip Rotation,Advanced,Core",
  "Abs,Cable Chop,Advanced,Core",
  "Abs,Cross Crunch,Beginner,Core",
  "Abs,Cross Crunch w/ Medicine Ball,Advanced,Core",
  "Abs,Decline Cross Sit-Up,Advanced,Core",
  "Abs,Decline Sit-Up w/ Twist,Advanced,Core",
  "Abs,Reverse Cable Chop,Advanced,Core",
  "Abs,Seated Medicine Ball Twist,Advanced,Core",
  "Abs,Trunk Rotator,Advanced,Core",
  "Abs,Front Plank (from knees),Beginner,Core",
  "Abs,Front Plank (from toes),Intermediate,Core",
  "Abs,Front Plank (tripod - 1 arm and 2 legs or 2 legs and 1 arm),Advanced,Core",
  "Abs,Side-Plank (from knees),Intermediate,Core",
  "Abs,Side-Plank (hip lift),Beginner,Core",
  "Abs,Side-Plank (from toes),Advanced,Core",
  "Abs,Ab Cycle,Advanced,Core",
  "Abs,Kneeling Ab Rollout,Intermediate,Core",
  "Abs,Medicine Ball V-Up,Advanced,Core",
  "Abs,V-Up,Beginner,Core",
  "Abs,Weighted V-Up,Intermediate,Core",
  "Abs,Bent Knee Sit-Up,Beginner,Core",
  "Abs,Bent-Knee Crunch,Beginner,Core",
  "Abs,Crunch,Beginner,Core",
  "Abs,Crunch,Beginner,Core",
  "Abs,Decline Crunch,Advanced,Core",
  "Abs,Decline Sit-Up,Advanced,Core",
  "Abs,Heel Touch,Beginner,Core",
  "Abs,Sit-Up,Beginner,Core",
  "Abs,Weighted Crunch,Intermediate,Core",
  "Abs,Hanging Leg Raise,Advanced,Core",
  "Abs,Hanging Knee Raise,Advanced,Core",
  "Back,Assisted Pull-Up,Beginner,Upper",
  "Back,Close-Grip Lat Pulldown,Beginner,Upper",
  "Back, Inverted Pull-Up,Advanced,Upper",
  "Back, Lat Pulldown,Beginner,Upper",
  "Back, Pull-Up,Beginner,Upper",
  "Back, Reverse-Grip Lat Pullown,Intermediate,Upper",
  "Back, Reverse-Grip Pull-Up,Advanced,Upper",
  "Back, V-Bar Pull-Up,Advanced,Upper",
  "Back, Wide-Grip Lat Pulldown,Beginner,Upper",
  "Back, Bent-Over Alternating Dumbbell Row,Intermediate,Upper",
  "Back, Bent-Over Barbell Row,Beginner,Upper",
  "Back, Bent-Over Dumbbell Row,Beginner,Upper",
  "Back, Bent-Over Hammer Dumbbell Row,Beginner,Upper",
  "Back, Bent-Over Long Barbell Row,Intermediate,Upper",
  "Back, Bent-Over Reverse-Grip Barbell Row,Advanced,Upper",
  "Back, Bent-Over Single-Arm Long Barbell Row,Advanced,Upper",
  "Back, Machine Row,Beginner,Upper",
  "Back, One Arm Dumbbell Row,Beginner,Upper",
  "Back, Reverse Incline Dumbbell Row,Advanced,Upper",
  "Back, Rope Cable Row,Intermediate,Upper",
  "Back, Seated Cable Row,Beginner,Upper",
  "Back, Seated Row,Beginner,Upper",
  "Back, Single-Arm Cable Row,Intermediate,Upper",
  "Back, Single-Arm Dumbbell Row,Beginner,Upper",
  "Back, Single-Arm Lat Pulldown,Intermediate,Upper",
  "Back, Standing Cable Row,Beginner,Upper",
  "Back, Standing Single-Arm Cable Row,Intermediate,Upper",
  "Biceps,Alternating Dumbbell Curl,Beginner,Upper",
  "Biceps,Alternating Hammer Curl,Beginner,Upper",
  "Biceps,Barbell Curl,Beginner,Upper",
  "Biceps,Bicep Curl,Beginner,Upper",
  "Biceps,Bottom/Top/Full Curls,Advanced,Upper",
  "Biceps,Cable Curl,Intermediate,Upper",
  "Biceps,Concentration Dumbbell Curl,Intermediate,Upper",
  "Biceps,Cross Body Hammer Curl,Advanced,Upper",
  "Biceps,Dumbbell Curl,Beginner,Upper",
  "Biceps,EZ-Bar Curl,Intermediate,Upper",
  "Biceps,Hammer Curl,Beginner,Upper",
  "Biceps,Incline Alternating Dumbbell Curl,Advanced,Upper",
  "Biceps,Incline Alternating Hammer Curl,Advanced,Upper",
  "Biceps,Incline Dumbbell Curl,Advanced,Upper",
  "Biceps,Incline Hammer Curl,Advanced,Upper",
  "Biceps,Kneeling Cable Curl,Beginner,Upper",
  "Biceps,Lying Cable Curl,Intermediate,Upper",
  "Biceps,Lying Double Biceps Cable Curl,Intermediate,Upper",
  "Biceps,Lying High Cable Curl,Advanced,Upper",
  "Biceps,Machine Curl,Beginner,Upper",
  "Biceps,Overhead Double Biceps Cable Curl,Advanced,Upper",
  "Biceps,Overhead Rope Cable Curl,Advanced,Upper",
  "Biceps,Preacher Barbell Curl,Advanced,Upper",
  "Biceps,Preacher Cable Curl,Advanced,Upper",
  "Biceps,Preacher Dumbbell Curl,Intermediate,Upper",
  "Biceps,Preacher EZ-Bar Curl,Advanced,Upper",
  "Biceps,Preacher Hammer Dumbbell Curl,Intermediate,Upper",
  "Biceps,Preacher Single-Arm Dumbbell Curl,Intermediate,Upper",
  "Biceps,Reverse Curl,Advanced,Upper",
  "Biceps,Rope Cable Curl,Intermediate,Upper",
  "Biceps,Seated Alternating Curl,Beginner,Upper",
  "Biceps,Seated Alternating Hammer Curl,Beginner,Upper",
  "Biceps,Seated Dumbbell Curl,Beginner,Upper",
  "Biceps,Seated Hammer Curl,Beginner,Upper",
  "Biceps,Single-Arm Barbell Curl,Beginner,Upper",
  "Biceps,Single-Arm Cable Curl,Intermediate,Upper",
  "Biceps,Single-Arm Dumbbell Curl w/ Incline Bench,Beginner,Upper",
  "Biceps,Spider Curl,Advanced,Upper",
  "Calves,Barbell Calf Raise,Advanced,Lower",
  "Calves,Calf Press,Beginner,Lower",
  "Calves,Calf Raise - Seated,Beginner,Lower",
  "Calves,Calf Raise - Standing,Beginner,Lower",
  "Calves,Dumbbell Calf Raise,Beginner,Lower",
  "Calves,Single-Leg Calf Press,Advanced,Lower",
  "Calves,Single-Leg Dumbbell Calf Raise,Advanced,Lower",
  "Calves,Smith Machine Calf Raise,Intermediate,Lower",
  "Calves,Seated Calf Raise,Beginner,Lower",
  "Calves,Seated Single-Leg Calf Raise,Intermediate,Lower",
  "Chest,Alternating Dumbbell Bench Press,Intermediate,Upper",
  "Chest,Barbell Bench Press,Intermediate,Upper",
  "Chest,Chest Press,Beginner,Upper",
  "Chest,Decline Dumbbell Bench Press,Advanced,Upper",
  "Chest,Decline Smith Machine Bench Press,Advanced,Upper",
  "Chest,Dumbbell Bench Press,Beginner,Upper",
  "Chest,Dumbbell Push-Up,Beginner,Upper",
  "Chest,Elevated Push-Up,Advanced,Upper",
  "Chest,Flat Bench Press,Intermediate,Upper",
  "Chest,Incline Alternating Dumbbell Bench Press,Advanced,Upper",
  "Chest,Incline Barbell Bench Press,Advanced,Upper",
  "Chest,Incline Bench Press,Advanced,Upper",
  "Chest,Incline Dumbbell Bench Press,Advanced,Upper",
  "Chest,Incline Hammer Dumbbell Bench Press,Advanced,Upper",
  "Chest,Incline Single-Arm Dumbbell Bench Press,Advanced,Upper",
  "Chest,Incline Smith Machine Bench Press,Advanced,Upper",
  "Chest,Incline Twisting Dumbbell Bench Press,Advanced,Upper",
  "Chest,Kneeling Push-Up,Beginner,Upper",
  "Chest,Machine Bench Press,Beginner,Upper",
  "Chest,Machine Vertical Bench Press,Beginner,Upper",
  "Chest,Medicine Ball Crossover Push-Up,Advanced,Upper",
  "Chest,Push-Up,Beginner,Upper",
  "Chest,Single-Arm Dumbbell Bench Press,Intermediate,Upper",
  "Chest,Smith Machine Bench Press,Intermediate,Upper",
  "Chest,Twisting Dumbbell Bench Press,Beginner,Upper",
  "Chest,Wide-Grip Push-Up,Beginner,Upper",
  "Chest,Cable Crossover,Advanced,Upper",
  "Chest,Cable Fly,Advanced,Upper",
  "Chest,Decline Dumbbell Fly,Advanced,Upper",
  "Chest,Dumbbell Fly,Beginner,Upper",
  "Chest,High Cable Crossover,Advanced,Upper",
  "Chest,Incline Cable Fly,Advanced,Upper",
  "Chest,Incline Dumbbell Fly,Advanced,Upper",
  "Chest,Incline Twisting Dumbbell Fly,Advanced,Upper",
  "Chest,Low Cable Crossover,Intermediate,Upper",
  "Chest,Pec Deck,Beginner,Upper",
  "Chest,Pec Deck Fly,Beginner,Upper",
  "Glutes,Bodyweight glute bridge,Beginner,Lower",
  "Glutes,Dumbell glute bridge,Intermediate,Lower",
  "Glutes,Barbell glute bridge,Advanced,Lower",
  "Glutes,single leg glute bridge,Advanced,Lower",
  "Glutes,Bodyweight hip thrust,Beginner,Lower",
  "Glutes,Dumbell hip thrust,Intermediate,Lower",
  "Glutes,Dumbell b-stance hip thrust,Intermediate,Lower",
  "Glutes,Barbell hip thrust,Advanced,Lower",
  "Glutes,Barbell b-stance hip thrust,Advanced,Lower",
  "Hamstrings,Bent-Knee Single-Leg Hip Lift,Advanced,Lower",
  "Hamstrings,Elevated Hip Lift,Intermediate,Lower",
  "Hamstrings,Elevated Single-Leg Hip Lift,Advanced,Lower",
  "Hamstrings,Hip Lift,Beginner,Lower",
  "Hamstrings,Single-Leg Hip Lift,Intermediate,Lower",
  "Hamstrings,Deadlift,Advanced,Lower",
  "Hamstrings,Leg Curl,Beginner,Lower",
  "Hamstrings,Lying Alternating Leg Curl,Intermediate,Lower",
  "Hamstrings,Lying Leg Curl,Beginner,Lower",
  "Hamstrings,Lying Single-Leg Curl,Intermediate,Lower",
  "Hamstrings,Seated Leg Curl,Beginner,Lower",
  "Quads,Barbell Diagonal Lunge,Advanced,Lower",
  "Quads,Barbell Hack Squat,Advanced,Lower",
  "Quads,Barbell Lunge,Intermediate,Lower",
  "Quads,Barbell Reverse Lunge,Intermediate,Lower",
  "Quads,Barbell Side Lunge,Intermediate,Lower",
  "Quads,Barbell Split Squat,Advanced,Lower",
  "Quads,Barbell Squat,Beginner,Lower",
  "Quads,Barbell Step-Up,Advanced,Lower",
  "Quads,Barbell Walking Lunge,Advanced,Lower",
  "Quads,Diagonal Lunge,Intermediate,Lower",
  "Quads,Dumbbell Diagonal Lunge,Advanced,Lower",
  "Quads,Dumbbell Lunge,Beginner,Lower",
  "Quads,Dumbbell Reverse Lunge,Intermediate,Lower",
  "Quads,Dumbbell Side Lunge,Intermediate,Lower",
  "Quads,Dumbbell Split Squat,Advanced,Lower",
  "Quads,Dumbbell Squat,Beginner,Lower",
  "Quads,Dumbbell Step-Up,Beginner,Lower",
  "Quads,Dumbbell Walking Lunge,Advanced,Lower",
  "Quads,Forward Lunge,Beginner,Lower",
  "Quads,Lateral Barbell Squat,Intermediate,Lower",
  "Quads,Lateral Barbell Step-Up,Advanced,Lower",
  "Quads,Lateral Squat,Beginner,Lower",
  "Quads,Lateral Step-Up,Beginner,Lower",
  "Quads,Leg Press,Beginner,Lower",
  "Quads,Lunge,Beginner,Lower",
  "Quads,Lying Machine Squat,Beginner,Lower",
  "Quads,Machine Hack Squat,Beginner,Lower",
  "Quads,Reverse Lunge,Beginner,Lower",
  "Quads,Single-Arm Barbell Side Squat,Advanced,Lower",
  "Quads,Single-Arm Dumbbell Side Squat,Intermediate,Lower",
  "Quads,Single-Leg Barbell Squat,Advanced,Lower",
  "Quads,Single-Leg Box Squat,Advanced,Lower",
  "Quads,Single-Leg Dumbbell Box Squat,Advanced,Lower",
  "Quads,Single-Leg Dumbbell Squat,Intermediate,Lower",
  "Quads,Single-Leg Squat,Intermediate,Lower",
  "Quads,Smith Machine Squat,Intermediate,Lower",
  "Quads,Split Squat,Advanced,Lower",
  "Quads,Step-Up,Beginner,Lower",
  "Quads,Walking Lunge,Intermediate,Lower",
  "Quads,Alternating Leg Extension,Intermediate,Lower",
  "Quads,Leg Extension,Beginner,Lower",
  "Quads,Single-Leg Extension,Intermediate,Lower",
  "Back,Alternating Superman,Beginner,Core",
  "Back,Back Raise,Beginner,Core",
  "Back,Quadruped Alternating Superman,Beginner,Core",
  "Back,Superman,Beginner,Core",
  "Back,Superman Hold,Beginner,Core",
  "Shoulders,Arnold Dumbbell Press,Intermediate,Upper",
  "Shoulders,Barbell Shoulder Press,Advanced,Upper",
  "Shoulders,Dumbbell Alternating Shoulder Press,Beginner,Upper",
  "Shoulders,Dumbbell Front Raise,Beginner,Upper",
  "Shoulders,Dumbbell Shoulder Press,Intermediate,Upper",
  "Shoulders,Dumbbell Twisting Shoulder Press,Intermediate,Upper",
  "Shoulders,Machine Shoulder Press,Beginner,Upper",
  "Shoulders,Seated Dumbbell Rear Delt Elbow Raise,Intermediate,Upper",
  "Shoulders,Single-Arm Dumbbell Shoulder Press,Beginner,Upper",
  "Shoulders,Smith Machine Shoulder Press,Advanced,Upper",
  "Shoulders,Barbell Front Raise,Intermediate,Upper",
  "Shoulders,Bent-Over Cable Rear Delt Raise,Advanced,Upper",
  "Shoulders,Bent-Over Dumbbell Rear Delt Raise,Intermediate,Upper",
  "Shoulders,Cable Front Raise,Intermediate,Upper",
  "Shoulders,Cable Lateral Raise,Intermediate,Upper",
  "Shoulders,Dumbbell Lateral Raise,Beginner,Upper",
  "Shoulders,Front Plate Raise,Beginner,Upper",
  "Shoulders,Kneeling Single-Arm Cable Rear Delt Raise,Advanced,Upper",
  "Shoulders,Lying Dumbbell External Rotation,Beginner,Upper",
  "Shoulders,Lying Dumbbell Rear Delt Raise,Beginner,Upper",
  "Shoulders,Lying Single-Arm Dumbbell Rear Delt Raise,Beginner,Upper",
  "Shoulders,Pec Deck Real Delt Extensions,Intermediate,Upper",
  "Shoulders,Reverse Incline Dumbbell Rear Delt Raise,Advanced,Upper",
  "Shoulders,Seated Dumbbell Rear Delt Raise,Beginner,Upper",
  "Shoulders,Single-Arm Cable Lateral Raise,Intermediate,Upper",
  "Shoulders,Cable External Rotation,Beginner,Upper",
  "Triceps,Close-Grip Bench Press,Advanced,Upper",
  "Triceps,Forward Lean Dips,Intermediate,Upper",
  "Triceps,Assisted Dips,Beginner,Upper",
  "Triceps,Bench Dips,Intermediate,Upper",
  "Triceps,Diamond Push-Up,Intermediate,Upper",
  "Triceps,Dips,Intermediate,Upper",
  "Triceps,Machine Dips,Beginner,Upper",
  "Triceps,Decline Dumbbell Triceps Extension,Advanced,Upper",
  "Triceps,Decline EZ-Bar Tricep Extension,Advanced,Upper",
  "Triceps,Decline Single Dumbbell Triceps Extension,Advanced,Upper",
  "Triceps,Decline Single-Arm Dumbbell Triceps Extension,Advanced,Upper",
  "Triceps,Dumbbell Kickback,Beginner,Upper",
  "Triceps,Incline EZ-Bar Tricep Extension,Advanced,Upper",
  "Triceps,Kneeling Cable Triceps Extension,Beginner,Upper",
  "Triceps,Leaning Overhead Tricep Extension,Intermediate,Upper",
  "Triceps,Low Cable Triceps Extension,Intermediate,Upper",
  "Triceps,Lying Cable Triceps Extension,Intermediate,Upper",
  "Triceps,Lying EZ-Bar Triceps Extension,Intermediate,Upper",
  "Triceps,Lying Overhead EZ-Bar Tricep Extension,Intermediate,Upper",
  "Triceps,Lying Reverse EZ-Bar Triceps Extension,Advanced,Upper",
  "Triceps,Lying Single Dumbbell Triceps Extension,Beginner,Upper",
  "Triceps,Lying Single-Arm Dumbbell Triceps Extension,Beginner,Upper",
  "Triceps,Lying Tricep Extensions,Beginner,Upper",
  "Triceps,Overhead Dumbbell Triceps Extension,Beginner,Upper",
  "Triceps,Overhead EZ-Bar Triceps Extension,Advanced,Upper",
  "Triceps,Overhead Rope Cable Tricep Extension,Intermediate,Upper",
  "Triceps,Overhead Single Dumbbell Tricep Extension,Beginner,Upper",
  "Triceps,Overhead Single-Arm Cable Tricep Extension,Intermediate,Upper",
  "Triceps,Overhead Single-Arm Dumbbell Tricep Extension,Beginner,Upper",
  "Triceps,Reverse Tricep Pushdown,Advanced,Upper",
  "Triceps,Rope Triceps Pushdown,Intermediate,Upper",
  "Triceps,Single-Arm Towel Triceps Pushdown,Beginner,Upper",
  "Triceps,Single-Arm Triceps Pushdown,Intermediate,Upper",
  "Triceps,Towel Triceps Pushdown,Beginner,Upper",
  "Triceps,Tricep Extensions,Beginner,Upper",
  "Triceps,Tricep Pushdown,Beginner,Upper",
  "Triceps,Tricep Pushdown,Beginner,Upper",
  "Triceps,V-Bar Tricep Pushdown,Beginner,Upper",
];
