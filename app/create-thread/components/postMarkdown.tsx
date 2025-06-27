import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { Box, Tabs, Tab, TextField, Paper } from '@mui/material';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { createClient } from '@/utils/supabase/client';


export default function PostMarkdown() {
  const [tab, setTab] = useState(0); // 0 = Text, 1 = Markdown
  const [content, setContent] = useState('');

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={tab} onChange={handleChange} sx={{ mb: 1 }}>
        <Tab label="Markdown" />
        <Tab label="Post Preview" />
      </Tabs>

      {tab === 0 ? (
        <TextField
          multiline
          fullWidth
          minRows={12}
          maxRows={12}
          variant="outlined"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      ) : (
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            minHeight: '300px',
            maxHeight: '300px',
            backgroundColor: '#f8f8f8',
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word',
            overflow: 'auto',
          }}
        >
          <ReactMarkdown>{content || "*Type something in markdown to see what your post will look like*"}</ReactMarkdown>
        </Paper>
      )}
    </Box>
  );
}
