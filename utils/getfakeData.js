// function getFakeData() {
//     function generateRandomUsername() {
//         const adjectives = ['Happy', 'Silly', 'Clever', 'Creative', 'Lucky', 'Jolly', 'Gentle', 'Witty', 'Dizzy', 'Curious'];
//         const nouns = ['Elephant', 'Penguin', 'Rainbow', 'Dragon', 'Star', 'Sunflower', 'Moon', 'Rocket', 'Ocean', 'Chocolate'];

//         const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
//         const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

//         return `${randomAdjective}${randomNoun}${Math.floor(Math.random() * 100)}`;
//     }

//     function generateRandomEmail() {
//         const providers = ['gmail.com'];

//         const randomUsername = generateRandomUsername().toLowerCase();
//         const randomProvider = providers[Math.floor(Math.random() * providers.length)];

//         return `${randomUsername}@${randomProvider}`;
//     }

//     function generateRandomPhoneNumber() {
//         // Generate a random 10-digit number
//         const randomDigits = Math.floor(100000000 + Math.random() * 900000000);
//         return `9${randomDigits}`;
//     }

//     function generateRandomPassword() {
//         // Generate a random password with a minimum length of 8 characters
//         const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//         const passwordLength = 10 + Math.floor(Math.random() * 10);

//         let password = '';
//         for (let i = 0; i < passwordLength; i++) {
//             const randomIndex = Math.floor(Math.random() * characters.length);
//             password += characters.charAt(randomIndex);
//         }

//         return password;
//     }

//     // Example usage
//     const randomUsername = generateRandomUsername();
//     const randomEmail = generateRandomEmail();
//     const randomPhoneNumber = generateRandomPhoneNumber();
//     const randomPassword = generateRandomPassword();




//     return { username: randomUsername, email: randomEmail, phone: randomPhoneNumber, password: randomPassword }
// }




const { faker } = require('@faker-js/faker');

const getFakeData = () => {
    function generateRandomPhoneNumber() {
        const randomDigits = Math.floor(100000000 + Math.random() * 900000000);
        return `9${randomDigits}`;
    }

    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const phone = generateRandomPhoneNumber()
    return { username, email, password, phone };
};


module.exports = getFakeData;