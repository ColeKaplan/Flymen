import * as React from 'react';
import { Box, Tabs, Tab, TextField, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import resolveConfig from 'tailwindcss/resolveConfig';
import config from '@/tailwind.config';


export default function PostMarkdown({ content, setContent, saveContentAs }: { content: string; setContent: (value: string) => void; saveContentAs: string }) {
  const [tab, setTab] = useState(0); // 0 = Text, 1 = Markdown

  // Load from localStorage on mount
  useEffect(() => {
    const savedMarkdown = localStorage.getItem(saveContentAs);
    if (savedMarkdown) setContent(savedMarkdown);
  }, []);

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(saveContentAs, content);
  }, [content]);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const fullConfig = resolveConfig(config);
  const tabColor = fullConfig.theme.colors.background;
  const tabSelectedColor = fullConfig.theme.colors.background;

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={tab} onChange={handleChange} sx={{
        mb: 1,
        fontFamily: '"Times New Roman", Times, serif',
        textTransform: 'none',
        '& .MuiTab-root': {
          color: tabColor, // sets text color for all Tab labels
        },
        '& .Mui-selected': {
          color: tabSelectedColor, // color for the selected tab label
        },
        '& .MuiTabs-indicator': {
          backgroundColor: tabSelectedColor,  // underline color
        },
      }}>
        <Tab label="Markdown" sx={{
          fontFamily: '"Times New Roman", Times, serif',
          textTransform: 'none',
          fontSize: '1.2rem',
          '&:focus-visible': {
            color: tabColor,
          },
          '&.Mui-selected': {
            color: tabSelectedColor,
          },
        }} />
        <Tab label="Post Preview" sx={{
          fontFamily: '"Times New Roman", Times, serif',
          textTransform: 'none',
          fontSize: '1.2rem',
          '&:focus-visible': {
            color: tabColor,
          },
          '&.Mui-selected': {
            color: tabSelectedColor,
          },
        }} />
      </Tabs>

      {tab === 0 ? (
        <TextField
          multiline
          fullWidth
          minRows={14}
          maxRows={14}
          variant="outlined"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='bg-[#faf4e3]'
          sx={{
            '& .MuiInputBase-root': {
              height: '363px',
            },
          }}
        />
      ) : (
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            minHeight: '363px',
            maxHeight: '363px',
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
