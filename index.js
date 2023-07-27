const contacts = require('./contacts');
const { Command } = require('commander');

// (async () => {
//   const contacts = await listContacts();
//   console.log(contacts);
// })();

// (async () => {
//   const contactId = 'rsKkOQUi80VPC';
//   const contact = await contacts.getContactById(contactId);
//   console.log(contact);
// })();

// (async () => {
//     const contactId = 'e6ywwRe4jcqxXfCZOj_1e';
//     const removedContact = await contacts.removeContact(contactId);
//     console.log(removedContact);
// })();

// (async () => {
//   try {
//     const newContact = await contacts.addContact('John Doe', 'john@example.com', '1234567890');
//     console.log('New contact added:', newContact);
//   } catch (error) {
//     console.error('Error adding contact:', error);
//   }
// })();

const program = new Command();
program
    .option('--action <type>', 'Action to perform (list, get, add, remove)')
    .option('--id <type>', 'Contact ID')
    .option('--name <type>', 'Contact name')
    .option('--email <type>', 'Contact email')
    .option('--phone <type>', 'Contact phone')
    .parse(process.argv);

program.parse(process.argv);

const argv = program.opts();

async function invokeAction() {
    const options = program.opts();
    const { action, id, name, email, phone } = options;

    switch (action) {
    case 'list':
        const allContacts = await contacts.listContacts();
        console.table(allContacts);
        break;

    case 'get':
        const contact = await contacts.getContactById(id);
        console.log(contact || 'Contact not found');
        break;

    case 'add':
        const newContact = await contacts.addContact(name, email, phone);
        console.log('New contact added:', newContact);
        break;

    case 'remove':
        const removedContact = await contacts.removeContact(id);
        console.log(removedContact ? 'Contact removed:' : 'Contact not found');
        console.log(removedContact);
        break;

    default:
        console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);