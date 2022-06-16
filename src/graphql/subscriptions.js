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
      muscles
      bodypart
      equipment
      instructions
      image
      video
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
      muscles
      bodypart
      equipment
      instructions
      image
      video
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
      muscles
      bodypart
      equipment
      instructions
      image
      video
      createdAt
      updatedAt
    }
  }
`;
export const onCreateWorkout = /* GraphQL */ `
  subscription OnCreateWorkout {
    onCreateWorkout {
      id
      name
      image
      video
      instructions
      exercises {
        id
        name
        muscles
        bodypart
        equipment
        instructions
        image
        video
        sets
        reps
        order
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateWorkout = /* GraphQL */ `
  subscription OnUpdateWorkout {
    onUpdateWorkout {
      id
      name
      image
      video
      instructions
      exercises {
        id
        name
        muscles
        bodypart
        equipment
        instructions
        image
        video
        sets
        reps
        order
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteWorkout = /* GraphQL */ `
  subscription OnDeleteWorkout {
    onDeleteWorkout {
      id
      name
      image
      video
      instructions
      exercises {
        id
        name
        muscles
        bodypart
        equipment
        instructions
        image
        video
        sets
        reps
        order
      }
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
      image
      video
      description
      active
      goal
      gender
      age
      level
      weeks
      workoutList {
        day
        week
        type
        workoutId
        workoutName
        workoutDescription
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
      image
      video
      description
      active
      goal
      gender
      age
      level
      weeks
      workoutList {
        day
        week
        type
        workoutId
        workoutName
        workoutDescription
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
      image
      video
      description
      active
      goal
      gender
      age
      level
      weeks
      workoutList {
        day
        week
        type
        workoutId
        workoutName
        workoutDescription
      }
      createdAt
      updatedAt
    }
  }
`;
