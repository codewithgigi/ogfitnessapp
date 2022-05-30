import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { createPlan } from "../../src/graphql/mutations";
import { listPlans } from "../../src/graphql/queries";
export default function WorkoutPlans() {
  const [plans, setPlans] = useState();

  useEffect(() => {
    getPlans();
  }, []);

  async function getPlans() {
    try {
      const { data } = await API.graphql({
        query: listPlans,
        variables: { limit: 300 },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      const items = data?.listPlans?.items;
      setPlans(items);
    } catch (error) {
      console.warn("Error with api listWorkouts", error);
    }
  }
  return (
    <>
      <h1>Workout Plan List</h1>
      {(plans ?? []).map((x, index) => {
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
