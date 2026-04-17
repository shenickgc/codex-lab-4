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
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
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

  return [
    { label: 'TOTAL', value: users.length, tone: '#7cff6b' },
    { label: 'ACTIVE', value: active, tone: '#ffd84d' },
    { label: 'PROVIDER', value: providers, tone: '#72f1ff' },
    { label: 'CLIENT', value: clients, tone: '#ff9de1' }
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

      setError(requestError.response?.data?.message ?? 'No se pudieron cargar los usuarios');
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
      setError(requestError.response?.data?.message ?? 'No se pudo guardar el usuario');
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
      setError(requestError.response?.data?.message ?? 'No se pudo eliminar el usuario');
    } finally {
      setIsSaving(false);
    }
  };

  const stats = buildStats(users);

  return (
    <Box sx={{ minHeight: '100vh', px: { xs: 2, md: 3 }, py: { xs: 2, md: 3 } }}>
      <Stack spacing={3} sx={{ maxWidth: 1380, mx: 'auto' }}>
        <Paper sx={{ p: { xs: 2, md: 3 } }}>
          <Stack spacing={3}>
            <Stack
              direction={{ xs: 'column', xl: 'row' }}
              spacing={2}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', xl: 'center' }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  sx={{
                    width: 58,
                    height: 58,
                    bgcolor: 'primary.main',
                    color: '#120f23',
                    border: '3px solid #0f0b1f'
                  }}
                >
                  <ShieldRoundedIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4">USER ADMIN GRID</Typography>
                  <Typography color="text.secondary">
                    Panel administrativo para crear, editar y eliminar usuarios.
                  </Typography>
                </Box>
              </Stack>

              <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.25}>
                <Chip label={user?.email ?? 'Sesión activa'} sx={{ bgcolor: '#ffd84d', color: '#120f23' }} />
                <Button startIcon={<RefreshRoundedIcon />} onClick={loadUsers} disabled={isLoading}>
                  Refrescar
                </Button>
                <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={openCreateDialog}>
                  Nuevo
                </Button>
                <Button color="secondary" variant="outlined" startIcon={<LogoutRoundedIcon />} onClick={() => {
                  logout();
                  navigate('/login', { replace: true });
                }}>
                  Salir
                </Button>
              </Stack>
            </Stack>

            <Box
              sx={{
                display: 'grid',
                gap: 2,
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }
              }}
            >
              {stats.map((item) => (
                <Paper
                  key={item.label}
                  sx={{
                    p: 2,
                    bgcolor: 'rgba(18,15,35,0.5)',
                    borderColor: item.tone,
                    boxShadow: `8px 8px 0 ${item.tone}`
                  }}
                >
                  <Typography variant="body2" sx={{ color: item.tone }}>
                    {item.label}
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1.5 }}>
                    {item.value}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Stack>
        </Paper>

        {error ? <Alert severity="error">{error}</Alert> : null}

        <Paper sx={{ p: { xs: 1.5, md: 2 } }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Usuario</TableCell>
                  <TableCell>Contacto</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar
                          sx={{
                            bgcolor: '#2a2149',
                            color: 'primary.main',
                            border: '3px solid #0f0b1f'
                          }}
                        >
                          <PersonOutlineRoundedIcon />
                        </Avatar>
                        <Box>
                          <Typography>{item.name}</Typography>
                          <Typography color="text.secondary">ID {item.id.slice(0, 8)}</Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography>{item.email}</Typography>
                      <Typography color="text.secondary">{item.phone || 'Sin teléfono'}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={item.userType === 'provider' ? 'PROVIDER' : 'CLIENT'}
                        sx={{
                          bgcolor: item.userType === 'provider' ? '#72f1ff' : '#ff9de1',
                          color: '#120f23'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={item.isActive ? 'ACTIVE' : 'OFFLINE'}
                        sx={{
                          bgcolor: item.isActive ? '#7cff6b' : '#6d6690',
                          color: '#120f23'
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
                        No hay usuarios registrados todavía.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : null}

                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Typography py={5} textAlign="center" color="text.secondary">
                        Cargando usuarios...
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
        title="Eliminar usuario"
        description={`Esta acción eliminará a ${userToDelete?.name ?? 'este usuario'} de forma permanente.`}
        confirmText="Eliminar"
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
