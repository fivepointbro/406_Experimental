406 SQN Experimental Site:

No need to delete this section of the file, it will be ignored by the code regardless

This site is a single-page application that runs on Javascript
Vanilla Javascript, specifically. It's a homebrew framework that uses custom
HTML elements with associated Javascript "classes" to display each page
What makes this unique is that all of the data shown on the pages is just .txt files
I'm serious... just regular .txt files written in basically plain English

Everything after "page content below" is stuff that appears once on the page
Things like the title of the page, any large bodies of text, header image, etc
Everything after "repeated items below" means special repeat items, like contact cards for people
Each special object (like a person) will have a list of properties, like a name, age, and height
There may also be sub-lists, like a list of "cars" that each "person" owns

----------------------

Rules: Please read!

Only one statement per line, and you can't use a colon ":" anywhere except your labels
I'm sorry but you can't. You shouldn't need to anyway, since list objects will be pre-formatted
You also can't use double curly braces! (these guys {{ or }}) Not sure why you would anyway, but don't
You CAN use HTML in your statements if you want but don't go overboard, that's not the intent
Let the templates do their job but you can <strong>make some text bold</strong> or <u>underlined</u>
You can use a single line break..

Or two line breaks as above, so there's a gap between lines/items (easier to read)
Any line/item that doesn't start with a label, such as "Rules:"...
Will be assumed to be a part of the most recently labeled object. Like a new paragraph
For example, all of these lines after "Rules:" would be items inside the "Rules" object
To make a new object, simply use three line breaks and then begin with your label
You can use more than three breaks if you'd like, but three is the minimum


Rules: This would be the first item in our new object, in this case a new "Rules" object
And this line would be the second item in that set of rules. Makes sense, right?

Arrows allow a heirarchy, or a sub-list. Use the right arrow "=>" to begin
Then use a "tab" to indent the sub-list items and label each one
For example...

Company: Cool Company
Branch: 001
Employees: =>
    name: Bob
    hat: blue

    name: Rob
    hat: red

This would create a list of "Employees" for this "Company" object, with two people inside
And each person would have some properties, in this case a name and a hat color

If you want to change the layout of the pages, or create a new type of page, you'll need to change the HTML templates
If you want to change the actual core data structure, you'll need to get into the JavaScript files
In helpers.js you'll find the code that creates new contentItems or repeatItems so you can add or edit the structure of objects
That's all there is to it. Good luck and have fun! Try not to break anything!

Below you'll see an example "page" and how simple it is to create or change content

----------------------
{{page content below}}

title: Page Title


image: =>
	url: ./images/image.png
	classes: float-end d-block
	width: 200
	description: Website Logo


subtitle: Our Mission


text: Making websites that can be maintained even by idiots who can't code


links: =>
	url: http://coolurl.com
	label: Cool URL
	url: https://interestingwebsite.ca/
	label: <img class="m-1" src="./images/interestingwebsite.jpg">
	url: ./pages/page.html
	label: A page that's in the "pages" folder of our site


subtitle: A list of priorities


list: =>
	item: 1
	item: 2
	item: 3
	item: Four


text: - Generic text under our list


subtitle: Courses Currently Running


list: =>
	item: Course #1
	item: Course #2
	item: Course #3


{{repeated items below}}


type: contact card
position: Boss
rank: CEO
name: BossMan
office: Top floor, biggest office
phone: 555-123-1234
email: boss.email@email.com


type: contact card
position: Employee
rank: Peasant
name: NormalGuy
office: None
phone: 555-123-1111
email: regularguy@company.biz



type: links
category: Cool Links
links: =>
	url: basicURL.com
	label: Basic URL
	url: www.google.com
	label: Google
	url: https://Canada.ca
	label: Canada
