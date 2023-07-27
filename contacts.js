const fs = require("fs/promises");
const path = require('path');

// contacts.js


//   Розкоментуй і запиши значення
    const contactsPath = path.join(__dirname, 'db', 'contacts.json');


// TODO: задокументувати кожну функцію
async function listContacts() {
    // ...твій код. Повертає масив контактів.
    try {
        const data = await fs.readFile(contactsPath, 'utf-8');
        const contacts = JSON.parse(data);
        return contacts;
    } catch (error) {
        return [];
    }
}


async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await listContacts();
    const contact = contacts.find((c) => c.id === contactId);
    return contact || null;
}


async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    try {
        const contacts = await listContacts();
        const index = contacts.findIndex((c) => c.id === contactId);
        if (index !== -1) {
            const removedContact = contacts.splice(index, 1)[0];
            await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
            return removedContact;
        }
        return null
    } catch (error) {
        throw new Error('Error');
    }
}


async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту.
    try {
        const contacts = await listContacts();
        const newContact = {
            name,
            email,
            phone,
        };
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContact;
    } catch (error) {
        throw new Error('Error');
    }  
}

module.exports = { listContacts, getContactById, removeContact , addContact};