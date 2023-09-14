const express = require('express');
const router = express.Router();
const db = require('../config/db');




// search patient stats
router.get('/patient-search-statistics', (req, res) => {
  const sql = 'SELECT count(*) as search_count, user_id FROM patient_search_statistics GROUP BY user_id';
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('An error occurred while executing the query');
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// add patient
router.post('/add-patient', (req, res) => {
    const { id, first_name, last_name, dob, phone, created_date } = req.body;
    const sql = `INSERT INTO public."Patient" (id, first_name, last_name, dob, phone, created_date) VALUES (?, ?, ?, ?, ?, ?)`;
    
    db.query(sql, [id, first_name, last_name, dob, phone, created_date], (err, results) => {
      if (err) {
        console.error('An error occurred while executing the insert query');
        return res.status(500).send(err);
      }
      res.json({ message: 'Patient added successfully!', results });
    });
  });


// Hello, World! route
router.get('/hello', (req, res) => {
    res.send('Hello, World!');
  });
  
module.exports = router;
