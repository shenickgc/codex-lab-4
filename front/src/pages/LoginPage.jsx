import { Alert, Button, Stack, TextField, Typography } from '@mui/material';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthShell } from '../components/AuthShell';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const destination = location.state?.from?.pathname ?? '/users';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(destination, { replace: true });
    }
  }, [destination, isAuthenticated, navigate]);

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(form);
      navigate(destination, { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message ?? 'No se pudo iniciar sesion');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      badge="LOGIN"
      title="ACCESS NODE"
      subtitle="Entra al modulo administrativo y gestiona usuarios desde un panel retro con rutas protegidas."
      asideTitle="AUTH CHECKPOINT"
      asideBody="Cada sesion usa token JWT. Si el token no existe o expira, el acceso vuelve al login."
    >
      <Stack spacing={3}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <LockRoundedIcon color="primary" />
          <Typography variant="body1">Inicio de sesion</Typography>
        </Stack>

        {error ? <Alert severity="error">{error}</Alert> : null}

        <Stack component="form" spacing={2} onSubmit={handleSubmit}>
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
            required
            fullWidth
          />
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Entrar
          </Button>
        </Stack>

        <Typography color="text.secondary">
          No tienes cuenta? <BoxLink to="/register">Crear registro</BoxLink>
        </Typography>
      </Stack>
    </AuthShell>
  );
}

function BoxLink({ to, children }) {
  return (
    <Typography
      component={RouterLink}
      to={to}
      sx={{
        display: 'inline-block',
        color: 'secondary.main',
        fontFamily: '"Press Start 2P", cursive',
        fontSize: '0.72rem'
      }}
    >
      {children}
    </Typography>
  );
}
