import { Box } from '@mui/material';

export const GlowingBox = () => {
    return (
        <Box
            sx={{
                width: '1000px', // Set width to 1000px
                height: 'auto', // Adjust height to fit the video
                marginLeft: '20%',
                padding: 2,
                boxShadow: '10px 10px 10px 10px lightblue',
                animation: 'glow 3s infinite',
                '@keyframes glow': {
                    '0%': {
                        boxShadow: '0 0 20px 5px #009688',
                    },
                    '25%': {
                        boxShadow: '0 0 25px 7px #009688',
                    },
                    '50%': {
                        boxShadow: '0 0 40px 10px #009688',
                    },
                    '75%': {
                        boxShadow: '0 0 25px 7px #009688',
                    },
                    '100%': {
                        boxShadow: '0 0 20px 5px #009688',
                    },
                    
                },
            }}
        >
            <video
                width="1000" // Set video width to 1000px
                muted
                autoPlay
                loop
                src="/WhatsApp Video 2024-10-06 at 00.28.01_0cae033a.mp4"
                alt="Loading"
            />
        </Box>
    );
};
