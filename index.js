const express = require('express');
const Docker = require('dockerode');

const app = express();
const docker = new Docker();

app.use(express.static('public'));

app.get('/containers', async (req, res) => {
  try {
    const containers = await docker.listContainers();
    res.json(containers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list containers' });
  }
});

app.post('/containers/:id/restart', async (req, res) => {
  try {
    const container = docker.getContainer(req.params.id);
    await container.restart();
    res.json({ message: 'Container restarted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to restart container' });
  }
});

app.post('/containers/:id/stop', async (req, res) => {
  try {
    const container = docker.getContainer(req.params.id);
    await container.stop();
    res.json({ message: 'Container stopped' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to stop container' });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});