import React from 'react';
import { Box ,Card, CardMedia, Typography, CardContent, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const MoviesItem = ({ title, releaseDate, posterUrl, id, description }) => {
  return (
    <div>
      <Box>
        <Card
          sx={{
            maxWidth: 280,
            height: 330,
            borderRadius: 5,
            ":hover": { boxShadow: "10px 10px 20px #ccc" },
            margin: "10px",
          }}
        >

          <CardMedia
            component="img"
            height="45%"
            6
            image={posterUrl || 'fallback-image-url.jpg'}
            alt={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {new Date(releaseDate).toDateString()}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button LinkComponent={Link} to={`/booking/${id}`} size="small" sx={{ margin: "auto", textAlign: "center", fontWeight: "bold" }}>Book</Button>

          </CardActions>
        </Card>
      </Box>
    </div>
  );
};
