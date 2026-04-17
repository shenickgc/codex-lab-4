import { Box, Chip, Paper, Stack, Typography } from '@mui/material';

function WindowTitleBar({ title }) {
  return (
    <Box
      sx={{
        px: 1.25,
        py: 0.75,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: 'primary.main',
        color: '#ffffff',
        fontWeight: 700
      }}
    >
      <Typography sx={{ fontSize: '0.95rem', fontWeight: 700 }}>{title}</Typography>
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <Box sx={{ width: 14, height: 14, bgcolor: '#c0c0c0', border: '1px solid #000' }} />
        <Box sx={{ width: 14, height: 14, bgcolor: '#c0c0c0', border: '1px solid #000' }} />
        <Box sx={{ width: 14, height: 14, bgcolor: '#c0c0c0', border: '1px solid #000' }} />
      </Box>
    </Box>
  );
}

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
          maxWidth: 1120,
          mx: 'auto',
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', lg: '320px minmax(0, 1fr)' }
        }}
      >
        <Paper>
          <WindowTitleBar title="system.exe" />
          <Stack spacing={2} sx={{ p: 2 }}>
            <Chip label={badge} sx={{ alignSelf: 'flex-start' }} />
            <Box sx={{ p: 1.5, bgcolor: '#ffffff', border: '1px solid #7f7f7f' }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Notice
              </Typography>
              <Typography color="text.secondary">{asideTitle}</Typography>
            </Box>
            <Box sx={{ p: 1.5, bgcolor: '#ffffff', border: '1px solid #7f7f7f' }}>
              <Typography>{asideBody}</Typography>
            </Box>
            <Box sx={{ p: 1.5, bgcolor: '#d4d0c8', border: '1px solid #7f7f7f' }}>
              <Typography variant="body2">status: auth online</Typography>
              <Typography variant="body2">routes: protected</Typography>
              <Typography variant="body2">module: users</Typography>
            </Box>
          </Stack>
        </Paper>

        <Paper>
          <WindowTitleBar title="auth-panel.exe" />
          <Stack spacing={2} sx={{ p: { xs: 2, md: 2.5 } }}>
            <Stack spacing={1}>
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
