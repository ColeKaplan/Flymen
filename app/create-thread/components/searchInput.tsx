import * as React from 'react';
import { Box, List, ListItem, ListItemButton, TextField } from "@mui/material";
import { useEffect, useState } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import config from '@/tailwind.config';



export default function SearchInput({ suggestions, input, setInput }: { suggestions: string[], input: string; setInput: (value: string) => void }) {

  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInput(value);

    const filtered = suggestions.filter((word) =>
      word.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(value ? filtered : []);
  };

  const handleSelect = (word: string) => {
    setInput(word);
    setFilteredSuggestions([]);
  };

  // Load from localStorage on mount
  useEffect(() => {
    const savedFriend = localStorage.getItem('friendRecipient');
    if (savedFriend) setInput(savedFriend);
  }, []);

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('friendRecipient', input);
  }, [input]);

  const fullConfig = resolveConfig(config);
  const textFieldLabelColor = fullConfig.theme.colors.background;

  return (
    <Box className="" sx={{ width: "200px", position: "relative" }}>
      <TextField
        fullWidth
        label="Recipient"
        variant="filled"
        value={input}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 100)}
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
      {filteredSuggestions.length > 0 && isFocused && (
        <List className='bg-background text-accent1'
          sx={{
            position: "absolute",
            zIndex: 1,
            border: "1px solid #ccc",
            borderRadius: "4px",
            maxHeight: "200px",
            overflowY: "auto",
            width: "100%",
            mt: 0.5,
          }}
        >
          {filteredSuggestions.map((word) => (
            <ListItem key={word} disablePadding className=''>
              <ListItemButton onClick={() => handleSelect(word)}>
                {word}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
