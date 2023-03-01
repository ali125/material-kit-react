// @mui
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Delete, Edit } from '@mui/icons-material';
import { Card, CardHeader, CircularProgress, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Stack } from '@mui/material';
import RequestService from '../../../services/RequestService';
import AppPostModal from './AppPostModal';

// ----------------------------------------------------------------------

AppPosts.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string
};


export default function AppPosts({ subheader, ...other }) {
  const [loading, setLoading] = useState(true);
  const [openItem, setOpenItem] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
      setLoading(true);
          RequestService.get('posts?_start=0&_limit=20').then((response) => {
          if (response.status === 200) {
              setData(response.data);
          }
      }).finally(() => {
          setLoading(false);
      })
  }, []);

  const handleUpdate = (id, data) => {
    setData((prev) => {
      const ind = prev.findIndex((i) => i.id === id);
      prev[ind] = data;
      return prev;
    });
    setOpenItem(false);
  }

  const handleDelete = (id) => {
    RequestService.delete(`posts/${id}`).then(() => {
      const _data = [...data];
      const ind = _data.findIndex((i) => i.id === id);
      _data.splice(ind, 1);
      setData(_data);
    });
  }
  
  return (
    <>
      {!!openItem && <AppPostModal item={openItem} onClose={() => setOpenItem(false)} onSave={handleUpdate} />}
      <Card {...other}>
        <CardHeader title="Posts" subheader={subheader} />
        {loading ? (
          <Stack alignItems="center" spacing={3} sx={{ p: 3, pr: 0 }}>
            <CircularProgress />
          </Stack>
        ) : (
          <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell align="center">Title</TableCell>
                    <TableCell align="center">Body</TableCell>
                    <TableCell align="center" />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((post) => (
                    <PostsItem key={post.id} post={post} onEdit={() => setOpenItem(post)} onDelete={() => handleDelete(post.id)} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        )}
      </Card>
    </>
  );
}

// ----------------------------------------------------------------------

PostsItem.propTypes = {
  post: PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
  }),
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

function PostsItem({ post, onEdit, onDelete }) {
  const { id, title, body } = post;
  return (
    <TableRow direction="row" alignItems="center" spacing={2}>
      <TableCell component="th" scope="row">
        {id}
      </TableCell>
      <TableCell align="left">{title}</TableCell>
      <TableCell align="left">{body}</TableCell>
      <TableCell align="left">
        <Stack flexDirection="row">
          <Edit onClick={onEdit} />
          <Delete onClick={onDelete} />
        </Stack>
      </TableCell>
    </TableRow>
  );
}
