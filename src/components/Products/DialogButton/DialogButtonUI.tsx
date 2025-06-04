import { IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

type ChildrenType = {
  share: boolean;
  saveClipboard: boolean;
  handleSaveToClipboard: () => void;
};

const DialogButtonUI = ({
  share,
  saveClipboard,
  handleSaveToClipboard,
}: ChildrenType) => {
  return (
    <IconButton onClick={handleSaveToClipboard} disabled={!share}>
      {saveClipboard ? (
        <CheckCircleRoundedIcon color="success" />
      ) : (
        <ContentCopyIcon />
      )}
    </IconButton>
  );
};

export default DialogButtonUI;