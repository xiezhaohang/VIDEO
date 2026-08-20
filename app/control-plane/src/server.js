const { createControlPlane } = require('./app');
const host = process.env.CONTROL_PLANE_HOST || '127.0.0.1';
const port = Number(process.env.CONTROL_PLANE_PORT || 4319);
createControlPlane().listen(port, host, () => console.log(`Control Plane listening at http://${host}:${port}`));
