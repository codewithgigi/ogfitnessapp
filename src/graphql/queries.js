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
      nextToken
    }
  }
`;
export const getExercise = /* GraphQL */ `
  query GetExercise($id: ID!) {
    getExercise(id: $id) {
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
        instructions
        image
        video
        sets
        reps
        createdAt
        updatedAt
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
          week
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
