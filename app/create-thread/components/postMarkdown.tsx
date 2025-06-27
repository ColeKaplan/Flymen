import * as React from 'react';
import { Box, Tabs, Tab, TextField, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';


export default function PostMarkdown({ content , setContent }: {content: string; setContent: (value: string) => void }) {
  const [tab, setTab] = useState(0); // 0 = Text, 1 = Markdown

  // Load from localStorage on mount
  useEffect(() => {
    const savedMarkdown = localStorage.getItem('markdownContent');
    if (savedMarkdown) setContent(savedMarkdown);
  }, []);

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('markdownContent', content);
  }, [content]);

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
          className='bg-[#faf4e3]'
          sx={{
            '& .MuiInputBase-root': {
              height: '310px',
            },
          }}
        />
      ) : (
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            minHeight: '310px',
            maxHeight: '310px',
            backgroundColor: '#faf4e3',
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word',
            overflow: 'auto',
          }}
        >
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => {
                const href = props.href || '';
                const correctedHref = href.startsWith('http') ? href : `https://${href}`;
                return <a {...props} href={correctedHref} target="_blank" rel="noopener noreferrer" />;
              },
            }}>{content || "*Type something in markdown to see what your post will look like*"}
          </ReactMarkdown>
        </Paper>
      )}
    </Box>
  );
}
