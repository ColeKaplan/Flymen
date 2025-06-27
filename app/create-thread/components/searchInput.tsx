import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { Box, TextField, List, ListItem, ListItemButton } from "@mui/material";
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

type SearchInputProps = {
  suggestions: string[];
};

export default function SearchInput({ suggestions }: SearchInputProps) {

  const [input, setInput] = useState("");
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

  return (
    <Box className="" sx={{ width: "200px", position: "relative" }}>
      <TextField
        fullWidth
        label="Recipient"
        variant="standard"
        value={input}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 100)}
        autoComplete="off"
      />
      {filteredSuggestions.length > 0 && isFocused &&(
        <List
          sx={{
            position: "absolute",
            zIndex: 1,
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            maxHeight: "200px",
            overflowY: "auto",
            width: "100%",
            mt: 0.5,
          }}
        >
          {filteredSuggestions.map((word) => (
            <ListItem key={word} disablePadding>
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
