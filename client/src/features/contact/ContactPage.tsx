import { Box, Button, Container, Grid, Paper, TextField, Typography, Avatar } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

export default function ContactPage() {
    return (
        <Box sx={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #1a237e 0%, #ad1457 100%)',
            py: { xs: 5, md: 10 },
            display: 'flex',
            alignItems: 'center'
        }}>
            <Container maxWidth="lg">
                <Grid container spacing={4} alignItems="center">
                    {/* Contact Info */}
                    <Grid item xs={12} md={5}>
                        <Typography variant="h2" sx={{ color: 'white', fontWeight: 800, mb: 2 }}>
                            GET IN TOUCH
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', mb: 4 }}>
                            Have a question about a product or order? Our team is active 24/7.
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            {[
                                { icon: <EmailIcon />, label: 'Email Us', value: 'support@sportscenter.com' },
                                { icon: <PhoneIcon />, label: 'Call Us', value: '+91 99999 00000' },
                                { icon: <LocationOnIcon />, label: 'Visit Us', value: '123 Sport Street, Delhi, India' }
                            ].map((item, i) => (
                                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
                                        {item.icon}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
                                            {item.label}
                                        </Typography>
                                        <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                                            {item.value}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Grid>

                    {/* Contact Form */}
                    <Grid item xs={12} md={7}>
                        <Paper elevation={20} sx={{ 
                            p: { xs: 3, md: 6 }, 
                            borderRadius: '30px',
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.3)'
                        }}>
                            <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, color: '#1a237e' }}>
                                Send Message
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Full Name" variant="outlined" sx={{ borderRadius: '15px' }} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Email Address" variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Subject" variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField 
                                        fullWidth 
                                        label="Your Message" 
                                        multiline 
                                        rows={4} 
                                        variant="outlined" 
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button 
                                        fullWidth 
                                        variant="contained" 
                                        size="large"
                                        sx={{ 
                                            mt: 2, 
                                            py: 2, 
                                            borderRadius: '15px',
                                            bgcolor: '#1a237e',
                                            fontWeight: 700,
                                            '&:hover': { bgcolor: '#ad1457' }
                                        }}
                                    >
                                        Submit Request
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}