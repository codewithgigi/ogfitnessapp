/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
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
      }
      nextToken
    }
  }
`;
export const getExercise = /* GraphQL */ `
  query GetExercise($id: ID!) {
    getExercise(id: $id) {
      id
      name
      muscles
      bodypart
      level
      equipment
      instructions
      image
      video
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
        name
        muscles
        bodypart
        level
        equipment
        instructions
        image
        video
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
      image
      video
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
        order
      }
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
        image
        video
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
          order
        }
      }
      nextToken
    }
  }
`;
export const getProgram = /* GraphQL */ `
  query GetProgram($id: ID!) {
    getProgram(id: $id) {
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
        type
        workout {
          id
          name
          image
          video
          instructions
        }
        workoutName
        workoutDescription
      }
    }
  }
`;
export const listPrograms = /* GraphQL */ `
  query ListPrograms(
    $filter: ModelProgramFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrograms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          type
          workoutName
          workoutDescription
        }
      }
      nextToken
    }
  }
`;
