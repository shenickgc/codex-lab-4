import { Box, Chip, Paper, Stack, Typography } from '@mui/material';

export function AuthShell({ badge, title, subtitle, children, asideTitle, asideBody }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 4 },
        display: 'grid',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1220,
          mx: 'auto',
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', lg: '380px minmax(0, 1fr)' }
        }}
      >
        <Paper
          sx={{
            p: 3,
            position: 'relative',
            overflow: 'hidden',
            background:
              'linear-gradient(180deg, rgba(229,57,53,0.12) 0%, rgba(255,253,247,1) 70%)'
          }}
        >
          <Stack spacing={3}>
            <Chip
              label={badge}
              sx={{
                alignSelf: 'flex-start',
                bgcolor: 'primary.main',
                color: '#ffffff'
              }}
            />

            <Box
              sx={{
                p: 2.5,
                borderRadius: 4,
                bgcolor: '#ffffff',
                border: '3px solid #263238'
              }}
            >
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                TRAINER LOG
              </Typography>
              <Typography color="text.secondary">{asideTitle}</Typography>
              <Typography sx={{ mt: 1.5 }}>{asideBody}</Typography>
            </Box>

            <Box
              sx={{
                p: 2.5,
                borderRadius: 4,
                background:
                  'linear-gradient(135deg, rgba(30,136,229,0.12) 0%, rgba(255,255,255,0.96) 100%)',
                border: '3px solid #263238'
              }}
            >
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                TEAM STATUS
              </Typography>
              <Stack spacing={1}>
                <Typography color="text.secondary">Auth state ready</Typography>
                <Typography color="text.secondary">Protected routes active</Typography>
                <Typography color="text.secondary">Users CRUD connected</Typography>
              </Stack>
            </Box>
          </Stack>
        </Paper>

        <Paper
          sx={{
            p: { xs: 2.5, md: 3.5 },
            background:
              'linear-gradient(180deg, rgba(30,136,229,0.08) 0%, rgba(255,253,247,1) 32%)'
          }}
        >
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
