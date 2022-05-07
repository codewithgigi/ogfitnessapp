import React, { useEffect, useRef } from "react";
import { Box, Chip } from "@mui/material";
import Section from "../components/Section";
import Context from "../src/context";
import { useRouter } from "next/router";
import { API } from "aws-amplify";
import { palette } from "../src/theme";

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
  const buttonRef = useRef();

  const [onboarding, setOnboarding] = React.useState({
    goal: "",
    gender: "",
    age: "",
    experience: "",
    compete: "",
  });

  useEffect(() => {
    if (state?.user?.profile?.onboarding) {
      setOnboarding(state.user.profile.onboarding);
      setStep(5);
    }
  }, [state]);

  async function addProfile() {
    const profileId = state?.user?.attributes?.email;
    if (profileId)
      try {
        const { data } = await API.graphql({
          query: createProfile,
          variables: {
            input: {
              id: state?.user?.username,
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
    router.push("/workouts");
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
      <h1>training goals</h1>
      {step >= 0 && (
        <>
          {["Female", "Male"].map((g) => (
            <ChipSelection
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
          {["18-30", "31-45", "46-65", "65+"].map((a) => (
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
          {[
            "0 - 3 months",
            "3 - 6 months",
            "6 months - 1 year",
            "1 - 2 years",
            "2+ years",
          ].map((e) => (
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
          {["Lose Fat", "Gain Muscle", "Compete"].map((g) => (
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

      {step >= 4 && onboarding.goal === "Compete" && onboarding?.gender && (
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
            <button
              class="button"
              ref={buttonRef}
              type="submit"
              onClick={onSubmit}
            >
              View Training
            </button>
          </div>
        )}
    </Section>
  );
}
