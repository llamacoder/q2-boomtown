const fs = require('fs')
const path = require('path')

// *** DROP SEEDS TEST ***
describe('Drop Seeds', () => {
  beforeEach(() => {
    this.config = {
      migrations: {
        directory: path.join(__dirname, '..', 'migrations')
      },
      seeds: {
        directory: path.join(__dirname, '..', 'seeds')
      }
    }

    return knex.migrate
      .latest(this.config.migrations)
      .then(() => knex.seed.run(this.config.seeds))
      .catch(err => {
        expect.fail(null, null, err)
      })
  })

  it('Drops all the data before re-creating it', () => {
    return Promise.all([
      knex('mentors'),
      knex('companies'),
      knex('workshops'),
      knex('mentors_workshops'),
      knex('founders'),
      knex('messages')
    ])
      .then(
        (
          [mentors, companies, workshops, mentors_workshops, founders, messages]
        ) => {
          return knex.seed.run(this.config.seeds).then(() => {
            return Promise.all([
              knex('mentors'),
              knex('companies'),
              knex('workshops'),
              knex('mentors_workshops'),
              knex('founders'),
              knex('messages')
            ]).then(
              (
                [
                  mentorsNew,
                  companiesNew,
                  workshopsNew,
                  mentors_workshopsNew,
                  foundersNew,
                  messagesNew
                ]
              ) => {
                expect(mentors.length).to.equal(mentorsNew.length)
                expect(companies.length).to.equal(companiesNew.length)
                expect(workshops.length).to.equal(workshopsNew.length)
                expect(mentors_workshops.length).to.equal(
                  mentors_workshopsNew.length
                )
                expect(founders.length).to.equal(foundersNew.length)
                expect(messages.length).to.equal(messagesNew.length)
              }
            )
          })
        }
      )
      .catch(err => Promise.reject(err))
  })
})

// *** MENTORS SEEDS TEST ***

describe('Mentors Seeds', () => {
  beforeEach(() => {
    this.config = {
      migrations: {
        directory: path.join(__dirname, '..', 'migrations')
      },
      seeds: {
        directory: path.join(__dirname, '..', 'seeds')
      }
    }

    return knex.migrate
      .latest(this.config.migrations)
      .then(() => knex.seed.run(this.config.seeds))
      .catch(err => {
        expect.fail(null, null, err)
      })
  })

  it('creates at least one new mentor', () => {
    return knex('mentors')
      .then(actual => {
        expect(actual.length).to.be.at.least(1)
        const [mentor] = actual
        expect(mentor.mentor_id).to.be.ok
        expect(mentor.first_name).to.be.ok
        expect(mentor.last_name).to.be.ok
      })
      .catch(err => Promise.reject(err))
  })
})

// *** COMPANIES SEEDS TEST ***
describe('Companies Seeds', () => {
  beforeEach(() => {
    this.config = {
      migrations: {
        directory: path.join(__dirname, '..', 'migrations')
      },
      seeds: {
        directory: path.join(__dirname, '..', 'seeds')
      }
    }

    return knex.migrate
      .latest(this.config.migrations)
      .then(() => knex.seed.run(this.config.seeds))
      .catch(err => {
        expect.fail(null, null, err)
      })
  })

  it('creates at least one new company', () => {
    return knex('companies')
      .then(actual => {
        expect(actual.length).to.be.at.least(1)

        const [company] = actual
        expect(company.company_id).to.be.ok
        expect(company.cohort).to.be.ok
        expect(company.company_name).to.be.ok
      })
      .catch(err => Promise.reject(err))
  })

  it('resets the sequence max id each time', () => {
    return knex('companies')
      .insert({ cohort: "8", company_name: "test" }, '*')
      .then(([{ company_id }]) => {
        return knex('companies').then(companies => {
          const err = `Check that you've reset the auto-incrementing ID`
          expect(company_id, err).to.equal(companies.length)
        })
      })
      .catch(err => Promise.reject(err))
  })
})

// *** WORKSHOPS SEEDS TEST ***
describe('Workshops Seeds', () => {
  beforeEach(() => {
    this.config = {
      migrations: {
        directory: path.join(__dirname, '..', 'migrations')
      },
      seeds: {
        directory: path.join(__dirname, '..', 'seeds')
      }
    }

    return knex.migrate
      .latest(this.config.migrations)
      .then(() => knex.seed.run(this.config.seeds))
      .catch(err => {
        expect.fail(null, null, err)
      })
  })

  it('creates at least one new workshop', () => {
    return knex('workshops')
      .then(actual => {
        expect(actual.length).to.be.at.least(1)

        const [workshop] = actual
        expect(workshop.workshop_id).to.be.ok
        expect(workshop.name).to.be.ok
        expect(workshop.date).to.be.ok
        expect(workshop.start_time).to.be.ok
        expect(workshop.end_time).to.be.ok
      })
      .catch(err => Promise.reject(err))
  })

  it('resets the sequence max id each time', () => {
    return knex('workshops')
      .insert({ name: 'test', date: '01/01/01',
      start_time: '01/01/02 01:01:01.02 PST', end_time: '01/01/02 01:01:01.03 PST'
      }, '*')
      .then(([{ workshop_id }]) => {
        return knex('workshops').then(workshops => {
          const err = `Check that you've reset the auto-incrementing ID`
          expect(workshop_id, err).to.equal(workshops.length)
        })
      })
      .catch(err => Promise.reject(err))
  })
})

// *** MENTORS-WORKSHOPS SEEDS TESTS ***
describe('Mentors-Workshops Seeds', () => {
  beforeEach(() => {
    this.config = {
      migrations: {
        directory: path.join(__dirname, '..', 'migrations')
      },
      seeds: {
        directory: path.join(__dirname, '..', 'seeds')
      }
    }

    return knex.migrate
      .latest(this.config.migrations)
      .then(() => knex.seed.run(this.config.seeds))
      .catch(err => {
        expect.fail(null, null, err)
      })
  })

  it('creates at least one join', () => {
    return knex('mentors_workshops')
      .then(actual => {
        expect(actual.length).to.be.at.least(1)

        const [row] = actual
        expect(row.mentor_id).to.be.ok
        expect(row.workshop_id).to.be.ok
      })
      .catch(err => Promise.reject(err))
  })

  it('is associated with an existing mentor', () => {
    return knex('mentors_workshops')
      .then(actual => {
        const [row] = actual
        return knex('mentors')
          .where({ mentor_id: row.mentor_id })
          .first()
      })
      .then(mentor => {
        expect(mentor).to.be.ok
      })
      .catch(err => Promise.reject(err))
  })

  it('is associated with an existing workshop', () => {
    return knex('mentors_workshops')
      .then(actual => {
        const [row] = actual
        return knex('workshops')
          .where({ workshop_id: row.workshop_id })
          .first()
      })
      .then(workshop => {
        expect(workshop).to.be.ok
      })
      .catch(err => Promise.reject(err))
  })
})

// *** FOUNDERS SEEDS TESTS ***
describe('Founders Seeds', () => {
  beforeEach(() => {
    this.config = {
      migrations: {
        directory: path.join(__dirname, '..', 'migrations')
      },
      seeds: {
        directory: path.join(__dirname, '..', 'seeds')
      }
    }

    return knex.migrate
      .latest(this.config.migrations)
      .then(() => knex.seed.run(this.config.seeds))
      .catch(err => {
        expect.fail(null, null, err)
      })
  })

  it('creates at least one new founder', () => {
    return knex('founders')
      .then(actual => {
        expect(actual.length).to.be.at.least(1)

        const [founder] = actual
        expect(founder.founder_id).to.be.ok
        expect(founder.company_id).to.be.ok
        expect(founder.first_name).to.be.ok
        expect(founder.last_name).to.be.ok
        expect(founder.phone_number).to.be.ok
      })
      .catch(err => Promise.reject(err))
  })

  it('resets the sequence max id each time', () => {
    return knex('founders')
      .insert({ company_id: 1, first_name: 'ftest', last_name: 'stest', phone_number: '123-456-7890' }, '*')
      .then(([{ founder_id }]) => {
        return knex('founders').then(founders => {
          const err = `Check that you've reset the auto-incrementing ID`
          expect(founder_id, err).to.equal(founders.length)
        })
      })
      .catch(err => Promise.reject(err))
  })
})

// *** MESSAGES SEEDS TESTS ***
describe('Messages Seeds', () => {
  beforeEach(() => {
    this.config = {
      migrations: {
        directory: path.join(__dirname, '..', 'migrations')
      },
      seeds: {
        directory: path.join(__dirname, '..', 'seeds')
      }
    }

    return knex.migrate
      .latest(this.config.migrations)
      .then(() => knex.seed.run(this.config.seeds))
      .catch(err => {
        expect.fail(null, null, err)
      })
  })

  it('creates at least one new message', () => {
    return knex('messages')
      .then(actual => {
        expect(actual.length).to.be.at.least(1)

        const [message] = actual
        expect(message.message_id).to.be.ok
        expect(message.workshop_id).to.be.ok
        expect(message.phone_number).to.be.ok
        expect(message.message_out).to.be.ok
        expect(message.message_in).to.be.ok
        expect(message.log_time).to.be.ok
      })
      .catch(err => Promise.reject(err))
  })

  it('resets the sequence max id each time', () => {
    return knex('messages')
      .insert({ workshop_id: 1, phone_number: '123-456-7890', message_out: 'outtest', message_in: 'intest', log_time: '01/01/01 1:00pm' }, '*')
      .then(([{ message_id }]) => {
        return knex('messages').then(messages => {
          const err = `Check that you've reset the auto-incrementing ID`
          expect(message_id, err).to.equal(messages.length)
        })
      })
      .catch(err => Promise.reject(err))
  })
})
