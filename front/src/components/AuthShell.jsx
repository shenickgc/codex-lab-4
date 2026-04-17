import { Avatar, Box, Chip, Paper, Stack, Typography } from '@mui/material';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';

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
          maxWidth: 1180,
          mx: 'auto',
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', lg: '420px minmax(0, 1fr)' }
        }}
      >
        <Paper
          sx={{
            p: 3,
            background:
              'linear-gradient(180deg, rgba(24,119,242,0.08) 0%, rgba(255,255,255,1) 60%)'
          }}
        >
          <Stack spacing={3}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: 'primary.main'
                }}
              >
                <GroupsRoundedIcon />
              </Avatar>
              <Stack spacing={0.5}>
                <Chip label={badge} color="primary" sx={{ alignSelf: 'flex-start' }} />
                <Typography variant="h6">Meta-style admin access</Typography>
              </Stack>
            </Stack>

            <Box
              sx={{
                p: 2.5,
                borderRadius: 5,
                bgcolor: '#f7fafe',
                border: '1px solid rgba(24,119,242,0.12)'
              }}
            >
              <Typography variant="h6" sx={{ mb: 1.25 }}>
                Overview
              </Typography>
              <Typography color="text.secondary">{asideTitle}</Typography>
            </Box>

            <Box
              sx={{
                p: 2.5,
                borderRadius: 5,
                bgcolor: '#ffffff',
                border: '1px solid rgba(28,30,33,0.08)'
              }}
            >
              <Typography sx={{ lineHeight: 1.7 }}>{asideBody}</Typography>
            </Box>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label="JWT session" sx={{ bgcolor: 'rgba(24,119,242,0.1)', color: 'primary.main' }} />
              <Chip label="Protected routes" sx={{ bgcolor: 'rgba(49,162,76,0.12)', color: 'success.main' }} />
              <Chip label="Users CRUD" sx={{ bgcolor: 'rgba(225,48,108,0.1)', color: 'secondary.main' }} />
            </Stack>
          </Stack>
        </Paper>

        <Paper sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Stack spacing={3}>
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
