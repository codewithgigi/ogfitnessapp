import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function MultiSelect({ data, handleSelected }) {
  const [grouped, setGrouped] = useState();

  function groupBy() {
    const byMuscle = (data ?? []).reduce((acc, obj) => {
      if (!acc[obj?.muscles]) acc[obj?.muscles] = [];
      acc[obj?.muscles].push(obj);
      return acc;
    }, {});
    setGrouped(byMuscle);
  }
  useEffect(() => {
    groupBy();
  }, []);

  return (
    <Stack spacing={3} sx={{ width: "90%" }}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={data}
        // options={data.sort((a, b) => -b.bodypart.localeCompare(a.bodypart))}
        // groupBy={(option) => (
        //   <div style={{ color: "blue" }}>{option.bodypart.toUpperCase()}</div>
        // )}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => {
          handleSelected(newValue);
        }}
        renderInput={(params) => {
          console.log("params", params);
          return (
            <TextField
              {...params}
              variant="standard"
              label="Add Exercises"
              placeholder="Exercises"
            />
          );
        }}
      />
    </Stack>
  );
}
