const log = require('debug')('MOCK');
const Transactions = require('mongoose-transactions');
const modelsNames = require('../server/mongo/models/models.names');

(async () => {
  const transaction = new Transactions();

  try {
    const data = new Map();

    const company = {
      name: 'company',
    };
    const companyId = transaction.insert(modelsNames.company, company);
    data.company = companyId;

    const manager = {
      name: {
        first: 'manager',
        last: 'manager',
      },
      isManager: true,
      company: companyId,
      email: 'manager@manager.com',
      password: 'manager',
    };
    const managerId = transaction.insert(modelsNames.user, manager);
    data.manager = managerId;

    const project = {
      name: 'project',
      company: companyId,
      users: [managerId],
    };
    const projectId = transaction.insert(modelsNames.project, project);
    data.project = projectId;

    const tec = {
      name: {
        first: 'tec',
        last: 'tec',
      },
      company: companyId,
      email: 'tec@tec.com',
      password: 'tec',
    };
    const tecId = transaction.insert(modelsNames.user, tec);
    data.tec = tecId;
    transaction.update(modelsNames.project, project, {
      $push: {
        users: tecId,
      },
    });

    await transaction.run();
    log(`new company, manager, project and technical editor have created successfully ${data}`);
  } catch (error) {
    log(error);
    await transaction.rollback().catch(log);
    transaction.clean();
  }
})();
