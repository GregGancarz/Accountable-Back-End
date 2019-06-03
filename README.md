////////////////////// MVP USER STORIES //////////////////////

// Primary Home - No logged session 

- User arrives on the primary home page and get information about the sites function and purpose in addtion to login and register fields.

- User can either log in if they have already created an account, or they can register. The user's email address serves as the username.

----------------
Needed routes:
	post /auth/LOGIN
	post /auth/REGISTER

----------------



// Logged Home - after logging in or registering

- User arrives on the logged page and is presented with a summation of their weekly, monthly, and quarterly spending averages, in addition to categories ranked by the amount spent. If they are applicable to the amount of data already inputed. If the user just created the page, the values would still be zero. A list of all expenses sorted by date is also present in addition a component for created a new expense entry. 

- Next to each entry, an edit button is present that, when clicked, pops open a edit modalmodal that allows the

In edit modal user to update any fields or delete the entry entirely. 

When the update is submitted, the entry is resorted according to the new date, if need be.

- User can click a link to be shown the input page for inputing an expense

- User is presented with fields to input an expense. Expenses have a date, amount, and a category. There are several pre-set 
	categories to choose from in a drop down menu.

- Clicking an 'add category' button pops up a modal that allows the user to create a new category for expenses by inputing text and 
	submitting it. The new category is then present among the available choices.

- Clicking 'edit category' allows the user to change the name of the category. After submitting, all the entries on the page will reflect the update entry name. 

- After inputing the required date, time, and amount, and submitting it, the new expense appears on the list of expenses.

- Clicking logout returns the user to the non-logged home page.

----------------
Needed routes:
	post /expenses
	post /categories
	put /expenses/id
	put /categories/id
	get /auth/logout
	delete /expenses/id

----------------

//// NICE TO HAVES ////
- Dividing up expense show lists by week, month, quarter, etc
- 3rd party API to display the data in charts/graphs/etc
- Profile page that displays user account info and edit it.


//// STRETCH ////
- Emailing on signup
- Verifying one's email after sign-up, then being redirected home after clicking a link in the received email.
- Ability to set spending limits and email alerts when limits are being reached.









