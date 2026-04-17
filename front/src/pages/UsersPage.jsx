import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
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
        color: '#fff'
      }}
    >
      <Typography sx={{ fontWeight: 700 }}>{title}</Typography>
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <Box sx={{ width: 14, height: 14, bgcolor: '#c0c0c0', border: '1px solid #000' }} />
        <Box sx={{ width: 14, height: 14, bgcolor: '#c0c0c0', border: '1px solid #000' }} />
        <Box sx={{ width: 14, height: 14, bgcolor: '#c0c0c0', border: '1px solid #000' }} />
      </Box>
    </Box>
  );
}

function StatCard({ label, value }) {
  return (
    <Paper>
      <WindowTitleBar title={label.toLowerCase()} />
      <Stack spacing={1} sx={{ p: 1.5 }}>
        <Typography variant="h4">{value}</Typography>
        <Box sx={{ height: 10, bgcolor: '#fff', border: '1px solid #7f7f7f' }}>
          <Box sx={{ width: `${Math.min(100, value * 10)}%`, height: '100%', bgcolor: '#000080' }} />
        </Box>
      </Stack>
    </Paper>
  );
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

  const total = users.length;
  const active = users.filter((item) => item.isActive).length;
  const providers = users.filter((item) => item.userType === 'provider').length;
  const clients = users.filter((item) => item.userType === 'client').length;

  return (
    <Box sx={{ minHeight: '100vh', px: { xs: 2, md: 3 }, py: { xs: 2, md: 3 } }}>
      <Stack spacing={2} sx={{ maxWidth: 1280, mx: 'auto' }}>
        <Paper>
          <WindowTitleBar title="user-manager.exe" />
          <Stack spacing={2} sx={{ p: 2 }}>
            <Stack
              direction={{ xs: 'column', lg: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', lg: 'center' }}
              spacing={2}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar sx={{ bgcolor: '#000080', color: '#fff' }}>
                  <ShieldRoundedIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4">User Manager</Typography>
                  <Typography color="text.secondary">
                    Legacy control panel for protected user administration.
                  </Typography>
                </Box>
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                <Chip label={user?.email ?? 'Authenticated'} />
                <Button startIcon={<RefreshRoundedIcon />} onClick={loadUsers} disabled={isLoading}>
                  Refresh
                </Button>
                <Button startIcon={<AddRoundedIcon />} onClick={openCreateDialog}>
                  New User
                </Button>
                <Button
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
              <StatCard label="Total" value={total} />
              <StatCard label="Active" value={active} />
              <StatCard label="Providers" value={providers} />
              <StatCard label="Clients" value={clients} />
            </Box>
          </Stack>
        </Paper>

        {error ? <Alert severity="error">{error}</Alert> : null}

        <Paper>
          <WindowTitleBar title="records.dat" />
          <Box sx={{ p: 1.5 }}>
            <TableContainer sx={{ bgcolor: '#fff', border: '1px solid #7f7f7f' }}>
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
                              width: 32,
                              height: 32,
                              bgcolor: item.userType === 'provider' ? '#008080' : '#000080',
                              color: '#fff'
                            }}
                          >
                            <PeopleAltRoundedIcon sx={{ fontSize: 18 }} />
                          </Avatar>
                          <Box>
                            <Typography fontWeight={600}>{item.name}</Typography>
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
                        <Chip size="small" label={item.userType === 'provider' ? 'Provider' : 'Client'} />
                      </TableCell>
                      <TableCell>
                        <Chip size="small" label={item.isActive ? 'Active' : 'Inactive'} />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => openEditDialog(item)}>
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
          </Box>
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
