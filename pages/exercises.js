import Section from "../components/Section";
import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { ExerciseList } from "../src/exerciselist";
import { Glutes } from "../src/glutes";
import { createExercise } from "../src/graphql/mutations";
import { listExercises } from "../src/graphql/queries";

export default function Exercises() {
  const [exercises, setExercises] = useState();
  const [groupedExercises, setGroupedExercises] = useState();

  useEffect(() => {
    getExerciseList();
    groupBy();
  }, []);

  useEffect(() => {
    groupBy();
  }, [exercises]);

  async function getExerciseList() {
    try {
      const { data } = await API.graphql({
        query: listExercises,
        variables: { limit: 300 },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      const items = data?.listExercises?.items;
      setExercises(items);
    } catch (error) {
      console.warn("Error with api getProfile", error);
    }
  }
  async function importExercises() {
    ExerciseList.map(async (e) => {
      let exists;
      const dataArray = e.split(",");
      const name = dataArray[1].toLowerCase();
      exists = exercises.find((x) => {
        if (x?.exercise?.name.toLowerCase() === name) {
          return x;
        }
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
  function groupBy() {
    const byMuscle = (exercises ?? []).reduce((acc, obj) => {
      const key = obj.exercise.muscles;
      if (!acc[key]) {
        acc[key] = [];
      }
      // Add object to list for given key's value
      acc[key].push(obj);
      return acc;
    }, {});
    setGroupedExercises(byMuscle);
  }
  if (exercises) console.log(exercises.length);
  const exerciseGroups = groupedExercises ? Object.keys(groupedExercises) : [];
  return (
    <Section>
      <h1>Exercise List</h1>
      <button onClick={() => importExercises()}>Import</button>
      {(exerciseGroups ?? []).map((x) => {
        return (
          <div key={x}>
            <h2>{x}</h2>
            {(groupedExercises[x] ?? []).map((e, index) => (
              <div key={index} style={{ textTransform: "capitalize" }}>
                {e?.exercise?.name}
              </div>
            ))}
          </div>
        );
      })}
    </Section>
  );
}