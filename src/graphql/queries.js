/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
      id
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
        frontImage {
          bucket
          region
          key
        }
        sideImage {
          bucket
          region
          key
        }
        backImage {
          bucket
          region
          key
        }
        date
      }
      createdAt
      updatedAt
      owner
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
          date
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
