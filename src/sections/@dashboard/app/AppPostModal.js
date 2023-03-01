import React, { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';
import { Alert, Box, Modal, Stack, TextField } from '@mui/material';
import RequestService from '../../../services/RequestService';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0',
    boxShadow: 24,
    p: 4,
};


const AppPostModal = ({ item, onClose, onSave }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        setTitle(item.title);
        setBody(item.body);
    }, [item]);

    const handleUpdate = () => {
        setError(null);
        if (title.trim().length === 0 && body.trim().length === 0) {
            setError('Please fill all fields correctly.');
            return;
        }
        setLoading(true);
        RequestService.update(`posts/${item.id}`, { data: { title, body } }).then(res => {
            if (res.status === 200) {
                onSave(item.id, res.data);
            }
        }).finally(() => {
            setLoading(false);
        });
    };

    return (
        <Modal
            open
            onClose={onClose}
            aria-labelledby="Post"
            aria-describedby="Post Detail"
        >
        <Box sx={style}>
            <Stack spacing={3}>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField name="title" onChange={(e) => setTitle(e.target.value)} label="Title" value={title} />
                <TextField multiline name="body" onChange={(e) => setBody(e.target.value)} label="Body" value={body} />

                <LoadingButton fullWidth loading={loading} size="large" type="submit" variant="contained" onClick={handleUpdate}>
                    Update
                </LoadingButton>
            </Stack>
        </Box>
      </Modal>
    );
}

AppPostModal.propTypes = {
    item: PropTypes.shape({
        userId: PropTypes.number,
        id: PropTypes.number,
        title: PropTypes.string,
        body: PropTypes.string,
    }),
    onClose: PropTypes.func,
    onSave: PropTypes.func,
}

export default AppPostModal;
