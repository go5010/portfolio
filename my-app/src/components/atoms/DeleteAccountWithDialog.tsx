"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteUser } from "firebase/auth";
import { auth } from "@/_firebase/firebaseConfig";
import { useRouter } from "next/navigation";

const DeleteAccountWithDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  return (
    <div className="text-sky-600 mt-4 text-center sm:text-sm xs:text-xs">
      <button onClick={handleDialogOpen}>
        アカウントを削除される場合はこちら
      </button>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"アカウントを削除しますか？"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            削除を行うと復元できません．
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            キャンセル
          </Button>
          <Button
            onClick={() => {
              handleDialogClose();
              deleteUser(auth.currentUser!)
                .then(() => {
                  alert("アカウントを削除しました．");
                  router.push("/");
                })
                .catch(() => {
                  alert("失敗しました．");
                });
            }}
            color="error"
          >
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteAccountWithDialog;
