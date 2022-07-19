import React, { useEffect, useRef } from "react";
import { Box, Chip, Typography, Button } from "@mui/material";
import Section from "../components/Section";
import Context from "../src/context";
import { useRouter } from "next/router";
import { API } from "aws-amplify";
import { palette } from "../src/theme";
import { getProfile } from "./profile";

export const ChipSelection = ({ onclick, field, value }) => {
  return (
    <Chip
      key={value}
      color={field === value ? "primary" : "secondary"}
      sx={{
        mr: 0.5,
        mb: 1,
        color: "black",
        borderWidth: field === value ? 2.5 : 0.5,
        borderColor: field === value ? palette.blue : "black",
        fontWeight: field === value ? 500 : 400,
        textTransform: "capitalize",
      }}
      variant={"outlined"}
      label={value}
      onClick={onclick}
    />
  );
};

const createProfile = /* GraphQL */ `
  mutation CreateProfile(
    $input: CreateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    createProfile(input: $input, condition: $condition) {
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
    }
  }
`;

const updateProfile = /* GraphQL */ `
  mutation UpdateProfile(
    $input: UpdateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    updateProfile(input: $input, condition: $condition) {
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
    }
  }
`;

const menCompete = ["Bodybuilding", "Classic Physique", "Men’s Physique"];
const womenCompete = [
  "Bikini",
  "Fitness",
  "Figure",
  "Wellness",
  "Women's Physique",
];
export default function Onboarding() {
  const { state, dispatch } = React.useContext(Context);
  const [step, setStep] = React.useState(0);
  const router = useRouter();

  const [onboarding, setOnboarding] = React.useState({
    goal: "",
    gender: "",
    age: "",
    experience: "",
    compete: "",
  });

  useEffect(() => {
    if (state?.user?.profile?.onboarding) {
      setOnboarding(state?.user?.profile.onboarding);
      setStep(5);
      if (!router?.query?.update) router.push("/training");
    } else myProfile();
  }, [state]);

  async function myProfile() {
    if (state?.user?.username)
      try {
        const { data } = await API.graphql({
          query: getProfile,
          variables: { id: state?.user?.username },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        const profile = data?.getProfile;
        if (profile?.onboarding) {
          const newUser = { ...state.user, profile: profile };
          dispatch({ type: "addUser", payload: newUser });
          setOnboarding(profile?.onboarding);
          setStep(5);
        }
      } catch (error) {
        console.warn("Error with api getProfile", error);
      }
  }
  async function addProfile() {
    const profileId = state?.user?.attributes?.email;
    if (profileId)
      try {
        const { data } = await API.graphql({
          query: createProfile,
          variables: {
            input: {
              id: state?.user?.username,
              email: state?.user?.attributes?.email,
              onboarding: onboarding,
            },
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        const myProfile = data?.createProfile ?? {};
        const newUser = { ...state.user, profile: myProfile };
        dispatch({ type: "addUser", payload: newUser });
      } catch (error) {
        console.warn("Error with api createProfile", error);
      }
  }

  async function editProfile() {
    const profileId = state?.user?.profile?.id;
    if (profileId && onboarding)
      try {
        const { data } = await API.graphql({
          query: updateProfile,
          variables: {
            input: { id: profileId, onboarding: onboarding },
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        const myProfile = data?.updateProfile ?? {};
        const newUser = { ...state.user, profile: myProfile };
        dispatch({ type: "addUser", payload: newUser });
      } catch (error) {
        console.warn("Error with api updateProfile", error);
      }
  }

  const onSubmit = () => {
    const profile = state?.user?.profile ?? {};
    if (Object.keys(profile).length === 0) addProfile();
    else editProfile();
    router.push("/training");
  };

  const scrollToBottom = () => {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <Section>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        training goals
      </Typography>
      {step >= 0 && (
        <>
          {["female", "male"].map((g, index) => (
            <ChipSelection
              key={index}
              field={onboarding.gender}
              value={g}
              onclick={() => {
                setOnboarding({
                  ...onboarding,
                  gender: g,
                  compete: "",
                  competeLevel: "",
                });
                if (step > 0) setStep(4);
                else setStep(1);
              }}
            />
          ))}
        </>
      )}
      {step >= 1 && (
        <>
          <h2>Age range</h2>
          {["18-30", "31-45", "45+"].map((a) => (
            <ChipSelection
              field={onboarding.age}
              value={a}
              onclick={() => {
                setOnboarding({ ...onboarding, age: a });
                scrollToBottom();
                if (step > 2) setStep(4);
                else setStep(2);
              }}
            />
          ))}
        </>
      )}
      {step >= 2 && (
        <>
          <h2>Weight training experience</h2>
          {["beginner", "experienced"].map((e) => (
            <ChipSelection
              field={onboarding.experience}
              value={e}
              onclick={() => {
                setOnboarding({ ...onboarding, experience: e });
                scrollToBottom();
                if (step > 3) setStep(4);
                else setStep(3);
              }}
            />
          ))}
        </>
      )}
      {step >= 3 && (
        <>
          <h2>Primary Training goal?</h2>
          {["fat-loss", "muscle-gain", "compete"].map((g) => (
            <ChipSelection
              value={g}
              field={onboarding.goal}
              onclick={() => {
                setOnboarding({ ...onboarding, goal: g, compete: "" });
                scrollToBottom();
                setStep(4);
              }}
            />
          ))}
        </>
      )}

      {step >= 4 && onboarding.goal === "compete" && onboarding?.gender && (
        <Box>
          <h2>Compete</h2>
          {step >= 4 &&
            onboarding.gender === "Male" &&
            menCompete.map((c) => (
              <ChipSelection
                value={c}
                field={onboarding.compete}
                onclick={() => {
                  setOnboarding({ ...onboarding, compete: c });
                  scrollToBottom();
                  setStep(5);
                }}
              />
            ))}

          {step >= 4 &&
            onboarding.gender === "Female" &&
            womenCompete.map((c) => (
              <ChipSelection
                value={c}
                field={onboarding.compete}
                onclick={() => {
                  setOnboarding({ ...onboarding, compete: c });
                  scrollToBottom();
                  setStep(5);
                }}
              />
            ))}
          {step >= 5 && (
            <>
              <h3>Compete Level</h3>
              {["Local", "State", "Regional", "National"].map((x) => (
                <ChipSelection
                  value={x}
                  field={onboarding.competeLevel}
                  onclick={() => {
                    setOnboarding({ ...onboarding, competeLevel: x });
                    scrollToBottom();
                  }}
                />
              ))}
            </>
          )}
        </Box>
      )}
      {onboarding.gender &&
        onboarding.age &&
        onboarding.experience &&
        ((onboarding.goal && onboarding.goal !== "Compete") ||
          (onboarding.goal === "Compete" &&
            onboarding.compete &&
            onboarding.competeLevel)) && (
          <div>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={onSubmit}
              fullWidth
            >
              View Workouts
            </Button>
          </div>
        )}
    </Section>
  );
}
