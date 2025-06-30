import * as React from 'react';
import { Box, TextField } from "@mui/material";
import { useEffect } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import config from '@/tailwind.config';

export default function ThreadTitle({ input, setInput, saveTitleAs }: { input: string; setInput: (value: string) => void; saveTitleAs: string }) {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInput(value);
  };

  // Load from localStorage on mount
  useEffect(() => {
    const savedTitle = localStorage.getItem(saveTitleAs);
    if (savedTitle) setInput(savedTitle);
  }, []);

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(saveTitleAs, input);
  }, [input]);

  const fullConfig = resolveConfig(config);
  const textFieldLabelColor = fullConfig.theme.colors.background;
  // const textFieldLabelColor = '#CCCCCC'


  return (
    <Box className="" sx={{ width: "400px", position: "relative" }}>
      <TextField
        fullWidth
        label="Topic"
        variant="filled"
        value={input}
        onChange={handleChange}
        autoComplete="off"
        sx={{
          input: {
            color: textFieldLabelColor, // input text
            fontFamily: '"Times New Roman", Times, serif',
          },
          '& .MuiInputLabel-root': {
            color: textFieldLabelColor, // default label color
            fontFamily: '"Times New Roman", Times, serif',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: textFieldLabelColor, // focused/shrunk label color
            fontFamily: '"Times New Roman", Times, serif',
          },
          '& .MuiInputLabel-root.MuiFormLabel-filled': {
            color: textFieldLabelColor, // when input has text
            fontFamily: '"Times New Roman", Times, serif',
          },
          '& .MuiFilledInput-underline:before': {
            borderBottomColor: textFieldLabelColor, // underline when not focused
            fontFamily: '"Times New Roman", Times, serif',
          },
          '& .MuiFilledInput-root:hover:not(.Mui-disabled):before': {
            borderBottomColor: textFieldLabelColor, // underline on hover (unfocused)
            fontFamily: '"Times New Roman", Times, serif',
          },
          '& .MuiFilledInput-root:after': {
            borderBottomColor: textFieldLabelColor, // underline when focused
            fontFamily: '"Times New Roman", Times, serif',
          },
        }}
      />
    </Box>
  );
}
