/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProfile = /* GraphQL */ `
  subscription OnCreateProfile($user: String) {
    onCreateProfile(user: $user) {
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
export const onUpdateProfile = /* GraphQL */ `
  subscription OnUpdateProfile($user: String) {
    onUpdateProfile(user: $user) {
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
export const onDeleteProfile = /* GraphQL */ `
  subscription OnDeleteProfile($user: String) {
    onDeleteProfile(user: $user) {
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
export const onCreateExercise = /* GraphQL */ `
  subscription OnCreateExercise {
    onCreateExercise {
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
export const onUpdateExercise = /* GraphQL */ `
  subscription OnUpdateExercise {
    onUpdateExercise {
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
export const onDeleteExercise = /* GraphQL */ `
  subscription OnDeleteExercise {
    onDeleteExercise {
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
export const onCreateProgram = /* GraphQL */ `
  subscription OnCreateProgram {
    onCreateProgram {
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
export const onUpdateProgram = /* GraphQL */ `
  subscription OnUpdateProgram {
    onUpdateProgram {
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
export const onDeleteProgram = /* GraphQL */ `
  subscription OnDeleteProgram {
    onDeleteProgram {
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
