import * as React from 'react';
import { Box, TextField } from "@mui/material";
import { useEffect } from 'react';

export default function ThreadTitle({ input , setInput }: {input: string; setInput: (value: string) => void }) {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInput(value);
  };

  // Load from localStorage on mount
  useEffect(() => {
    const savedTitle = localStorage.getItem('createThreadTitle');
    if (savedTitle) setInput(savedTitle);
  }, []);

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('createThreadTitle', input);
  }, [input]);

  return (
    <Box className="" sx={{ width: "400px", position: "relative" }}>
      <TextField
        fullWidth
        label="Topic"
        variant="filled"
        value={input}
        onChange={handleChange}
        autoComplete="off"
      />
    </Box>
  );
}
