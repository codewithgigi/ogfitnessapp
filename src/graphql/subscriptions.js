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
    }
  }
`;