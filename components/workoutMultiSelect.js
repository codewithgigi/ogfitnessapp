import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function WorkoutMultiSelect({ data, handleSelected }) {
  return (
    <Stack spacing={3} sx={{ width: "90%" }}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={data}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => {
          handleSelected(newValue);
        }}
        renderInput={(params) => {
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
