/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProfile = /* GraphQL */ `
  mutation CreateProfile(
    $input: CreateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    createProfile(input: $input, condition: $condition) {
      id
      user
      onboarding {
        goal
        gender
        age
        experience
        compete
        competeLevel
      }
      weight {
        weight
        date
      }
      progressPhotos {
        frontImage
        sideImage
        backImage
        date
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateProfile = /* GraphQL */ `
  mutation UpdateProfile(
    $input: UpdateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    updateProfile(input: $input, condition: $condition) {
      id
      user
      onboarding {
        goal
        gender
        age
        experience
        compete
        competeLevel
      }
      weight {
        weight
        date
      }
      progressPhotos {
        frontImage
        sideImage
        backImage
        date
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteProfile = /* GraphQL */ `
  mutation DeleteProfile(
    $input: DeleteProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    deleteProfile(input: $input, condition: $condition) {
      id
      user
      onboarding {
        goal
        gender
        age
        experience
        compete
        competeLevel
      }
      weight {
        weight
        date
      }
      progressPhotos {
        frontImage
        sideImage
        backImage
        date
      }
      createdAt
      updatedAt
    }
  }
`;
export const createExercise = /* GraphQL */ `
  mutation CreateExercise(
    $input: CreateExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    createExercise(input: $input, condition: $condition) {
      id
      exercise {
        name
        muscles
        bodypart
        level
        equipment
        instructions
        image
        video
        sets
        reps
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateExercise = /* GraphQL */ `
  mutation UpdateExercise(
    $input: UpdateExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    updateExercise(input: $input, condition: $condition) {
      id
      exercise {
        name
        muscles
        bodypart
        level
        equipment
        instructions
        image
        video
        sets
        reps
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteExercise = /* GraphQL */ `
  mutation DeleteExercise(
    $input: DeleteExerciseInput!
    $condition: ModelExerciseConditionInput
  ) {
    deleteExercise(input: $input, condition: $condition) {
      id
      exercise {
        name
        muscles
        bodypart
        level
        equipment
        instructions
        image
        video
        sets
        reps
      }
      createdAt
      updatedAt
    }
  }
`;
export const createWorkout = /* GraphQL */ `
  mutation CreateWorkout(
    $input: CreateWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    createWorkout(input: $input, condition: $condition) {
      id
      name
      instructions
      exercises {
        name
        muscles
        bodypart
        level
        equipment
        instructions
        image
        video
        sets
        reps
      }
      plans {
        items {
          id
          workoutID
          planID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateWorkout = /* GraphQL */ `
  mutation UpdateWorkout(
    $input: UpdateWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    updateWorkout(input: $input, condition: $condition) {
      id
      name
      instructions
      exercises {
        name
        muscles
        bodypart
        level
        equipment
        instructions
        image
        video
        sets
        reps
      }
      plans {
        items {
          id
          workoutID
          planID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteWorkout = /* GraphQL */ `
  mutation DeleteWorkout(
    $input: DeleteWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    deleteWorkout(input: $input, condition: $condition) {
      id
      name
      instructions
      exercises {
        name
        muscles
        bodypart
        level
        equipment
        instructions
        image
        video
        sets
        reps
      }
      plans {
        items {
          id
          workoutID
          planID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createPlan = /* GraphQL */ `
  mutation CreatePlan(
    $input: CreatePlanInput!
    $condition: ModelPlanConditionInput
  ) {
    createPlan(input: $input, condition: $condition) {
      id
      name
      image
      video
      description
      instructions
      active
      goal
      level
      workouts {
        items {
          id
          workoutID
          planID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updatePlan = /* GraphQL */ `
  mutation UpdatePlan(
    $input: UpdatePlanInput!
    $condition: ModelPlanConditionInput
  ) {
    updatePlan(input: $input, condition: $condition) {
      id
      name
      image
      video
      description
      instructions
      active
      goal
      level
      workouts {
        items {
          id
          workoutID
          planID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deletePlan = /* GraphQL */ `
  mutation DeletePlan(
    $input: DeletePlanInput!
    $condition: ModelPlanConditionInput
  ) {
    deletePlan(input: $input, condition: $condition) {
      id
      name
      image
      video
      description
      instructions
      active
      goal
      level
      workouts {
        items {
          id
          workoutID
          planID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createPlanWorkouts = /* GraphQL */ `
  mutation CreatePlanWorkouts(
    $input: CreatePlanWorkoutsInput!
    $condition: ModelPlanWorkoutsConditionInput
  ) {
    createPlanWorkouts(input: $input, condition: $condition) {
      id
      workoutID
      planID
      workout {
        id
        name
        instructions
        exercises {
          name
          muscles
          bodypart
          level
          equipment
          instructions
          image
          video
          sets
          reps
        }
        plans {
          nextToken
        }
        createdAt
        updatedAt
      }
      plan {
        id
        name
        image
        video
        description
        instructions
        active
        goal
        level
        workouts {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updatePlanWorkouts = /* GraphQL */ `
  mutation UpdatePlanWorkouts(
    $input: UpdatePlanWorkoutsInput!
    $condition: ModelPlanWorkoutsConditionInput
  ) {
    updatePlanWorkouts(input: $input, condition: $condition) {
      id
      workoutID
      planID
      workout {
        id
        name
        instructions
        exercises {
          name
          muscles
          bodypart
          level
          equipment
          instructions
          image
          video
          sets
          reps
        }
        plans {
          nextToken
        }
        createdAt
        updatedAt
      }
      plan {
        id
        name
        image
        video
        description
        instructions
        active
        goal
        level
        workouts {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deletePlanWorkouts = /* GraphQL */ `
  mutation DeletePlanWorkouts(
    $input: DeletePlanWorkoutsInput!
    $condition: ModelPlanWorkoutsConditionInput
  ) {
    deletePlanWorkouts(input: $input, condition: $condition) {
      id
      workoutID
      planID
      workout {
        id
        name
        instructions
        exercises {
          name
          muscles
          bodypart
          level
          equipment
          instructions
          image
          video
          sets
          reps
        }
        plans {
          nextToken
        }
        createdAt
        updatedAt
      }
      plan {
        id
        name
        image
        video
        description
        instructions
        active
        goal
        level
        workouts {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
