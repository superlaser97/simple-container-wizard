const express = require('express');
const Docker = require('dockerode');

const app = express();
const docker = new Docker();

app.use(express.static('public'));

app.get('/containers', async (req, res) => {
  try {
    // Get all containers, including stopped and paused
    const containers = await docker.listContainers({ all: true });
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

    // Redirect to the root page
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ error: 'Failed to restart container' });
  }
});

app.post('/containers/:id/stop', async (req, res) => {
  try {
    const container = docker.getContainer(req.params.id);
    await container.stop();
    res.json({ message: 'Container stopped' });

    // Redirect to the root page
    res.redirect('/');
    res.json(containers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to stop container' });
  }
});

app.post('/containers/:id/start', async (req, res) => {
  try {
    const container = docker.getContainer(req.params.id);
    await container.start();
    res.json({ message: 'Container started' });

    // Redirect to the root page
    res.redirect('/');

  } catch (error) {
    res.status(500).json({ error: 'Failed to start container' });
  }
})

app.listen(3000, () => {
  console.log('Server started on port 3000');
});