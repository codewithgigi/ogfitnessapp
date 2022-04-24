/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProfile = /* GraphQL */ `
  subscription OnCreateProfile($owner: String) {
    onCreateProfile(owner: $owner) {
      id
      owner
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
  subscription OnUpdateProfile($owner: String) {
    onUpdateProfile(owner: $owner) {
      id
      owner
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
  subscription OnDeleteProfile($owner: String) {
    onDeleteProfile(owner: $owner) {
      id
      owner
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
