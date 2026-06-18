import { Box, Typography, Button, Container, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export default function HomePage() {
    return (
        <Box>
            {/* Hero Section */}
            <Box sx={{
                position: 'relative',
                height: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                overflow: 'hidden',
                borderRadius: '0 0 50px 50px',
                background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url("/C:/Users/Aditi/.gemini/antigravity/brain/f2faf5d4-6c6f-4043-bdc9-7db188da5e41/sport_store_hero_1781787911296.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <Container maxWidth="lg" sx={{ textAlign: 'center', zIndex: 1 }}>
                    <Typography variant="h1" sx={{ 
                        fontWeight: 800, 
                        fontSize: { xs: '3rem', md: '5rem' },
                        mb: 2,
                        textShadow: '2px 2px 10px rgba(0,0,0,0.5)'
                    }}>
                        UNLEASH YOUR <span style={{ color: '#ff4081' }}>GAME</span>
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 4, maxWidth: '700px', mx: 'auto', opacity: 0.9 }}>
                        Experience the next generation of sports equipment. Built for champions, designed for you.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                        <Button 
                            component={Link} 
                            to="/store" 
                            variant="contained" 
                            size="large"
                            sx={{ 
                                bgcolor: '#ff4081', 
                                px: 4, 
                                py: 1.5, 
                                borderRadius: '30px',
                                fontSize: '1.1rem',
                                '&:hover': { bgcolor: '#f50057' }
                            }}
                        >
                            Shop Now
                        </Button>
                        <Button 
                            component={Link} 
                            to="/contact" 
                            variant="outlined" 
                            size="large"
                            sx={{ 
                                color: 'white', 
                                borderColor: 'white',
                                px: 4, 
                                py: 1.5, 
                                borderRadius: '30px',
                                fontSize: '1.1rem',
                                '&:hover': { borderColor: '#ff4081', color: '#ff4081' }
                            }}
                        >
                            Contact Us
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ mt: -8, position: 'relative', pb: 10 }}>
                <Grid container spacing={4}>
                    {[
                        { title: 'Premium Quality', icon: <SportsSoccerIcon color="primary" sx={{ fontSize: 40 }} />, text: 'Curated selection of world-class brands.' },
                        { title: 'Fast Delivery', icon: <ShoppingBagIcon color="secondary" sx={{ fontSize: 40 }} />, text: 'Doorstep delivery within 24-48 hours.' },
                        { title: 'Performance Lab', icon: <TrendingUpIcon sx={{ color: '#4caf50', fontSize: 40 }} />, text: 'Data-driven gear recommendations.' }
                    ].map((feature, i) => (
                        <Grid item xs={12} md={4} key={i}>
                            <Paper elevation={10} sx={{ 
                                p: 4, 
                                textAlign: 'center', 
                                borderRadius: '20px',
                                transition: 'transform 0.3s ease',
                                '&:hover': { transform: 'translateY(-10px)' }
                            }}>
                                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{feature.title}</Typography>
                                <Typography variant="body2" color="text.secondary">{feature.text}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}