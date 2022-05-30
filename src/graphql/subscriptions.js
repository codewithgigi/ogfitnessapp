/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProfile = /* GraphQL */ `
  subscription OnCreateProfile($user: String) {
    onCreateProfile(user: $user) {
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
export const onUpdateProfile = /* GraphQL */ `
  subscription OnUpdateProfile($user: String) {
    onUpdateProfile(user: $user) {
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
export const onDeleteProfile = /* GraphQL */ `
  subscription OnDeleteProfile($user: String) {
    onDeleteProfile(user: $user) {
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
export const onCreateExercise = /* GraphQL */ `
  subscription OnCreateExercise {
    onCreateExercise {
      id
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
      level
      equipment
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
      muscles
      bodypart
      level
      equipment
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
export const onCreateWorkout = /* GraphQL */ `
  subscription OnCreateWorkout {
    onCreateWorkout {
      id
      name
      instructions
      exercises {
        id
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
        createdAt
        updatedAt
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
export const onUpdateWorkout = /* GraphQL */ `
  subscription OnUpdateWorkout {
    onUpdateWorkout {
      id
      name
      instructions
      exercises {
        id
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
        createdAt
        updatedAt
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
export const onDeleteWorkout = /* GraphQL */ `
  subscription OnDeleteWorkout {
    onDeleteWorkout {
      id
      name
      instructions
      exercises {
        id
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
        createdAt
        updatedAt
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
export const onCreatePlan = /* GraphQL */ `
  subscription OnCreatePlan {
    onCreatePlan {
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
export const onUpdatePlan = /* GraphQL */ `
  subscription OnUpdatePlan {
    onUpdatePlan {
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
export const onDeletePlan = /* GraphQL */ `
  subscription OnDeletePlan {
    onDeletePlan {
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
export const onCreatePlanWorkouts = /* GraphQL */ `
  subscription OnCreatePlanWorkouts {
    onCreatePlanWorkouts {
      id
      workoutID
      planID
      workout {
        id
        name
        instructions
        exercises {
          id
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
          createdAt
          updatedAt
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
export const onUpdatePlanWorkouts = /* GraphQL */ `
  subscription OnUpdatePlanWorkouts {
    onUpdatePlanWorkouts {
      id
      workoutID
      planID
      workout {
        id
        name
        instructions
        exercises {
          id
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
          createdAt
          updatedAt
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
export const onDeletePlanWorkouts = /* GraphQL */ `
  subscription OnDeletePlanWorkouts {
    onDeletePlanWorkouts {
      id
      workoutID
      planID
      workout {
        id
        name
        instructions
        exercises {
          id
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
          createdAt
          updatedAt
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
