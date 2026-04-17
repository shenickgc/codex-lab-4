import { Alert, Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthShell } from '../components/AuthShell';
import { useAuth } from '../context/AuthContext';

const initialForm = {
  name: '',
  email: '',
  password: '',
  phone: '',
  userType: 'client'
};

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/users', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await register(form);
      navigate('/users', { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message ?? 'No se pudo crear la cuenta');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      badge="REGISTER"
      title="NEW OPERATOR"
      subtitle="Crea una cuenta administrativa o de usuario para entrar directo al panel protegido."
      asideTitle="SETUP MODE"
      asideBody="El registro usa el endpoint real del backend y deja la sesion lista al terminar."
    >
      <Stack spacing={3}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <PersonAddAltRoundedIcon color="primary" />
          <Typography variant="body1">Registro</Typography>
        </Stack>

        {error ? <Alert severity="error">{error}</Alert> : null}

        <Stack component="form" spacing={2} onSubmit={handleSubmit}>
          <TextField label="Nombre" value={form.name} onChange={handleChange('name')} required fullWidth />
          <TextField
            label="Correo electronico"
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            required
            fullWidth
          />
          <TextField
            label="Contrasena"
            type="password"
            value={form.password}
            onChange={handleChange('password')}
            helperText="Minimo 6 caracteres"
            required
            fullWidth
          />
          <TextField label="Telefono" value={form.phone} onChange={handleChange('phone')} fullWidth />
          <TextField select label="Tipo de usuario" value={form.userType} onChange={handleChange('userType')} fullWidth>
            <MenuItem value="client">Client</MenuItem>
            <MenuItem value="provider">Provider</MenuItem>
          </TextField>

          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Crear cuenta
          </Button>
        </Stack>

        <Typography color="text.secondary">
          Ya tienes cuenta?{' '}
          <Typography
            component={RouterLink}
            to="/login"
            sx={{
              display: 'inline-block',
              color: 'secondary.main',
              fontFamily: '"Press Start 2P", cursive',
              fontSize: '0.72rem'
            }}
          >
            Iniciar sesion
          </Typography>
        </Typography>
      </Stack>
    </AuthShell>
  );
}
