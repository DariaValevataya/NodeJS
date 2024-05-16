const express = require('express');
const swaggerUi = require('swagger-ui-express');
const app = express();
const swaggerSpecs = require('./swagger')
app.use(express.json());

let phoneList = [
  { id: 1, contactName: 'Daria', phoneNumber: '+375444028513' },
  { id: 2, contactName: 'Anton', phoneNumber: '+375444983434' },
  { id: 3, contactName: 'Katya', phoneNumber: '+375444025673' },
  { id: 4, contactName: 'Masha', phoneNumber: '+375444984336' },
  { id: 5, contactName: 'Regina', phoneNumber: '+375335673434' },
];
/**
 * @swagger
 * /TS:
 *   get:
 *     summary: Returns all phone contacts
 *     responses:
 *       200:
 *         description: The list of the phone contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     description: Contact's ID.
 *                   contactName:
 *                     type: string
 *                     description: The name of the contact.
 *                   phoneNumber:
 *                     type: string
 *                     description: Contact's phone number.
 */
app.get('/TS', (req, res) => {
  res.status(200).json(phoneList);
});
/**
 * @swagger
 * /TS:
 *   post:
 *     summary: Add a phone contact.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contactName
 *               - phoneNumber
 *             properties:
 *               contactName:
 *                 type: string
 *                 description: Name of the contact.
 *               phoneNumber:
 *                 type: string
 *                 description: Phone number of the contact.
 *     responses:
 *      200:
 *        description: Add new contact successfully.
 *      400:
 *        description: Incorrect data.
 */
app.post('/TS', (req, res) => {
  const { contactName, phoneNumber } = req.body;
  const newContact = {
    id: phoneList.length + 1,
    contactName,
    phoneNumber
  };
  phoneList.push(newContact);
  res.status(200).json(newContact);
});
/**
 * @swagger
 * /TS/{id}:
 *   put:
 *     summary: Update a phone contact
 *     description: Update exsist phone contact with ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Contact's iD, that should be updated
 *         type: number
 *         required: true
 *         example: 2 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contactName
 *               - phoneNumber
 *             properties:
 *               contactName:
 *                 type: string
 *                 description: The updated name of the contact.
 *               phoneNumber:
 *                 type: string
 *                 description: The updated phone number of the contact.
 *     responses:
 *       200:
 *         description: Phone record updated successfully.
 *       404:
 *         description: Phone record not found.
 */
app.put('/TS/:id', (req, res) => {
  const phoneId = parseInt(req.params.id);
  const { contactName, phoneNumber } = req.body;
  const index = phoneList.findIndex(contact => contact.id === parseInt(phoneId));
  phoneList[index] = {
    id: parseInt(phoneId),
    contactName,
    phoneNumber,
  };
  res.status(200).json(phoneList[index]);
});
/**
* @swagger
* /TS/{id}:
*   delete:
*     summary: Delete a phone contact
*     description: Delete a phone contact by ID.
*     parameters:
*       - in: path
*         name: id
*         description: Contact's iD, that should be deleted
*         type: number
*         required: true
*         example: 2
*     responses:
*       200:
*         description: Successfully deleted.
*       404:
*         description: Phone contact not found.
*/
app.delete('/TS/:id', (req, res) => {
  const phoneId = parseInt(req.params.id);
  phoneList = phoneList.filter((phone) => phone.id !== phoneId);
  res.status(200).json(phoneList);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});