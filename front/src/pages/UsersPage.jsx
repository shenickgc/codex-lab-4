import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { UserDialog } from '../components/UserDialog';
import { useAuth } from '../context/AuthContext';
import {
  createUserRequest,
  deleteUserRequest,
  listUsersRequest,
  updateUserRequest
} from '../services/api';

function buildStats(users) {
  const providers = users.filter((item) => item.userType === 'provider').length;
  const clients = users.filter((item) => item.userType === 'client').length;
  const active = users.filter((item) => item.isActive).length;
  const total = users.length || 1;

  return [
    {
      label: 'Pokedex Users',
      value: users.length,
      progress: Math.min(100, (users.length / 12) * 100),
      color: '#e53935'
    },
    {
      label: 'Active Trainers',
      value: active,
      progress: (active / total) * 100,
      color: '#43a047'
    },
    {
      label: 'Providers',
      value: providers,
      progress: (providers / total) * 100,
      color: '#1e88e5'
    },
    {
      label: 'Clients',
      value: clients,
      progress: (clients / total) * 100,
      color: '#f9a825'
    }
  ];
}

export function UsersPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  const loadUsers = async () => {
    setError('');
    setIsLoading(true);

    try {
      const data = await listUsersRequest();
      setUsers(data);
    } catch (requestError) {
      if (requestError.response?.status === 401) {
        logout();
        navigate('/login', { replace: true });
        return;
      }

      setError(requestError.response?.data?.message ?? 'Could not load users');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const openCreateDialog = () => {
    setSelectedUser(null);
    setDialogOpen(true);
  };

  const openEditDialog = (targetUser) => {
    setSelectedUser(targetUser);
    setDialogOpen(true);
  };

  const handleSubmit = async (payload) => {
    setIsSaving(true);
    setError('');

    try {
      if (selectedUser) {
        const updated = await updateUserRequest(selectedUser.id, payload);
        setUsers((current) => current.map((item) => (item.id === updated.id ? updated : item)));
      } else {
        const created = await createUserRequest(payload);
        setUsers((current) => [created, ...current]);
      }

      setDialogOpen(false);
      setSelectedUser(null);
    } catch (requestError) {
      setError(requestError.response?.data?.message ?? 'Could not save user');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!userToDelete) {
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      await deleteUserRequest(userToDelete.id);
      setUsers((current) => current.filter((item) => item.id !== userToDelete.id));
      setUserToDelete(null);
    } catch (requestError) {
      setError(requestError.response?.data?.message ?? 'Could not delete user');
    } finally {
      setIsSaving(false);
    }
  };

  const stats = buildStats(users);

  return (
    <Box sx={{ minHeight: '100vh', px: { xs: 2, md: 4 }, py: { xs: 3, md: 4 } }}>
      <Stack spacing={3} sx={{ maxWidth: 1320, mx: 'auto' }}>
        <Paper
          sx={{
            p: { xs: 2.5, md: 3 },
            background:
              'linear-gradient(180deg, rgba(229,57,53,0.14) 0%, rgba(255,253,247,1) 36%)'
          }}
        >
          <Stack spacing={3}>
            <Stack
              direction={{ xs: 'column', lg: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', lg: 'center' }}
              spacing={2}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  sx={{
                    width: 62,
                    height: 62,
                    bgcolor: 'primary.main',
                    color: '#ffffff',
                    border: '3px solid #263238'
                  }}
                >
                  <ShieldRoundedIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4">Trainer Admin</Typography>
                  <Typography color="text.secondary">
                    Control users, sessions and trainer roles from one protected command screen.
                  </Typography>
                </Box>
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
                <Chip
                  label={user?.email ?? 'Authenticated'}
                  sx={{ bgcolor: 'secondary.main', color: '#ffffff' }}
                />
                <Button startIcon={<RefreshRoundedIcon />} onClick={loadUsers} disabled={isLoading}>
                  Refresh
                </Button>
                <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={openCreateDialog}>
                  Add User
                </Button>
                <Button
                  color="secondary"
                  variant="outlined"
                  startIcon={<LogoutRoundedIcon />}
                  onClick={() => {
                    logout();
                    navigate('/login', { replace: true });
                  }}
                >
                  Logout
                </Button>
              </Stack>
            </Stack>

            <Box
              sx={{
                display: 'grid',
                gap: 2,
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }
              }}
            >
              {stats.map((item) => (
                <Paper
                  key={item.label}
                  sx={{
                    p: 2.25,
                    borderColor: item.color,
                    backgroundColor: '#ffffff'
                  }}
                >
                  <Stack spacing={1.25}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6" sx={{ fontSize: '0.95rem' }}>
                        {item.label}
                      </Typography>
                      <Avatar
                        sx={{
                          width: 34,
                          height: 34,
                          bgcolor: item.color,
                          color: '#ffffff'
                        }}
                      >
                        <PeopleAltRoundedIcon sx={{ fontSize: 18 }} />
                      </Avatar>
                    </Stack>
                    <Typography variant="h4">{item.value}</Typography>
                    <LinearProgress
                      variant="determinate"
                      value={item.progress}
                      sx={{
                        height: 10,
                        borderRadius: 999,
                        bgcolor: 'rgba(33,53,71,0.12)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: item.color
                        }
                      }}
                    />
                  </Stack>
                </Paper>
              ))}
            </Box>
          </Stack>
        </Paper>

        {error ? <Alert severity="error">{error}</Alert> : null}

        <Paper sx={{ p: { xs: 1.5, md: 2.25 } }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Trainer</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar
                          sx={{
                            bgcolor: item.userType === 'provider' ? '#1e88e5' : '#e53935',
                            color: '#ffffff'
                          }}
                        >
                          <PeopleAltRoundedIcon />
                        </Avatar>
                        <Box>
                          <Typography fontWeight={700}>{item.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            ID: {item.id.slice(0, 8)}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography>{item.email}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.phone || 'No phone registered'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={item.userType === 'provider' ? 'Provider' : 'Client'}
                        sx={{
                          bgcolor: item.userType === 'provider' ? 'rgba(30,136,229,0.14)' : 'rgba(229,57,53,0.14)',
                          color: item.userType === 'provider' ? '#1e88e5' : '#e53935'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={item.isActive ? 'Active' : 'Inactive'}
                        sx={{
                          bgcolor: item.isActive ? 'rgba(67,160,71,0.14)' : 'rgba(85,98,115,0.14)',
                          color: item.isActive ? '#2e7d32' : '#556273'
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => openEditDialog(item)} sx={{ color: 'secondary.main' }}>
                        <EditRoundedIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => setUserToDelete(item)}>
                        <DeleteOutlineRoundedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}

                {!isLoading && users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Typography py={5} textAlign="center" color="text.secondary">
                        No users registered yet.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : null}

                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Typography py={5} textAlign="center" color="text.secondary">
                        Loading users...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Stack>

      <UserDialog
        open={dialogOpen}
        user={selectedUser}
        onClose={() => {
          if (!isSaving) {
            setDialogOpen(false);
            setSelectedUser(null);
          }
        }}
        onSubmit={handleSubmit}
        isSaving={isSaving}
      />

      <ConfirmDialog
        open={Boolean(userToDelete)}
        title="Release trainer"
        description={`This action will permanently delete ${userToDelete?.name ?? 'this user'}.`}
        confirmText="Delete"
        onClose={() => {
          if (!isSaving) {
            setUserToDelete(null);
          }
        }}
        onConfirm={handleDelete}
        isLoading={isSaving}
      />
    </Box>
  );
}
