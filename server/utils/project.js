const log = require('debug')('MOCK');
const Transactions = require('mongoose-transactions');


const create = async () => {
  const transaction = new Transactions();

  try {
    const data = new Map();

    const manager = {
      name: {
        first: 'user1',
        last: 'user1',
      },
      email: 'user1@user1.com',
      password: '123',
    };
    const managerId = transaction.insert('User', manager);
    data.manager = managerId;

    const company = {
      name: 'company1',
      managers: [managerId],
    };
    const companyId = transaction.insert('Company', company);
    data.company = companyId;

    const project = {
      name: 'project1',
      company: companyId,
    };
    const projectId = transaction.insert('Project', project);
    data.project = projectId;

    transaction.update('Company', companyId, {
      $push: {
        projects: projectId,
      },
    });

    await transaction.run();
    log(`new company, manager and project have created successfully ${data}`);
  } catch (error) {
    log(error);
    await transaction.rollback().catch(log);
    transaction.clean();
  }
};
create();
