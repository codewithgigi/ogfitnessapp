//Data structure:
//{muscles, name, level, bodypart, pp, modality, joint, ..... add these: description, instructions, video, image, id}

export const ExerciseList = [
  "Abdominals - Lower,Full Reverse Crunch,Advanced,Core,Push,FW,M",
  "Abdominals - Lower,Incline Hip Thrust,Advanced,Core,Push,FW,M",
  "Abdominals - Lower,Incline Reverse Crunch,Advanced,Core,Push,FW,M",
  "Abdominals - Lower,Lying Hip Thrust,Advanced,Core,Push,FW,M",
  "Abdominals - Lower,Reverse Crunch,Beginner,Core,Push,FW,M",
  "Abdominals - Lower,Reverse Medicine Ball Crunch,Advanced,Core,Push,FW,M",
  "Abdominals - Obliques,Alternating Heel Touch,Beginner,Core,Push,FW,M",
  "Abdominals - Obliques,Bent-Knee Medicine Ball Hip Rotation,Advanced,Core,Push,FW,M",
  "Abdominals - Obliques,Cable Chop,Advanced,Core,Push,C,M",
  "Abdominals - Obliques,Cross Crunch,Beginner,Core,Push,FW,M",
  "Abdominals - Obliques,Cross Crunch w/ Medicine Ball,Advanced,Core,Push,FW,M",
  "Abdominals - Obliques,Decline Cross Sit-Up,Advanced,Core,Push,FW,M",
  "Abdominals - Obliques,Decline Sit-Up w/ Twist,Advanced,Core,Push,FW,M",
  "Abdominals - Obliques,Reverse Cable Chop,Advanced,Core,Push,C,M",
  "Abdominals - Obliques,Seated Medicine Ball Twist,Advanced,Core,Push,FW,M",
  "Abdominals - Obliques,Trunk Rotator,Advanced,Core,Push,FW,M",
  "Abdominals - Total,Front Plank (from knees),Beginner,Core,Static,FW,M",
  "Abdominals - Total,Front Plank (from toes),Intermediate,Core,Static,FW,M",
  "Abdominals - Total,Front Plank (tripod - 1 arm and 2 legs or 2 legs and 1 arm),Advanced,Core,Static,FW,M",
  "Abdominals - Total,Side-Plank (from knees),Intermediate,Core,Static,FW,M",
  "Abdominals - Total,Side-Plank (hip lift),Beginner,Core,Static,FW,M",
  "Abdominals - Total,Side-Plank (from toes),Advanced,Core,Static,FW,M",
  "Abdominals - Total,Ab Cycle,Advanced,Core,Push,FW,M",
  "Abdominals - Total,Kneeling Ab Rollout,Intermediate,Core,Push,FW,M",
  "Abdominals - Total,Medicine Ball V-Up,Advanced,Core,Push,FW,M",
  "Abdominals - Total,V-Up,Beginner,Core,Push,FW,M",
  "Abdominals - Total,Weighted V-Up,Intermediate,Core,Push,FW,M",
  "Abdominals - Upper,Bent Knee Sit-Up,Beginner,Core,Push,FW,M",
  "Abdominals - Upper,Bent-Knee Crunch,Beginner,Core,Push,FW,M",
  "Abdominals - Upper,Crunch,Beginner,Core,Push,FW,M",
  "Abdominals - Upper,Crunch,Beginner,Core,Push,FW,M",
  "Abdominals - Upper,Decline Crunch,Advanced,Core,Push,FW,M",
  "Abdominals - Upper,Decline Sit-Up,Advanced,Core,Push,FW,M",
  "Abdominals - Upper,Heel Touch,Beginner,Core,Push,FW,M",
  "Abdominals - Upper,Sit-Up,Beginner,Core,Push,FW,M",
  "Abdominals - Upper,Weighted Crunch,Intermediate,Core,Push,FW,M",
  "Abdominals - Upper,Hanging Leg Raise,Advanced,Core,Pull,FW,M",
  "Abdominals - Upper,Hanging Knee Raise,Advanced,Core,Pull,FW,M",
  "Back,Assisted Pull-Up,Beginner,Upper,Pull,FW,M",
  "Back,Close-Grip Lat Pulldown,Beginner,Upper,Pull,M,M",
  "Back, Inverted Pull-Up,Advanced,Upper,Pull,FW,M",
  "Back, Lat Pulldown,Beginner,Upper,Pull,C,M",
  "Back, Pull-Up,Beginner,Upper,Pull,FW,M",
  "Back, Reverse-Grip Lat Pullown,Intermediate,Upper,Pull,C,M",
  "Back, Reverse-Grip Pull-Up,Advanced,Upper,Pull,FW,M",
  "Back, V-Bar Pull-Up,Advanced,Upper,Pull,FW,M",
  "Back, Wide-Grip Lat Pulldown,Beginner,Upper,Pull,C,M",
  "Back, Bent-Over Alternating Dumbbell Row,Intermediate,Upper,Pull,FW,M",
  "Back, Bent-Over Barbell Row,Beginner,Upper,Pull,FW,M",
  "Back, Bent-Over Dumbbell Row,Beginner,Upper,Pull,FW,M",
  "Back, Bent-Over Hammer Dumbbell Row,Beginner,Upper,Pull,FW,M",
  "Back, Bent-Over Long Barbell Row,Intermediate,Upper,Pull,FW,M",
  "Back, Bent-Over Reverse-Grip Barbell Row,Advanced,Upper,Pull,FW,M",
  "Back, Bent-Over Single-Arm Long Barbell Row,Advanced,Upper,Pull,FW,M",
  "Back, Machine Row,Beginner,Upper,Pull,M,M",
  "Back, One Arm Dumbbell Row,Beginner,Upper,Pull,FW,M",
  "Back, Reverse Incline Dumbbell Row,Advanced,Upper,Pull,FW,M",
  "Back, Rope Cable Row,Intermediate,Upper,Pull,C,M",
  "Back, Seated Cable Row,Beginner,Upper,Pull,C,M",
  "Back, Seated Row,Beginner,Upper,Pull,C,M",
  "Back, Single-Arm Cable Row,Intermediate,Upper,Pull,C,M",
  "Back, Single-Arm Dumbbell Row,Beginner,Upper,Pull,FW,M",
  "Back, Single-Arm Lat Pulldown,Intermediate,Upper,Pull,C,M",
  "Back, Standing Cable Row,Beginner,Upper,Pull,C,M",
  "Back, Standing Single-Arm Cable Row,Intermediate,Upper,Pull,C,M",
  "Bicpes,Alternating Dumbbell Curl,Beginner,Upper,Pull,FW,S",
  "Bicpes,Alternating Hammer Curl,Beginner,Upper,Pull,FW,S",
  "Bicpes,Barbell Curl,Beginner,Upper,Pull,FW,S",
  "Bicpes,Bicep Curl,Beginner,Upper,Pull,FW,S",
  "Bicpes,Bottom/Top/Full Curls,Advanced,Upper,Pull,FW,S",
  "Bicpes,Cable Curl,Intermediate,Upper,Pull,C,S",
  "Bicpes,Concentration Dumbbell Curl,Intermediate,Upper,Pull,FW,S",
  "Bicpes,Cross Body Hammer Curl,Advanced,Upper,Pull,FW,S",
  "Bicpes,Dumbbell Curl,Beginner,Upper,Pull,FW,S",
  "Bicpes,EZ-Bar Curl,Intermediate,Upper,Pull,FW,S",
  "Bicpes,Hammer Curl,Beginner,Upper,Pull,FW,S",
  "Bicpes,Incline Alternating Dumbbell Curl,Advanced,Upper,Pull,FW,S",
  "Bicpes,Incline Alternating Hammer Curl,Advanced,Upper,Pull,FW,S",
  "Bicpes,Incline Dumbbell Curl,Advanced,Upper,Pull,FW,S",
  "Bicpes,Incline Hammer Curl,Advanced,Upper,Pull,FW,S",
  "Bicpes,Kneeling Cable Curl,Beginner,Upper,Pull,C,S",
  "Bicpes,Lying Cable Curl,Intermediate,Upper,Pull,C,S",
  "Bicpes,Lying Double Biceps Cable Curl,Intermediate,Upper,Pull,C,S",
  "Bicpes,Lying High Cable Curl,Advanced,Upper,Pull,C,S",
  "Bicpes,Machine Curl,Beginner,Upper,Pull,M,S",
  "Bicpes,Overhead Double Biceps Cable Curl,Advanced,Upper,Pull,C,S",
  "Bicpes,Overhead Rope Cable Curl,Advanced,Upper,Pull,C,S",
  "Bicpes,Preacher Barbell Curl,Advanced,Upper,Pull,FW,S",
  "Bicpes,Preacher Cable Curl,Advanced,Upper,Pull,C,S",
  "Bicpes,Preacher Dumbbell Curl,Intermediate,Upper,Pull,FW,S",
  "Bicpes,Preacher EZ-Bar Curl,Advanced,Upper,Pull,FW,S",
  "Bicpes,Preacher Hammer Dumbbell Curl,Intermediate,Upper,Pull,FW,S",
  "Bicpes,Preacher Single-Arm Dumbbell Curl,Intermediate,Upper,Pull,FW,S",
  "Bicpes,Reverse Curl,Advanced,Upper,Pull,FW,S",
  "Bicpes,Rope Cable Curl,Intermediate,Upper,Pull,C,S",
  "Bicpes,Seated Alternating Curl,Beginner,Upper,Pull,FW,S",
  "Bicpes,Seated Alternating Hammer Curl,Beginner,Upper,Pull,FW,S",
  "Bicpes,Seated Dumbbell Curl,Beginner,Upper,Pull,FW,S",
  "Bicpes,Seated Hammer Curl,Beginner,Upper,Pull,FW,S",
  "Bicpes,Single-Arm Barbell Curl,Beginner,Upper,Pull,FW,S",
  "Bicpes,Single-Arm Cable Curl,Intermediate,Upper,Pull,FW,S",
  "Bicpes,Single-Arm Dumbbell Curl w/ Incline Bench,Beginner,Upper,Pull,FW,S",
  "Bicpes,Spider Curl,Advanced,Upper,Pull,FW,S",
  "Calves,Barbell Calf Raise,Advanced,Lower,Push,FW,S",
  "Calves,Calf Press,Beginner,Lower,Push,M,S",
  "Calves,Calf Raise - Seated,Beginner,Lower,Push,FW,S",
  "Calves,Calf Raise - Standing,Beginner,Lower,Push,FW,S",
  "Calves,Dumbbell Calf Raise,Beginner,Lower,Push,FW,S",
  "Calves,Single-Leg Calf Press,Advanced,Lower,Push,M,S",
  "Calves,Single-Leg Dumbbell Calf Raise,Advanced,Lower,Push,FW,S",
  "Calves,Smith Machine Calf Raise,Intermediate,Lower,Push,M,S",
  "Calves,Seated Calf Raise,Beginner,Lower,Push,M,S",
  "Calves,Seated Single-Leg Calf Raise,Intermediate,Lower,Push,M,S",
  "Chest,Alternating Dumbbell Bench Press,Intermediate,Upper,Push,FW,M",
  "Chest,Barbell Bench Press,Intermediate,Upper,Push,FW,M",
  "Chest,Chest Press,Beginner,Upper,Push,M,M",
  "Chest,Decline Dumbbell Bench Press,Advanced,Upper,Push,FW,M",
  "Chest,Decline Smith Machine Bench Press,Advanced,Upper,Push,M,M",
  "Chest,Dumbbell Bench Press,Beginner,Upper,Push,FW,M",
  "Chest,Dumbbell Push-Up,Beginner,Upper,Push,FW,M",
  "Chest,Elevated Push-Up,Advanced,Upper,Push,FW,M",
  "Chest,Flat Bench Press,Intermediate,Upper,Push,FW,M",
  "Chest,Incline Alternating Dumbbell Bench Press,Advanced,Upper,Push,FW,M",
  "Chest,Incline Barbell Bench Press,Advanced,Upper,Push,FW,M",
  "Chest,Incline Bench Press,Advanced,Upper,Push,FW,M",
  "Chest,Incline Dumbbell Bench Press,Advanced,Upper,Push,FW,M",
  "Chest,Incline Hammer Dumbbell Bench Press,Advanced,Upper,Push,FW,M",
  "Chest,Incline Single-Arm Dumbbell Bench Press,Advanced,Upper,Push,FW,M",
  "Chest,Incline Smith Machine Bench Press,Advanced,Upper,Push,M,M",
  "Chest,Incline Twisting Dumbbell Bench Press,Advanced,Upper,Push,FW,M",
  "Chest,Kneeling Push-Up,Beginner,Upper,Push,FW,M",
  "Chest,Machine Bench Press,Beginner,Upper,Push,M,M",
  "Chest,Machine Vertical Bench Press,Beginner,Upper,Push,M,M",
  "Chest,Medicine Ball Crossover Push-Up,Advanced,Upper,Push,FW,M",
  "Chest,Push-Up,Beginner,Upper,Push,FW,M",
  "Chest,Single-Arm Dumbbell Bench Press,Intermediate,Upper,Push,FW,M",
  "Chest,Smith Machine Bench Press,Intermediate,Upper,Push,M,M",
  "Chest,Twisting Dumbbell Bench Press,Beginner,Upper,Push,FW,M",
  "Chest,Wide-Grip Push-Up,Beginner,Upper,Push,FW,M",
  "Chest,Cable Crossover,Advanced,Upper,Push,C,S",
  "Chest,Cable Fly,Advanced,Upper,Push,C,S",
  "Chest,Decline Dumbbell Fly,Advanced,Upper,Push,FW,S",
  "Chest,Dumbbell Fly,Beginner,Upper,Push,FW,S",
  "Chest,High Cable Crossover,Advanced,Upper,Push,C,S",
  "Chest,Incline Cable Fly,Advanced,Upper,Push,C,S",
  "Chest,Incline Dumbbell Fly,Advanced,Upper,Push,FW,S",
  "Chest,Incline Twisting Dumbbell Fly,Advanced,Upper,Push,FW,S",
  "Chest,Low Cable Crossover,Intermediate,Upper,Push,C,S",
  "Chest,Pec Deck,Beginner,Upper,Push,M,S",
  "Chest,Pec Deck Fly,Beginner,Upper,Push,M,S",
  "Legs - Hamstrings,Bent-Knee Single-Leg Hip Lift,Advanced,Lower,Pull,FW,M",
  "Legs - Hamstrings,Elevated Hip Lift,Intermediate,Lower,Pull,FW,M",
  "Legs - Hamstrings,Elevated Single-Leg Hip Lift,Advanced,Lower,Pull,FW,M",
  "Legs - Hamstrings,Hip Lift,Beginner,Lower,Pull,FW,M",
  "Legs - Hamstrings,Single-Leg Hip Lift,Intermediate,Lower,Pull,FW,M",
  "Legs - Hamstrings,Deadlift,Advanced,Lower,Pull,FW,S",
  "Legs - Hamstrings,Leg Curl,Beginner,Lower,Pull,M,S",
  "Legs - Hamstrings,Lying Alternating Leg Curl,Intermediate,Lower,Pull,M,S",
  "Legs - Hamstrings,Lying Leg Curl,Beginner,Lower,Pull,M,S",
  "Legs - Hamstrings,Lying Single-Leg Curl,Intermediate,Lower,Pull,M,S",
  "Legs - Hamstrings,Seated Leg Curl,Beginner,Lower,Pull,M,S",
  "Legs - Quadriceps,Barbell Diagonal Lunge,Advanced,Lower,Push,FW,M",
  "Legs - Quadriceps,Barbell Hack Squat,Advanced,Lower,Push,FW,M",
  "Legs - Quadriceps,Barbell Lunge,Intermediate,Lower,Push,FW,M",
  "Legs - Quadriceps,Barbell Reverse Lunge,Intermediate,Lower,Push,FW,M",
  "Legs - Quadriceps,Barbell Side Lunge,Intermediate,Lower,Push,FW,M",
  "Legs - Quadriceps,Barbell Split Squat,Advanced,Lower,Push,FW,M",
  "Legs - Quadriceps,Barbell Squat,Beginner,Lower,Push,FW,M",
  "Legs - Quadriceps,Barbell Step-Up,Advanced,Lower,Push,FW,M",
  "Legs - Quadriceps,Barbell Walking Lunge,Advanced,Lower,Push,FW,M",
  "Legs - Quadriceps,Diagonal Lunge,Intermediate,Lower,Push,FW,M",
  "Legs - Quadriceps,Dumbbell Diagonal Lunge,Advanced,Lower,Push,FW,M",
  "Legs - Quadriceps,Dumbbell Lunge,Beginner,Lower,Push,FW,M",
  "Legs - Quadriceps,Dumbbell Reverse Lunge,Intermediate,Lower,Push,FW,M",
  "Legs - Quadriceps,Dumbbell Side Lunge,Intermediate,Lower,Push,FW,M",
  "Legs - Quadriceps,Dumbbell Split Squat,Advanced,Lower,Push,FW,M",
  "Legs - Quadriceps,Dumbbell Squat,Beginner,Lower,Push,FW,M",
  "Legs - Quadriceps,Dumbbell Step-Up,Beginner,Lower,Push,FW,M",
  "Legs - Quadriceps,Dumbbell Walking Lunge,Advanced,Lower,Push,FW,M",
  "Legs - Quadriceps,Forward Lunge,Beginner,Lower,Push,FW,M",
  "Legs - Quadriceps,Lateral Barbell Squat,Intermediate,Lower,Push,FW,M",
  "Legs - Quadriceps,Lateral Barbell Step-Up,Advanced,Lower,Push,FW,M",
  "Legs - Quadriceps,Lateral Squat,Beginner,Lower,Push,FW,M",
  "Legs - Quadriceps,Lateral Step-Up,Beginner,Lower,Push,FW,M",
  "Legs - Quadriceps,Leg Press,Beginner,Lower,Push,M,M",
  "Legs - Quadriceps,Lunge,Beginner,Lower,Push,FW,M",
  "Legs - Quadriceps,Lying Machine Squat,Beginner,Lower,Push,M,M",
  "Legs - Quadriceps,Machine Hack Squat,Beginner,Lower,Push,M,M",
  "Legs - Quadriceps,Reverse Lunge,Beginner,Lower,Push,FW,M",
  "Legs - Quadriceps,Single-Arm Barbell Side Squat,Advanced,Lower,Push,FW,M",
  "Legs - Quadriceps,Single-Arm Dumbbell Side Squat,Intermediate,Lower,Push,FW,M",
  "Legs - Quadriceps,Single-Leg Barbell Squat,Advanced,Lower,Push,FW,M",
  "Legs - Quadriceps,Single-Leg Box Squat,Advanced,Lower,Push,FW,M",
  "Legs - Quadriceps,Single-Leg Dumbbell Box Squat,Advanced,Lower,Push,FW,M",
  "Legs - Quadriceps,Single-Leg Dumbbell Squat,Intermediate,Lower,Push,FW,M",
  "Legs - Quadriceps,Single-Leg Squat,Intermediate,Lower,Push,FW,M",
  "Legs - Quadriceps,Smith Machine Squat,Intermediate,Lower,Push,M,M",
  "Legs - Quadriceps,Split Squat,Advanced,Lower,Push,FW,M",
  "Legs - Quadriceps,Step-Up,Beginner,Lower,Push,FW,M",
  "Legs - Quadriceps,Walking Lunge,Intermediate,Lower,Push,FW,M",
  "Legs - Quadriceps,Alternating Leg Extension,Intermediate,Lower,Push,M,S",
  "Legs - Quadriceps,Leg Extension,Beginner,Lower,Push,M,S",
  "Legs - Quadriceps,Single-Leg Extension,Intermediate,Lower,Push,M,S",
  "Lower Back,Alternating Superman,Beginner,Core,Pull,FW,M",
  "Lower Back,Back Raise,Beginner,Core,Pull,FW,M",
  "Lower Back,Quadruped Alternating Superman,Beginner,Core,Pull,FW,M",
  "Lower Back,Superman,Beginner,Core,Pull,FW,M",
  "Lower Back,Superman Hold,Beginner,Core,Pull,FW,M",
  "Shoulders,Arnold Dumbbell Press,Intermediate,Upper,Push,FW,M",
  "Shoulders,Barbell Shoulder Press,Advanced,Upper,Push,FW,M",
  "Shoulders,Dumbbell Alternating Shoulder Press,Beginner,Upper,Push,FW,M",
  "Shoulders,Dumbbell Front Raise,Beginner,Upper,Push,FW,M",
  "Shoulders,Dumbbell Shoulder Press,Intermediate,Upper,Push,FW,M",
  "Shoulders,Dumbbell Twisting Shoulder Press,Intermediate,Upper,Push,FW,M",
  "Shoulders,Machine Shoulder Press,Beginner,Upper,Push,M,M",
  "Shoulders,Seated Dumbbell Rear Delt Elbow Raise,Intermediate,Upper,Push,FW,M",
  "Shoulders,Single-Arm Dumbbell Shoulder Press,Beginner,Upper,Push,FW,M",
  "Shoulders,Smith Machine Shoulder Press,Advanced,Upper,Push,M,M",
  "Shoulders,Barbell Front Raise,Intermediate,Upper,Push,FW,S",
  "Shoulders,Bent-Over Cable Rear Delt Raise,Advanced,Upper,Push,C,S",
  "Shoulders,Bent-Over Dumbbell Rear Delt Raise,Intermediate,Upper,Push,FW,S",
  "Shoulders,Cable Front Raise,Intermediate,Upper,Push,C,S",
  "Shoulders,Cable Lateral Raise,Intermediate,Upper,Push,C,S",
  "Shoulders,Dumbbell Lateral Raise,Beginner,Upper,Push,FW,S",
  "Shoulders,Front Plate Raise,Beginner,Upper,Push,FW,S",
  "Shoulders,Kneeling Single-Arm Cable Rear Delt Raise,Advanced,Upper,Push,C,S",
  "Shoulders,Lying Dumbbell External Rotation,Beginner,Upper,Push,FW,S",
  "Shoulders,Lying Dumbbell Rear Delt Raise,Beginner,Upper,Push,FW,S",
  "Shoulders,Lying Single-Arm Dumbbell Rear Delt Raise,Beginner,Upper,Push,FW,S",
  "Shoulders,Pec Deck Real Delt Extensions,Intermediate,Upper,Push,M,S",
  "Shoulders,Reverse Incline Dumbbell Rear Delt Raise,Advanced,Upper,Push,FW,S",
  "Shoulders,Seated Dumbbell Rear Delt Raise,Beginner,Upper,Push,FW,S",
  "Shoulders,Single-Arm Cable Lateral Raise,Intermediate,Upper,Push,C,S",
  "Shoulders,Cable External Rotation,Beginner,Upper,Push,C,S",
  "Triceps,Close-Grip Bench Press,Advanced,Upper,Push,FW,M",
  "Triceps,Forward Lean Dips,Intermediate,Upper,Push,FW,M",
  "Triceps,Assisted Dips,Beginner,Upper,Push,FW,M",
  "Triceps,Bench Dips,Intermediate,Upper,Push,FW,M",
  "Triceps,Diamond Push-Up,Intermediate,Upper,Push,FW,M",
  "Triceps,Dips,Intermediate,Upper,Push,FW,M",
  "Triceps,Machine Dips,Beginner,Upper,Push,M,M",
  "Triceps,Decline Dumbbell Triceps Extension,Advanced,Upper,Push,FW,S",
  "Triceps,Decline EZ-Bar Tricep Extension,Advanced,Upper,Push,FW,S",
  "Triceps,Decline Single Dumbbell Triceps Extension,Advanced,Upper,Push,FW,S",
  "Triceps,Decline Single-Arm Dumbbell Triceps Extension,Advanced,Upper,Push,FW,S",
  "Triceps,Dumbbell Kickback,Beginner,Upper,Push,FW,S",
  "Triceps,Incline EZ-Bar Tricep Extension,Advanced,Upper,Push,FW,S",
  "Triceps,Kneeling Cable Triceps Extension,Beginner,Upper,Push,C,S",
  "Triceps,Leaning Overhead Tricep Extension,Intermediate,Upper,Push,FW,S",
  "Triceps,Low Cable Triceps Extension,Intermediate,Upper,Push,C,S",
  "Triceps,Lying Cable Triceps Extension,Intermediate,Upper,Push,C,S",
  "Triceps,Lying EZ-Bar Triceps Extension,Intermediate,Upper,Push,FW,S",
  "Triceps,Lying Overhead EZ-Bar Tricep Extension,Intermediate,Upper,Push,FW,S",
  "Triceps,Lying Reverse EZ-Bar Triceps Extension,Advanced,Upper,Push,FW,S",
  "Triceps,Lying Single Dumbbell Triceps Extension,Beginner,Upper,Push,FW,S",
  "Triceps,Lying Single-Arm Dumbbell Triceps Extension,Beginner,Upper,Push,FW,S",
  "Triceps,Lying Tricep Extensions,Beginner,Upper,Push,FW,S",
  "Triceps,Overhead Dumbbell Triceps Extension,Beginner,Upper,Push,FW,S",
  "Triceps,Overhead EZ-Bar Triceps Extension,Advanced,Upper,Push,FW,S",
  "Triceps,Overhead Rope Cable Tricep Extension,Intermediate,Upper,Push,C,S",
  "Triceps,Overhead Single Dumbbell Tricep Extension,Beginner,Upper,Push,FW,S",
  "Triceps,Overhead Single-Arm Cable Tricep Extension,Intermediate,Upper,Push,C,S",
  "Triceps,Overhead Single-Arm Dumbbell Tricep Extension,Beginner,Upper,Push,FW,S",
  "Triceps,Reverse Tricep Pushdown,Advanced,Upper,Push,C,S",
  "Triceps,Rope Triceps Pushdown,Intermediate,Upper,Push,C,S",
  "Triceps,Single-Arm Towel Triceps Pushdown,Beginner,Upper,Push,C,S",
  "Triceps,Single-Arm Triceps Pushdown,Intermediate,Upper,Push,C,S",
  "Triceps,Towel Triceps Pushdown,Beginner,Upper,Push,C,S",
  "Triceps,Tricep Extensions,Beginner,Upper,Push,FW,S",
  "Triceps,Tricep Pushdown,Beginner,Upper,Push,C,S",
  "Triceps,Tricep Pushdown,Beginner,Upper,Push,C,S",
  "Triceps,V-Bar Tricep Pushdown,Beginner,Upper,Push,C,S",
];
