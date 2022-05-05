import Section from "../components/Section";
import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { ExerciseList } from "../src/exerciselist";
import { createExercise } from "../src/graphql/mutations";
import { listExercises } from "../src/graphql/queries";

export default function Exercises() {
  const [exercises, setExercises] = useState();

  useEffect(() => {
    getExerciseList();
  }, []);

  async function getExerciseList() {
    try {
      const { data } = await API.graphql({
        query: listExercises,
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      const items = data?.listExercises?.items;
      setExercises(items);
    } catch (error) {
      console.warn("Error with api getProfile", error);
    }
  }
  async function importExercises() {
    ExerciseList.map(async (x) => {
      const dataArray = x.split(",");
      const name = dataArray[1].toLowerCase();
      const exists = exercises.find((x) => {
        const exname = x?.exercise?.name;
        if (exname && exname.toLowerCase() === name) return x;
      });
      if (!exists) {
        try {
          await API.graphql({
            query: createExercise,
            variables: {
              input: {
                exercise: {
                  muscles: dataArray[0].toLowerCase(),
                  name: dataArray[1].toLowerCase(),
                  level: dataArray[2].toLowerCase(),
                  bodypart: dataArray[3].toLowerCase(),
                  push: dataArray[4] === "Push" ? true : false,
                  modality: dataArray[5].toLowerCase(),
                  joint: dataArray[6].toLowerCase(),
                },
              },
            },
            authMode: "AMAZON_COGNITO_USER_POOLS",
          });
        } catch (error) {
          console.warn("Error with api createExercise", error);
        }
      }
    });
  }
  return (
    <Section>
      <h1>Exercises</h1>
      {(exercises ?? []).map((x, index) => (
        <div key={index}>{x?.exercise?.name}</div>
      ))}
    </Section>
  );
}
