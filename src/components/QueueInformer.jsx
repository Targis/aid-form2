import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import socketIO from 'socket.io-client';

// const socket = socketIO.connect('http://localhost:5000');

const socket = socketIO.connect('http://aid-informer.targis.pp.ua');

const QueueInformer = () => {

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
    <>
      {isConnected && count && (
        <Typography variant='body2' color="text.secondary" sx={{ display: 'inline-flex', alignItems: 'center', my: 6 }}>
          <span>{`Зараз цю сторінку переглядають: ${count}`}</span>
        </Typography>
      )}

    </>
  )
}

export default QueueInformer