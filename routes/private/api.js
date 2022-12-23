const { v4 } = require('uuid');
const db = require('../../connectors/db');
const roles = require('../../constants/roles');
const { getUser } = require('../../utils/helper');

module.exports = function(app) {
  // Register HTTP endpoint to get all users
  app.get('/api/v1/users', async function(req, res) {
    const results = await db.select('*').from('users');
    return res.json(results)
  });

  app.get('/api/v1/courses/:courseId/drop', async function(req, res){
    const courseId = req.params.courseId;
    const user = await getUser(req);
    console.log(user);
    const result = await db.select('*')
    .from('se_project.enrollments')
    .where('userId', user.userId).first()
    .where('courseId', courseId).del();
    return res.status(301).redirect('/courses');
  });
};
