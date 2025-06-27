import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { Box, TextField, List, ListItem, ListItemButton } from "@mui/material";
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

type SearchInputProps = {
  suggestions: string[];
};

export default function ThreadTitle({ suggestions }: SearchInputProps) {

  const [input, setInput] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInput(value);
  };

  const handleSelect = (word: string) => {
    setInput(word);
  };

  return (
    <Box className="" sx={{ width: "400px", position: "relative" }}>
      <TextField
        fullWidth
        label="Topic"
        variant="standard"
        value={input}
        onChange={handleChange}
        autoComplete="off"
      />
    </Box>
  );
}
