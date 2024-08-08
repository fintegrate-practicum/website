import React, { useEffect, useMemo, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  CssBaseline,
} from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import Message from '../classes/message';
import Typography from '../../../common/components/Typography/Typography';
import { useAppDispatch } from '../../../Redux/hooks';
import DateFormat from '../../../components/generic/DateFormat';
import { getUserById } from '../features/employeeSlice';

const MessageList = ({ messages }: { messages: Message[] }) => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const dispatch = useAppDispatch();

  const handleClick = (message: Message) => {
    setSelectedMessage(message);
    message.read_status = true;
  };
  const [userNames, setUserNames] = useState<{ [key: string]: string }>({});

  const getUser = async (id: string): Promise<string> => {
    const user = await dispatch(getUserById(id));
    return user.payload.userName;
  };

  const existMessages = useMemo(() => {
    if (!Array.isArray(messages) || messages.length === 0) {
      console.error("Expected 'messages' to be an array but got:", messages);
      return false;
    }
    return true;
  }, [messages]);

  useEffect(() => {
    messages.forEach(async (msg) => {
      if (!userNames[msg.sender_id]) {
        const userName = await getUser(msg.sender_id);
        if (userName) {
          setUserNames((prev) => ({ ...prev, [msg.sender_id]: userName }));
        }
      }
    });
  }, [messages, userNames]);
  return (
    <Box display='flex' height='100vh'>
      <CssBaseline />
      <Box width='30%' bgcolor='#f5f5f5' overflow='auto'>
        {existMessages ? (
          <List>
            {messages.map((message) => (
              <ListItem
                key={message.message_id}
                button
                onClick={() => handleClick(message)}
                sx={{
                  bgcolor: message.read_status ? 'white' : 'lightyellow',
                }}
              >
                <ListItemText
                  primary={message.message_content}
                  secondary={
                    <>
                      {`Received from: ${userNames[message.sender_id] || 'Loading...'} at `}
                      <DateFormat
                        isoDate={message.date_time.toLocaleString()}
                      />
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant='h6' color='textSecondary' align='center'>
            No messages available.
          </Typography>
        )}
      </Box>
      <Box flex={1} padding={2} overflow='auto'>
        {selectedMessage ? (
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant='h5'>
              {selectedMessage.message_content}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
              Received from:
              {userNames[selectedMessage.sender_id] || 'Loading...'} at{' '}
              {
                <DateFormat
                  isoDate={selectedMessage.date_time.toLocaleString()}
                />
              }
            </Typography>
          </Paper>
        ) : (
          <Typography variant='h6' color='textSecondary'>
            Select a message to read
          </Typography>
        )}
      </Box>
    </Box>
  );
};

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.instanceOf(Message)).isRequired,
};

export default MessageList;
