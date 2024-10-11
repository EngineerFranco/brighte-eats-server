import { checkEmail, getAllLeads, getLeadByID, postRegister } from '../models/model.js';
import { validateRegister, validateLeadID } from '../validations/validations.js';
import { validationResult } from 'express-validator';

const resolvers = {
  Query: {
    leads: async () => {
      const result = await getAllLeads();
      return result;
    },
    lead: async (_, { id }) => {
      const req = { params: { id } };

      for (const validation of validateLeadID) {
        await validation.run(req);
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error(errors.array().map(err => err.msg).join(', '));
      }

      const result = await getLeadByID(id);
      return result;
    },
  },
  Mutation: {
    register: async (_, args, { req }) => {
      const { name, email, mobile, postcode, services } = args;
      req.body = { name, email, mobile, postcode, services };

      for (const validation of validateRegister) {
        await validation.run(req);
      }
 
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error(errors.array().map(err => err.msg).join(', '));
      }

      const isDuplicate = await checkEmail(email);
      if (isDuplicate) {
        throw new Error('User already exists');
      }

      const result = await postRegister(name, email, mobile, postcode, services);
      return result;
    },
  },
};

export default resolvers;
