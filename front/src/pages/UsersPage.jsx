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
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
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
      label: 'Users',
      value: users.length,
      progress: Math.min(100, (users.length / 12) * 100),
      color: '#1877f2'
    },
    {
      label: 'Active',
      value: active,
      progress: (active / total) * 100,
      color: '#31a24c'
    },
    {
      label: 'Providers',
      value: providers,
      progress: (providers / total) * 100,
      color: '#8b5cf6'
    },
    {
      label: 'Clients',
      value: clients,
      progress: (clients / total) * 100,
      color: '#e1306c'
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
    <Box sx={{ minHeight: '100vh', px: { xs: 2, md: 3.5 }, py: { xs: 2.5, md: 3.5 } }}>
      <Stack spacing={3} sx={{ maxWidth: 1280, mx: 'auto' }}>
        <Paper
          sx={{
            p: { xs: 2.5, md: 3.5 },
            background:
              'linear-gradient(180deg, rgba(24,119,242,0.08) 0%, rgba(255,255,255,1) 50%)'
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
                    width: 58,
                    height: 58,
                    bgcolor: 'primary.main'
                  }}
                >
                  <VerifiedUserRoundedIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4">Meta Admin Workspace</Typography>
                  <Typography color="text.secondary">
                    Manage authenticated users, roles and account status from a social-product style dashboard.
                  </Typography>
                </Box>
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
                <Chip label={user?.email ?? 'Authenticated'} color="primary" />
                <Button startIcon={<RefreshRoundedIcon />} onClick={loadUsers} disabled={isLoading}>
                  Refresh
                </Button>
                <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={openCreateDialog}>
                  Add user
                </Button>
                <Button
                  color="inherit"
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
                <Paper key={item.label} sx={{ p: 2.25 }}>
                  <Stack spacing={1.25}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6" sx={{ fontSize: '1rem' }}>
                        {item.label}
                      </Typography>
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          bgcolor: item.color
                        }}
                      >
                        <GroupsRoundedIcon sx={{ fontSize: 18 }} />
                      </Avatar>
                    </Stack>
                    <Typography variant="h4">{item.value}</Typography>
                    <LinearProgress
                      variant="determinate"
                      value={item.progress}
                      sx={{
                        height: 9,
                        borderRadius: 999,
                        bgcolor: 'rgba(28,30,33,0.08)',
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
                  <TableCell>User</TableCell>
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
                            bgcolor: item.userType === 'provider' ? '#8b5cf6' : '#1877f2'
                          }}
                        >
                          <GroupsRoundedIcon />
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
                          bgcolor: item.userType === 'provider' ? 'rgba(139,92,246,0.12)' : 'rgba(24,119,242,0.12)',
                          color: item.userType === 'provider' ? '#8b5cf6' : '#1877f2'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={item.isActive ? 'Active' : 'Inactive'}
                        sx={{
                          bgcolor: item.isActive ? 'rgba(49,162,76,0.12)' : 'rgba(101,103,107,0.12)',
                          color: item.isActive ? '#31a24c' : '#65676b'
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => openEditDialog(item)} sx={{ color: 'primary.main' }}>
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
        title="Delete user"
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
