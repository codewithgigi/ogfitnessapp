import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { createWorkout } from "../../src/graphql/mutations";
import { listWorkouts } from "../../src/graphql/queries";
export default function Workouts() {
  const [workouts, setWorkouts] = useState();

  useEffect(() => {
    getWorkoutList();
  }, []);

  async function getWorkoutList() {
    try {
      const { data } = await API.graphql({
        query: listWorkouts,
        variables: { limit: 300 },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      const items = data?.listWorkouts?.items;
      setWorkouts(items);
    } catch (error) {
      console.warn("Error with api listWorkouts", error);
    }
  }
  return (
    <>
      <h1>Workout List</h1>
      {(workouts ?? []).map((x, index) => {
        return (
          <div key={index} style={{ textTransform: "capitalize" }}>
            {x?.name}
            {x?.instructions}
          </div>
        );
      })}
    </>
  );
}
