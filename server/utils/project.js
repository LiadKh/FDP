const log = require('debug')('MOCK');
const Transactions = require('mongoose-transactions');


const create = async () => {
  const transaction = new Transactions();

  try {
    const data = new Map();

    const company = {
      name: 'company',
    };
    const companyId = transaction.insert('Company', company);
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
    const managerId = transaction.insert('User', manager);
    data.manager = managerId;

    const project = {
      name: 'project1',
      company: companyId,
    };
    const projectId = transaction.insert('Project', project);
    data.project = projectId;

    await transaction.run();
    log(`new company, manager and project have created successfully ${data}`);
  } catch (error) {
    log(error);
    await transaction.rollback().catch(log);
    transaction.clean();
  }
};
create();
