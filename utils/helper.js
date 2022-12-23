const db = require('../connectors/db');
const roles = require('../constants/roles');
const { getSessionToken } = require('./session');

module.exports = {

async getUser(req) {
    const sessionToken = getSessionToken(req);
    if (!sessionToken) {
      return res.status(301).redirect('/');
    }
  
    const user = await db.select('*')
      .from('se_project.sessions')
      .where('token', sessionToken)
      .innerJoin('se_project.users', 'se_project.sessions.userId', 'se_project.users.id')
      .innerJoin('se_project.roles', 'se_project.users.roleId', 'se_project.roles.id')
      .innerJoin('se_project.faculties', 'se_project.users.facultyId', 'se_project.faculties.id')
      .first();
    
    //console.log('user =>', user)
    user.isStudent = user.roleId === roles.student;
    user.isAdmin = user.roleId === roles.admin;
  
    return user;  
  }
}