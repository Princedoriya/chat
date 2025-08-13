const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const Joi = require('joi');
const prisma = new PrismaClient();

// Validation schemas
const submissionSchema = Joi.object({
  aadhaarNumber: Joi.string().pattern(/^\d{12}$/).required(),
  name: Joi.string().min(3).max(100).required(),
  panNumber: Joi.string().pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).optional(),
  organizationType: Joi.string().valid(
    'Proprietorship', 'Partnership', 'Company', 'Self', 'Others'
  ).optional(),
  nameAsPerPan: Joi.string().min(3).max(100).optional(),
  dobOrDoi: Joi.string().pattern(/^\d{2}\/\d{2}\/\d{4}$/).optional()
});

// GET all submissions
router.get('/', async (req, res) => {
  try {
    const submissions = await prisma.submission.findMany({
      include: { user: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// GET single submission by ID
router.get('/:id', async (req, res) => {
  try {
    const submission = await prisma.submission.findUnique({
      where: { id: req.params.id },
      include: { user: true }
    });
    
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    
    res.json(submission);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch submission' });
  }
});

// POST new submission
router.post('/', async (req, res) => {
  try {
    const { error, value } = submissionSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: error.details 
      });
    }

    // Check if Aadhaar already exists
    const existingSubmission = await prisma.submission.findFirst({
      where: { aadhaarNumber: value.aadhaarNumber }
    });

    if (existingSubmission) {
      return res.status(409).json({ 
        error: 'Aadhaar number already exists' 
      });
    }

    const submission = await prisma.submission.create({
      data: {
        ...value,
        isValidated: true,
        validationErrors: {}
      }
    });

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create submission' });
  }
});

// PUT update submission
router.put('/:id', async (req, res) => {
  try {
    const { error, value } = submissionSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: error.details 
      });
    }

    const submission = await prisma.submission.update({
      where: { id: req.params.id },
      data: value
    });

    res.json(submission);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Submission not found' });
    }
    res.status(500).json({ error: 'Failed to update submission' });
  }
});

// DELETE submission
router.delete('/:id', async (req, res) => {
  try {
    await prisma.submission.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Submission deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Submission not found' });
    }
    res.status(500).json({ error: 'Failed to delete submission' });
  }
});

module.exports = router;
