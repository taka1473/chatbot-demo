import React, {useState, useEffect, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextInput from './TextInput'

const FormDialog = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [description, setDescription] = useState("")

  const inputName = useCallback((e) => {
    setName( e.target.value )
  })
  
  const inputEmail = useCallback((e) => {
    setRmail( e.target.value )
  })

  const inputDescription = useCallback((e) => {
    setDescription( e.target.value )
  })

  const submitForm = () => {
    const payload = {
      text: 'お問い合わせがありました\n' +
            'お名前:' + name + '\n' +
            'Email:' + email + '\n' +
            'お問い合わせ内容:\n' + description
    }

    const url = 'https://hooks.slack.com/services/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'

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload)
    }).then(() => {
      alert('送信が完了しました。追って連絡します！')
      this.setState({
        name: "",
        email: "",
        description: ""
      })
      return handleClickClose();
    })
  }
  
  return(
    <Dialog
      open={open}
      onClose={handleClickClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">問い合わせフォーム</DialogTitle>
      <DialogContent>
        <TextInput
          label={"お名前（必須）"} multiline={false} rows={1}
          value={name} type={'text'} onChange={inputName}
        />
        <TextInput
          label={"メールアドレス（必須）"} multiline={false} rows={1}
          value={email} type={'email'} onChange={inputEmail}
        />
        <TextInput
          label={"お問い合わせ内容（必須）"} multiline={true} rows={5}
          value={description} type={'text'} onChange={inputDescription}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickClose} color="primary">
          キャンセル
        </Button>
        <Button onClick={submitForm} color="primary" autoFocus>
          送信する
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormDialog