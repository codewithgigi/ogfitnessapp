/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProfile = /* GraphQL */ `
  subscription OnCreateProfile($Admin: String) {
    onCreateProfile(Admin: $Admin) {
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
      Admin
    }
  }
`;
export const onUpdateProfile = /* GraphQL */ `
  subscription OnUpdateProfile($Admin: String) {
    onUpdateProfile(Admin: $Admin) {
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
      Admin
    }
  }
`;
export const onDeleteProfile = /* GraphQL */ `
  subscription OnDeleteProfile($Admin: String) {
    onDeleteProfile(Admin: $Admin) {
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
      Admin
    }
  }
`;
