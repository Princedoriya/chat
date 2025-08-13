const express = require('express');
const router = express.Router();
const Joi = require('joi');

// Validation rules
const validationRules = {
  aadhaar: {
    pattern: /^\d{12}$/,
    message: 'Aadhaar must be exactly 12 digits'
  },
  name: {
    pattern: /^[a-zA-Z\s]{3,}$/,
    message: 'Name must contain only letters and be at least 3 characters'
  },
  pan: {
    pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    message: 'Invalid PAN format (e.g., ABCDE1234F)'
  },
  dob: {
    pattern: /^\d{2}\/\d{2}\/\d{4}$/,
    message: 'Date must be in DD/MM/YYYY format'
  }
};

// Validation schemas
const schemas = {
  aadhaar: Joi.object({
    aadhaarNumber: Joi.string().pattern(/^\d{12}$/).required()
  }),
  name: Joi.object({
    name: Joi.string().min(3).max(100).pattern(/^[a-zA-Z\s]+$/).required()
  }),
  pan: Joi.object({
    panNumber: Joi.string().pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).required()
  }),
  dob: Joi.object({
    date: Joi.string().pattern(/^\d{2}\/\d{2}\/\d{4}$/).required()
  })
};

// POST validate Aadhaar
router.post('/aadhaar', async (req, res) => {
  try {
    const { error, value } = schemas.aadhaar.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        valid: false,
        error: validationRules.aadhaar.message,
        details: error.details
      });
    }

    res.json({
      valid: true,
      message: 'Aadhaar number is valid',
      data: value
    });
  } catch (error) {
    res.status(500).json({ error: 'Validation failed' });
  }
});

// POST validate name
router.post('/name', async (req, res) => {
  try {
    const { error, value } = schemas.name.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        valid: false,
        error: validationRules.name.message,
        details: error.details
      });
    }

    res.json({
      valid: true,
      message: 'Name is valid',
      data: value
    });
  } catch (error) {
    res.status(500).json({ error: 'Validation failed' });
  }
});

// POST validate PAN
router.post('/pan', async (req, res) => {
  try {
    const { error, value } = schemas.pan.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        valid: false,
        error: validationRules.pan.message,
        details: error.details
      });
    }

    res.json({
      valid: true,
      message: 'PAN number is valid',
      data: value
    });
  } catch (error) {
    res.status(500).json({ error: 'Validation failed' });
  }
});

// POST validate date
router.post('/date', async (req, res) => {
  try {
    const { error, value } = schemas.dob.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        valid: false,
        error: validationRules.dob.message,
        details: error.details
      });
    }

    res.json({
      valid: true,
      message: 'Date is valid',
      data: value
    });
  } catch (error) {
    res.status(500).json({ error: 'Validation failed' });
  }
});

// GET validation rules
router.get('/rules', (req, res) => {
  res.json({
    rules: validationRules,
    schemas: schemas
  });
});

module.exports = router;
