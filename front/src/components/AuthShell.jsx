import { Box, Chip, Paper, Stack, Typography } from '@mui/material';

export function AuthShell({ badge, title, subtitle, children, asideTitle, asideBody }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        px: { xs: 2, md: 4 },
        py: { xs: 2.5, md: 4 },
        display: 'grid',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1240,
          mx: 'auto',
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', lg: '340px minmax(0, 1fr)' }
        }}
      >
        <Paper sx={{ p: 3 }}>
          <Stack spacing={3}>
            <Stack spacing={2}>
              <Chip
                label={badge}
                sx={{
                  alignSelf: 'flex-start',
                  bgcolor: 'secondary.main',
                  color: '#120f23'
                }}
              />
              <Typography variant="h6">SYSTEM PANEL</Typography>
            </Stack>

            <Box
              sx={{
                border: '3px dashed rgba(255,255,255,0.18)',
                p: 2,
                bgcolor: 'rgba(18,15,35,0.45)'
              }}
            >
              <Typography variant="body2" color="primary.main">
                {asideTitle}
              </Typography>
              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                {asideBody}
              </Typography>
            </Box>

            <Box
              sx={{
                p: 2,
                border: '3px solid rgba(255,255,255,0.12)',
                bgcolor: 'rgba(255,255,255,0.02)'
              }}
            >
              <Typography variant="body2" color="secondary.main">
                STATUS
              </Typography>
              <Typography sx={{ mt: 1.5 }}>
                JWT active
              </Typography>
              <Typography color="text.secondary">Protected admin routes</Typography>
              <Typography sx={{ mt: 1.25 }}>CRUD users online</Typography>
            </Box>
          </Stack>
        </Paper>

        <Paper sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Stack spacing={3}>
            <Stack spacing={1.5}>
              <Typography variant="h4">{title}</Typography>
              <Typography color="text.secondary">{subtitle}</Typography>
            </Stack>

            {children}
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}
