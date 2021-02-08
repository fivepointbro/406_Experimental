406 SQN Experimental Site:

No need to delete this section of the file, it will be ignored by the code regardless

This site is a single-page application that runs on Javascript
Vanilla Javascript, specifically. It's a homebrew framework that uses custom
HTML elements with associated Javascript "classes" to display each page
What makes this unique is that all of the data shown on the pages is just .txt files
I'm serious... just regular .txt files written in basically plain English

Everything after "page content below" is stuff that appears once on the page
Things like the title of the page, any large bodies of text, header image, etc
Everything after "repeated items below" means multiple items, like a list of "people"
Each person will have their own properties, for example a name, age, and height
You can also create sub-lists, like a list of "cars" that each "person" owns

----------------------

Rules: Please read!

Only one statement per line, and you can't use a colon ":" anywhere except your label
I'm sorry but you can't. You shouldn't need to anyway, since items will be pre-formatted
You also can't use double curly braces! Not sure why you would anyway, but don't do it
You CAN use HTML in your statements if you want but don't go overboard, that's not the intent
Let the templates do their job but you can <strong>make some text bold</strong> or <u>underlined</u>
You can use a single line break..

Or two line breaks as above, so there's a gap between lines (easier to read)
Any line that doesn't start with a label (for example "Rules:")...
Will be assumed to be a part of the most recent label item. Like a new "paragraph"
In this case all these lines after "Rules" would be part of "Rules"
To make a new repeatable object (in the repeated items section) just use three line breaks
You can use more than three if you'd like, but three is the minimum


Rules: This would be considered a new object, in this case a new "set" of rules
And this line would be considered part of that set of rules. Makes sense, right?

Arrows represent a heirarchy, such as a list. Use the right "=>" to go down
And use "tab" (or hit the space bar 4+ times) to indent the sub-list items 
Then put a comma at the very end of each object, on the last item only
For example...

Company: Cool Company
Branch: 001
Employees: =>
    name: Bob
    hat: blue,

    name: Rob
    hat: red,

This would represent a list of "Employees" for this company item with two people inside
And each person would have some properties, in this case a name and a hat color

If you want to change the layout of the pages, you'll have to change the HTML templates
If you want to change the data structure, that's all done within the JavaScript files
That's all there is to it. Good luck and have fun! Try not to break it!

Below you'll see an example "page" and how simple it is to create or change content

----------------------
{{page content below}}

title: Links and References

content: Every page should have a <strong>little blurb</strong> to explain what the page is about.
You might want to have another paragraph in your content. This one has two sentences.
This one only has a single sentence in it.

{{repeated items below}}

type: General
description: These are all the general links. This is where general links will go.
links: =>
    url: www.whatever1.com
    label: This is one of the links,

    url: www.whatever2.com
    label: This is another link,

    url: www.whatever3.com
    label: This is the third link,

    url: www.whatever4.com
    label: This is the last one,




type: External
description: These are the external links. They bring you to other places.
links: =>
    url: www.whatever.com
    label: This is one of the links,

    url: www.whatever.com
    label: This is another link,

    url: www.whatever.com
    label: This is the third link,

    url: www.whatever.com
    label: This is the last one,



type: Files
description: These are files. You can download them.
links: =>
    url: www.whatever.com
    label: This is one of the links,
    url: www.whatever.com
    label: This is another link,
    url: www.whatever.com
    label: This is the third link,
    url: www.whatever.com
    label: This is the last one,




type: Airworthiness
description: If you don't know what this is, then go home.
links: =>
    url: www.whatever.com
    label: This is one of the links,

    url: www.whatever.com
    label: This is another link,

    url: www.whatever.com
    label: This is the third link,

    url: www.whatever.com
    label: This is the last one,
