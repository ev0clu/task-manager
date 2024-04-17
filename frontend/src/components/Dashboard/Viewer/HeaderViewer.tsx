import { useState } from 'react';
import {
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { TWorkspace } from '../../../types/workspace.type';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useMutationWorkspaceUpdate from '../../../hooks/useMutationWorkspaceUpdate';
import useMutationWorkspaceDelete from '../../../hooks/useMutationWorkspaceDelete';

const formSchema = z.object({
  workspace: z.string().min(1, 'Workspace is required').trim()
});

type formType = z.infer<typeof formSchema>;

type HeaderViewerProps = {
  selectedWorkspace: TWorkspace | undefined;
  handleWorkspaceClick: (id: string) => void;
};

const HeaderViewer = ({
  selectedWorkspace,
  handleWorkspaceClick
}: HeaderViewerProps) => {
  const [onFocused, setOnFocused] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workspace: selectedWorkspace?.title
    },
    values: {
      workspace: `${selectedWorkspace?.title}`
    }
  });

  const updateMutation = useMutationWorkspaceUpdate({
    selectedWorkspace
  });

  const deleteMutation = useMutationWorkspaceDelete({
    selectedWorkspace,
    handleWorkspaceClick
  });

  const onSubmit = (data: formType) => {
    updateMutation.mutate(data);
  };

  return (
    <Stack direction={'row'} gap={2} alignItems={'center'}>
      {selectedWorkspace === undefined ? (
        <>
          <DashboardIcon />
          <Typography variant="h5">Dashboard</Typography>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            direction={'row'}
            spacing={1}
            alignItems={'center'}
            onMouseEnter={() => setOnFocused(true)}
            onMouseLeave={() => setOnFocused(false)}
          >
            <ApartmentIcon />
            <FormControl
              sx={{ m: 1, width: 'auto' }}
              id="outlined-basic"
              variant="outlined"
            >
              <Controller
                name="workspace"
                control={control}
                render={({ field }) => (
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    sx={{
                      '& fieldset': {
                        border: 'none'
                      }
                    }}
                    {...field}
                  />
                )}
              />
              <FormHelperText
                id="workspace-error-text"
                error={
                  errors.workspace?.message !== '' ? true : false
                }
              >
                {errors.workspace?.message}
              </FormHelperText>
            </FormControl>
            {onFocused && (
              <>
                <IconButton
                  type="submit"
                  disabled={
                    updateMutation.isPending ||
                    deleteMutation.isPending
                  }
                >
                  {updateMutation.isPending ||
                  deleteMutation.isPending ? (
                    <CircularProgress />
                  ) : (
                    <SaveIcon />
                  )}
                </IconButton>
                <IconButton
                  disabled={
                    updateMutation.isPending ||
                    deleteMutation.isPending
                  }
                  onClick={() => {
                    deleteMutation.mutate();
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )}

            {(updateMutation.error || deleteMutation.error) && (
              <FormHelperText
                error={
                  updateMutation.isError || deleteMutation.isError
                }
              >
                {updateMutation.error!.message ||
                  deleteMutation.error!.message}
              </FormHelperText>
            )}
          </Stack>
        </form>
      )}
    </Stack>
  );
};

export default HeaderViewer;
