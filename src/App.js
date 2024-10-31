import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton, MenuItem, Select } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

const App = () => {
  const [issues, setIssues] = useState([]);
  const [currentIssue, setCurrentIssue] = useState({ id: null, title: '', description: '', date: '', status: 'open' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    const response = await axios.get('/issues');
    setIssues(response.data);
  };

  const createIssue = async () => {
    const response = await axios.post('/issues', currentIssue);
    setIssues([...issues, response.data]);
    setCurrentIssue({ id: null, title: '', description: '', date: '', status: 'open' });
  };

  const updateIssue = async () => {
    const response = await axios.put(`/issues/${currentIssue._id}`, currentIssue);
    setIssues(issues.map(issue => (issue._id === currentIssue._id ? response.data : issue)));
    setCurrentIssue({ id: null, title: '', description: '', date: '', status: 'open' });
    setIsEditing(false);
  };

  const deleteIssue = async (id) => {
    await axios.delete(`/issues/${id}`);
    setIssues(issues.filter(issue => issue._id !== id));
  };

  const editIssue = (issue) => {
    setCurrentIssue(issue);
    setIsEditing(true);
  };

  return (
    <Container>
      <h1>Issue Tracker</h1>
      <TextField
        label="Title"
        value={currentIssue.title}
        onChange={(e) => setCurrentIssue({ ...currentIssue, title: e.target.value })}
      />
      <TextField
        label="Description"
        value={currentIssue.description}
        onChange={(e) => setCurrentIssue({ ...currentIssue, description: e.target.value })}
      />
      <TextField
        label="Date"
        type="date"
        value={currentIssue.date}
        onChange={(e) => setCurrentIssue({ ...currentIssue, date: e.target.value })}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Select
        label="Status"
        value={currentIssue.status}
        onChange={(e) => setCurrentIssue({ ...currentIssue, status: e.target.value })}
      >
        <MenuItem value="open">Open</MenuItem>
        <MenuItem value="closed">Closed</MenuItem>
      </Select>
      <Button onClick={isEditing ? updateIssue : createIssue}>
        {isEditing ? 'Update Issue' : 'Create Issue'}
      </Button>
      <List>
        {issues.map((issue) => (
          <ListItem key={issue._id}>
            <ListItemText primary={issue.title} secondary={`${issue.description} - ${issue.date} - ${issue.status}`} />
            <IconButton onClick={() => editIssue(issue)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => deleteIssue(issue._id)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default App;
