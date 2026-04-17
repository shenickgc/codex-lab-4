import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

export function ConfirmDialog({
  open,
  title,
  description,
  confirmText,
  onClose,
  onConfirm,
  isLoading
}) {
  return (
    <Dialog open={open} onClose={isLoading ? undefined : onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography color="text.secondary">{description}</Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} disabled={isLoading} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" disabled={isLoading}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
