import {
  Divider,
  IconButton,
  ModalProps,
  Paper,
  Typography,
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import React, { ReactElement } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from './use-styles';

interface Props extends Omit<ModalProps, 'onClose' | 'className'> {
  onClose:
    | ((
        // eslint-disable-next-line @typescript-eslint/ban-types
        event: {},
        reason: 'backdropClick' | 'escapeKeyDown' | 'closedByButton'
      ) => void)
    | undefined;
  title?: string;
}

const CustomModal = (props: Props): ReactElement => {
  const { onClose, open, children, title } = props;
  const classes = useStyles();

  return (
    <Modal
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      className={classes.modal}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      closeAfterTransition
    >
      <Fade in={open}>
        <Paper>
          {!!onClose && (
            <>
              <div className={classes.header}>
                <Typography className={classes.title} variant="h6">
                  {title}
                </Typography>
                <IconButton
                  className={classes.closeButton}
                  size="small"
                  onClick={() => onClose({}, 'closedByButton')}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <Divider />
            </>
          )}
          <div className={classes.content}>{children}</div>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
