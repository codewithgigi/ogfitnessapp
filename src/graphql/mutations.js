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
      email
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
      workoutResults {
        workoutId
        date
        notes
      }
      exerciseResults {
        exerciseId
        date
        notes
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
      email
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
      workoutResults {
        workoutId
        date
        notes
      }
      exerciseResults {
        exerciseId
        date
        notes
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
      email
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
      workoutResults {
        workoutId
        date
        notes
      }
      exerciseResults {
        exerciseId
        date
        notes
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
      name
      instructions
      image
      video
      sets
      reps
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
      name
      instructions
      image
      video
      sets
      reps
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
      name
      instructions
      image
      video
      sets
      reps
      createdAt
      updatedAt
    }
  }
`;
export const createProgram = /* GraphQL */ `
  mutation CreateProgram(
    $input: CreateProgramInput!
    $condition: ModelProgramConditionInput
  ) {
    createProgram(input: $input, condition: $condition) {
      id
      name
      subtitle
      duration
      description
      instructions
      active
      goal
      gender
      age
      level
      weeks
      workoutList {
        id
        name
        day
        instructions
        week
        warmup {
          instructions
          video
          image
        }
        cooldown {
          instructions
          video
          image
        }
        exercises {
          id
          name
          instructions
          image
          video
          sets
          reps
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateProgram = /* GraphQL */ `
  mutation UpdateProgram(
    $input: UpdateProgramInput!
    $condition: ModelProgramConditionInput
  ) {
    updateProgram(input: $input, condition: $condition) {
      id
      name
      subtitle
      duration
      description
      instructions
      active
      goal
      gender
      age
      level
      weeks
      workoutList {
        id
        name
        day
        instructions
        week
        warmup {
          instructions
          video
          image
        }
        cooldown {
          instructions
          video
          image
        }
        exercises {
          id
          name
          instructions
          image
          video
          sets
          reps
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteProgram = /* GraphQL */ `
  mutation DeleteProgram(
    $input: DeleteProgramInput!
    $condition: ModelProgramConditionInput
  ) {
    deleteProgram(input: $input, condition: $condition) {
      id
      name
      subtitle
      duration
      description
      instructions
      active
      goal
      gender
      age
      level
      weeks
      workoutList {
        id
        name
        day
        instructions
        week
        warmup {
          instructions
          video
          image
        }
        cooldown {
          instructions
          video
          image
        }
        exercises {
          id
          name
          instructions
          image
          video
          sets
          reps
        }
      }
      createdAt
      updatedAt
    }
  }
`;
