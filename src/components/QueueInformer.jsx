import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
<<<<<<< Updated upstream

const socket = io('http://localhost:4000')
=======
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');
>>>>>>> Stashed changes

const QueueInformer = ({ url = 'http://localhost:4000' }) => {

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [count, setCount] = useState('');

  useEffect(() => {

    socket.on('connected', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('sendCount', (count) => {
      setCount(count)
    });

    return () => {
      socket.off('connection');
      socket.off('disconnect');
      socket.off('sendCount');
    };
  }, []);




  return (
    <Typography variant='body2' component='div' sx={{ display: 'inline-flex', alignItems: 'center' }}>
      <span style={{ fontSize: '.5rem' }}>{isConnected ? '🟢' : '🔴'}</span>
      {' '}
      <span>{count ? `Online: ${count}` : ''}</span>
    </Typography>
  )
}

export default QueueInformer