const fs = require('fs')
const path = require('path')

// *** Mentors Table Testing ***
describe('Mentors Table', () => {
  beforeEach(() => {
    this.config = { directory: path.join(__dirname, '..', 'migrations') }
    return knex.migrate.latest(this.config).catch(err => {
      expect.fail(null, null, err)
    })
  })

  it('creates the appropriate columns upon migration', () => {
    return knex('mentors')
      .columnInfo()
      .then(actual => {
        const expected = {
          mentor_id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: "nextval('mentors_mentor_id_seq'::regclass)"
          },

          first_name: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: "''::character varying"
          },

          last_name: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: "''::character varying"
          }
        }
        for (const column in expected) {
          const err = `Column ${column} is not the same`
          expect(actual[column].type).to.equal(expected[column].type, err)
          expect(actual[column].nullable).to.equal(
            expected[column].nullable,
            err
          )
        }
      })
      .catch(err => Promise.reject(err))
  })

  it('correctly rolls back the migration', () => {
    return knex.schema.hasTable('mentors').then(beforeRollback => {
      return knex.migrate.rollback(this.config).then(() => {
        return knex.schema.hasTable('mentors').then(afterRollback => {
          const err = `Check the down() function in your migration`
          expect(beforeRollback, err).to.be.true
          expect(afterRollback, err).to.be.false
        })
      })
    })
  })
})

// *** Companies Table Testing ***
describe('Companies Table', () => {
  beforeEach(() => {
    this.config = { directory: path.join(__dirname, '..', 'migrations') }
    return knex.migrate.latest(this.config).catch(err => {
      expect.fail(null, null, err)
    })
  })

  it('creates the appropriate columns upon migration', () => {
    return knex('companies')
      .columnInfo()
      .then(actual => {
        const expected = {
          company_id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: "nextval('companies_company_id_seq'::regclass)"
          },

          cohort: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: "''::character varying"
          },

          company_name: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: "''::character varying"
          }
        }
        for (const column in expected) {
          const err = `Column ${column} is not the same`
          expect(actual[column].type).to.equal(expected[column].type, err)
          expect(actual[column].nullable).to.equal(
            expected[column].nullable,
            err
          )
        }
      })
      .catch(err => Promise.reject(err))
  })

  it('correctly rolls back the migration', () => {
    return knex.schema.hasTable('companies').then(beforeRollback => {
      return knex.migrate.rollback(this.config).then(() => {
        return knex.schema.hasTable('companies').then(afterRollback => {
          const err = `Check the down() function in your migration`
          expect(beforeRollback, err).to.be.true
          expect(afterRollback, err).to.be.false
        })
      })
    })
  })
})

// *** Workshops Table Testing ***
describe('Workshops Table', () => {
  beforeEach(() => {
    this.config = { directory: path.join(__dirname, '..', 'migrations') }
    return knex.migrate.latest(this.config).catch(err => {
      expect.fail(null, null, err)
    })
  })

  it('creates the appropriate columns upon migration', () => {
    return knex('workshops')
      .columnInfo()
      .then(actual => {
        const expected = {
          workshop_id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: "nextval('workshops_workshop_id_seq'::regclass)"
          },

          name: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: "''::character varying"
          },

          date: {
            type: 'date',
            maxLength: 255,
            nullable: false,
            defaultValue: 'now()'
          },

          start_time: {
            type: 'character varying',
            maxLength: 25,
            nullable: false,
            defaultValue: "''::character varying"
          },

          end_time: {
            type: 'character varying',
            maxLength: 25,
            nullable: false,
            defaultValue: "''::character varying"
          }

        }
        for (const column in expected) {
          const err = `Column ${column} is not the same`
          expect(actual[column].type).to.equal(expected[column].type, err)
          expect(actual[column].nullable).to.equal(
            expected[column].nullable,
            err
          )
        }
      })
      .catch(err => Promise.reject(err))
  })

  it('correctly rolls back the migration', () => {
    return knex.schema.hasTable('workshops').then(beforeRollback => {
      return knex.migrate.rollback(this.config).then(() => {
        return knex.schema.hasTable('workshops').then(afterRollback => {
          const err = `Check the down() function in your migration`
          expect(beforeRollback, err).to.be.true
          expect(afterRollback, err).to.be.false
        })
      })
    })
  })
})

// *** Mentors-Workshops Table Testing ***
describe('Mentors-Workshops Table', () => {
  beforeEach(() => {
    this.config = { directory: path.join(__dirname, '..', 'migrations') }
    return knex.migrate.latest(this.config).catch(err => {
      expect.fail(null, null, err)
    })
  })

  it('creates the appropriate columns upon migration', () => {
    return knex('mentors_workshops')
      .columnInfo()
      .then(actual => {
        const expected = {
          workshop_id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: "nextval('workshops_workshop_id_seq'::regclass)"
          },

          mentor_id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: "nextval('mentors_mentor_id_seq'::regclass)"
          }

        }
        for (const column in expected) {
          const err = `Column ${column} is not the same`
          expect(actual[column].type).to.equal(expected[column].type, err)
          expect(actual[column].nullable).to.equal(
            expected[column].nullable,
            err
          )
        }
      })
      .catch(err => Promise.reject(err))
  })

  it('correctly rolls back the migration', () => {
    return knex.schema.hasTable('mentors_workshops').then(beforeRollback => {
      return knex.migrate.rollback(this.config).then(() => {
        return knex.schema.hasTable('mentors_workshops').then(afterRollback => {
          const err = `Check the down() function in your migration`
          expect(beforeRollback, err).to.be.true
          expect(afterRollback, err).to.be.false
        })
      })
    })
  })
})

// *** Founders Table Testing ***
describe('Founders Table', () => {
  beforeEach(() => {
    this.config = { directory: path.join(__dirname, '..', 'migrations') }
    return knex.migrate.latest(this.config).catch(err => {
      expect.fail(null, null, err)
    })
  })

  it('creates the appropriate columns upon migration', () => {
    return knex('founders')
      .columnInfo()
      .then(actual => {
        const expected = {
          founder_id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: "nextval('founders_founder_id_seq'::regclass)"
          },
          company_id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: "''::character varying"
          },

          first_name: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: "''::character varying"
          },

          last_name: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: "''::character varying"
          },

          phone_number: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: "''::character varying"
          }
        }
        for (const column in expected) {
          const err = `Column ${column} is not the same`
          expect(actual[column].type).to.equal(expected[column].type, err)
          expect(actual[column].nullable).to.equal(
            expected[column].nullable,
            err
          )
        }
      })
      .catch(err => Promise.reject(err))
  })

  it('correctly rolls back the migration', () => {
    return knex.schema.hasTable('founders').then(beforeRollback => {
      return knex.migrate.rollback(this.config).then(() => {
        return knex.schema.hasTable('founders').then(afterRollback => {
          const err = `Check the down() function in your migration`
          expect(beforeRollback, err).to.be.true
          expect(afterRollback, err).to.be.false
        })
      })
    })
  })
})

// *** Messages Table Testing ***
describe('Messages Table', () => {
  beforeEach(() => {
    this.config = { directory: path.join(__dirname, '..', 'migrations') }
    return knex.migrate.latest(this.config).catch(err => {
      expect.fail(null, null, err)
    })
  })

  it('creates the appropriate columns upon migration', () => {
    return knex('messages')
      .columnInfo()
      .then(actual => {
        const expected = {
          message_id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: "nextval('messages_message_id_seq'::regclass)"
          },
          workshop_id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: "''::character varying"
          },
          phone_number: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: "''::character varying"
          },
          workshop_name: {
            type: 'character varying',
            maxLength: 255,
            nullable: true,
            defaultValue: "''::character varying"
          },
          message_out: {
            type: 'character varying',
            maxLength: 255,
            nullable: true,
            defaultValue: "''::character varying"
          },
          message_in: {
            type: 'character varying',
            maxLength: 255,
            nullable: true,
            defaultValue: "''::character varying"
          },
          log_time: {
            type: 'timestamp with time zone',
            maxLength: 255,
            nullable: false,
            defaultValue: 'now()'
          }
        }
        for (const column in expected) {
          const err = `Column ${column} is not the same`
          expect(actual[column].type).to.equal(expected[column].type, err)
          expect(actual[column].nullable).to.equal(
            expected[column].nullable,
            err
          )
        }
      })
      .catch(err => Promise.reject(err))
  })

  it('correctly rolls back the migration', () => {
    return knex.schema.hasTable('messages').then(beforeRollback => {
      return knex.migrate.rollback(this.config).then(() => {
        return knex.schema.hasTable('messages').then(afterRollback => {
          const err = `Check the down() function in your migration`
          expect(beforeRollback, err).to.be.true
          expect(afterRollback, err).to.be.false
        })
      })
    })
  })
})
