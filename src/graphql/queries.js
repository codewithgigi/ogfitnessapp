/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
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
export const listProfiles = /* GraphQL */ `
  query ListProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getExercise = /* GraphQL */ `
  query GetExercise($id: ID!) {
    getExercise(id: $id) {
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
export const listExercises = /* GraphQL */ `
  query ListExercises(
    $filter: ModelExerciseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExercises(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getWorkout = /* GraphQL */ `
  query GetWorkout($id: ID!) {
    getWorkout(id: $id) {
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
export const listWorkouts = /* GraphQL */ `
  query ListWorkouts(
    $filter: ModelWorkoutFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkouts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getPlan = /* GraphQL */ `
  query GetPlan($id: ID!) {
    getPlan(id: $id) {
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
export const listPlans = /* GraphQL */ `
  query ListPlans(
    $filter: ModelPlanFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlans(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getPlanWorkouts = /* GraphQL */ `
  query GetPlanWorkouts($id: ID!) {
    getPlanWorkouts(id: $id) {
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
export const listPlanWorkouts = /* GraphQL */ `
  query ListPlanWorkouts(
    $filter: ModelPlanWorkoutsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlanWorkouts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        workoutID
        planID
        workout {
          id
          name
          instructions
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
